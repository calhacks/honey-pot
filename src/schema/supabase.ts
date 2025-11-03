import { Schema as S } from "effect";

export namespace Enums {
	export const Role = S.Literal("admin", "team", "staff", "hacker");
	export type Role = typeof Role.Type;
}

export namespace Profile {
	export const Profile = S.Struct({
		id: S.UUID,
		user_id: S.UUID,
		created_at: S.Date,
		updated_at: S.Date,
		role: Enums.Role,
		avatar_url: S.NullOr(S.String),
	});

	export const Serialize = S.Struct({
		...Profile.fields,
		created_at: S.String,
		updated_at: S.String,
	});

	export type Profile = typeof Profile.Type;
	export type ProfileSerialize = typeof Serialize.Type;
}

export namespace Event {
	export const Table = S.Struct({
		id: S.UUID,
		title: S.String,
		description: S.NullOr(S.String),
		created_at: S.Date,
		created_by: S.UUID,
		updated_at: S.Date,
		starts_at: S.NullOr(S.Date),
		ends_at: S.NullOr(S.Date),
		dashboard_slug: S.String,
		landing_page_absolute_url: S.NullOr(S.String),
		live_site_absolute_url: S.NullOr(S.String),
	});

	export type Event = typeof Table.Type;
}

export namespace ProfileEventAccess {
	export const Table = S.Struct({
		profile_id: S.UUID,
		event_id: S.UUID,
		granted_at: S.Date,
		granted_by: S.UUID,
	});

	export type ProfileEventAccess = typeof Table.Type;
}
