/* eslint-disable */
import { BinaryReader, BinaryWriter } from "../../../binary";
import { isSet, DeepPartial, Exact } from "../../../helpers";
export const protobufPackage = "cosmos.circuit.v1";
/** Level is the permission level. */
export enum Permissions_Level {
  /**
   * LEVEL_NONE_UNSPECIFIED - LEVEL_NONE_UNSPECIFIED indicates that the account will have no circuit
   * breaker permissions.
   */
  LEVEL_NONE_UNSPECIFIED = 0,
  /**
   * LEVEL_SOME_MSGS - LEVEL_SOME_MSGS indicates that the account will have permission to
   * trip or reset the circuit breaker for some Msg type URLs. If this level
   * is chosen, a non-empty list of Msg type URLs must be provided in
   * limit_type_urls.
   */
  LEVEL_SOME_MSGS = 1,
  /**
   * LEVEL_ALL_MSGS - LEVEL_ALL_MSGS indicates that the account can trip or reset the circuit
   * breaker for Msg's of all type URLs.
   */
  LEVEL_ALL_MSGS = 2,
  /**
   * LEVEL_SUPER_ADMIN - LEVEL_SUPER_ADMIN indicates that the account can take all circuit breaker
   * actions and can grant permissions to other accounts.
   */
  LEVEL_SUPER_ADMIN = 3,
  UNRECOGNIZED = -1,
}
export function permissions_LevelFromJSON(object: any): Permissions_Level {
  switch (object) {
    case 0:
    case "LEVEL_NONE_UNSPECIFIED":
      return Permissions_Level.LEVEL_NONE_UNSPECIFIED;
    case 1:
    case "LEVEL_SOME_MSGS":
      return Permissions_Level.LEVEL_SOME_MSGS;
    case 2:
    case "LEVEL_ALL_MSGS":
      return Permissions_Level.LEVEL_ALL_MSGS;
    case 3:
    case "LEVEL_SUPER_ADMIN":
      return Permissions_Level.LEVEL_SUPER_ADMIN;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Permissions_Level.UNRECOGNIZED;
  }
}
export function permissions_LevelToJSON(object: Permissions_Level): string {
  switch (object) {
    case Permissions_Level.LEVEL_NONE_UNSPECIFIED:
      return "LEVEL_NONE_UNSPECIFIED";
    case Permissions_Level.LEVEL_SOME_MSGS:
      return "LEVEL_SOME_MSGS";
    case Permissions_Level.LEVEL_ALL_MSGS:
      return "LEVEL_ALL_MSGS";
    case Permissions_Level.LEVEL_SUPER_ADMIN:
      return "LEVEL_SUPER_ADMIN";
    case Permissions_Level.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
/**
 * Permissions are the permissions that an account has to trip
 * or reset the circuit breaker.
 */
export interface Permissions {
  /** level is the level of permissions granted to this account. */
  level: Permissions_Level;
  /**
   * limit_type_urls is used with LEVEL_SOME_MSGS to limit the lists of Msg type
   * URLs that the account can trip. It is an error to use limit_type_urls with
   * a level other than LEVEL_SOME_MSGS.
   */
  limitTypeUrls: string[];
}
/** GenesisAccountPermissions is the account permissions for the circuit breaker in genesis */
export interface GenesisAccountPermissions {
  address: string;
  permissions?: Permissions;
}
/** GenesisState is the state that must be provided at genesis. */
export interface GenesisState {
  accountPermissions: GenesisAccountPermissions[];
  disabledTypeUrls: string[];
}
function createBasePermissions(): Permissions {
  return {
    level: 0,
    limitTypeUrls: [],
  };
}
export const Permissions = {
  typeUrl: "/cosmos.circuit.v1.Permissions",
  encode(message: Permissions, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.level !== 0) {
      writer.uint32(8).int32(message.level);
    }
    for (const v of message.limitTypeUrls) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): Permissions {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePermissions();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.level = reader.int32() as any;
          break;
        case 2:
          message.limitTypeUrls.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Permissions {
    const obj = createBasePermissions();
    if (isSet(object.level)) obj.level = permissions_LevelFromJSON(object.level);
    if (Array.isArray(object?.limitTypeUrls))
      obj.limitTypeUrls = object.limitTypeUrls.map((e: any) => String(e));
    return obj;
  },
  toJSON(message: Permissions): unknown {
    const obj: any = {};
    message.level !== undefined && (obj.level = permissions_LevelToJSON(message.level));
    if (message.limitTypeUrls) {
      obj.limitTypeUrls = message.limitTypeUrls.map((e) => e);
    } else {
      obj.limitTypeUrls = [];
    }
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<Permissions>, I>>(object: I): Permissions {
    const message = createBasePermissions();
    message.level = object.level ?? 0;
    message.limitTypeUrls = object.limitTypeUrls?.map((e) => e) || [];
    return message;
  },
};
function createBaseGenesisAccountPermissions(): GenesisAccountPermissions {
  return {
    address: "",
    permissions: undefined,
  };
}
export const GenesisAccountPermissions = {
  typeUrl: "/cosmos.circuit.v1.GenesisAccountPermissions",
  encode(message: GenesisAccountPermissions, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.permissions !== undefined) {
      Permissions.encode(message.permissions, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): GenesisAccountPermissions {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisAccountPermissions();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.permissions = Permissions.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): GenesisAccountPermissions {
    const obj = createBaseGenesisAccountPermissions();
    if (isSet(object.address)) obj.address = String(object.address);
    if (isSet(object.permissions)) obj.permissions = Permissions.fromJSON(object.permissions);
    return obj;
  },
  toJSON(message: GenesisAccountPermissions): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    message.permissions !== undefined &&
      (obj.permissions = message.permissions ? Permissions.toJSON(message.permissions) : undefined);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<GenesisAccountPermissions>, I>>(
    object: I,
  ): GenesisAccountPermissions {
    const message = createBaseGenesisAccountPermissions();
    message.address = object.address ?? "";
    if (object.permissions !== undefined && object.permissions !== null) {
      message.permissions = Permissions.fromPartial(object.permissions);
    }
    return message;
  },
};
function createBaseGenesisState(): GenesisState {
  return {
    accountPermissions: [],
    disabledTypeUrls: [],
  };
}
export const GenesisState = {
  typeUrl: "/cosmos.circuit.v1.GenesisState",
  encode(message: GenesisState, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.accountPermissions) {
      GenesisAccountPermissions.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.disabledTypeUrls) {
      writer.uint32(18).string(v!);
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
          message.accountPermissions.push(GenesisAccountPermissions.decode(reader, reader.uint32()));
          break;
        case 2:
          message.disabledTypeUrls.push(reader.string());
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
    if (Array.isArray(object?.accountPermissions))
      obj.accountPermissions = object.accountPermissions.map((e: any) =>
        GenesisAccountPermissions.fromJSON(e),
      );
    if (Array.isArray(object?.disabledTypeUrls))
      obj.disabledTypeUrls = object.disabledTypeUrls.map((e: any) => String(e));
    return obj;
  },
  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    if (message.accountPermissions) {
      obj.accountPermissions = message.accountPermissions.map((e) =>
        e ? GenesisAccountPermissions.toJSON(e) : undefined,
      );
    } else {
      obj.accountPermissions = [];
    }
    if (message.disabledTypeUrls) {
      obj.disabledTypeUrls = message.disabledTypeUrls.map((e) => e);
    } else {
      obj.disabledTypeUrls = [];
    }
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<GenesisState>, I>>(object: I): GenesisState {
    const message = createBaseGenesisState();
    message.accountPermissions =
      object.accountPermissions?.map((e) => GenesisAccountPermissions.fromPartial(e)) || [];
    message.disabledTypeUrls = object.disabledTypeUrls?.map((e) => e) || [];
    return message;
  },
};
