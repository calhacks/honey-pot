import { Rpc, RpcGroup } from "@effect/rpc";
import { Schema as S } from "effect";

export class SupabaseEmailLoginError extends S.TaggedError<SupabaseEmailLoginError>("SupabaseEmailLoginError")(
	"SupabaseEmailLoginError",
	{
		message: S.String,
	},
) {}

export const EmailLogin = Rpc.make("EmailLogin", {
	success: S.Void,
	error: SupabaseEmailLoginError,
	payload: S.Struct({
		email: S.String,
	}),
});

export type EmailLoginSuccess = Rpc.Success<typeof EmailLogin>;
export type EmailLoginError = Rpc.Error<typeof EmailLogin>;
export type EmailLoginPayload = Rpc.Payload<typeof EmailLogin>;

export class LoginRpcs extends RpcGroup.make(EmailLogin) {}
