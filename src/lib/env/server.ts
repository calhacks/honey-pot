import dotenv from "dotenv";
import { Config, Context, Effect, Layer, type Redacted, Schema } from "effect";
import { Environment } from "@/schema/meta";

export type ServerEnvType = {
	VercelEnvironment: Redacted.Redacted<Environment>;
	VercelGitCommitSha: Redacted.Redacted<string>;
	VercelUrl: Redacted.Redacted<string>;

	SupabasePublishableDefaultKey: Redacted.Redacted<string>;
	SupabaseSecretDefaultKey: Redacted.Redacted<string>;
	SupabaseUrl: Redacted.Redacted<string>;

	BetterStackOtelBearerToken: Redacted.Redacted<string>;
	BetterStackOtelCompression: Redacted.Redacted<string>;
	BetterStackOtelLogsEndpoint: Redacted.Redacted<string>;
	BetterStackOtelMetricsEndpoint: Redacted.Redacted<string>;
	BetterStackOtelServiceName: Redacted.Redacted<string>;
	BetterStackOtelTracesEndpoint: Redacted.Redacted<string>;

	GoogleClientId: Redacted.Redacted<string>;
	GoogleClientSecret: Redacted.Redacted<string>;
};

export class ServerEnv extends Context.Tag("@honey-pot/src/lib/env/server/ServerEnv")<ServerEnv, ServerEnvType>() {
	static Live = Layer.effect(
		ServerEnv,
		Effect.gen(function* () {
			Effect.try(() => dotenv.config({ path: ".env.local" }));

			const VercelEnvironment = Schema.Config("VERCEL_ENV", Environment).pipe(
				Config.orElse(() => Config.succeed(Environment.pipe(Schema.pickLiteral("development")).literals[0])),
			);
			const VercelGitCommitSha = Config.nonEmptyString("VERCEL_GIT_COMMIT_SHA").pipe(
				Config.orElse(() => Config.succeed("local")),
			);
			// Vercel only exposes the preview deployment URL, so I added custom fallbacks URLs for development and production environments.
			// In the case that `VERCEL_URL` is not defined, then the program is running in a preview environment.
			const VercelUrl = Config.nonEmptyString("VERCEL_URL").pipe(
				Config.orElse(() => Config.nonEmptyString(process.env.VERCEL_URL)),
				Config.map((url) => (url.startsWith("http") ? url : `https://${url}`)),
			);

			const SupabasePublishableDefaultKey = Config.nonEmptyString("SUPABASE_PUBLISHABLE_DEFAULT_KEY").pipe(
				Config.orElse(() => Config.nonEmptyString(process.env.SUPABASE_PUBLISHABLE_DEFAULT_KEY)),
			);
			const SupabaseSecretDefaultKey = Config.nonEmptyString("SUPABASE_SECRET_DEFAULT_KEY").pipe(
				Config.orElse(() => Config.nonEmptyString(process.env.SUPABASE_SECRET_DEFAULT_KEY)),
			);
			const SupabaseUrl = Config.nonEmptyString("SUPABASE_URL").pipe(
				Config.orElse(() => Config.nonEmptyString(process.env.SUPABASE_URL)),
			);

			const BetterStackOtelBearerToken = Config.nonEmptyString("BETTER_STACK_OTEL_BEARER_TOKEN").pipe(
				Config.orElse(() => Config.nonEmptyString(process.env.BETTER_STACK_OTEL_BEARER_TOKEN)),
			);
			const BetterStackOtelCompression = Config.nonEmptyString("BETTER_STACK_OTEL_COMPRESSION").pipe(
				Config.orElse(() => Config.nonEmptyString(process.env.BETTER_STACK_OTEL_COMPRESSION)),
			);
			const BetterStackOtelLogsEndpoint = Config.nonEmptyString("BETTER_STACK_OTEL_LOGS_ENDPOINT").pipe(
				Config.orElse(() => Config.nonEmptyString(process.env.BETTER_STACK_OTEL_LOGS_ENDPOINT)),
			);
			const BetterStackOtelMetricsEndpoint = Config.nonEmptyString("BETTER_STACK_OTEL_METRICS_ENDPOINT").pipe(
				Config.orElse(() => Config.nonEmptyString(process.env.BETTER_STACK_OTEL_METRICS_ENDPOINT)),
			);
			const BetterStackOtelServiceName = Config.nonEmptyString("BETTER_STACK_OTEL_SERVICE_NAME").pipe(
				Config.orElse(() => Config.nonEmptyString(process.env.BETTER_STACK_OTEL_SERVICE_NAME)),
			);
			const BetterStackOtelTracesEndpoint = Config.nonEmptyString("BETTER_STACK_OTEL_TRACES_ENDPOINT").pipe(
				Config.orElse(() => Config.nonEmptyString(process.env.BETTER_STACK_OTEL_TRACES_ENDPOINT)),
			);

			const GoogleClientId = Config.nonEmptyString("GOOGLE_CLIENT_ID").pipe(
				Config.orElse(() => Config.nonEmptyString(process.env.GOOGLE_CLIENT_ID)),
			);
			const GoogleClientSecret = Config.nonEmptyString("GOOGLE_CLIENT_SECRET").pipe(
				Config.orElse(() => Config.nonEmptyString(process.env.GOOGLE_CLIENT_SECRET)),
			);

			const config = yield* Config.all({
				VercelEnvironment: Config.redacted(VercelEnvironment),
				VercelGitCommitSha: Config.redacted(VercelGitCommitSha),
				VercelUrl: Config.redacted(VercelUrl),

				SupabasePublishableDefaultKey: Config.redacted(SupabasePublishableDefaultKey),
				SupabaseSecretDefaultKey: Config.redacted(SupabaseSecretDefaultKey),
				SupabaseUrl: Config.redacted(SupabaseUrl),

				BetterStackOtelBearerToken: Config.redacted(BetterStackOtelBearerToken),
				BetterStackOtelCompression: Config.redacted(BetterStackOtelCompression),
				BetterStackOtelLogsEndpoint: Config.redacted(BetterStackOtelLogsEndpoint),
				BetterStackOtelMetricsEndpoint: Config.redacted(BetterStackOtelMetricsEndpoint),
				BetterStackOtelServiceName: Config.redacted(BetterStackOtelServiceName),
				BetterStackOtelTracesEndpoint: Config.redacted(BetterStackOtelTracesEndpoint),

				GoogleClientId: Config.redacted(GoogleClientId),
				GoogleClientSecret: Config.redacted(GoogleClientSecret),
			});

			return config;
		}).pipe(
			Effect.tap(Effect.annotateCurrentSpan),
			Effect.tapErrorCause((error) => Effect.annotateCurrentSpan({ error: error.toJSON() })),
		),
	);

