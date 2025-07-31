import { Rpc, RpcGroup } from "@effect/rpc";
import { Schema as S } from "effect";
import { LoginPayload } from "@/schema/rpc/login";

export class LoginRpcs extends RpcGroup.make(
	Rpc.make("EmailLogin", {
		// schema source
		// https://supabase.com/docs/guides/auth/auth-email-passwordless#with-otp
		success: S.Void,
		// TODO: proper failure types
		error: S.Unknown,
		payload: LoginPayload,
	}),
) {}
