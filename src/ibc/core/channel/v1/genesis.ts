/* eslint-disable */
import { IdentifiedChannel, PacketState, Params } from "./channel";
import { BinaryReader, BinaryWriter } from "../../../../binary";
import { isSet, DeepPartial, Exact } from "../../../../helpers";
export const protobufPackage = "ibc.core.channel.v1";
/** GenesisState defines the ibc channel submodule's genesis state. */
export interface GenesisState {
  channels: IdentifiedChannel[];
  acknowledgements: PacketState[];
  commitments: PacketState[];
  receipts: PacketState[];
  sendSequences: PacketSequence[];
  recvSequences: PacketSequence[];
  ackSequences: PacketSequence[];
  /** the sequence for the next generated channel identifier */
  nextChannelSequence: bigint;
  params: Params;
}
/**
 * PacketSequence defines the genesis type necessary to retrieve and store
 * next send and receive sequences.
 */
export interface PacketSequence {
  portId: string;
  channelId: string;
  sequence: bigint;
}
function createBaseGenesisState(): GenesisState {
  return {
    channels: [],
    acknowledgements: [],
    commitments: [],
    receipts: [],
    sendSequences: [],
    recvSequences: [],
    ackSequences: [],
    nextChannelSequence: BigInt(0),
    params: Params.fromPartial({}),
  };
}
export const GenesisState = {
  typeUrl: "/ibc.core.channel.v1.GenesisState",
  encode(message: GenesisState, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.channels) {
      IdentifiedChannel.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.acknowledgements) {
      PacketState.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.commitments) {
      PacketState.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.receipts) {
      PacketState.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.sendSequences) {
      PacketSequence.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.recvSequences) {
      PacketSequence.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    for (const v of message.ackSequences) {
      PacketSequence.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    if (message.nextChannelSequence !== BigInt(0)) {
      writer.uint32(64).uint64(message.nextChannelSequence);
    }
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(74).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.channels.push(IdentifiedChannel.decode(reader, reader.uint32()));
          break;
        case 2:
          message.acknowledgements.push(PacketState.decode(reader, reader.uint32()));
          break;
        case 3:
          message.commitments.push(PacketState.decode(reader, reader.uint32()));
          break;
        case 4:
          message.receipts.push(PacketState.decode(reader, reader.uint32()));
          break;
        case 5:
          message.sendSequences.push(PacketSequence.decode(reader, reader.uint32()));
          break;
        case 6:
          message.recvSequences.push(PacketSequence.decode(reader, reader.uint32()));
          break;
        case 7:
          message.ackSequences.push(PacketSequence.decode(reader, reader.uint32()));
          break;
        case 8:
          message.nextChannelSequence = reader.uint64();
          break;
        case 9:
          message.params = Params.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): GenesisState {
    const obj = createBaseGenesisState();
    if (Array.isArray(object?.channels))
      obj.channels = object.channels.map((e: any) => IdentifiedChannel.fromJSON(e));
    if (Array.isArray(object?.acknowledgements))
      obj.acknowledgements = object.acknowledgements.map((e: any) => PacketState.fromJSON(e));
    if (Array.isArray(object?.commitments))
      obj.commitments = object.commitments.map((e: any) => PacketState.fromJSON(e));
    if (Array.isArray(object?.receipts))
      obj.receipts = object.receipts.map((e: any) => PacketState.fromJSON(e));
    if (Array.isArray(object?.sendSequences))
      obj.sendSequences = object.sendSequences.map((e: any) => PacketSequence.fromJSON(e));
    if (Array.isArray(object?.recvSequences))
      obj.recvSequences = object.recvSequences.map((e: any) => PacketSequence.fromJSON(e));
    if (Array.isArray(object?.ackSequences))
      obj.ackSequences = object.ackSequences.map((e: any) => PacketSequence.fromJSON(e));
    if (isSet(object.nextChannelSequence))
      obj.nextChannelSequence = BigInt(object.nextChannelSequence.toString());
    if (isSet(object.params)) obj.params = Params.fromJSON(object.params);
    return obj;
  },
  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    if (message.channels) {
      obj.channels = message.channels.map((e) => (e ? IdentifiedChannel.toJSON(e) : undefined));
    } else {
      obj.channels = [];
    }
    if (message.acknowledgements) {
      obj.acknowledgements = message.acknowledgements.map((e) => (e ? PacketState.toJSON(e) : undefined));
    } else {
      obj.acknowledgements = [];
    }
    if (message.commitments) {
      obj.commitments = message.commitments.map((e) => (e ? PacketState.toJSON(e) : undefined));
    } else {
      obj.commitments = [];
    }
    if (message.receipts) {
      obj.receipts = message.receipts.map((e) => (e ? PacketState.toJSON(e) : undefined));
    } else {
      obj.receipts = [];
    }
    if (message.sendSequences) {
      obj.sendSequences = message.sendSequences.map((e) => (e ? PacketSequence.toJSON(e) : undefined));
    } else {
      obj.sendSequences = [];
    }
    if (message.recvSequences) {
      obj.recvSequences = message.recvSequences.map((e) => (e ? PacketSequence.toJSON(e) : undefined));
    } else {
      obj.recvSequences = [];
    }
    if (message.ackSequences) {
      obj.ackSequences = message.ackSequences.map((e) => (e ? PacketSequence.toJSON(e) : undefined));
    } else {
      obj.ackSequences = [];
    }
    message.nextChannelSequence !== undefined &&
      (obj.nextChannelSequence = (message.nextChannelSequence || BigInt(0)).toString());
    message.params !== undefined && (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<GenesisState>, I>>(object: I): GenesisState {
    const message = createBaseGenesisState();
    message.channels = object.channels?.map((e) => IdentifiedChannel.fromPartial(e)) || [];
    message.acknowledgements = object.acknowledgements?.map((e) => PacketState.fromPartial(e)) || [];
    message.commitments = object.commitments?.map((e) => PacketState.fromPartial(e)) || [];
    message.receipts = object.receipts?.map((e) => PacketState.fromPartial(e)) || [];
    message.sendSequences = object.sendSequences?.map((e) => PacketSequence.fromPartial(e)) || [];
    message.recvSequences = object.recvSequences?.map((e) => PacketSequence.fromPartial(e)) || [];
    message.ackSequences = object.ackSequences?.map((e) => PacketSequence.fromPartial(e)) || [];
    if (object.nextChannelSequence !== undefined && object.nextChannelSequence !== null) {
      message.nextChannelSequence = BigInt(object.nextChannelSequence.toString());
    }
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromPartial(object.params);
    }
    return message;
  },
};
function createBasePacketSequence(): PacketSequence {
  return {
    portId: "",
    channelId: "",
    sequence: BigInt(0),
  };
}
export const PacketSequence = {
  typeUrl: "/ibc.core.channel.v1.PacketSequence",
  encode(message: PacketSequence, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.portId !== "") {
      writer.uint32(10).string(message.portId);
    }
    if (message.channelId !== "") {
      writer.uint32(18).string(message.channelId);
    }
    if (message.sequence !== BigInt(0)) {
      writer.uint32(24).uint64(message.sequence);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): PacketSequence {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePacketSequence();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.portId = reader.string();
          break;
        case 2:
          message.channelId = reader.string();
          break;
        case 3:
          message.sequence = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): PacketSequence {
    const obj = createBasePacketSequence();
    if (isSet(object.portId)) obj.portId = String(object.portId);
    if (isSet(object.channelId)) obj.channelId = String(object.channelId);
    if (isSet(object.sequence)) obj.sequence = BigInt(object.sequence.toString());
    return obj;
  },
  toJSON(message: PacketSequence): unknown {
    const obj: any = {};
    message.portId !== undefined && (obj.portId = message.portId);
    message.channelId !== undefined && (obj.channelId = message.channelId);
    message.sequence !== undefined && (obj.sequence = (message.sequence || BigInt(0)).toString());
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<PacketSequence>, I>>(object: I): PacketSequence {
    const message = createBasePacketSequence();
    message.portId = object.portId ?? "";
    message.channelId = object.channelId ?? "";
    if (object.sequence !== undefined && object.sequence !== null) {
      message.sequence = BigInt(object.sequence.toString());
    }
    return message;
  },
};
