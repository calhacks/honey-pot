import { Config, Effect } from "effect";

export class ClientEnv extends Effect.Service<ClientEnv>()("@honey-pot/src/lib/env/client/ClientEnv", {
	effect: Effect.gen(function* () {
		const NextPublicVercelUrl = Config.nonEmptyString("VERCEL_URL").pipe(
			Config.withDefault("http://localhost:3000"),
			Config.map((url) => (url.startsWith("http") ? url : `https://${url}`)),
		);

		const config = yield* Config.all({
			NextPublicVercelUrl: Config.redacted(NextPublicVercelUrl),
		});
		return config;
	}).pipe(
		Effect.tap(Effect.annotateCurrentSpan),
		Effect.tapErrorCause((error) => Effect.annotateCurrentSpan({ error: error.toJSON() })),
	),
}) {}
