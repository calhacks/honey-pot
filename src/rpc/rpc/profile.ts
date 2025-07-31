import { Rpc, RpcGroup } from "@effect/rpc";
import { Schema as S } from "effect";
import { Profile } from "@/schema/supabase";

export class ProfileRpcs extends RpcGroup.make(
	Rpc.make("GetAllProfiles", {
		success: S.Array(Profile.Profile),
		// TODO: proper failure types
		error: S.Unknown,
		payload: S.Struct({}),
	}),

	Rpc.make("GetProfileById", {
		success: Profile.Profile,
		// TODO: proper failure types
		error: S.Unknown,
		payload: S.Struct({
			id: Profile.Profile.fields.id,
		}),
	}),

	Rpc.make("InsertProfile", {
		success: Profile.Profile,
		// TODO: proper failure types
		error: S.Unknown,
		payload: S.Struct({
			user_id: Profile.Profile.fields.user_id,
			created_at: Profile.Profile.fields.created_at,
			updated_at: Profile.Profile.fields.updated_at,
			role: Profile.Profile.fields.role,
			avatar_url: Profile.Profile.fields.avatar_url,
		}),
	}),

	Rpc.make("UpdateProfile", {
		success: Profile.Profile,
		// TODO: proper failure types
		error: S.Unknown,
		payload: S.Struct({
			role: S.optional(Profile.Profile.fields.role),
			avatar_url: S.NullishOr(Profile.Profile.fields.avatar_url),
		}),
	}),

	Rpc.make("DeleteProfile", {
		success: S.Void,
		// TODO: proper failure types
		error: S.Unknown,
		payload: S.Struct({
			id: Profile.Profile.fields.id,
		}),
	}),
) {}
