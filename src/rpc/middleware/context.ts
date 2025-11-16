import { RpcMiddleware } from "@effect/rpc";
import { Context } from "effect";
import { HttpError } from "@/schema/http";
import type { Profile } from "@/schema/supabase";

class ProfileContext extends Context.Tag("src/rpc/middleware/ProfileContext")<ProfileContext, Profile>() {}

export class AuthenticatedUserMiddlewareContext extends RpcMiddleware.Tag<AuthenticatedUserMiddlewareContext>()(
	"src/rpc/middleware/AuthenticatedUserMiddleware",
	{
		provides: ProfileContext,
		failure: HttpError,
	},
) {}
