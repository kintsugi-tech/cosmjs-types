/* eslint-disable */
import { BinaryReader, BinaryWriter } from "../../../../binary";
import { isSet, bytesFromBase64, base64FromBytes, DeepPartial, Exact } from "../../../../helpers";
export const protobufPackage = "cosmos.store.snapshots.v1";
/** Snapshot contains Tendermint state sync snapshot info. */
export interface Snapshot {
  height: bigint;
  format: number;
  chunks: number;
  hash: Uint8Array;
  metadata: Metadata;
}
/** Metadata contains SDK-specific snapshot metadata. */
export interface Metadata {
  /** SHA-256 chunk hashes */
  chunkHashes: Uint8Array[];
}
/**
 * SnapshotItem is an item contained in a rootmulti.Store snapshot.
 *
 * Since: cosmos-sdk 0.46
 */
export interface SnapshotItem {
  store?: SnapshotStoreItem;
  iavl?: SnapshotIAVLItem;
  extension?: SnapshotExtensionMeta;
  extensionPayload?: SnapshotExtensionPayload;
}
/**
 * SnapshotStoreItem contains metadata about a snapshotted store.
 *
 * Since: cosmos-sdk 0.46
 */
export interface SnapshotStoreItem {
  name: string;
}
/**
 * SnapshotIAVLItem is an exported IAVL node.
 *
 * Since: cosmos-sdk 0.46
 */
export interface SnapshotIAVLItem {
  key: Uint8Array;
  value: Uint8Array;
  /** version is block height */
  version: bigint;
  /** height is depth of the tree. */
  height: number;
}
/**
 * SnapshotExtensionMeta contains metadata about an external snapshotter.
 *
 * Since: cosmos-sdk 0.46
 */
export interface SnapshotExtensionMeta {
  name: string;
  format: number;
}
/**
 * SnapshotExtensionPayload contains payloads of an external snapshotter.
 *
 * Since: cosmos-sdk 0.46
 */
