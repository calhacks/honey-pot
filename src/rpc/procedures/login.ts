import { Effect } from "effect";
import { SupabaseServerClient } from "@/lib/supabase/client";
import { LoginRpcs } from "@/schema/rpc/login";

export const LoginProcedures = LoginRpcs.toLayer(
	// eslint-disable-next-line eslint(require-yield)
	Effect.gen(function* () {
		return {
			EmailLogin: (request) =>
				Effect.gen(function* () {
					const supabase = yield* SupabaseServerClient;
					const query = supabase.auth.signInWithOtp({
						email: request.email,
						options: {
							shouldCreateUser: true,
						},
					});
				}),
		};
	}),
);
