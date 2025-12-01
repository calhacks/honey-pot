import { RpcMiddleware } from "@effect/rpc";
import { Context, Schema } from "effect";

class RateLimiterContext extends Context.Tag("src/rpc/middleware/rate-limit/context/RateLimiterContext")<
	RateLimiterContext,
	Schema.Void
>() {}

export class RateLimiterTag extends RpcMiddleware.Tag<RateLimiterTag>()(
	"src/rpc/middleware/rate-limit/context/RateLimiterTag",
	{
		provides: RateLimiterContext,
		// failure: HttpError,
		failure: Schema.Unknown,
	},
) {}
