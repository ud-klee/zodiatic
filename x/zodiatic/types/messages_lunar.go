package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const (
	TypeMsgCreateLunar = "create_lunar"
	TypeMsgUpdateLunar = "update_lunar"
	TypeMsgDeleteLunar = "delete_lunar"
)

var _ sdk.Msg = &MsgCreateLunar{}

func NewMsgCreateLunar(
	creator string,
	yyyymmdd uint64,
	date string,
	lunarNumber []uint64,
	lunar string,
	eightWords string,
	godDirection string,
	goodFor string,
	badFor string,

) *MsgCreateLunar {
	return &MsgCreateLunar{
		Creator:      creator,
		Yyyymmdd:     yyyymmdd,
		Date:         date,
		LunarNumber:  lunarNumber,
		Lunar:        lunar,
		EightWords:   eightWords,
		GodDirection: godDirection,
		GoodFor:      goodFor,
		BadFor:       badFor,
	}
}

func (msg *MsgCreateLunar) Route() string {
	return RouterKey
}

func (msg *MsgCreateLunar) Type() string {
	return TypeMsgCreateLunar
}

func (msg *MsgCreateLunar) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgCreateLunar) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgCreateLunar) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}

var _ sdk.Msg = &MsgUpdateLunar{}

func NewMsgUpdateLunar(
	creator string,
	yyyymmdd uint64,
	date string,
	lunarNumber []uint64,
	lunar string,
	eightWords string,
	godDirection string,
	goodFor string,
	badFor string,

) *MsgUpdateLunar {
	return &MsgUpdateLunar{
		Creator:      creator,
		Yyyymmdd:     yyyymmdd,
		Date:         date,
		LunarNumber:  lunarNumber,
		Lunar:        lunar,
		EightWords:   eightWords,
		GodDirection: godDirection,
		GoodFor:      goodFor,
		BadFor:       badFor,
	}
}

func (msg *MsgUpdateLunar) Route() string {
	return RouterKey
}

func (msg *MsgUpdateLunar) Type() string {
	return TypeMsgUpdateLunar
}

func (msg *MsgUpdateLunar) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgUpdateLunar) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgUpdateLunar) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}

var _ sdk.Msg = &MsgDeleteLunar{}

func NewMsgDeleteLunar(
	creator string,
	yyyymmdd uint64,

) *MsgDeleteLunar {
	return &MsgDeleteLunar{
		Creator:  creator,
		Yyyymmdd: yyyymmdd,
	}
}
func (msg *MsgDeleteLunar) Route() string {
	return RouterKey
}

func (msg *MsgDeleteLunar) Type() string {
	return TypeMsgDeleteLunar
}

func (msg *MsgDeleteLunar) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgDeleteLunar) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgDeleteLunar) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
