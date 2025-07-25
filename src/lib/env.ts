import { PlatformConfigProvider } from "@effect/platform";
import { Config, Effect, Schema as S } from "effect";

export class Env extends Effect.Service<Env>()("@honey-pot/lib/env/Env", {
    effect: Effect.gen(function* () {
        yield* Effect.try(() => PlatformConfigProvider.layerDotEnvAdd(".env.development.local"));

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

export const NextPublicSupabaseAnonKey = S.Config("@honey-pot/lib/env/NextPublicSupabaseAnonKey", S.NonEmptyString)
export const NextPublicSupabaseUrl = S.Config("@honey-pot/lib/env/NextPublicSupabaseUrl", S.NonEmptyString)
export const PostgresDatabase = S.Config("@honey-pot/lib/env/PostgresDatabase", S.NonEmptyString)
export const PostgresHost = S.Config("@honey-pot/lib/env/PostgresHost", S.NonEmptyString)
export const PostgresPassword = S.Config("@honey-pot/lib/env/PostgresPassword", S.NonEmptyString)
export const PostgresPrismaUrl = S.Config("@honey-pot/lib/env/PostgresPrismaUrl", S.NonEmptyString)
export const PostgresUrl = S.Config("@honey-pot/lib/env/PostgresUrl", S.NonEmptyString)
export const PostgresUrlNonPooling = S.Config("@honey-pot/lib/env/PostgresUrlNonPooling", S.NonEmptyString)
export const PostgresUser = S.Config("@honey-pot/lib/env/PostgresUser", S.NonEmptyString)
export const SupabaseAnonKey = S.Config("@honey-pot/lib/env/SupabaseAnonKey", S.NonEmptyString)
export const SupabaseJwtSecret = S.Config("@honey-pot/lib/env/SupabaseJwtSecret", S.NonEmptyString)
export const SupabasePublishableDefaultKey = S.Config(
    "@honey-pot/lib/env/SupabasePublishableDefaultKey",
    S.NonEmptyString,
)
export const SupabaseSecretDefaultKey = S.Config("@honey-pot/lib/env/SupabaseSecretDefaultKey", S.NonEmptyString)
export const SupabaseServiceRoleKey = S.Config("@honey-pot/lib/env/SupabaseServiceRoleKey", S.NonEmptyString)
export const SupabaseUrl = S.Config("@honey-pot/lib/env/SupabaseUrl", S.NonEmptyString)
export const VercelOidcToken = S.Config("@honey-pot/lib/env/VercelOidcToken", S.NonEmptyString)

export const NextPublicHost = S.Config("@honey-pot/lib/env/NextPublicHost", S.NonEmptyString).pipe(
    Config.orElse(() => Config.succeed("http://localhost:3000")),
)