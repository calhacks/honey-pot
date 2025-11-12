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

			SupabaseAnonKey: Config.redacted(SupabaseAnonKey),
			SupabaseJwtSecret: Config.redacted(SupabaseJwtSecret),
			SupabasePublishableDefaultKey: Config.redacted(SupabasePublishableDefaultKey),
			SupabaseSecretDefaultKey: Config.redacted(SupabaseSecretDefaultKey),
			SupabaseServiceRoleKey: Config.redacted(SupabaseServiceRoleKey),
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

export const VercelEnvironment = Schema.Config("VERCEL_ENV", Environment).pipe(
	Config.orElse(() => Config.succeed(Environment.pipe(Schema.pickLiteral("development")).literals[0])),
);
export const VercelGitCommitSha = Config.nonEmptyString("VERCEL_GIT_COMMIT_SHA").pipe(
	Config.orElse(() => Config.succeed("local")),
);
// Vercel only exposes the preview deployment URL, so I added custom fallbacks URLs for development and production environments.
// In the case that `VERCEL_URL` is not defined, then the program is running in a preview environment.
export const VercelUrl = Config.nonEmptyString("VERCEL_URL").pipe(
	Config.orElse(() => Config.nonEmptyString(process.env.VERCEL_URL)),
	Config.map((url) => (url.startsWith("http") ? url : `https://${url}`)),
);

export const NextPublicSupabaseAnonKey = Config.nonEmptyString("NEXT_PUBLIC_SUPABASE_ANON_KEY").pipe(
	Config.orElse(() => Config.nonEmptyString(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)),
);
export const NextPublicSupabaseUrl = Config.nonEmptyString("NEXT_PUBLIC_SUPABASE_URL").pipe(
	Config.orElse(() => Config.nonEmptyString(process.env.NEXT_PUBLIC_SUPABASE_URL)),
);

export const PostgresDatabase = Config.nonEmptyString("POSTGRES_DATABASE").pipe(
	Config.orElse(() => Config.nonEmptyString(process.env.POSTGRES_DATABASE)),
);
export const PostgresHost = Config.nonEmptyString("POSTGRES_HOST").pipe(
	Config.orElse(() => Config.nonEmptyString(process.env.POSTGRES_HOST)),
);
export const PostgresPassword = Config.nonEmptyString("POSTGRES_PASSWORD").pipe(
	Config.orElse(() => Config.nonEmptyString(process.env.POSTGRES_PASSWORD)),
);
export const PostgresPrismaUrl = Config.nonEmptyString("POSTGRES_PRISMA_URL").pipe(
	Config.orElse(() => Config.nonEmptyString(process.env.POSTGRES_PRISMA_URL)),
);
export const PostgresUrlNonPooling = Config.nonEmptyString("POSTGRES_URL_NON_POOLING").pipe(
	Config.orElse(() => Config.nonEmptyString(process.env.POSTGRES_URL_NON_POOLING)),
);
export const PostgresUser = Config.nonEmptyString("POSTGRES_USER").pipe(
	Config.orElse(() => Config.nonEmptyString(process.env.POSTGRES_USER)),
);

export const SupabaseAnonKey = Config.nonEmptyString("SUPABASE_ANON_KEY").pipe(
	Config.orElse(() => Config.nonEmptyString(process.env.SUPABASE_ANON_KEY)),
);
export const SupabaseJwtSecret = Config.nonEmptyString("SUPABASE_JWT_SECRET").pipe(
	Config.orElse(() => Config.nonEmptyString(process.env.SUPABASE_JWT_SECRET)),
);
export const SupabasePublishableDefaultKey = Config.nonEmptyString("SUPABASE_PUBLISHABLE_DEFAULT_KEY").pipe(
	Config.orElse(() => Config.nonEmptyString(process.env.SUPABASE_PUBLISHABLE_DEFAULT_KEY)),
);
export const SupabaseSecretDefaultKey = Config.nonEmptyString("SUPABASE_SECRET_DEFAULT_KEY").pipe(
	Config.orElse(() => Config.nonEmptyString(process.env.SUPABASE_SECRET_DEFAULT_KEY)),
);
export const SupabaseServiceRoleKey = Config.nonEmptyString("SUPABASE_SERVICE_ROLE_KEY").pipe(
	Config.orElse(() => Config.nonEmptyString(process.env.SUPABASE_SERVICE_ROLE_KEY)),
);
export const SupabaseUrl = Config.nonEmptyString("SUPABASE_URL").pipe(
	Config.orElse(() => Config.nonEmptyString(process.env.SUPABASE_URL)),
);

export const VercelOidcToken = Config.nonEmptyString("VERCEL_OIDC_TOKEN").pipe(
	Config.orElse(() => Config.nonEmptyString(process.env.VERCEL_OIDC_TOKEN)),
);

export const BetterStackOtelBearerToken = Config.nonEmptyString("BETTER_STACK_OTEL_BEARER_TOKEN").pipe(
	Config.orElse(() => Config.nonEmptyString(process.env.BETTER_STACK_OTEL_BEARER_TOKEN)),
);
export const BetterStackOtelCompression = Config.nonEmptyString("BETTER_STACK_OTEL_COMPRESSION").pipe(
	Config.orElse(() => Config.nonEmptyString(process.env.BETTER_STACK_OTEL_COMPRESSION)),
);
export const BetterStackOtelLogsEndpoint = Config.nonEmptyString("BETTER_STACK_OTEL_LOGS_ENDPOINT").pipe(
	Config.orElse(() => Config.nonEmptyString(process.env.BETTER_STACK_OTEL_LOGS_ENDPOINT)),
);
export const BetterStackOtelMetricsEndpoint = Config.nonEmptyString("BETTER_STACK_OTEL_METRICS_ENDPOINT").pipe(
	Config.orElse(() => Config.nonEmptyString(process.env.BETTER_STACK_OTEL_METRICS_ENDPOINT)),
);
export const BetterStackOtelServiceName = Config.nonEmptyString("BETTER_STACK_OTEL_SERVICE_NAME").pipe(
	Config.orElse(() => Config.nonEmptyString(process.env.BETTER_STACK_OTEL_SERVICE_NAME)),
);
export const BetterStackOtelTracesEndpoint = Config.nonEmptyString("BETTER_STACK_OTEL_TRACES_ENDPOINT").pipe(
	Config.orElse(() => Config.nonEmptyString(process.env.BETTER_STACK_OTEL_TRACES_ENDPOINT)),
);

export const GoogleClientId = Config.nonEmptyString("GOOGLE_CLIENT_ID").pipe(
	Config.orElse(() => Config.nonEmptyString(process.env.GOOGLE_CLIENT_ID)),
);
export const GoogleClientSecret = Config.nonEmptyString("GOOGLE_CLIENT_SECRET").pipe(
	Config.orElse(() => Config.nonEmptyString(process.env.GOOGLE_CLIENT_SECRET)),
);
