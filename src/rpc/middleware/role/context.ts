import { RpcMiddleware } from "@effect/rpc";
import { Context, Schema } from "effect";

class ProfileContext extends Context.Tag("src/rpc/middleware/role/context/ProfileContext")<
	ProfileContext,
	Schema.Void
>() {}

export class AuthenticatedUser extends RpcMiddleware.Tag<AuthenticatedUser>()("src/rpc/middleware/AuthenticatedUser", {
	provides: ProfileContext,
	// failure: HttpError,
	failure: Schema.Unknown,
}) {}

export class AdminUser extends RpcMiddleware.Tag<AdminUser>()("src/rpc/middleware/role/context/AdminUser", {
	provides: ProfileContext,
	// failure: HttpError,
	failure: Schema.Unknown,
}) {}
