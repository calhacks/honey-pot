import { Schema } from "effect";

export const ProfileRole = Schema.Literal("admin", "team", "staff", "hacker");

export const Profile = Schema.Struct({
	id: Schema.UUID,
	user_id: Schema.UUID,
	created_at: Schema.DateTimeUtc,
	updated_at: Schema.DateTimeUtc,
	role: ProfileRole,
	avatar_url: Schema.NullOr(Schema.String),
	first_name: Schema.NullOr(Schema.String),
	last_name: Schema.NullOr(Schema.String),
	email: Schema.NullOr(Schema.String),
});
export type Profile = typeof Profile.Type;

export const AdminProfile = Profile.pipe(Schema.filter((profile) => profile.role === "admin"));
export type AdminProfile = typeof AdminProfile.Type;

export const Event = Schema.Struct({
	id: Schema.UUID,
	created_at: Schema.DateTimeUtc,
	updated_at: Schema.DateTimeUtc,
	title: Schema.String,
	description: Schema.NullOr(Schema.String),
	created_by: Schema.NullOr(Schema.UUID),
	starts_at: Schema.NullOr(Schema.DateTimeUtc),
	ends_at: Schema.NullOr(Schema.DateTimeUtc),
	slug: Schema.String,
	landing_page_absolute_url: Schema.NullOr(Schema.String),
	live_site_absolute_url: Schema.NullOr(Schema.String),
	avatar_url: Schema.NullOr(Schema.String),
});
export type Event = typeof Event.Type;