export interface SnapshotExtensionPayload {
  payload: Uint8Array;
}
function createBaseSnapshot(): Snapshot {
  return {
    height: BigInt(0),
    format: 0,
    chunks: 0,
    hash: new Uint8Array(),
    metadata: Metadata.fromPartial({}),
  };
}
export const Snapshot = {
  typeUrl: "/cosmos.store.snapshots.v1.Snapshot",
  encode(message: Snapshot, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.height !== BigInt(0)) {
      writer.uint32(8).uint64(message.height);
    }
    if (message.format !== 0) {
      writer.uint32(16).uint32(message.format);
    }
    if (message.chunks !== 0) {
      writer.uint32(24).uint32(message.chunks);
    }
    if (message.hash.length !== 0) {
      writer.uint32(34).bytes(message.hash);
    }
    if (message.metadata !== undefined) {
      Metadata.encode(message.metadata, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): Snapshot {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSnapshot();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.height = reader.uint64();
          break;
        case 2:
          message.format = reader.uint32();
          break;
        case 3:
          message.chunks = reader.uint32();
          break;
        case 4:
          message.hash = reader.bytes();
          break;
        case 5:
          message.metadata = Metadata.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Snapshot {
    const obj = createBaseSnapshot();
    if (isSet(object.height)) obj.height = BigInt(object.height.toString());
    if (isSet(object.format)) obj.format = Number(object.format);
    if (isSet(object.chunks)) obj.chunks = Number(object.chunks);
    if (isSet(object.hash)) obj.hash = bytesFromBase64(object.hash);
    if (isSet(object.metadata)) obj.metadata = Metadata.fromJSON(object.metadata);
    return obj;
  },
  toJSON(message: Snapshot): unknown {
    const obj: any = {};
    message.height !== undefined && (obj.height = (message.height || BigInt(0)).toString());
    message.format !== undefined && (obj.format = Math.round(message.format));
    message.chunks !== undefined && (obj.chunks = Math.round(message.chunks));
    message.hash !== undefined &&
      (obj.hash = base64FromBytes(message.hash !== undefined ? message.hash : new Uint8Array()));
    message.metadata !== undefined &&
      (obj.metadata = message.metadata ? Metadata.toJSON(message.metadata) : undefined);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<Snapshot>, I>>(object: I): Snapshot {
    const message = createBaseSnapshot();
    if (object.height !== undefined && object.height !== null) {
      message.height = BigInt(object.height.toString());
    }
    message.format = object.format ?? 0;
    message.chunks = object.chunks ?? 0;
    message.hash = object.hash ?? new Uint8Array();
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = Metadata.fromPartial(object.metadata);
    }
    return message;
  },
};
function createBaseMetadata(): Metadata {
  return {
    chunkHashes: [],
  };
}
export const Metadata = {
  typeUrl: "/cosmos.store.snapshots.v1.Metadata",
  encode(message: Metadata, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.chunkHashes) {
      writer.uint32(10).bytes(v!);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): Metadata {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMetadata();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chunkHashes.push(reader.bytes());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Metadata {
    const obj = createBaseMetadata();
    if (Array.isArray(object?.chunkHashes))
      obj.chunkHashes = object.chunkHashes.map((e: any) => bytesFromBase64(e));
    return obj;
  },
  toJSON(message: Metadata): unknown {
    const obj: any = {};
    if (message.chunkHashes) {
      obj.chunkHashes = message.chunkHashes.map((e) =>
        base64FromBytes(e !== undefined ? e : new Uint8Array()),
      );
    } else {
      obj.chunkHashes = [];
    }
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<Metadata>, I>>(object: I): Metadata {
    const message = createBaseMetadata();
    message.chunkHashes = object.chunkHashes?.map((e) => e) || [];
    return message;
  },
};
function createBaseSnapshotItem(): SnapshotItem {
  return {
    store: undefined,
    iavl: undefined,
    extension: undefined,
    extensionPayload: undefined,
  };
}
export const SnapshotItem = {
  typeUrl: "/cosmos.store.snapshots.v1.SnapshotItem",
  encode(message: SnapshotItem, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.store !== undefined) {
      SnapshotStoreItem.encode(message.store, writer.uint32(10).fork()).ldelim();
    }
    if (message.iavl !== undefined) {
      SnapshotIAVLItem.encode(message.iavl, writer.uint32(18).fork()).ldelim();
    }
    if (message.extension !== undefined) {
      SnapshotExtensionMeta.encode(message.extension, writer.uint32(26).fork()).ldelim();
    }
    if (message.extensionPayload !== undefined) {
      SnapshotExtensionPayload.encode(message.extensionPayload, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): SnapshotItem {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSnapshotItem();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.store = SnapshotStoreItem.decode(reader, reader.uint32());
          break;
        case 2:
          message.iavl = SnapshotIAVLItem.decode(reader, reader.uint32());
          break;
        case 3:
          message.extension = SnapshotExtensionMeta.decode(reader, reader.uint32());
          break;
        case 4:
          message.extensionPayload = SnapshotExtensionPayload.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): SnapshotItem {
    const obj = createBaseSnapshotItem();
    if (isSet(object.store)) obj.store = SnapshotStoreItem.fromJSON(object.store);
    if (isSet(object.iavl)) obj.iavl = SnapshotIAVLItem.fromJSON(object.iavl);
    if (isSet(object.extension)) obj.extension = SnapshotExtensionMeta.fromJSON(object.extension);
    if (isSet(object.extensionPayload))
      obj.extensionPayload = SnapshotExtensionPayload.fromJSON(object.extensionPayload);
    return obj;
  },
  toJSON(message: SnapshotItem): unknown {
    const obj: any = {};
    message.store !== undefined &&
      (obj.store = message.store ? SnapshotStoreItem.toJSON(message.store) : undefined);
    message.iavl !== undefined &&
      (obj.iavl = message.iavl ? SnapshotIAVLItem.toJSON(message.iavl) : undefined);
    message.extension !== undefined &&
      (obj.extension = message.extension ? SnapshotExtensionMeta.toJSON(message.extension) : undefined);
    message.extensionPayload !== undefined &&
      (obj.extensionPayload = message.extensionPayload
        ? SnapshotExtensionPayload.toJSON(message.extensionPayload)
        : undefined);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<SnapshotItem>, I>>(object: I): SnapshotItem {
    const message = createBaseSnapshotItem();
    if (object.store !== undefined && object.store !== null) {
      message.store = SnapshotStoreItem.fromPartial(object.store);
    }
    if (object.iavl !== undefined && object.iavl !== null) {
      message.iavl = SnapshotIAVLItem.fromPartial(object.iavl);
    }
    if (object.extension !== undefined && object.extension !== null) {
      message.extension = SnapshotExtensionMeta.fromPartial(object.extension);
    }
    if (object.extensionPayload !== undefined && object.extensionPayload !== null) {
      message.extensionPayload = SnapshotExtensionPayload.fromPartial(object.extensionPayload);
    }
    return message;
  },
};
function createBaseSnapshotStoreItem(): SnapshotStoreItem {
  return {
    name: "",
  };
}
export const SnapshotStoreItem = {
  typeUrl: "/cosmos.store.snapshots.v1.SnapshotStoreItem",
  encode(message: SnapshotStoreItem, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): SnapshotStoreItem {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSnapshotStoreItem();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): SnapshotStoreItem {
    const obj = createBaseSnapshotStoreItem();
    if (isSet(object.name)) obj.name = String(object.name);
    return obj;
  },
  toJSON(message: SnapshotStoreItem): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<SnapshotStoreItem>, I>>(object: I): SnapshotStoreItem {
    const message = createBaseSnapshotStoreItem();
    message.name = object.name ?? "";
    return message;
  },
};
function createBaseSnapshotIAVLItem(): SnapshotIAVLItem {
  return {
    key: new Uint8Array(),
    value: new Uint8Array(),
    version: BigInt(0),
    height: 0,
  };
}
export const SnapshotIAVLItem = {
  typeUrl: "/cosmos.store.snapshots.v1.SnapshotIAVLItem",
  encode(message: SnapshotIAVLItem, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.key.length !== 0) {
      writer.uint32(10).bytes(message.key);
    }
    if (message.value.length !== 0) {
      writer.uint32(18).bytes(message.value);
    }
    if (message.version !== BigInt(0)) {
      writer.uint32(24).int64(message.version);
    }
    if (message.height !== 0) {
      writer.uint32(32).int32(message.height);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): SnapshotIAVLItem {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSnapshotIAVLItem();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.bytes();
          break;
        case 2:
          message.value = reader.bytes();
          break;
        case 3:
          message.version = reader.int64();
          break;
        case 4:
          message.height = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): SnapshotIAVLItem {
    const obj = createBaseSnapshotIAVLItem();
    if (isSet(object.key)) obj.key = bytesFromBase64(object.key);
    if (isSet(object.value)) obj.value = bytesFromBase64(object.value);
    if (isSet(object.version)) obj.version = BigInt(object.version.toString());
    if (isSet(object.height)) obj.height = Number(object.height);
    return obj;
  },
  toJSON(message: SnapshotIAVLItem): unknown {
    const obj: any = {};
    message.key !== undefined &&
      (obj.key = base64FromBytes(message.key !== undefined ? message.key : new Uint8Array()));
    message.value !== undefined &&
      (obj.value = base64FromBytes(message.value !== undefined ? message.value : new Uint8Array()));
    message.version !== undefined && (obj.version = (message.version || BigInt(0)).toString());
    message.height !== undefined && (obj.height = Math.round(message.height));
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<SnapshotIAVLItem>, I>>(object: I): SnapshotIAVLItem {
    const message = createBaseSnapshotIAVLItem();
    message.key = object.key ?? new Uint8Array();
    message.value = object.value ?? new Uint8Array();
    if (object.version !== undefined && object.version !== null) {
      message.version = BigInt(object.version.toString());
    }
    message.height = object.height ?? 0;
    return message;
  },
};
function createBaseSnapshotExtensionMeta(): SnapshotExtensionMeta {
  return {
    name: "",
    format: 0,
  };
}
export const SnapshotExtensionMeta = {
  typeUrl: "/cosmos.store.snapshots.v1.SnapshotExtensionMeta",
  encode(message: SnapshotExtensionMeta, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.format !== 0) {
      writer.uint32(16).uint32(message.format);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): SnapshotExtensionMeta {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSnapshotExtensionMeta();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.format = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): SnapshotExtensionMeta {
    const obj = createBaseSnapshotExtensionMeta();
    if (isSet(object.name)) obj.name = String(object.name);
    if (isSet(object.format)) obj.format = Number(object.format);
    return obj;
  },
  toJSON(message: SnapshotExtensionMeta): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.format !== undefined && (obj.format = Math.round(message.format));
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<SnapshotExtensionMeta>, I>>(object: I): SnapshotExtensionMeta {
    const message = createBaseSnapshotExtensionMeta();
    message.name = object.name ?? "";
    message.format = object.format ?? 0;
    return message;
  },
};
function createBaseSnapshotExtensionPayload(): SnapshotExtensionPayload {
  return {
    payload: new Uint8Array(),
  };
}
export const SnapshotExtensionPayload = {
  typeUrl: "/cosmos.store.snapshots.v1.SnapshotExtensionPayload",
  encode(message: SnapshotExtensionPayload, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.payload.length !== 0) {
      writer.uint32(10).bytes(message.payload);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): SnapshotExtensionPayload {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSnapshotExtensionPayload();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.payload = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): SnapshotExtensionPayload {
    const obj = createBaseSnapshotExtensionPayload();
    if (isSet(object.payload)) obj.payload = bytesFromBase64(object.payload);
    return obj;
  },
  toJSON(message: SnapshotExtensionPayload): unknown {
    const obj: any = {};
    message.payload !== undefined &&
      (obj.payload = base64FromBytes(message.payload !== undefined ? message.payload : new Uint8Array()));
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<SnapshotExtensionPayload>, I>>(
    object: I,
  ): SnapshotExtensionPayload {
    const message = createBaseSnapshotExtensionPayload();
    message.payload = object.payload ?? new Uint8Array();
    return message;
  },
};
