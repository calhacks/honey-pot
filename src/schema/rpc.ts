/**
 * @fileoverview Access control RPCs for the Honey Pot API.
 *
 * @description This file contains the RPCs for the Honey Pot API.
 *
 * General guidelines:
 * - Any non-trivial Schemas (structs, enums, etc.) should be defined in the `supabase.ts` file.
 * - Prefer using types defined in `supabase.ts` over redefining them here. (e.g. `ProfileTable.ProfileDb.fields.id` over `S.UUID`)
 * - Inserts should never contain optional fields.
 * - Take time to consider whether an update field should be nullable, optional, or required.
 */

import { Rpc, RpcGroup } from "@effect/rpc";
import { Schema as S } from "effect";
import { Profile } from "@/schema/supabase";

export class ProfileRpcs extends RpcGroup.make(
    Rpc.make("GetAllProfiles", {
        success: S.Array(Profile.Table),
        // TODO: proper failure types
        error: S.Unknown,
        payload: {},
    }),

    Rpc.make("GetProfileById", {
        success: Profile.Table,
        // TODO: proper failure types
        error: S.Unknown,
        payload: {
            id: Profile.Table.fields.id,
        },
    }),

    Rpc.make("InsertProfile", {
        success: Profile.Table,
        // TODO: proper failure types
        error: S.Unknown,
        payload: {
            ...Profile.Table.fields,
        },
    }),

    Rpc.make("UpdateProfile", {
        success: Profile.Table,
        // TODO: proper failure types
        error: S.Unknown,
        payload: {
            role: S.optional(Profile.Table.fields.role),
            avatar_url: S.NullishOr(Profile.Table.fields.avatar_url),
        },
    }),

    Rpc.make("DeleteProfile", {
        success: S.Void,
        // TODO: proper failure types
        error: S.Unknown,
        payload: {
            id: Profile.Table.fields.id,
        },
    }),
) { }