package wasm

import (
	"encoding/json"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"

	wasmkeeper "github.com/CosmWasm/wasmd/x/wasm/keeper"
	wasmvmtypes "github.com/CosmWasm/wasmvm/types"

	wasmbindings "github.com/zodiatic/zodiatic/app/wasm/bindings"
	zodiatickeeper "github.com/zodiatic/zodiatic/x/zodiatic/keeper"
	zodiatictypes "github.com/zodiatic/zodiatic/x/zodiatic/types"
)

func CustomMessageDecorator(zodiaticKeeper *zodiatickeeper.Keeper) func(wasmkeeper.Messenger) wasmkeeper.Messenger {
	return func(old wasmkeeper.Messenger) wasmkeeper.Messenger {
		return &CustomMessenger{
			wrapped:        old,
			zodiaticKeeper: zodiaticKeeper,
		}
	}
}

type CustomMessenger struct {
	wrapped        wasmkeeper.Messenger
	zodiaticKeeper *zodiatickeeper.Keeper
}

var _ wasmkeeper.Messenger = (*CustomMessenger)(nil)

func (m *CustomMessenger) DispatchMsg(ctx sdk.Context, contractAddr sdk.AccAddress, contractIBCPortID string, msg wasmvmtypes.CosmosMsg) ([]sdk.Event, [][]byte, error) {
	if msg.Custom != nil {
		var contractMsg wasmbindings.ZodiaticMsg
		if err := json.Unmarshal(msg.Custom, &contractMsg); err != nil {
			return nil, nil, sdkerrors.Wrap(err, "osmosis msg")
		}
		if contractMsg.CreateLunar != nil {
			return m.createLunar(ctx, contractAddr, contractMsg.CreateLunar)
		}
	}
	return m.wrapped.DispatchMsg(ctx, contractAddr, contractIBCPortID, msg)
}

func (m *CustomMessenger) createLunar(ctx sdk.Context, contractAddr sdk.AccAddress, msg *wasmbindings.CreateLunar) ([]sdk.Event, [][]byte, error) {
	err := CreateLunar(m.zodiaticKeeper, ctx, contractAddr, msg)
	if err != nil {
		return nil, nil, sdkerrors.Wrap(err, "create lunar")
	}
	return nil, nil, nil
}

func CreateLunar(keeper *zodiatickeeper.Keeper, ctx sdk.Context, contractAddr sdk.AccAddress, msg *wasmbindings.CreateLunar) error {
	if msg == nil {
		return wasmvmtypes.InvalidRequest{Err: "null msg"}
	}
	var lunar zodiatictypes.Lunar
	lunar.Creator = msg.Creator
	lunar.Yyyymmdd = msg.Yyyymmdd
	lunar.Date = msg.Lunar.Date
	lunar.Lunar = msg.Lunar.Lunar
	lunar.LunarNumber = msg.Lunar.LunarNumber
	lunar.EightWords = msg.Lunar.EightWords
	lunar.GodDirection = msg.Lunar.GodDirection
	lunar.GoodFor = msg.Lunar.GoodFor
	lunar.BadFor = msg.Lunar.BadFor
	keeper.SetLunar(ctx, lunar)
	return nil
}
