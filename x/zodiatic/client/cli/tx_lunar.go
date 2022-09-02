package cli

import (
	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/spf13/cast"
	"github.com/spf13/cobra"
	"github.com/zodiatic/zodiatic/x/zodiatic/types"
	"strings"
)

func CmdCreateLunar() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "create-lunar [yyyymmdd] [date] [lunar-number] [lunar] [eight-words] [god-direction] [good-for] [bad-for]",
		Short: "Create a new lunar",
		Args:  cobra.ExactArgs(8),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			// Get indexes
			indexYyyymmdd, err := cast.ToUint64E(args[0])
			if err != nil {
				return err
			}

			// Get value arguments
			argDate := args[1]
			argCastLunarNumber := strings.Split(args[2], listSeparator)
			argLunarNumber := make([]uint64, len(argCastLunarNumber))
			for i, arg := range argCastLunarNumber {
				value, err := cast.ToUint64E(arg)
				if err != nil {
					return err
				}
				argLunarNumber[i] = value
			}
			argLunar := args[3]
			argEightWords := args[4]
			argGodDirection := args[5]
			argGoodFor := args[6]
			argBadFor := args[7]

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgCreateLunar(
				clientCtx.GetFromAddress().String(),
				indexYyyymmdd,
				argDate,
				argLunarNumber,
				argLunar,
				argEightWords,
				argGodDirection,
				argGoodFor,
				argBadFor,
			)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}

func CmdUpdateLunar() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "update-lunar [yyyymmdd] [date] [lunar-number] [lunar] [eight-words] [god-direction] [good-for] [bad-for]",
		Short: "Update a lunar",
		Args:  cobra.ExactArgs(8),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			// Get indexes
			indexYyyymmdd, err := cast.ToUint64E(args[0])
			if err != nil {
				return err
			}

			// Get value arguments
			argDate := args[1]
			argCastLunarNumber := strings.Split(args[2], listSeparator)
			argLunarNumber := make([]uint64, len(argCastLunarNumber))
			for i, arg := range argCastLunarNumber {
				value, err := cast.ToUint64E(arg)
				if err != nil {
					return err
				}
				argLunarNumber[i] = value
			}
			argLunar := args[3]
			argEightWords := args[4]
			argGodDirection := args[5]
			argGoodFor := args[6]
			argBadFor := args[7]

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgUpdateLunar(
				clientCtx.GetFromAddress().String(),
				indexYyyymmdd,
				argDate,
				argLunarNumber,
				argLunar,
				argEightWords,
				argGodDirection,
				argGoodFor,
				argBadFor,
			)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}

func CmdDeleteLunar() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "delete-lunar [yyyymmdd]",
		Short: "Delete a lunar",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			indexYyyymmdd, err := cast.ToUint64E(args[0])
			if err != nil {
				return err
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgDeleteLunar(
				clientCtx.GetFromAddress().String(),
				indexYyyymmdd,
			)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}