	static Test = Layer.effect(
		ServerEnv,
		Effect.gen(function* () {
			yield* Effect.try(() => dotenv.config({ path: ".env.test.local" }));

			const VercelEnvironment = Schema.Config("VERCEL_ENV", Environment).pipe(
				Config.orElse(() => Config.succeed(Environment.pipe(Schema.pickLiteral("preview")).literals[0])),
			);
			const VercelGitCommitSha = Config.nonEmptyString("VERCEL_GIT_COMMIT_SHA").pipe(
				Config.orElse(() => Config.succeed("testing")),
			);
			const VercelUrl = Config.string("VERCEL_URL").pipe(
				Config.orElse(() => Config.string(process.env.VERCEL_URL)),
			);

			const SupabasePublishableDefaultKey = Config.nonEmptyString("TEST_SUPABASE_PUBLISHABLE_DEFAULT_KEY").pipe(
				Config.orElse(() => Config.nonEmptyString(process.env.TEST_SUPABASE_PUBLISHABLE_DEFAULT_KEY)),
			);
			const SupabaseSecretDefaultKey = Config.nonEmptyString("TEST_SUPABASE_SECRET_DEFAULT_KEY").pipe(
				Config.orElse(() => Config.nonEmptyString(process.env.TEST_SUPABASE_SECRET_DEFAULT_KEY)),
			);
			const SupabaseUrl = Config.nonEmptyString("TEST_SUPABASE_URL").pipe(
				Config.orElse(() => Config.nonEmptyString(process.env.TEST_SUPABASE_URL)),
			);

			const BetterStackOtelBearerToken = Config.succeed("");
			const BetterStackOtelCompression = Config.succeed("");
			const BetterStackOtelLogsEndpoint = Config.succeed("");
			const BetterStackOtelMetricsEndpoint = Config.succeed("");
			const BetterStackOtelServiceName = Config.succeed("");
			const BetterStackOtelTracesEndpoint = Config.succeed("");

			// TODO: Setup Google Cloud testing environment
			const GoogleClientId = Config.succeed("");
			const GoogleClientSecret = Config.succeed("");

			const config = yield* Config.all({
				VercelEnvironment: Config.redacted(VercelEnvironment),
				VercelGitCommitSha: Config.redacted(VercelGitCommitSha),
				VercelUrl: Config.redacted(VercelUrl),

				SupabasePublishableDefaultKey: Config.redacted(SupabasePublishableDefaultKey),
				SupabaseSecretDefaultKey: Config.redacted(SupabaseSecretDefaultKey),
				SupabaseUrl: Config.redacted(SupabaseUrl),

				BetterStackOtelBearerToken: Config.redacted(BetterStackOtelBearerToken),
				BetterStackOtelCompression: Config.redacted(BetterStackOtelCompression),
				BetterStackOtelLogsEndpoint: Config.redacted(BetterStackOtelLogsEndpoint),
				BetterStackOtelMetricsEndpoint: Config.redacted(BetterStackOtelMetricsEndpoint),
				BetterStackOtelServiceName: Config.redacted(BetterStackOtelServiceName),
				BetterStackOtelTracesEndpoint: Config.redacted(BetterStackOtelTracesEndpoint),

				GoogleClientId: Config.redacted(GoogleClientId),
				GoogleClientSecret: Config.redacted(GoogleClientSecret),
			});

			return config;
		}),
	);
}
