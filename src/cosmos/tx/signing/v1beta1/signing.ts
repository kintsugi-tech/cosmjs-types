/* eslint-disable */
import { CompactBitArray } from "../../../crypto/multisig/v1beta1/multisig";
import { Any } from "../../../../google/protobuf/any";
import { BinaryReader, BinaryWriter } from "../../../../binary";
import { DeepPartial, Exact, isSet, bytesFromBase64, base64FromBytes } from "../../../../helpers";
export const protobufPackage = "cosmos.tx.signing.v1beta1";
/**
 * SignMode represents a signing mode with its own security guarantees.
 *
 * This enum should be considered a registry of all known sign modes
 * in the Cosmos ecosystem. Apps are not expected to support all known
 * sign modes. Apps that would like to support custom  sign modes are
 * encouraged to open a small PR against this file to add a new case
 * to this SignMode enum describing their sign mode so that different
 * apps have a consistent version of this enum.
 */
export enum SignMode {
  /**
   * SIGN_MODE_UNSPECIFIED - SIGN_MODE_UNSPECIFIED specifies an unknown signing mode and will be
   * rejected.
   */
  SIGN_MODE_UNSPECIFIED = 0,
  /**
   * SIGN_MODE_DIRECT - SIGN_MODE_DIRECT specifies a signing mode which uses SignDoc and is
   * verified with raw bytes from Tx.
   */
  SIGN_MODE_DIRECT = 1,
  /**
   * SIGN_MODE_TEXTUAL - SIGN_MODE_TEXTUAL is a future signing mode that will verify some
   * human-readable textual representation on top of the binary representation
   * from SIGN_MODE_DIRECT.
   *
   * Since: cosmos-sdk 0.50
   */
  SIGN_MODE_TEXTUAL = 2,
  /**
   * SIGN_MODE_DIRECT_AUX - SIGN_MODE_DIRECT_AUX specifies a signing mode which uses
   * SignDocDirectAux. As opposed to SIGN_MODE_DIRECT, this sign mode does not
   * require signers signing over other signers' `signer_info`.
   *
   * Since: cosmos-sdk 0.46
   */
  SIGN_MODE_DIRECT_AUX = 3,
  /**
   * SIGN_MODE_LEGACY_AMINO_JSON - SIGN_MODE_LEGACY_AMINO_JSON is a backwards compatibility mode which uses
   * Amino JSON and will be removed in the future.
   */
  SIGN_MODE_LEGACY_AMINO_JSON = 127,
  /**
   * SIGN_MODE_EIP_191 - SIGN_MODE_EIP_191 specifies the sign mode for EIP 191 signing on the Cosmos
   * SDK. Ref: https://eips.ethereum.org/EIPS/eip-191
   *
   * Currently, SIGN_MODE_EIP_191 is registered as a SignMode enum variant,
   * but is not implemented on the SDK by default. To enable EIP-191, you need
   * to pass a custom `TxConfig` that has an implementation of
   * `SignModeHandler` for EIP-191. The SDK may decide to fully support
   * EIP-191 in the future.
   *
   * Since: cosmos-sdk 0.45.2
   */
  SIGN_MODE_EIP_191 = 191,
  UNRECOGNIZED = -1,
}
export function signModeFromJSON(object: any): SignMode {
  switch (object) {
    case 0:
    case "SIGN_MODE_UNSPECIFIED":
      return SignMode.SIGN_MODE_UNSPECIFIED;
    case 1:
    case "SIGN_MODE_DIRECT":
      return SignMode.SIGN_MODE_DIRECT;
    case 2:
    case "SIGN_MODE_TEXTUAL":
      return SignMode.SIGN_MODE_TEXTUAL;
    case 3:
    case "SIGN_MODE_DIRECT_AUX":
      return SignMode.SIGN_MODE_DIRECT_AUX;
    case 127:
    case "SIGN_MODE_LEGACY_AMINO_JSON":
      return SignMode.SIGN_MODE_LEGACY_AMINO_JSON;
    case 191:
    case "SIGN_MODE_EIP_191":
      return SignMode.SIGN_MODE_EIP_191;
    case -1:
    case "UNRECOGNIZED":
    default:
      return SignMode.UNRECOGNIZED;
  }
}
export function signModeToJSON(object: SignMode): string {
  switch (object) {
    case SignMode.SIGN_MODE_UNSPECIFIED:
      return "SIGN_MODE_UNSPECIFIED";
    case SignMode.SIGN_MODE_DIRECT:
      return "SIGN_MODE_DIRECT";
    case SignMode.SIGN_MODE_TEXTUAL:
      return "SIGN_MODE_TEXTUAL";
    case SignMode.SIGN_MODE_DIRECT_AUX:
      return "SIGN_MODE_DIRECT_AUX";
    case SignMode.SIGN_MODE_LEGACY_AMINO_JSON:
      return "SIGN_MODE_LEGACY_AMINO_JSON";
    case SignMode.SIGN_MODE_EIP_191:
      return "SIGN_MODE_EIP_191";
    case SignMode.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
/** SignatureDescriptors wraps multiple SignatureDescriptor's. */
export interface SignatureDescriptors {
  /** signatures are the signature descriptors */
  signatures: SignatureDescriptor[];
}
/**
 * SignatureDescriptor is a convenience type which represents the full data for
 * a signature including the public key of the signer, signing modes and the
 * signature itself. It is primarily used for coordinating signatures between
 * clients.
 */
export interface SignatureDescriptor {
  /** public_key is the public key of the signer */
  publicKey?: Any;
  data?: SignatureDescriptor_Data;
  /**
   * sequence is the sequence of the account, which describes the
   * number of committed transactions signed by a given address. It is used to prevent
   * replay attacks.
   */
  sequence: bigint;
}
/** Data represents signature data */
export interface SignatureDescriptor_Data {
  /** single represents a single signer */
  single?: SignatureDescriptor_Data_Single;
  /** multi represents a multisig signer */
  multi?: SignatureDescriptor_Data_Multi;
}
/** Single is the signature data for a single signer */
export interface SignatureDescriptor_Data_Single {
  /** mode is the signing mode of the single signer */
  mode: SignMode;
  /** signature is the raw signature bytes */
  signature: Uint8Array;
}
/** Multi is the signature data for a multisig public key */
export interface SignatureDescriptor_Data_Multi {
  /** bitarray specifies which keys within the multisig are signing */
  bitarray?: CompactBitArray;
  /** signatures is the signatures of the multi-signature */
  signatures: SignatureDescriptor_Data[];
}
function createBaseSignatureDescriptors(): SignatureDescriptors {
  return {
    signatures: [],
  };
}
export const SignatureDescriptors = {
  typeUrl: "/cosmos.tx.signing.v1beta1.SignatureDescriptors",
  encode(message: SignatureDescriptors, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.signatures) {
      SignatureDescriptor.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): SignatureDescriptors {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSignatureDescriptors();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.signatures.push(SignatureDescriptor.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): SignatureDescriptors {
    const obj = createBaseSignatureDescriptors();
    if (Array.isArray(object?.signatures))
      obj.signatures = object.signatures.map((e: any) => SignatureDescriptor.fromJSON(e));
    return obj;
  },
  toJSON(message: SignatureDescriptors): unknown {
    const obj: any = {};
    if (message.signatures) {
      obj.signatures = message.signatures.map((e) => (e ? SignatureDescriptor.toJSON(e) : undefined));
    } else {
      obj.signatures = [];
    }
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<SignatureDescriptors>, I>>(object: I): SignatureDescriptors {
    const message = createBaseSignatureDescriptors();
    message.signatures = object.signatures?.map((e) => SignatureDescriptor.fromPartial(e)) || [];
    return message;
  },
};
function createBaseSignatureDescriptor(): SignatureDescriptor {
  return {
    publicKey: undefined,
    data: undefined,
    sequence: BigInt(0),
  };
}
export const SignatureDescriptor = {
  typeUrl: "/cosmos.tx.signing.v1beta1.SignatureDescriptor",
  encode(message: SignatureDescriptor, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.publicKey !== undefined) {
      Any.encode(message.publicKey, writer.uint32(10).fork()).ldelim();
    }
    if (message.data !== undefined) {
      SignatureDescriptor_Data.encode(message.data, writer.uint32(18).fork()).ldelim();
    }
    if (message.sequence !== BigInt(0)) {
      writer.uint32(24).uint64(message.sequence);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): SignatureDescriptor {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSignatureDescriptor();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.publicKey = Any.decode(reader, reader.uint32());
          break;
        case 2:
          message.data = SignatureDescriptor_Data.decode(reader, reader.uint32());
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
  fromJSON(object: any): SignatureDescriptor {
    const obj = createBaseSignatureDescriptor();
    if (isSet(object.publicKey)) obj.publicKey = Any.fromJSON(object.publicKey);
    if (isSet(object.data)) obj.data = SignatureDescriptor_Data.fromJSON(object.data);
    if (isSet(object.sequence)) obj.sequence = BigInt(object.sequence.toString());
    return obj;
  },
  toJSON(message: SignatureDescriptor): unknown {
    const obj: any = {};
    message.publicKey !== undefined &&
      (obj.publicKey = message.publicKey ? Any.toJSON(message.publicKey) : undefined);
    message.data !== undefined &&
      (obj.data = message.data ? SignatureDescriptor_Data.toJSON(message.data) : undefined);
    message.sequence !== undefined && (obj.sequence = (message.sequence || BigInt(0)).toString());
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<SignatureDescriptor>, I>>(object: I): SignatureDescriptor {
    const message = createBaseSignatureDescriptor();
    if (object.publicKey !== undefined && object.publicKey !== null) {
      message.publicKey = Any.fromPartial(object.publicKey);
    }
    if (object.data !== undefined && object.data !== null) {
      message.data = SignatureDescriptor_Data.fromPartial(object.data);
    }
    if (object.sequence !== undefined && object.sequence !== null) {
      message.sequence = BigInt(object.sequence.toString());
    }
    return message;
  },
};
function createBaseSignatureDescriptor_Data(): SignatureDescriptor_Data {
  return {
    single: undefined,
    multi: undefined,
  };
}
export const SignatureDescriptor_Data = {
  typeUrl: "/cosmos.tx.signing.v1beta1.Data",
  encode(message: SignatureDescriptor_Data, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.single !== undefined) {
      SignatureDescriptor_Data_Single.encode(message.single, writer.uint32(10).fork()).ldelim();
    }
    if (message.multi !== undefined) {
      SignatureDescriptor_Data_Multi.encode(message.multi, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): SignatureDescriptor_Data {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSignatureDescriptor_Data();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.single = SignatureDescriptor_Data_Single.decode(reader, reader.uint32());
          break;
        case 2:
          message.multi = SignatureDescriptor_Data_Multi.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): SignatureDescriptor_Data {
    const obj = createBaseSignatureDescriptor_Data();
    if (isSet(object.single)) obj.single = SignatureDescriptor_Data_Single.fromJSON(object.single);
    if (isSet(object.multi)) obj.multi = SignatureDescriptor_Data_Multi.fromJSON(object.multi);
    return obj;
  },
  toJSON(message: SignatureDescriptor_Data): unknown {
    const obj: any = {};
    message.single !== undefined &&
      (obj.single = message.single ? SignatureDescriptor_Data_Single.toJSON(message.single) : undefined);
    message.multi !== undefined &&
      (obj.multi = message.multi ? SignatureDescriptor_Data_Multi.toJSON(message.multi) : undefined);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<SignatureDescriptor_Data>, I>>(
    object: I,
  ): SignatureDescriptor_Data {
    const message = createBaseSignatureDescriptor_Data();
    if (object.single !== undefined && object.single !== null) {
      message.single = SignatureDescriptor_Data_Single.fromPartial(object.single);
    }
    if (object.multi !== undefined && object.multi !== null) {
      message.multi = SignatureDescriptor_Data_Multi.fromPartial(object.multi);
    }
    return message;
  },
};
function createBaseSignatureDescriptor_Data_Single(): SignatureDescriptor_Data_Single {
  return {
    mode: 0,
    signature: new Uint8Array(),
  };
}
export const SignatureDescriptor_Data_Single = {
  typeUrl: "/cosmos.tx.signing.v1beta1.Single",
  encode(
    message: SignatureDescriptor_Data_Single,
    writer: BinaryWriter = BinaryWriter.create(),
  ): BinaryWriter {
    if (message.mode !== 0) {
      writer.uint32(8).int32(message.mode);
    }
    if (message.signature.length !== 0) {
      writer.uint32(18).bytes(message.signature);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): SignatureDescriptor_Data_Single {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSignatureDescriptor_Data_Single();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.mode = reader.int32() as any;
          break;
        case 2:
          message.signature = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): SignatureDescriptor_Data_Single {
    const obj = createBaseSignatureDescriptor_Data_Single();
    if (isSet(object.mode)) obj.mode = signModeFromJSON(object.mode);
    if (isSet(object.signature)) obj.signature = bytesFromBase64(object.signature);
    return obj;
  },
  toJSON(message: SignatureDescriptor_Data_Single): unknown {
    const obj: any = {};
    message.mode !== undefined && (obj.mode = signModeToJSON(message.mode));
    message.signature !== undefined &&
      (obj.signature = base64FromBytes(
        message.signature !== undefined ? message.signature : new Uint8Array(),
      ));
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<SignatureDescriptor_Data_Single>, I>>(
    object: I,
  ): SignatureDescriptor_Data_Single {
    const message = createBaseSignatureDescriptor_Data_Single();
    message.mode = object.mode ?? 0;
    message.signature = object.signature ?? new Uint8Array();
    return message;
  },
};
function createBaseSignatureDescriptor_Data_Multi(): SignatureDescriptor_Data_Multi {
  return {
    bitarray: undefined,
    signatures: [],
  };
}
export const SignatureDescriptor_Data_Multi = {
  typeUrl: "/cosmos.tx.signing.v1beta1.Multi",
  encode(
    message: SignatureDescriptor_Data_Multi,
    writer: BinaryWriter = BinaryWriter.create(),
  ): BinaryWriter {
    if (message.bitarray !== undefined) {
      CompactBitArray.encode(message.bitarray, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.signatures) {
      SignatureDescriptor_Data.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): SignatureDescriptor_Data_Multi {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSignatureDescriptor_Data_Multi();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.bitarray = CompactBitArray.decode(reader, reader.uint32());
          break;
        case 2:
          message.signatures.push(SignatureDescriptor_Data.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): SignatureDescriptor_Data_Multi {
    const obj = createBaseSignatureDescriptor_Data_Multi();
    if (isSet(object.bitarray)) obj.bitarray = CompactBitArray.fromJSON(object.bitarray);
    if (Array.isArray(object?.signatures))
      obj.signatures = object.signatures.map((e: any) => SignatureDescriptor_Data.fromJSON(e));
    return obj;
  },
  toJSON(message: SignatureDescriptor_Data_Multi): unknown {
    const obj: any = {};
    message.bitarray !== undefined &&
      (obj.bitarray = message.bitarray ? CompactBitArray.toJSON(message.bitarray) : undefined);
    if (message.signatures) {
      obj.signatures = message.signatures.map((e) => (e ? SignatureDescriptor_Data.toJSON(e) : undefined));
    } else {
      obj.signatures = [];
    }
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<SignatureDescriptor_Data_Multi>, I>>(
    object: I,
  ): SignatureDescriptor_Data_Multi {
    const message = createBaseSignatureDescriptor_Data_Multi();
    if (object.bitarray !== undefined && object.bitarray !== null) {
      message.bitarray = CompactBitArray.fromPartial(object.bitarray);
    }
    message.signatures = object.signatures?.map((e) => SignatureDescriptor_Data.fromPartial(e)) || [];
    return message;
  },
};
