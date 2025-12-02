import { Rpc, RpcGroup } from "@effect/rpc";
import { Schema } from "effect";
import { RateLimiterTag } from "@/rpc/middleware/rate-limit/context";

export const SendMagicLink = Rpc.make("SendMagicLink", {
	success: Schema.Undefined,
	error: Schema.Unknown,
	payload: Schema.Struct({
		email: Schema.String,
	}),
});

export const GoogleOAuthLogin = Rpc.make("GoogleOAuthLogin", {
	success: Schema.String,
	error: Schema.Unknown,
	payload: Schema.Struct({}),
});

export const SignOut = Rpc.make("SignOut", {
	success: Schema.Undefined,
	error: Schema.Unknown,
	payload: Schema.Struct({}),
});

export class AuthRpcs extends RpcGroup.make(SendMagicLink, GoogleOAuthLogin, SignOut).middleware(RateLimiterTag) {}
