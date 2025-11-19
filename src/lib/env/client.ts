import { Config, Effect } from "effect";

export class ClientEnv extends Effect.Service<ClientEnv>()("@honey-pot/src/lib/env/client/ClientEnv", {
	effect: Effect.gen(function* () {
		const NextPublicVercelUrl = Config.nonEmptyString("NEXT_PUBLIC_VERCEL_URL").pipe(
			Config.withDefault("http://localhost:3000"),
			Config.map((url) => (url.startsWith("http") ? url : `https://${url}`)),
		);

		const config = yield* Config.all({
			NextPublicVercelUrl: Config.redacted(NextPublicVercelUrl),
		});
		return config;
	}),
}) {}
