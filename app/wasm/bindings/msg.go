package wasmbindings

// See https://github.com/ud-klee/cw-zodiatic/blob/main/packages/bindings/src/msg.rs
type ZodiaticMsg struct {
	CreateLunar *CreateLunar `json:"create_lunar,omitempty"`
}

type CreateLunar struct {
	Creator  string `json:"creator"`
	Yyyymmdd uint64 `json:"yyyymmdd"`
	Lunar    Lunar  `json:"lunar"`
}
