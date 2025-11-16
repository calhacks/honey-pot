import { Rpc, RpcGroup } from "@effect/rpc";
import { Schema } from "effect";

export const SendMagicLink = Rpc.make("SendMagicLink", {
	success: Schema.Undefined,
	error: Schema.Unknown,
	payload: Schema.Struct({
		email: Schema.String,
	}),
});

export type SendMagicLinkSuccess = Rpc.Success<typeof SendMagicLink>;
export type SendMagicLinkError = Rpc.Error<typeof SendMagicLink>;
export type SendMagicLinkPayload = Rpc.Payload<typeof SendMagicLink>;

export const GoogleOAuthLogin = Rpc.make("GoogleOAuthLogin", {
	success: Schema.String,
	error: Schema.Unknown,
	payload: Schema.Struct({}),
});

export type GoogleOAuthLoginSuccess = Rpc.Success<typeof GoogleOAuthLogin>;
export type GoogleOAuthLoginError = Rpc.Error<typeof GoogleOAuthLogin>;
export type GoogleOAuthLoginPayload = Rpc.Payload<typeof GoogleOAuthLogin>;

export class LoginRpcs extends RpcGroup.make(SendMagicLink, GoogleOAuthLogin) {}
