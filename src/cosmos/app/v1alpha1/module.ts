/* eslint-disable */
import { BinaryReader, BinaryWriter } from "../../../binary";
import { isSet, DeepPartial, Exact } from "../../../helpers";
export const protobufPackage = "cosmos.app.v1alpha1";
/** ModuleDescriptor describes an app module. */
export interface ModuleDescriptor {
  /**
   * go_import names the package that should be imported by an app to load the
   * module in the runtime module registry. It is required to make debugging
   * of configuration errors easier for users.
   */
  goImport: string;
  /**
   * use_package refers to a protobuf package that this module
   * uses and exposes to the world. In an app, only one module should "use"
   * or own a single protobuf package. It is assumed that the module uses
   * all of the .proto files in a single package.
   */
  usePackage: PackageReference[];
  /**
   * can_migrate_from defines which module versions this module can migrate
   * state from. The framework will check that one module version is able to
   * migrate from a previous module version before attempting to update its
   * config. It is assumed that modules can transitively migrate from earlier
   * versions. For instance if v3 declares it can migrate from v2, and v2
   * declares it can migrate from v1, the framework knows how to migrate
   * from v1 to v3, assuming all 3 module versions are registered at runtime.
   */
  canMigrateFrom: MigrateFromInfo[];
}
/** PackageReference is a reference to a protobuf package used by a module. */
export interface PackageReference {
  /** name is the fully-qualified name of the package. */
  name: string;
  /**
   * revision is the optional revision of the package that is being used.
   * Protobuf packages used in Cosmos should generally have a major version
   * as the last part of the package name, ex. foo.bar.baz.v1.
   * The revision of a package can be thought of as the minor version of a
   * package which has additional backwards compatible definitions that weren't
   * present in a previous version.
   *
   * A package should indicate its revision with a source code comment
   * above the package declaration in one of its files containing the
   * text "Revision N" where N is an integer revision. All packages start
   * at revision 0 the first time they are released in a module.
   *
   * When a new version of a module is released and items are added to existing
   * .proto files, these definitions should contain comments of the form
   * "Since: Revision N" where N is an integer revision.
   *
   * When the module runtime starts up, it will check the pinned proto
   * image and panic if there are runtime protobuf definitions that are not
   * in the pinned descriptor which do not have
   * a "Since Revision N" comment or have a "Since Revision N" comment where
   * N is <= to the revision specified here. This indicates that the protobuf
   * files have been updated, but the pinned file descriptor hasn't.
   *
   * If there are items in the pinned file descriptor with a revision
   * greater than the value indicated here, this will also cause a panic
   * as it may mean that the pinned descriptor for a legacy module has been
   * improperly updated or that there is some other versioning discrepancy.
   * Runtime protobuf definitions will also be checked for compatibility
   * with pinned file descriptors to make sure there are no incompatible changes.
   *
   * This behavior ensures that:
   * * pinned proto images are up-to-date
   * * protobuf files are carefully annotated with revision comments which
   *   are important good client UX
   * * protobuf files are changed in backwards and forwards compatible ways
   */
  revision: number;
}
/**
 * MigrateFromInfo is information on a module version that a newer module
 * can migrate from.
 */
export interface MigrateFromInfo {
  /**
   * module is the fully-qualified protobuf name of the module config object
   * for the previous module version, ex: "cosmos.group.module.v1.Module".
   */
  module: string;
}
function createBaseModuleDescriptor(): ModuleDescriptor {
  return {
    goImport: "",
    usePackage: [],
    canMigrateFrom: [],
  };
}
export const ModuleDescriptor = {
  typeUrl: "/cosmos.app.v1alpha1.ModuleDescriptor",
  encode(message: ModuleDescriptor, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.goImport !== "") {
      writer.uint32(10).string(message.goImport);
    }
    for (const v of message.usePackage) {
      PackageReference.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.canMigrateFrom) {
      MigrateFromInfo.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): ModuleDescriptor {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseModuleDescriptor();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.goImport = reader.string();
          break;
        case 2:
          message.usePackage.push(PackageReference.decode(reader, reader.uint32()));
          break;
        case 3:
          message.canMigrateFrom.push(MigrateFromInfo.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): ModuleDescriptor {
    const obj = createBaseModuleDescriptor();
    if (isSet(object.goImport)) obj.goImport = String(object.goImport);
    if (Array.isArray(object?.usePackage))
      obj.usePackage = object.usePackage.map((e: any) => PackageReference.fromJSON(e));
    if (Array.isArray(object?.canMigrateFrom))
      obj.canMigrateFrom = object.canMigrateFrom.map((e: any) => MigrateFromInfo.fromJSON(e));
    return obj;
  },
  toJSON(message: ModuleDescriptor): unknown {
    const obj: any = {};
    message.goImport !== undefined && (obj.goImport = message.goImport);
    if (message.usePackage) {
      obj.usePackage = message.usePackage.map((e) => (e ? PackageReference.toJSON(e) : undefined));
    } else {
      obj.usePackage = [];
    }
    if (message.canMigrateFrom) {
      obj.canMigrateFrom = message.canMigrateFrom.map((e) => (e ? MigrateFromInfo.toJSON(e) : undefined));
    } else {
      obj.canMigrateFrom = [];
    }
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<ModuleDescriptor>, I>>(object: I): ModuleDescriptor {
    const message = createBaseModuleDescriptor();
    message.goImport = object.goImport ?? "";
    message.usePackage = object.usePackage?.map((e) => PackageReference.fromPartial(e)) || [];
    message.canMigrateFrom = object.canMigrateFrom?.map((e) => MigrateFromInfo.fromPartial(e)) || [];
    return message;
  },
};
function createBasePackageReference(): PackageReference {
  return {
    name: "",
    revision: 0,
  };
}
export const PackageReference = {
  typeUrl: "/cosmos.app.v1alpha1.PackageReference",
  encode(message: PackageReference, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.revision !== 0) {
      writer.uint32(16).uint32(message.revision);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): PackageReference {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePackageReference();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.revision = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): PackageReference {
    const obj = createBasePackageReference();
    if (isSet(object.name)) obj.name = String(object.name);
    if (isSet(object.revision)) obj.revision = Number(object.revision);
    return obj;
  },
  toJSON(message: PackageReference): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.revision !== undefined && (obj.revision = Math.round(message.revision));
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<PackageReference>, I>>(object: I): PackageReference {
    const message = createBasePackageReference();
    message.name = object.name ?? "";
    message.revision = object.revision ?? 0;
    return message;
  },
};
function createBaseMigrateFromInfo(): MigrateFromInfo {
  return {
    module: "",
  };
}
export const MigrateFromInfo = {
  typeUrl: "/cosmos.app.v1alpha1.MigrateFromInfo",
  encode(message: MigrateFromInfo, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.module !== "") {
      writer.uint32(10).string(message.module);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MigrateFromInfo {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMigrateFromInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.module = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MigrateFromInfo {
    const obj = createBaseMigrateFromInfo();
    if (isSet(object.module)) obj.module = String(object.module);
    return obj;
  },
  toJSON(message: MigrateFromInfo): unknown {
    const obj: any = {};
    message.module !== undefined && (obj.module = message.module);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<MigrateFromInfo>, I>>(object: I): MigrateFromInfo {
    const message = createBaseMigrateFromInfo();
    message.module = object.module ?? "";
    return message;
  },
};
