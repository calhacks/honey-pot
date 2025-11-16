import { Rpc, RpcGroup } from "@effect/rpc";
import { Schema } from "effect";
import { AuthenticatedUserMiddlewareContext } from "@/rpc/middleware/context";
import { Profile } from "@/schema/supabase";

export const GetAllProfiles = Rpc.make("GetAllProfiles", {
	success: Schema.Array(Profile),
	// TODO: proper failure types
	error: Schema.Unknown,
	payload: Schema.Struct({}),
});

export type GetAllProfilesSuccess = Rpc.Success<typeof GetAllProfiles>;
export type GetAllProfilesError = Rpc.Error<typeof GetAllProfiles>;
export type GetAllProfilesPayload = Rpc.Payload<typeof GetAllProfiles>;

export const GetProfileById = Rpc.make("GetProfileById", {
	success: Profile,
	// TODO: proper failure types
	error: Schema.Unknown,
	payload: Schema.Struct({
		id: Profile.fields.id,
	}),
}).middleware(AuthenticatedUserMiddlewareContext);

export type GetProfileByIdSuccess = Rpc.Success<typeof GetProfileById>;
export type GetProfileByIdError = Rpc.Error<typeof GetProfileById>;
export type GetProfileByIdPayload = Rpc.Payload<typeof GetProfileById>;

export const CreateProfile = Rpc.make("CreateProfile", {
	success: Profile,
	// TODO: proper failure types
	error: Schema.Unknown,
	payload: Schema.Struct({
		user_id: Profile.fields.user_id,
		role: Profile.fields.role,
		avatar_url: Profile.fields.avatar_url,
	}),
});

export const UpdateProfile = Rpc.make("UpdateProfile", {
	success: Profile,
	// TODO: proper failure types
	error: Schema.Unknown,
	payload: Schema.Struct({
		role: Schema.optionalWith(Profile.fields.role, { exact: true }),
		avatar_url: Schema.optionalWith(Profile.fields.avatar_url, { exact: true }),
	}),
});

export type UpdateProfileSuccess = Rpc.Success<typeof UpdateProfile>;
export type UpdateProfileError = Rpc.Error<typeof UpdateProfile>;
export type UpdateProfilePayload = Rpc.Payload<typeof UpdateProfile>;

export const DeleteProfile = Rpc.make("DeleteProfile", {
	success: Schema.Undefined,
	// TODO: proper failure types
	error: Schema.Unknown,
	payload: Schema.Struct({
		id: Profile.fields.id,
	}),
});

export type DeleteProfileSuccess = Rpc.Success<typeof DeleteProfile>;
export type DeleteProfileError = Rpc.Error<typeof DeleteProfile>;
export type DeleteProfilePayload = Rpc.Payload<typeof DeleteProfile>;

export class ProfileRpcs extends RpcGroup.make(
	GetAllProfiles,
	GetProfileById,
	CreateProfile,
	UpdateProfile,
	DeleteProfile,
) {}
