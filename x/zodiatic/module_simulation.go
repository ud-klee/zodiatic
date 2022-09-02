package zodiatic

import (
	"math/rand"

	"github.com/cosmos/cosmos-sdk/baseapp"
	simappparams "github.com/cosmos/cosmos-sdk/simapp/params"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/module"
	simtypes "github.com/cosmos/cosmos-sdk/types/simulation"
	"github.com/cosmos/cosmos-sdk/x/simulation"
	"github.com/zodiatic/zodiatic/testutil/sample"
	zodiaticsimulation "github.com/zodiatic/zodiatic/x/zodiatic/simulation"
	"github.com/zodiatic/zodiatic/x/zodiatic/types"
)

// avoid unused import issue
var (
	_ = sample.AccAddress
	_ = zodiaticsimulation.FindAccount
	_ = simappparams.StakePerAccount
	_ = simulation.MsgEntryKind
	_ = baseapp.Paramspace
)

const (
	opWeightMsgCreateLunar = "op_weight_msg_lunar"
	// TODO: Determine the simulation weight value
	defaultWeightMsgCreateLunar int = 100

	opWeightMsgUpdateLunar = "op_weight_msg_lunar"
	// TODO: Determine the simulation weight value
	defaultWeightMsgUpdateLunar int = 100

	opWeightMsgDeleteLunar = "op_weight_msg_lunar"
	// TODO: Determine the simulation weight value
	defaultWeightMsgDeleteLunar int = 100

	// this line is used by starport scaffolding # simapp/module/const
)

// GenerateGenesisState creates a randomized GenState of the module
func (AppModule) GenerateGenesisState(simState *module.SimulationState) {
	accs := make([]string, len(simState.Accounts))
	for i, acc := range simState.Accounts {
		accs[i] = acc.Address.String()
	}
	zodiaticGenesis := types.GenesisState{
		Params: types.DefaultParams(),
		LunarList: []types.Lunar{
			{
				Creator:  sample.AccAddress(),
				Yyyymmdd: 0,
			},
			{
				Creator:  sample.AccAddress(),
				Yyyymmdd: 1,
			},
		},
		// this line is used by starport scaffolding # simapp/module/genesisState
	}
	simState.GenState[types.ModuleName] = simState.Cdc.MustMarshalJSON(&zodiaticGenesis)
}

// ProposalContents doesn't return any content functions for governance proposals
func (AppModule) ProposalContents(_ module.SimulationState) []simtypes.WeightedProposalContent {
	return nil
}

// RandomizedParams creates randomized  param changes for the simulator
func (am AppModule) RandomizedParams(_ *rand.Rand) []simtypes.ParamChange {

	return []simtypes.ParamChange{}
}

// RegisterStoreDecoder registers a decoder
func (am AppModule) RegisterStoreDecoder(_ sdk.StoreDecoderRegistry) {}

// WeightedOperations returns the all the gov module operations with their respective weights.
func (am AppModule) WeightedOperations(simState module.SimulationState) []simtypes.WeightedOperation {
	operations := make([]simtypes.WeightedOperation, 0)

	var weightMsgCreateLunar int
	simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsgCreateLunar, &weightMsgCreateLunar, nil,
		func(_ *rand.Rand) {
			weightMsgCreateLunar = defaultWeightMsgCreateLunar
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgCreateLunar,
		zodiaticsimulation.SimulateMsgCreateLunar(am.accountKeeper, am.bankKeeper, am.keeper),
	))

	var weightMsgUpdateLunar int
	simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsgUpdateLunar, &weightMsgUpdateLunar, nil,
		func(_ *rand.Rand) {
			weightMsgUpdateLunar = defaultWeightMsgUpdateLunar
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgUpdateLunar,
		zodiaticsimulation.SimulateMsgUpdateLunar(am.accountKeeper, am.bankKeeper, am.keeper),
	))

	var weightMsgDeleteLunar int
	simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsgDeleteLunar, &weightMsgDeleteLunar, nil,
		func(_ *rand.Rand) {
			weightMsgDeleteLunar = defaultWeightMsgDeleteLunar
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgDeleteLunar,
		zodiaticsimulation.SimulateMsgDeleteLunar(am.accountKeeper, am.bankKeeper, am.keeper),
	))

	// this line is used by starport scaffolding # simapp/module/operation

	return operations
}
