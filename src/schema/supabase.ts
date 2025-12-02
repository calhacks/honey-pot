import { Schema } from "effect";

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

export const Profile = Schema.Struct({
	id: Schema.UUID,
	user_id: Schema.UUID,
	created_at: Schema.DateTimeUtc,
	updated_at: Schema.DateTimeUtc,
	avatar_url: Schema.NullOr(Schema.String),
	first_name: Schema.NullOr(Schema.String),
	last_name: Schema.NullOr(Schema.String),
	email: Schema.NullOr(Schema.String),
	is_admin: Schema.Boolean,
});
export type Profile = typeof Profile.Type;

export const RoleSlugs = Schema.Literal("organizer", "sponsor", "mentor", "volunteer", "hacker");
export const RoleLabels = Schema.Literal("Organizer", "Sponsor", "Mentor", "Volunteer", "Hacker");

export const Role = Schema.Struct({
	id: Schema.UUID,
	slug: RoleSlugs,
	label: RoleLabels,
});

export const EventProfileRoles = Schema.Struct({
	event_id: Schema.UUID,
	profile_id: Schema.UUID,
	role_id: Schema.UUID,
	created_at: Schema.DateTimeUtc,
	updated_at: Schema.DateTimeUtc,
});
