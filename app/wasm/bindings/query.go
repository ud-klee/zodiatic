package wasmbindings

// ZodiaticQuery contains Zodiatic custom queries.
// See https://github.com/ud-klee/cw-zodiatic/blob/main/packages/bindings/src/query.rs
type ZodiaticQuery struct {
	Lunar *LunarQuery `json:"lunar,omitempty"`
}

type LunarQuery struct {
	Yyyymmdd uint64 `json:"yyyymmdd"`
}

type LunarResponse struct {
	Lunar Lunar `json:"lunar"`
}
