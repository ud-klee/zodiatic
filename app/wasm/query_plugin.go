package wasm

import (
	"encoding/json"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"

	wasmvmtypes "github.com/CosmWasm/wasmvm/types"

	wasmbindings "github.com/zodiatic/zodiatic/app/wasm/bindings"
)

func CustomQuerier(qp *QueryPlugin) func(ctx sdk.Context, request json.RawMessage) ([]byte, error) {
	return func(ctx sdk.Context, request json.RawMessage) ([]byte, error) {
		var contractQuery wasmbindings.ZodiaticQuery
		if err := json.Unmarshal(request, &contractQuery); err != nil {
			return nil, sdkerrors.Wrap(err, "zodiatic query")
		}

		if contractQuery.Lunar != nil {
			lunar, err := qp.GetLunar(ctx, contractQuery.Lunar.Yyyymmdd)
			if err != nil {
				return nil, sdkerrors.Wrap(err, "zodiatic lunar query")
			}

			res := wasmbindings.LunarResponse{Lunar: *lunar}
			bz, err := json.Marshal(res)
			if err != nil {
				return nil, sdkerrors.Wrap(err, "zodiatic lunar query response")
			}
			return bz, nil
		}

		return nil, wasmvmtypes.UnsupportedRequest{Kind: "unknown osmosis query variant"}
	}
}
