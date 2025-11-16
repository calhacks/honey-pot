import { Schema } from "effect";

export const ProfileRole = Schema.Literal("admin", "team", "staff", "hacker");

export const Profile = Schema.Struct({
	id: Schema.UUID,
	user_id: Schema.UUID,
	created_at: Schema.Date,
	updated_at: Schema.Date,
	role: ProfileRole,
	avatar_url: Schema.NullOr(Schema.String),
});
export type Profile = typeof Profile.Type;

export const Event = Schema.Struct({
	id: Schema.UUID,
	title: Schema.String,
	description: Schema.NullOr(Schema.String),
	created_at: Schema.Date,
	created_by: Schema.UUID,
	updated_at: Schema.Date,
	starts_at: Schema.NullOr(Schema.Date),
	ends_at: Schema.NullOr(Schema.Date),
	dashboard_slug: Schema.String,
	landing_page_absolute_url: Schema.NullOr(Schema.String),
	live_site_absolute_url: Schema.NullOr(Schema.String),
});
export type Event = typeof Event.Type;
