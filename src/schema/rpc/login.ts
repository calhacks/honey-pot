import { Schema as S } from "effect";

export const LoginPayload = S.Struct({
	email: S.String,
});
export type LoginPayload = S.Schema.Type<typeof LoginPayload>;
