import { Rpc, RpcGroup } from "@effect/rpc";
import { Schema } from "effect";
import { RateLimiterTag } from "@/rpc/middleware/rate-limit/context";
import { AdminUser, AuthenticatedUser } from "@/rpc/middleware/role/context";
import { Profile } from "@/schema/supabase";

export const GetAllProfiles = Rpc.make("GetAllProfiles", {
	success: Schema.Array(Profile),
	// TODO: proper failure types
	error: Schema.Unknown,
	payload: Schema.Struct({}),
});

export const GetProfileById = Rpc.make("GetProfileById", {
	success: Profile,
	// TODO: proper failure types
	error: Schema.Unknown,
	payload: Schema.Struct({
		id: Profile.fields.id,
	}),
}).middleware(AuthenticatedUser);

export const GetCurrentProfile = Rpc.make("GetCurrentProfile", {
	success: Profile,
	// TODO: proper failure types
	error: Schema.Unknown,
	payload: Schema.Struct({}),
}).middleware(AuthenticatedUser);

export const CreateProfile = Rpc.make("CreateProfile", {
	success: Profile,
	// TODO: proper failure types
	error: Schema.Unknown,
	payload: Schema.Struct({
		user_id: Profile.fields.user_id,
		role_id: Profile.fields.role_id,
		avatar_url: Profile.fields.avatar_url,
	}),
}).middleware(AdminUser);

export const UpdateProfile = Rpc.make("UpdateProfile", {
	success: Profile,
	// TODO: proper failure types
	error: Schema.Unknown,
	payload: Schema.Struct({
		role_id: Schema.optionalWith(Profile.fields.role_id, { exact: true }),
		avatar_url: Schema.optionalWith(Profile.fields.avatar_url, { exact: true }),
	}),
}).middleware(AuthenticatedUser);

export const DeleteProfile = Rpc.make("DeleteProfile", {
	success: Schema.Undefined,
	// TODO: proper failure types
	error: Schema.Unknown,
	payload: Schema.Struct({
		id: Profile.fields.id,
	}),
}).middleware(AdminUser);

export class ProfileRpcs extends RpcGroup.make(
	GetAllProfiles,
	GetProfileById,
	GetCurrentProfile,
	CreateProfile,
	UpdateProfile,
	DeleteProfile,
).middleware(RateLimiterTag) {}
