import { Config, Effect, Schema as S } from "effect";

export class ClientEnv extends Effect.Service<ClientEnv>()("@honey-pot/lib/env/client/ClientEnv", {
	effect: Effect.gen(function* () {
		const NextPublicHost = S.Config("NEXT_PUBLIC_VERCEL_URL", S.NonEmptyString).pipe(
			Config.withDefault("http://localhost:3000"),
		);
		const NextPublicSupabaseAnonKey = S.Config("NEXT_PUBLIC_SUPABASE_ANON_KEY", S.NonEmptyString).pipe(
			Config.withDefault(S.decodeUnknownSync(S.String)(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)),
		);
		const NextPublicSupabaseUrl = S.Config("NEXT_PUBLIC_SUPABASE_URL", S.NonEmptyString).pipe(
			Config.withDefault(S.decodeUnknownSync(S.String)(process.env.NEXT_PUBLIC_SUPABASE_URL)),
		);

		const config = yield* Config.all({
			NextPublicHost: Config.redacted(NextPublicHost),
			NextPublicSupabaseAnonKey: Config.redacted(NextPublicSupabaseAnonKey),
			NextPublicSupabaseUrl: Config.redacted(NextPublicSupabaseUrl),
		}).pipe(Effect.catchTag("ConfigError", Effect.die));
		return config;
	}),
}) {}
