import dotenv from "dotenv";
import { Config, Effect, Schema as S } from "effect";

export const ServerEnv = Effect.gen(function* () {
	dotenv.config({ path: ".env" });

	const config = yield* Config.all({
		NextPublicHost: Config.redacted(NextPublicHost),
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
	});
	return config;
}).pipe(Effect.withSpan("@honey-pot/lib/env/server/ServerEnv"));

export const NextPublicHost = S.Config("NEXT_PUBLIC_VERCEL_URL", S.NonEmptyString).pipe(
	Config.withDefault("http://localhost:3000"),
);
export const NextPublicSupabaseAnonKey = S.Config("NEXT_PUBLIC_SUPABASE_ANON_KEY", S.NonEmptyString).pipe(
	Config.withDefault(S.decodeUnknownSync(S.String)(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)),
);
export const NextPublicSupabaseUrl = S.Config("NEXT_PUBLIC_SUPABASE_URL", S.NonEmptyString).pipe(
	Config.withDefault(S.decodeUnknownSync(S.String)(process.env.NEXT_PUBLIC_SUPABASE_URL)),
);
export const PostgresDatabase = S.Config("POSTGRES_DATABASE", S.NonEmptyString).pipe(
	Config.withDefault(S.decodeUnknownSync(S.String)(process.env.POSTGRES_DATABASE)),
);
export const PostgresHost = S.Config("POSTGRES_HOST", S.NonEmptyString).pipe(
	Config.withDefault(S.decodeUnknownSync(S.String)(process.env.POSTGRES_HOST)),
);
export const PostgresPassword = S.Config("POSTGRES_PASSWORD", S.NonEmptyString).pipe(
	Config.withDefault(S.decodeUnknownSync(S.String)(process.env.POSTGRES_PASSWORD)),
);
export const PostgresPrismaUrl = S.Config("POSTGRES_PRISMA_URL", S.NonEmptyString).pipe(
	Config.withDefault(S.decodeUnknownSync(S.String)(process.env.POSTGRES_PRISMA_URL)),
);
export const PostgresUrlNonPooling = S.Config("POSTGRES_URL_NON_POOLING", S.NonEmptyString).pipe(
	Config.withDefault(S.decodeUnknownSync(S.String)(process.env.POSTGRES_URL_NON_POOLING)),
);
export const PostgresUser = S.Config("POSTGRES_USER", S.NonEmptyString).pipe(
	Config.withDefault(S.decodeUnknownSync(S.String)(process.env.POSTGRES_USER)),
);
export const SupabaseAnonKey = S.Config("SUPABASE_ANON_KEY", S.NonEmptyString).pipe(
	Config.withDefault(S.decodeUnknownSync(S.String)(process.env.SUPABASE_ANON_KEY)),
);
export const SupabaseJwtSecret = S.Config("SUPABASE_JWT_SECRET", S.NonEmptyString).pipe(
	Config.withDefault(S.decodeUnknownSync(S.String)(process.env.SUPABASE_JWT_SECRET)),
);
export const SupabasePublishableDefaultKey = S.Config("SUPABASE_PUBLISHABLE_DEFAULT_KEY", S.NonEmptyString).pipe(
	Config.withDefault(S.decodeUnknownSync(S.String)(process.env.SUPABASE_PUBLISHABLE_DEFAULT_KEY)),
);
export const SupabaseSecretDefaultKey = S.Config("SUPABASE_SECRET_DEFAULT_KEY", S.NonEmptyString).pipe(
	Config.withDefault(S.decodeUnknownSync(S.String)(process.env.SUPABASE_SECRET_DEFAULT_KEY)),
);
export const SupabaseServiceRoleKey = S.Config("SUPABASE_SERVICE_ROLE_KEY", S.NonEmptyString).pipe(
	Config.withDefault(S.decodeUnknownSync(S.String)(process.env.SUPABASE_SERVICE_ROLE_KEY)),
);
export const SupabaseUrl = S.Config("SUPABASE_URL", S.NonEmptyString).pipe(
	Config.withDefault(S.decodeUnknownSync(S.String)(process.env.SUPABASE_URL)),
);
export const VercelOidcToken = S.Config("VERCEL_OIDC_TOKEN", S.NonEmptyString).pipe(
	Config.withDefault(S.decodeUnknownSync(S.String)(process.env.VERCEL_OIDC_TOKEN)),
);
