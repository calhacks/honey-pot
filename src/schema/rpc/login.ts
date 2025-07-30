import { Rpc, RpcGroup } from "@effect/rpc";
import { Schema as S } from "effect";

export class LoginRpcs extends RpcGroup.make(
	Rpc.make("EmailLogin", {
		success: S.Void,
		// TODO: proper failure types
		error: S.Unknown,
		payload: S.Struct({
			email: S.String,
		}),
	}),
) {}
