import { Config, Effect } from "effect";

export class ClientEnv extends Effect.Service<ClientEnv>()("@honey-pot/src/lib/env/client/ClientEnv", {
	effect: Effect.gen(function* () {
		const NextPublicHost = Config.nonEmptyString("NEXT_PUBLIC_VERCEL_URL").pipe(
			Config.withDefault("http://localhost:3000"),
		);
		const NextPublicSupabasePublishableKey = Config.nonEmptyString("SUPABASE_PUBLISHABLE_DEFAULT_KEY").pipe(
			Config.orElse(() => Config.nonEmptyString(process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY)),
		);
		const NextPublicSupabaseUrl = Config.nonEmptyString("NEXT_PUBLIC_SUPABASE_URL").pipe(
			Config.orElse(() => Config.nonEmptyString(process.env.NEXT_PUBLIC_SUPABASE_URL)),
		);
		// Vercel only exposes the preview deployment URL, so I added custom fallbacks URLs for development and production environments.
		// i.e. in the case that `NEXT_PUBLIC_VERCEL_URL` is not defined, then the program is running in a preview environment.
		const NextPublicVercelUrl = Config.nonEmptyString("NEXT_PUBLIC_VERCEL_URL").pipe(
			Config.orElse(() => Config.nonEmptyString(process.env.NEXT_PUBLIC_VERCEL_URL)),
		);

		const config = yield* Config.all({
			NextPublicHost: Config.redacted(NextPublicHost),
			NextPublicSupabasePublishableKey: Config.redacted(NextPublicSupabasePublishableKey),
			NextPublicSupabaseUrl: Config.redacted(NextPublicSupabaseUrl),
			NextPublicVercelUrl: Config.redacted(NextPublicVercelUrl),
		});
		return config;
	}),
}) {}
