/* eslint-disable */
import { Reader, util, configure, Writer } from "protobufjs/minimal";
import * as Long from "long";

export const protobufPackage = "zodiatic.zodiatic.zodiatic";

export interface MsgCreateLunar {
  creator: string;
  yyyymmdd: number;
  date: string;
  lunarNumber: number[];
  lunar: string;
  eightWords: string;
  godDirection: string;
  goodFor: string;
  badFor: string;
}

export interface MsgCreateLunarResponse {}

export interface MsgUpdateLunar {
  creator: string;
  yyyymmdd: number;
  date: string;
  lunarNumber: number[];
  lunar: string;
  eightWords: string;
  godDirection: string;
  goodFor: string;
  badFor: string;
}

export interface MsgUpdateLunarResponse {}

export interface MsgDeleteLunar {
  creator: string;
  yyyymmdd: number;
}

export interface MsgDeleteLunarResponse {}

const baseMsgCreateLunar: object = {
  creator: "",
  yyyymmdd: 0,
  date: "",
  lunarNumber: 0,
  lunar: "",
  eightWords: "",
  godDirection: "",
  goodFor: "",
  badFor: "",
};

export const MsgCreateLunar = {
  encode(message: MsgCreateLunar, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.yyyymmdd !== 0) {
      writer.uint32(16).uint64(message.yyyymmdd);
    }
    if (message.date !== "") {
      writer.uint32(26).string(message.date);
    }
    writer.uint32(34).fork();
    for (const v of message.lunarNumber) {
      writer.uint64(v);
    }
    writer.ldelim();
    if (message.lunar !== "") {
      writer.uint32(42).string(message.lunar);
    }
    if (message.eightWords !== "") {
      writer.uint32(50).string(message.eightWords);
    }
    if (message.godDirection !== "") {
      writer.uint32(58).string(message.godDirection);
    }
    if (message.goodFor !== "") {
      writer.uint32(66).string(message.goodFor);
    }
    if (message.badFor !== "") {
      writer.uint32(74).string(message.badFor);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgCreateLunar {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgCreateLunar } as MsgCreateLunar;
    message.lunarNumber = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.yyyymmdd = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.date = reader.string();
          break;
        case 4:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.lunarNumber.push(longToNumber(reader.uint64() as Long));
            }
          } else {
            message.lunarNumber.push(longToNumber(reader.uint64() as Long));
          }
          break;
        case 5:
          message.lunar = reader.string();
          break;
        case 6:
          message.eightWords = reader.string();
          break;
        case 7:
          message.godDirection = reader.string();
          break;
        case 8:
          message.goodFor = reader.string();
          break;
        case 9:
          message.badFor = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateLunar {
    const message = { ...baseMsgCreateLunar } as MsgCreateLunar;
    message.lunarNumber = [];
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
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
    return message;
  },

  toJSON(message: MsgCreateLunar): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
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
    return obj;
  },

  fromPartial(object: DeepPartial<MsgCreateLunar>): MsgCreateLunar {
    const message = { ...baseMsgCreateLunar } as MsgCreateLunar;
    message.lunarNumber = [];
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
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
    return message;
  },
};

const baseMsgCreateLunarResponse: object = {};

export const MsgCreateLunarResponse = {
  encode(_: MsgCreateLunarResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgCreateLunarResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgCreateLunarResponse } as MsgCreateLunarResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgCreateLunarResponse {
    const message = { ...baseMsgCreateLunarResponse } as MsgCreateLunarResponse;
    return message;
  },

  toJSON(_: MsgCreateLunarResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<MsgCreateLunarResponse>): MsgCreateLunarResponse {
    const message = { ...baseMsgCreateLunarResponse } as MsgCreateLunarResponse;
    return message;
  },
};

const baseMsgUpdateLunar: object = {
  creator: "",
  yyyymmdd: 0,
  date: "",
  lunarNumber: 0,
  lunar: "",
  eightWords: "",
  godDirection: "",
  goodFor: "",
  badFor: "",
};

export const MsgUpdateLunar = {
  encode(message: MsgUpdateLunar, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.yyyymmdd !== 0) {
      writer.uint32(16).uint64(message.yyyymmdd);
    }
    if (message.date !== "") {
      writer.uint32(26).string(message.date);
    }
    writer.uint32(34).fork();
    for (const v of message.lunarNumber) {
      writer.uint64(v);
    }
    writer.ldelim();
    if (message.lunar !== "") {
      writer.uint32(42).string(message.lunar);
    }
    if (message.eightWords !== "") {
      writer.uint32(50).string(message.eightWords);
    }
    if (message.godDirection !== "") {
      writer.uint32(58).string(message.godDirection);
    }
    if (message.goodFor !== "") {
      writer.uint32(66).string(message.goodFor);
    }
    if (message.badFor !== "") {
      writer.uint32(74).string(message.badFor);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgUpdateLunar {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgUpdateLunar } as MsgUpdateLunar;
    message.lunarNumber = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.yyyymmdd = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.date = reader.string();
          break;
        case 4:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.lunarNumber.push(longToNumber(reader.uint64() as Long));
            }
          } else {
            message.lunarNumber.push(longToNumber(reader.uint64() as Long));
          }
          break;
        case 5:
          message.lunar = reader.string();
          break;
        case 6:
          message.eightWords = reader.string();
          break;
        case 7:
          message.godDirection = reader.string();
          break;
        case 8:
          message.goodFor = reader.string();
          break;
        case 9:
          message.badFor = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateLunar {
    const message = { ...baseMsgUpdateLunar } as MsgUpdateLunar;
    message.lunarNumber = [];
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
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
    return message;
  },

  toJSON(message: MsgUpdateLunar): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
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
    return obj;
  },

  fromPartial(object: DeepPartial<MsgUpdateLunar>): MsgUpdateLunar {
    const message = { ...baseMsgUpdateLunar } as MsgUpdateLunar;
    message.lunarNumber = [];
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
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
    return message;
  },
};

