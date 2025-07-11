/* eslint-disable */
import { BinaryReader, BinaryWriter } from "../../../../../binary";
import { DeepPartial, Exact, isSet, bytesFromBase64, base64FromBytes } from "../../../../../helpers";
export const protobufPackage = "cosmos.store.internal.kv.v1beta1";
/** Pairs defines a repeated slice of Pair objects. */
export interface Pairs {
  pairs: Pair[];
}
/** Pair defines a key/value bytes tuple. */
export interface Pair {
  key: Uint8Array;
  value: Uint8Array;
}
function createBasePairs(): Pairs {
  return {
    pairs: [],
  };
}
export const Pairs = {
  typeUrl: "/cosmos.store.internal.kv.v1beta1.Pairs",
  encode(message: Pairs, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.pairs) {
      Pair.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): Pairs {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePairs();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pairs.push(Pair.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Pairs {
    const obj = createBasePairs();
    if (Array.isArray(object?.pairs)) obj.pairs = object.pairs.map((e: any) => Pair.fromJSON(e));
    return obj;
  },
  toJSON(message: Pairs): unknown {
    const obj: any = {};
    if (message.pairs) {
      obj.pairs = message.pairs.map((e) => (e ? Pair.toJSON(e) : undefined));
    } else {
      obj.pairs = [];
    }
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<Pairs>, I>>(object: I): Pairs {
    const message = createBasePairs();
    message.pairs = object.pairs?.map((e) => Pair.fromPartial(e)) || [];
    return message;
  },
};
function createBasePair(): Pair {
  return {
    key: new Uint8Array(),
    value: new Uint8Array(),
  };
}
export const Pair = {
  typeUrl: "/cosmos.store.internal.kv.v1beta1.Pair",
  encode(message: Pair, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.key.length !== 0) {
      writer.uint32(10).bytes(message.key);
    }
    if (message.value.length !== 0) {
      writer.uint32(18).bytes(message.value);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): Pair {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePair();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.bytes();
          break;
        case 2:
          message.value = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Pair {
    const obj = createBasePair();
    if (isSet(object.key)) obj.key = bytesFromBase64(object.key);
    if (isSet(object.value)) obj.value = bytesFromBase64(object.value);
    return obj;
  },
  toJSON(message: Pair): unknown {
    const obj: any = {};
    message.key !== undefined &&
      (obj.key = base64FromBytes(message.key !== undefined ? message.key : new Uint8Array()));
    message.value !== undefined &&
      (obj.value = base64FromBytes(message.value !== undefined ? message.value : new Uint8Array()));
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<Pair>, I>>(object: I): Pair {
    const message = createBasePair();
    message.key = object.key ?? new Uint8Array();
    message.value = object.value ?? new Uint8Array();
    return message;
  },
};
