import { RpcMiddleware } from "@effect/rpc";
import { Context } from "effect";
import { HttpError } from "@/schema/http";
import type { Profile } from "@/schema/supabase";

class ProfileContext extends Context.Tag("src/rpc/middleware/ProfileContext")<ProfileContext, Profile>() {}

export class AuthenticatedUser extends RpcMiddleware.Tag<AuthenticatedUser>()("src/rpc/middleware/AuthenticatedUser", {
	provides: ProfileContext,
	failure: HttpError,
}) {}

export class AdminUser extends RpcMiddleware.Tag<AdminUser>()("src/rpc/middleware/AdminUser", {
	provides: ProfileContext,
	failure: HttpError,
}) {}
