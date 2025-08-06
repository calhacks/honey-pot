import { Rpc, RpcGroup } from "@effect/rpc";
import { Schema as S } from "effect";
import { Profile } from "@/schema/supabase";

export const GetAllProfiles = Rpc.make("GetAllProfiles", {
	success: S.Array(Profile.Profile),
	// TODO: proper failure types
	error: S.Unknown,
	payload: S.Struct({}),
});

export type GetAllProfilesSuccess = Rpc.Success<typeof GetAllProfiles>;
export type GetAllProfilesError = Rpc.Error<typeof GetAllProfiles>;
export type GetAllProfilesPayload = Rpc.Payload<typeof GetAllProfiles>;

export const GetProfileById = Rpc.make("GetProfileById", {
	success: Profile.Profile,
	// TODO: proper failure types
	error: S.Unknown,
	payload: S.Struct({
		id: Profile.Profile.fields.id,
	}),
});

export type GetProfileByIdSuccess = Rpc.Success<typeof GetProfileById>;
export type GetProfileByIdError = Rpc.Error<typeof GetProfileById>;
export type GetProfileByIdPayload = Rpc.Payload<typeof GetProfileById>;

export const InsertProfile = Rpc.make("InsertProfile", {
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
});

export const UpdateProfile = Rpc.make("UpdateProfile", {
	success: Profile.Profile,
	// TODO: proper failure types
	error: S.Unknown,
	payload: S.Struct({
		role: S.optional(Profile.Profile.fields.role),
		avatar_url: S.NullishOr(Profile.Profile.fields.avatar_url),
	}),
});

export type UpdateProfileSuccess = Rpc.Success<typeof UpdateProfile>;
export type UpdateProfileError = Rpc.Error<typeof UpdateProfile>;
export type UpdateProfilePayload = Rpc.Payload<typeof UpdateProfile>;

export const DeleteProfile = Rpc.make("DeleteProfile", {
	success: S.Void,
	// TODO: proper failure types
	error: S.Unknown,
	payload: S.Struct({
		id: Profile.Profile.fields.id,
	}),
});

export type DeleteProfileSuccess = Rpc.Success<typeof DeleteProfile>;
export type DeleteProfileError = Rpc.Error<typeof DeleteProfile>;
export type DeleteProfilePayload = Rpc.Payload<typeof DeleteProfile>;

export class ProfileRpcs extends RpcGroup.make(
	GetAllProfiles,
	GetProfileById,
	InsertProfile,
	UpdateProfile,
	DeleteProfile,
) {}
