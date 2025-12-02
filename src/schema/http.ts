import { Schema } from "effect";

export const BadRequest = Schema.TaggedStruct("BadRequest", {
	status: Schema.optionalWith(Schema.Literal(400), { default: () => 400 as const }),
	message: Schema.optional(Schema.NonEmptyString),
});
export type BadRequest = typeof BadRequest.Type;

export const Unauthorized = Schema.TaggedStruct("Unauthorized", {
	status: Schema.optionalWith(Schema.Literal(401), { default: () => 401 as const }),
	message: Schema.optional(Schema.NonEmptyString),
});
export type Unauthorized = typeof Unauthorized.Type;

export const Forbidden = Schema.TaggedStruct("Forbidden", {
	status: Schema.optionalWith(Schema.Literal(403), { default: () => 403 as const }),
	message: Schema.optional(Schema.NonEmptyString),
});
export type Forbidden = typeof Forbidden.Type;

export const NotFound = Schema.TaggedStruct("NotFound", {
	status: Schema.optionalWith(Schema.Literal(404), { default: () => 404 as const }),
	message: Schema.optional(Schema.NonEmptyString),
});
export type NotFound = typeof NotFound.Type;

export const MethodNotAllowed = Schema.TaggedStruct("MethodNotAllowed", {
	status: Schema.optionalWith(Schema.Literal(405), { default: () => 405 as const }),
	message: Schema.optional(Schema.NonEmptyString),
});
export type MethodNotAllowed = typeof MethodNotAllowed.Type;

export const NotAcceptable = Schema.TaggedStruct("NotAcceptable", {
	status: Schema.optionalWith(Schema.Literal(406), { default: () => 406 as const }),
	message: Schema.optional(Schema.NonEmptyString),
});
export type NotAcceptable = typeof NotAcceptable.Type;

export const RequestTimeout = Schema.TaggedStruct("RequestTimeout", {
	status: Schema.optionalWith(Schema.Literal(408), { default: () => 408 as const }),
	message: Schema.optional(Schema.NonEmptyString),
});
export type RequestTimeout = typeof RequestTimeout.Type;

export const Conflict = Schema.TaggedStruct("Conflict", {
	status: Schema.optionalWith(Schema.Literal(409), { default: () => 409 as const }),
	message: Schema.optional(Schema.NonEmptyString),
});
export type Conflict = typeof Conflict.Type;

export const Gone = Schema.TaggedStruct("Gone", {
	status: Schema.optionalWith(Schema.Literal(410), { default: () => 410 as const }),
	message: Schema.optional(Schema.NonEmptyString),
});
export type Gone = typeof Gone.Type;

export const InternalServerError = Schema.TaggedStruct("InternalServerError", {
	status: Schema.optionalWith(Schema.Literal(500), { default: () => 500 as const }),
	message: Schema.optional(Schema.NonEmptyString),
});
export type InternalServerError = typeof InternalServerError.Type;

export const NotImplemented = Schema.TaggedStruct("NotImplemented", {
	status: Schema.optionalWith(Schema.Literal(501), { default: () => 501 as const }),
	message: Schema.optional(Schema.NonEmptyString),
});
export type NotImplemented = typeof NotImplemented.Type;

export const BadGateway = Schema.TaggedStruct("BadGateway", {
	status: Schema.optionalWith(Schema.Literal(502), { default: () => 502 as const }),
	message: Schema.optional(Schema.NonEmptyString),
});
export type BadGateway = typeof BadGateway.Type;

export const ServiceUnavailable = Schema.TaggedStruct("ServiceUnavailable", {
	status: Schema.optionalWith(Schema.Literal(503), { default: () => 503 as const }),
	message: Schema.optional(Schema.NonEmptyString),
});
export type ServiceUnavailable = typeof ServiceUnavailable.Type;

export const HttpError = Schema.Union(
	BadRequest,
	Unauthorized,
	Forbidden,
	NotFound,
	MethodNotAllowed,
	NotAcceptable,
	RequestTimeout,
	Conflict,
	Gone,
	InternalServerError,
	NotImplemented,
	BadGateway,
	ServiceUnavailable,
);
export type HttpError = typeof HttpError.Type;