const baseMsgUpdateLunarResponse: object = {};

export const MsgUpdateLunarResponse = {
  encode(_: MsgUpdateLunarResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgUpdateLunarResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgUpdateLunarResponse } as MsgUpdateLunarResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgUpdateLunarResponse {
    const message = { ...baseMsgUpdateLunarResponse } as MsgUpdateLunarResponse;
    return message;
  },

  toJSON(_: MsgUpdateLunarResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<MsgUpdateLunarResponse>): MsgUpdateLunarResponse {
    const message = { ...baseMsgUpdateLunarResponse } as MsgUpdateLunarResponse;
    return message;
  },
};

const baseMsgDeleteLunar: object = { creator: "", yyyymmdd: 0 };

export const MsgDeleteLunar = {
  encode(message: MsgDeleteLunar, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.yyyymmdd !== 0) {
      writer.uint32(16).uint64(message.yyyymmdd);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgDeleteLunar {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgDeleteLunar } as MsgDeleteLunar;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.yyyymmdd = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgDeleteLunar {
    const message = { ...baseMsgDeleteLunar } as MsgDeleteLunar;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.yyyymmdd !== undefined && object.yyyymmdd !== null) {
      message.yyyymmdd = Number(object.yyyymmdd);
    } else {
      message.yyyymmdd = 0;
    }
    return message;
  },

  toJSON(message: MsgDeleteLunar): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.yyyymmdd !== undefined && (obj.yyyymmdd = message.yyyymmdd);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgDeleteLunar>): MsgDeleteLunar {
    const message = { ...baseMsgDeleteLunar } as MsgDeleteLunar;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.yyyymmdd !== undefined && object.yyyymmdd !== null) {
      message.yyyymmdd = object.yyyymmdd;
    } else {
      message.yyyymmdd = 0;
    }
    return message;
  },
};

const baseMsgDeleteLunarResponse: object = {};

export const MsgDeleteLunarResponse = {
  encode(_: MsgDeleteLunarResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgDeleteLunarResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgDeleteLunarResponse } as MsgDeleteLunarResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgDeleteLunarResponse {
    const message = { ...baseMsgDeleteLunarResponse } as MsgDeleteLunarResponse;
    return message;
  },

  toJSON(_: MsgDeleteLunarResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<MsgDeleteLunarResponse>): MsgDeleteLunarResponse {
    const message = { ...baseMsgDeleteLunarResponse } as MsgDeleteLunarResponse;
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  CreateLunar(request: MsgCreateLunar): Promise<MsgCreateLunarResponse>;
  UpdateLunar(request: MsgUpdateLunar): Promise<MsgUpdateLunarResponse>;
  /** this line is used by starport scaffolding # proto/tx/rpc */
  DeleteLunar(request: MsgDeleteLunar): Promise<MsgDeleteLunarResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }
  CreateLunar(request: MsgCreateLunar): Promise<MsgCreateLunarResponse> {
    const data = MsgCreateLunar.encode(request).finish();
    const promise = this.rpc.request(
      "zodiatic.zodiatic.zodiatic.Msg",
      "CreateLunar",
      data
    );
    return promise.then((data) =>
      MsgCreateLunarResponse.decode(new Reader(data))
    );
  }

  UpdateLunar(request: MsgUpdateLunar): Promise<MsgUpdateLunarResponse> {
    const data = MsgUpdateLunar.encode(request).finish();
    const promise = this.rpc.request(
      "zodiatic.zodiatic.zodiatic.Msg",
      "UpdateLunar",
      data
    );
    return promise.then((data) =>
      MsgUpdateLunarResponse.decode(new Reader(data))
    );
  }

  DeleteLunar(request: MsgDeleteLunar): Promise<MsgDeleteLunarResponse> {
    const data = MsgDeleteLunar.encode(request).finish();
    const promise = this.rpc.request(
      "zodiatic.zodiatic.zodiatic.Msg",
      "DeleteLunar",
      data
    );
    return promise.then((data) =>
      MsgDeleteLunarResponse.decode(new Reader(data))
    );
  }
}

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array
  ): Promise<Uint8Array>;
}

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
