package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/zodiatic/zodiatic/x/zodiatic/types"
)

func (k msgServer) CreateLunar(goCtx context.Context, msg *types.MsgCreateLunar) (*types.MsgCreateLunarResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// Check if the value already exists
	_, isFound := k.GetLunar(
		ctx,
		msg.Yyyymmdd,
	)
	if isFound {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "index already set")
	}

	var lunar = types.Lunar{
		Creator:      msg.Creator,
		Yyyymmdd:     msg.Yyyymmdd,
		Date:         msg.Date,
		LunarNumber:  msg.LunarNumber,
		Lunar:        msg.Lunar,
		EightWords:   msg.EightWords,
		GodDirection: msg.GodDirection,
		GoodFor:      msg.GoodFor,
		BadFor:       msg.BadFor,
	}

	k.SetLunar(
		ctx,
		lunar,
	)
	return &types.MsgCreateLunarResponse{}, nil
}

func (k msgServer) UpdateLunar(goCtx context.Context, msg *types.MsgUpdateLunar) (*types.MsgUpdateLunarResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// Check if the value exists
	valFound, isFound := k.GetLunar(
		ctx,
		msg.Yyyymmdd,
	)
	if !isFound {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, "index not set")
	}

	// Checks if the the msg creator is the same as the current owner
	if msg.Creator != valFound.Creator {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	var lunar = types.Lunar{
		Creator:      msg.Creator,
		Yyyymmdd:     msg.Yyyymmdd,
		Date:         msg.Date,
		LunarNumber:  msg.LunarNumber,
		Lunar:        msg.Lunar,
		EightWords:   msg.EightWords,
		GodDirection: msg.GodDirection,
		GoodFor:      msg.GoodFor,
		BadFor:       msg.BadFor,
	}

	k.SetLunar(ctx, lunar)

	return &types.MsgUpdateLunarResponse{}, nil
}

func (k msgServer) DeleteLunar(goCtx context.Context, msg *types.MsgDeleteLunar) (*types.MsgDeleteLunarResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// Check if the value exists
	valFound, isFound := k.GetLunar(
		ctx,
		msg.Yyyymmdd,
	)
	if !isFound {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, "index not set")
	}

	// Checks if the the msg creator is the same as the current owner
	if msg.Creator != valFound.Creator {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	k.RemoveLunar(
		ctx,
		msg.Yyyymmdd,
	)

	return &types.MsgDeleteLunarResponse{}, nil
}
