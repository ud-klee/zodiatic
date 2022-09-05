package wasmbindings

// See https://github.com/ud-klee/cw-zodiatic/blob/main/packages/bindings/src/types.rs
type Lunar struct {
	Date         string   `json:"date"`
	LunarNumber  []uint64 `json:"lunar_number"`
	Lunar        string   `json:"lunar"`
	EightWords   string   `json:"eight_words"`
	GodDirection string   `json:"god_direction"`
	GoodFor      string   `json:"good_for"`
	BadFor       string   `json:"bad_for"`
}
