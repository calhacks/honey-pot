import dotenv from "dotenv";
import { Config, Effect, Schema } from "effect";
import { Environment } from "@/schema/meta";

export class ServerEnv extends Effect.Service<ServerEnv>()("@honey-pot/src/lib/env/server/ServerEnv", {
	effect: Effect.gen(function* () {
		Effect.try(() => dotenv.config({ path: ".env.local" }));

		const config = yield* Config.all({
			VercelEnvironment: Config.redacted(VercelEnvironment),
			VercelGitCommitSha: Config.redacted(VercelGitCommitSha),
			VercelUrl: Config.redacted(VercelUrl),

			NextPublicSupabaseAnonKey: Config.redacted(NextPublicSupabaseAnonKey),
			NextPublicSupabaseUrl: Config.redacted(NextPublicSupabaseUrl),

			PostgresDatabase: Config.redacted(PostgresDatabase),
			PostgresHost: Config.redacted(PostgresHost),
			PostgresPassword: Config.redacted(PostgresPassword),
			PostgresPrismaUrl: Config.redacted(PostgresPrismaUrl),
			PostgresUrlNonPooling: Config.redacted(PostgresUrlNonPooling),
			PostgresUser: Config.redacted(PostgresUser),

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
}) {}

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

const NextPublicSupabaseAnonKey = Config.nonEmptyString("NEXT_PUBLIC_SUPABASE_ANON_KEY").pipe(
	Config.orElse(() => Config.nonEmptyString(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)),
);
const NextPublicSupabaseUrl = Config.nonEmptyString("NEXT_PUBLIC_SUPABASE_URL").pipe(
	Config.orElse(() => Config.nonEmptyString(process.env.NEXT_PUBLIC_SUPABASE_URL)),
);

const PostgresDatabase = Config.nonEmptyString("POSTGRES_DATABASE").pipe(
	Config.orElse(() => Config.nonEmptyString(process.env.POSTGRES_DATABASE)),
);
const PostgresHost = Config.nonEmptyString("POSTGRES_HOST").pipe(
	Config.orElse(() => Config.nonEmptyString(process.env.POSTGRES_HOST)),
);
const PostgresPassword = Config.nonEmptyString("POSTGRES_PASSWORD").pipe(
	Config.orElse(() => Config.nonEmptyString(process.env.POSTGRES_PASSWORD)),
);
const PostgresPrismaUrl = Config.nonEmptyString("POSTGRES_PRISMA_URL").pipe(
	Config.orElse(() => Config.nonEmptyString(process.env.POSTGRES_PRISMA_URL)),
);
const PostgresUrlNonPooling = Config.nonEmptyString("POSTGRES_URL_NON_POOLING").pipe(
	Config.orElse(() => Config.nonEmptyString(process.env.POSTGRES_URL_NON_POOLING)),
);
const PostgresUser = Config.nonEmptyString("POSTGRES_USER").pipe(
	Config.orElse(() => Config.nonEmptyString(process.env.POSTGRES_USER)),
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
