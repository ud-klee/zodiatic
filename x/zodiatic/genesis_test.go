package zodiatic_test

import (
	"testing"

	"github.com/stretchr/testify/require"
	keepertest "github.com/zodiatic/zodiatic/testutil/keeper"
	"github.com/zodiatic/zodiatic/testutil/nullify"
	"github.com/zodiatic/zodiatic/x/zodiatic"
	"github.com/zodiatic/zodiatic/x/zodiatic/types"
)

func TestGenesis(t *testing.T) {
	genesisState := types.GenesisState{
		Params: types.DefaultParams(),

		LunarList: []types.Lunar{
			{
				Yyyymmdd: 0,
			},
			{
				Yyyymmdd: 1,
			},
		},
		// this line is used by starport scaffolding # genesis/test/state
	}

	k, ctx := keepertest.ZodiaticKeeper(t)
	zodiatic.InitGenesis(ctx, *k, genesisState)
	got := zodiatic.ExportGenesis(ctx, *k)
	require.NotNil(t, got)

	nullify.Fill(&genesisState)
	nullify.Fill(got)

	require.ElementsMatch(t, genesisState.LunarList, got.LunarList)
	// this line is used by starport scaffolding # genesis/test/assert
}
