package keeper_test

import (
	"strconv"
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/stretchr/testify/require"

	keepertest "github.com/zodiatic/zodiatic/testutil/keeper"
	"github.com/zodiatic/zodiatic/x/zodiatic/keeper"
	"github.com/zodiatic/zodiatic/x/zodiatic/types"
)

// Prevent strconv unused error
var _ = strconv.IntSize

func TestLunarMsgServerCreate(t *testing.T) {
	k, ctx := keepertest.ZodiaticKeeper(t)
	srv := keeper.NewMsgServerImpl(*k)
	wctx := sdk.WrapSDKContext(ctx)
	creator := "A"
	for i := 0; i < 5; i++ {
		expected := &types.MsgCreateLunar{Creator: creator,
			Yyyymmdd: uint64(i),
		}
		_, err := srv.CreateLunar(wctx, expected)
		require.NoError(t, err)
		rst, found := k.GetLunar(ctx,
			expected.Yyyymmdd,
		)
		require.True(t, found)
		require.Equal(t, expected.Creator, rst.Creator)
	}
}

func TestLunarMsgServerUpdate(t *testing.T) {
	creator := "A"

	for _, tc := range []struct {
		desc    string
		request *types.MsgUpdateLunar
		err     error
	}{
		{
			desc: "Completed",
			request: &types.MsgUpdateLunar{Creator: creator,
				Yyyymmdd: 0,
			},
		},
		{
			desc: "Unauthorized",
			request: &types.MsgUpdateLunar{Creator: "B",
				Yyyymmdd: 0,
			},
			err: sdkerrors.ErrUnauthorized,
		},
		{
			desc: "KeyNotFound",
			request: &types.MsgUpdateLunar{Creator: creator,
				Yyyymmdd: 100000,
			},
			err: sdkerrors.ErrKeyNotFound,
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			k, ctx := keepertest.ZodiaticKeeper(t)
			srv := keeper.NewMsgServerImpl(*k)
			wctx := sdk.WrapSDKContext(ctx)
			expected := &types.MsgCreateLunar{Creator: creator,
				Yyyymmdd: 0,
			}
			_, err := srv.CreateLunar(wctx, expected)
			require.NoError(t, err)

			_, err = srv.UpdateLunar(wctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
				rst, found := k.GetLunar(ctx,
					expected.Yyyymmdd,
				)
				require.True(t, found)
				require.Equal(t, expected.Creator, rst.Creator)
			}
		})
	}
}

func TestLunarMsgServerDelete(t *testing.T) {
	creator := "A"

	for _, tc := range []struct {
		desc    string
		request *types.MsgDeleteLunar
		err     error
	}{
		{
			desc: "Completed",
			request: &types.MsgDeleteLunar{Creator: creator,
				Yyyymmdd: 0,
			},
		},
		{
			desc: "Unauthorized",
			request: &types.MsgDeleteLunar{Creator: "B",
				Yyyymmdd: 0,
			},
			err: sdkerrors.ErrUnauthorized,
		},
		{
			desc: "KeyNotFound",
			request: &types.MsgDeleteLunar{Creator: creator,
				Yyyymmdd: 100000,
			},
			err: sdkerrors.ErrKeyNotFound,
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			k, ctx := keepertest.ZodiaticKeeper(t)
			srv := keeper.NewMsgServerImpl(*k)
			wctx := sdk.WrapSDKContext(ctx)

			_, err := srv.CreateLunar(wctx, &types.MsgCreateLunar{Creator: creator,
				Yyyymmdd: 0,
			})
			require.NoError(t, err)
			_, err = srv.DeleteLunar(wctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
				_, found := k.GetLunar(ctx,
					tc.request.Yyyymmdd,
				)
				require.False(t, found)
			}
		})
	}
}
