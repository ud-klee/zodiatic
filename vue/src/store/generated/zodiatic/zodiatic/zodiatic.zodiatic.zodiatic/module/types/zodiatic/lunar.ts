/* eslint-disable */
import * as Long from "long";
import { util, configure, Writer, Reader } from "protobufjs/minimal";

export const protobufPackage = "zodiatic.zodiatic.zodiatic";

export interface Lunar {
  yyyymmdd: number;
  date: string;
  lunarNumber: number[];
  lunar: string;
  eightWords: string;
  godDirection: string;
  goodFor: string;
  badFor: string;
  creator: string;
}

const baseLunar: object = {
  yyyymmdd: 0,
  date: "",
  lunarNumber: 0,
  lunar: "",
  eightWords: "",
  godDirection: "",
  goodFor: "",
  badFor: "",
  creator: "",
};

export const Lunar = {
  encode(message: Lunar, writer: Writer = Writer.create()): Writer {
    if (message.yyyymmdd !== 0) {
      writer.uint32(8).uint64(message.yyyymmdd);
    }
    if (message.date !== "") {
      writer.uint32(18).string(message.date);
    }
    writer.uint32(26).fork();
    for (const v of message.lunarNumber) {
      writer.uint64(v);
    }
    writer.ldelim();
    if (message.lunar !== "") {
      writer.uint32(34).string(message.lunar);
    }
    if (message.eightWords !== "") {
      writer.uint32(42).string(message.eightWords);
    }
    if (message.godDirection !== "") {
      writer.uint32(50).string(message.godDirection);
    }
    if (message.goodFor !== "") {
      writer.uint32(58).string(message.goodFor);
    }
    if (message.badFor !== "") {
      writer.uint32(66).string(message.badFor);
    }
    if (message.creator !== "") {
      writer.uint32(74).string(message.creator);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Lunar {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseLunar } as Lunar;
    message.lunarNumber = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.yyyymmdd = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.date = reader.string();
          break;
        case 3:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.lunarNumber.push(longToNumber(reader.uint64() as Long));
            }
          } else {
            message.lunarNumber.push(longToNumber(reader.uint64() as Long));
          }
          break;
        case 4:
          message.lunar = reader.string();
          break;
        case 5:
          message.eightWords = reader.string();
          break;
        case 6:
          message.godDirection = reader.string();
          break;
        case 7:
          message.goodFor = reader.string();
          break;
        case 8:
          message.badFor = reader.string();
          break;
        case 9:
          message.creator = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Lunar {
    const message = { ...baseLunar } as Lunar;
    message.lunarNumber = [];
    if (object.yyyymmdd !== undefined && object.yyyymmdd !== null) {
      message.yyyymmdd = Number(object.yyyymmdd);
    } else {
      message.yyyymmdd = 0;
    }
    if (object.date !== undefined && object.date !== null) {
      message.date = String(object.date);
    } else {
      message.date = "";
    }
    if (object.lunarNumber !== undefined && object.lunarNumber !== null) {
      for (const e of object.lunarNumber) {
        message.lunarNumber.push(Number(e));
      }
    }
    if (object.lunar !== undefined && object.lunar !== null) {
      message.lunar = String(object.lunar);
    } else {
      message.lunar = "";
    }
    if (object.eightWords !== undefined && object.eightWords !== null) {
      message.eightWords = String(object.eightWords);
    } else {
      message.eightWords = "";
    }
    if (object.godDirection !== undefined && object.godDirection !== null) {
      message.godDirection = String(object.godDirection);
    } else {
      message.godDirection = "";
    }
    if (object.goodFor !== undefined && object.goodFor !== null) {
      message.goodFor = String(object.goodFor);
    } else {
      message.goodFor = "";
    }
    if (object.badFor !== undefined && object.badFor !== null) {
      message.badFor = String(object.badFor);
    } else {
      message.badFor = "";
    }
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    return message;
  },

  toJSON(message: Lunar): unknown {
    const obj: any = {};
    message.yyyymmdd !== undefined && (obj.yyyymmdd = message.yyyymmdd);
    message.date !== undefined && (obj.date = message.date);
    if (message.lunarNumber) {
      obj.lunarNumber = message.lunarNumber.map((e) => e);
    } else {
      obj.lunarNumber = [];
    }
    message.lunar !== undefined && (obj.lunar = message.lunar);
    message.eightWords !== undefined && (obj.eightWords = message.eightWords);
    message.godDirection !== undefined &&
      (obj.godDirection = message.godDirection);
    message.goodFor !== undefined && (obj.goodFor = message.goodFor);
    message.badFor !== undefined && (obj.badFor = message.badFor);
    message.creator !== undefined && (obj.creator = message.creator);
    return obj;
  },

  fromPartial(object: DeepPartial<Lunar>): Lunar {
    const message = { ...baseLunar } as Lunar;
    message.lunarNumber = [];
    if (object.yyyymmdd !== undefined && object.yyyymmdd !== null) {
      message.yyyymmdd = object.yyyymmdd;
    } else {
      message.yyyymmdd = 0;
    }
    if (object.date !== undefined && object.date !== null) {
      message.date = object.date;
    } else {
      message.date = "";
    }
    if (object.lunarNumber !== undefined && object.lunarNumber !== null) {
      for (const e of object.lunarNumber) {
        message.lunarNumber.push(e);
      }
    }
    if (object.lunar !== undefined && object.lunar !== null) {
      message.lunar = object.lunar;
    } else {
      message.lunar = "";
    }
    if (object.eightWords !== undefined && object.eightWords !== null) {
      message.eightWords = object.eightWords;
    } else {
      message.eightWords = "";
    }
    if (object.godDirection !== undefined && object.godDirection !== null) {
      message.godDirection = object.godDirection;
    } else {
      message.godDirection = "";
    }
    if (object.goodFor !== undefined && object.goodFor !== null) {
      message.goodFor = object.goodFor;
    } else {
      message.goodFor = "";
    }
    if (object.badFor !== undefined && object.badFor !== null) {
      message.badFor = object.badFor;
    } else {
      message.badFor = "";
    }
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    return message;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  throw "Unable to locate global object";
})();

type Builtin = Date | Function | Uint8Array | string | number | undefined;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
