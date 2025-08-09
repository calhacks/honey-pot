import { Rpc, RpcGroup } from "@effect/rpc";
import { Schema as S } from "effect";

export class SupabaseError extends S.TaggedError<SupabaseError>("SupabaseError")("SupabaseError", {
	message: S.String,
	name: S.String,
}) {}

export const EmailSendOtp = Rpc.make("EmailSendOtp", {
	success: S.Undefined,
	error: SupabaseError,
	payload: S.Struct({
		email: S.String,
	}),
});

export type EmailSendOtpSuccess = Rpc.Success<typeof EmailSendOtp>;
export type EmailSendOtpError = Rpc.Error<typeof EmailSendOtp>;
export type EmailSendOtpPayload = Rpc.Payload<typeof EmailSendOtp>;

export class LoginRpcs extends RpcGroup.make(EmailSendOtp) {}
