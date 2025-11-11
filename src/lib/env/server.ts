import dotenv from "dotenv";
import { Config, Effect, Schema as S } from "effect";
import { Environment } from "@/schema/meta";

export class ServerEnv extends Effect.Service<ServerEnv>()("@honey-pot/src/lib/env/server/ServerEnv", {
	effect: Effect.gen(function* () {
		Effect.try(() => dotenv.config({ path: ".env.local" }));

		const config = yield* Config.all({
			VercelEnvironment: Config.redacted(VercelEnvironment),
			VercelGitCommitSha: Config.redacted(VercelGitCommitSha),
			VercelHost: Config.redacted(VercelHost),
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

export const VercelEnvironment = S.Config("VERCEL_ENV", Environment).pipe(
	Config.orElse(() => Config.succeed(Environment.pipe(S.pickLiteral("development")).literals[0])),
);

export const VercelGitCommitSha = S.Config("VERCEL_GIT_COMMIT_SHA", S.NonEmptyString).pipe(
	Config.orElse(() => Config.succeed("local")),
);
export const VercelHost = S.Config("VERCEL_URL", S.NonEmptyString).pipe(
	Config.orElse(() => Config.succeed("http://localhost:3000")),
);
// Vercel only exposes the preview deployment URL, so I added custom fallbacks URLs for development and production environments.
// In the case that `VERCEL_URL` is not defined, then the program is running in a preview environment.
export const VercelUrl = Config.nonEmptyString("VERCEL_URL").pipe(
	Config.orElse(() => Config.succeed(S.decodeUnknownSync(S.NonEmptyString)(process.env.VERCEL_URL))),
	Config.map((url) =>
		VercelEnvironment.pipe(Effect.map((environment) => (environment === "preview" ? `https://${url}` : url))),
	),
);

export const NextPublicSupabaseAnonKey = S.Config("NEXT_PUBLIC_SUPABASE_ANON_KEY", S.NonEmptyString).pipe(
	Config.orElse(() =>
		Config.succeed(S.decodeUnknownSync(S.NonEmptyString)(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)),
	),
);
export const NextPublicSupabaseUrl = S.Config("NEXT_PUBLIC_SUPABASE_URL", S.NonEmptyString).pipe(
	Config.orElse(() => Config.succeed(S.decodeUnknownSync(S.NonEmptyString)(process.env.NEXT_PUBLIC_SUPABASE_URL))),
);

export const PostgresDatabase = S.Config("POSTGRES_DATABASE", S.NonEmptyString).pipe(
	Config.orElse(() => Config.succeed(S.decodeUnknownSync(S.NonEmptyString)(process.env.POSTGRES_DATABASE))),
);
export const PostgresHost = S.Config("POSTGRES_HOST", S.NonEmptyString).pipe(
	Config.orElse(() => Config.succeed(S.decodeUnknownSync(S.NonEmptyString)(process.env.POSTGRES_HOST))),
);
export const PostgresPassword = S.Config("POSTGRES_PASSWORD", S.NonEmptyString).pipe(
	Config.orElse(() => Config.succeed(S.decodeUnknownSync(S.NonEmptyString)(process.env.POSTGRES_PASSWORD))),
);
export const PostgresPrismaUrl = S.Config("POSTGRES_PRISMA_URL", S.NonEmptyString).pipe(
	Config.orElse(() => Config.succeed(S.decodeUnknownSync(S.NonEmptyString)(process.env.POSTGRES_PRISMA_URL))),
);
export const PostgresUrlNonPooling = S.Config("POSTGRES_URL_NON_POOLING", S.NonEmptyString).pipe(
	Config.orElse(() => Config.succeed(S.decodeUnknownSync(S.NonEmptyString)(process.env.POSTGRES_URL_NON_POOLING))),
);
export const PostgresUser = S.Config("POSTGRES_USER", S.NonEmptyString).pipe(
	Config.orElse(() => Config.succeed(S.decodeUnknownSync(S.NonEmptyString)(process.env.POSTGRES_USER))),
);

export const SupabaseAnonKey = S.Config("SUPABASE_ANON_KEY", S.NonEmptyString).pipe(
	Config.orElse(() => Config.succeed(S.decodeUnknownSync(S.NonEmptyString)(process.env.SUPABASE_ANON_KEY))),
);
export const SupabaseJwtSecret = S.Config("SUPABASE_JWT_SECRET", S.NonEmptyString).pipe(
	Config.orElse(() => Config.succeed(S.decodeUnknownSync(S.NonEmptyString)(process.env.SUPABASE_JWT_SECRET))),
);
export const SupabasePublishableDefaultKey = S.Config("SUPABASE_PUBLISHABLE_DEFAULT_KEY", S.NonEmptyString).pipe(
	Config.orElse(() =>
		Config.succeed(S.decodeUnknownSync(S.NonEmptyString)(process.env.SUPABASE_PUBLISHABLE_DEFAULT_KEY)),
	),
);
export const SupabaseSecretDefaultKey = S.Config("SUPABASE_SECRET_DEFAULT_KEY", S.NonEmptyString).pipe(
	Config.orElse(() => Config.succeed(S.decodeUnknownSync(S.NonEmptyString)(process.env.SUPABASE_SECRET_DEFAULT_KEY))),
);
export const SupabaseServiceRoleKey = S.Config("SUPABASE_SERVICE_ROLE_KEY", S.NonEmptyString).pipe(
	Config.orElse(() => Config.succeed(S.decodeUnknownSync(S.NonEmptyString)(process.env.SUPABASE_SERVICE_ROLE_KEY))),
);
export const SupabaseUrl = S.Config("SUPABASE_URL", S.NonEmptyString).pipe(
	Config.orElse(() => Config.succeed(S.decodeUnknownSync(S.NonEmptyString)(process.env.SUPABASE_URL))),
);

export const VercelOidcToken = S.Config("VERCEL_OIDC_TOKEN", S.NonEmptyString).pipe(
	Config.orElse(() => Config.succeed(S.decodeUnknownSync(S.NonEmptyString)(process.env.VERCEL_OIDC_TOKEN))),
);

export const BetterStackOtelBearerToken = S.Config("BETTER_STACK_OTEL_BEARER_TOKEN", S.NonEmptyString).pipe(
	Config.orElse(() =>
		Config.succeed(S.decodeUnknownSync(S.NonEmptyString)(process.env.BETTER_STACK_OTEL_BEARER_TOKEN)),
	),
);
export const BetterStackOtelCompression = S.Config("BETTER_STACK_OTEL_COMPRESSION", S.NonEmptyString).pipe(
	Config.orElse(() =>
		Config.succeed(S.decodeUnknownSync(S.NonEmptyString)(process.env.BETTER_STACK_OTEL_COMPRESSION)),
	),
);
export const BetterStackOtelLogsEndpoint = S.Config("BETTER_STACK_OTEL_LOGS_ENDPOINT", S.NonEmptyString).pipe(
	Config.orElse(() =>
		Config.succeed(S.decodeUnknownSync(S.NonEmptyString)(process.env.BETTER_STACK_OTEL_LOGS_ENDPOINT)),
	),
);
export const BetterStackOtelMetricsEndpoint = S.Config("BETTER_STACK_OTEL_METRICS_ENDPOINT", S.NonEmptyString).pipe(
	Config.orElse(() =>
		Config.succeed(S.decodeUnknownSync(S.NonEmptyString)(process.env.BETTER_STACK_OTEL_METRICS_ENDPOINT)),
	),
);
export const BetterStackOtelServiceName = S.Config("BETTER_STACK_OTEL_SERVICE_NAME", S.NonEmptyString).pipe(
	Config.orElse(() =>
		Config.succeed(S.decodeUnknownSync(S.NonEmptyString)(process.env.BETTER_STACK_OTEL_SERVICE_NAME)),
	),
);
export const BetterStackOtelTracesEndpoint = S.Config("BETTER_STACK_OTEL_TRACES_ENDPOINT", S.NonEmptyString).pipe(
	Config.orElse(() =>
		Config.succeed(S.decodeUnknownSync(S.NonEmptyString)(process.env.BETTER_STACK_OTEL_TRACES_ENDPOINT)),
	),
);

export const GoogleClientId = S.Config("GOOGLE_CLIENT_ID", S.NonEmptyString).pipe(
	Config.orElse(() => Config.succeed(S.decodeUnknownSync(S.NonEmptyString)(process.env.GOOGLE_CLIENT_ID))),
);
export const GoogleClientSecret = S.Config("GOOGLE_CLIENT_SECRET", S.NonEmptyString).pipe(
	Config.orElse(() => Config.succeed(S.decodeUnknownSync(S.NonEmptyString)(process.env.GOOGLE_CLIENT_SECRET))),
);
