import { Config, Effect, Schema as S } from "effect";

export class ClientEnv extends Effect.Service<ClientEnv>()("@honey-pot/src/lib/env/client/ClientEnv", {
	effect: Effect.gen(function* () {
		const NextPublicHost = S.Config("NEXT_PUBLIC_VERCEL_URL", S.NonEmptyString).pipe(
			Config.withDefault("http://localhost:3000"),
		);
		const NextPublicSupabaseAnonKey = S.Config("NEXT_PUBLIC_SUPABASE_ANON_KEY", S.NonEmptyString).pipe(
			Config.orElse(() =>
				Config.succeed(S.decodeUnknownSync(S.NonEmptyString)(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)),
			),
		);
		const NextPublicSupabaseUrl = S.Config("NEXT_PUBLIC_SUPABASE_URL", S.NonEmptyString).pipe(
			Config.orElse(() =>
				Config.succeed(S.decodeUnknownSync(S.NonEmptyString)(process.env.NEXT_PUBLIC_SUPABASE_URL)),
			),
		);
		// Vercel only exposes the preview deployment URL, so I added custom fallbacks URLs for development and production environments.
		// i.e. in the case that `NEXT_PUBLIC_VERCEL_URL` is not defined, then the program is running in a preview environment.
		const NextPublicVercelUrl = S.Config("NEXT_PUBLIC_VERCEL_URL", S.NonEmptyString).pipe(
			Config.orElse(() =>
				Config.succeed(S.decodeUnknownSync(S.NonEmptyString)(process.env.NEXT_PUBLIC_VERCEL_URL)),
			),
		);

		const config = yield* Config.all({
			NextPublicHost: Config.redacted(NextPublicHost),
			NextPublicSupabaseAnonKey: Config.redacted(NextPublicSupabaseAnonKey),
			NextPublicSupabaseUrl: Config.redacted(NextPublicSupabaseUrl),
			NextPublicVercelUrl: Config.redacted(NextPublicVercelUrl),
		});
		return config;
	}),
}) {}
