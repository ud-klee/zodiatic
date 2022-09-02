package types

import (
	"fmt"
)

// DefaultIndex is the default capability global index
const DefaultIndex uint64 = 1

// DefaultGenesis returns the default Capability genesis state
func DefaultGenesis() *GenesisState {
	return &GenesisState{
		LunarList: []Lunar{},
		// this line is used by starport scaffolding # genesis/types/default
		Params: DefaultParams(),
	}
}

// Validate performs basic genesis state validation returning an error upon any
// failure.
func (gs GenesisState) Validate() error {
	// Check for duplicated index in lunar
	lunarIndexMap := make(map[string]struct{})

	for _, elem := range gs.LunarList {
		index := string(LunarKey(elem.Yyyymmdd))
		if _, ok := lunarIndexMap[index]; ok {
			return fmt.Errorf("duplicated index for lunar")
		}
		lunarIndexMap[index] = struct{}{}
	}
	// this line is used by starport scaffolding # genesis/types/validate

	return gs.Params.Validate()
}
