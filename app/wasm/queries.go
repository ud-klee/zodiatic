package wasm

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"

	wasmbindings "github.com/zodiatic/zodiatic/app/wasm/bindings"

	zodiatickeeper "github.com/zodiatic/zodiatic/x/zodiatic/keeper"
)

type QueryPlugin struct {
	zodiaticKeeper *zodiatickeeper.Keeper
}

// NewQueryPlugin constructor
func NewQueryPlugin(
	keeper *zodiatickeeper.Keeper,
) *QueryPlugin {
	return &QueryPlugin{
		zodiaticKeeper: keeper,
	}
}

func (qp QueryPlugin) GetLunar(ctx sdk.Context, yyyymmdd uint64) (*wasmbindings.Lunar, error) {
	result, found := qp.zodiaticKeeper.GetLunar(ctx, yyyymmdd)
	if !found {
		return nil, sdkerrors.ErrNotFound
	}
	var lunar wasmbindings.Lunar
	lunar.Date = result.Date
	lunar.LunarNumber = result.LunarNumber
	lunar.Lunar = result.Lunar
	lunar.EightWords = result.EightWords
	lunar.GodDirection = result.GodDirection
	lunar.GoodFor = result.GoodFor
	lunar.BadFor = result.BadFor
	return &lunar, nil
}
