import { PlatformConfigProvider } from "@effect/platform";
import { Config, Effect, Schema as S } from "effect";

export class Env extends Effect.Service<Env>()("@honey-pot/lib/env/Env", {
    effect: Effect.gen(function* () {
        yield* Effect.try(() => PlatformConfigProvider.layerDotEnvAdd(".env.local"));

        const nextPublicSupabaseAnonKey = yield* Config.redacted(NextPublicSupabaseAnonKey);
        const nextPublicSupabaseUrl = yield* Config.redacted(NextPublicSupabaseUrl);
        const postgresDatabase = yield* Config.redacted(PostgresDatabase);
        const postgresHost = yield* Config.redacted(PostgresHost);
        const postgresPassword = yield* Config.redacted(PostgresPassword);
        const postgresPrismaUrl = yield* Config.redacted(PostgresPrismaUrl);
        const postgresUrl = yield* Config.redacted(PostgresUrl);
        const postgresUrlNonPooling = yield* Config.redacted(PostgresUrlNonPooling);
        const postgresUser = yield* Config.redacted(PostgresUser);
        const supabaseAnonKey = yield* Config.redacted(SupabaseAnonKey);
        const supabaseJwtSecret = yield* Config.redacted(SupabaseJwtSecret);
        const supabasePublishableDefaultKey = yield* Config.redacted(SupabasePublishableDefaultKey);
        const supabaseSecretDefaultKey = yield* Config.redacted(SupabaseSecretDefaultKey);
        const supabaseServiceRoleKey = yield* Config.redacted(SupabaseServiceRoleKey);
        const supabaseUrl = yield* Config.redacted(SupabaseUrl);
        const vercelOidcToken = yield* Config.redacted(VercelOidcToken);
        const nextPublicHost = yield* Config.redacted(NextPublicHost);

        return yield* Effect.succeed({
            nextPublicSupabaseAnonKey,
            nextPublicSupabaseUrl,
            postgresDatabase,
            postgresHost,
            postgresPassword,
            postgresPrismaUrl,
            postgresUrl,
            postgresUrlNonPooling,
            postgresUser,
            supabaseAnonKey,
            supabaseJwtSecret,
            supabasePublishableDefaultKey,
            supabaseSecretDefaultKey,
            supabaseServiceRoleKey,
            supabaseUrl,
            vercelOidcToken,
            nextPublicHost,
        });
    }).pipe(Effect.withSpan("@honey-pot/env")),
}) { }

export const NextPublicSupabaseAnonKey = S.Config("NEXT_PUBLIC_SUPABASE_ANON_KEY", S.NonEmptyString)
export const NextPublicSupabaseUrl = S.Config("NEXT_PUBLIC_SUPABASE_URL", S.NonEmptyString)
export const PostgresDatabase = S.Config("POSTGRES_DATABASE", S.NonEmptyString)
export const PostgresHost = S.Config("POSTGRES_HOST", S.NonEmptyString)
export const PostgresPassword = S.Config("POSTGRES_PASSWORD", S.NonEmptyString)
export const PostgresPrismaUrl = S.Config("POSTGRES_PRISMA_URL", S.NonEmptyString)
export const PostgresUrl = S.Config("POSTGRES_URL", S.NonEmptyString)
export const PostgresUrlNonPooling = S.Config("POSTGRES_URL_NON_POOLING", S.NonEmptyString)
export const PostgresUser = S.Config("POSTGRES_USER", S.NonEmptyString)
export const SupabaseAnonKey = S.Config("SUPABASE_ANON_KEY", S.NonEmptyString)
export const SupabaseJwtSecret = S.Config("SUPABASE_JWT_SECRET", S.NonEmptyString)
export const SupabasePublishableDefaultKey = S.Config(
    "SUPABASE_PUBLISHABLE_DEFAULT_KEY",
    S.NonEmptyString,
)
export const SupabaseSecretDefaultKey = S.Config("SUPABASE_SECRET_DEFAULT_KEY", S.NonEmptyString)
export const SupabaseServiceRoleKey = S.Config("SUPABASE_SERVICE_ROLE_KEY", S.NonEmptyString)
export const SupabaseUrl = S.Config("SUPABASE_URL", S.NonEmptyString)
export const VercelOidcToken = S.Config("VERCEL_OIDC_TOKEN", S.NonEmptyString)

export const NextPublicHost = S.Config("NEXT_PUBLIC_HOST", S.NonEmptyString).pipe(
    Config.orElse(() => Config.succeed("http://localhost:3000")),
)