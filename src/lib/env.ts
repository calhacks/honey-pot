import { PlatformConfigProvider } from "@effect/platform";
import { Config, Effect, Schema as S } from "effect";

export class Env extends Effect.Service<Env>()("@honey-pot/lib/env/Env", {
    effect: Effect.gen(function* () {
        yield* Effect.try(() => PlatformConfigProvider.layerDotEnvAdd(".env.development.local"));

        yield* Effect.try(() => NextPublicSupabaseAnonKey);
        yield* Effect.try(() => NextPublicSupabaseUrl);
        yield* Effect.try(() => PostgresDatabase);
        yield* Effect.try(() => PostgresHost);
        yield* Effect.try(() => PostgresPassword);
        yield* Effect.try(() => PostgresPrismaUrl);
        yield* Effect.try(() => PostgresUrl);
        yield* Effect.try(() => PostgresUrlNonPooling);
        yield* Effect.try(() => PostgresUser);
        yield* Effect.try(() => SupabaseAnonKey);
        yield* Effect.try(() => SupabaseJwtSecret);
        yield* Effect.try(() => SupabasePublishableDefaultKey);
        yield* Effect.try(() => SupabaseSecretDefaultKey);
        yield* Effect.try(() => SupabaseServiceRoleKey);
        yield* Effect.try(() => SupabaseUrl);
        yield* Effect.try(() => VercelOidcToken);

        return yield* Effect.succeed(Effect.void);
    }).pipe(Effect.withSpan("@honey-pot/env")),
}) { }

export const NextPublicSupabaseAnonKey = S.Config("@honey-pot/lib/env/NextPublicSupabaseAnonKey", S.NonEmptyString).pipe(
    Config.redacted,
);
export const NextPublicSupabaseUrl = S.Config("@honey-pot/lib/env/NextPublicSupabaseUrl", S.NonEmptyString).pipe(
    Config.redacted,
);
export const PostgresDatabase = S.Config("@honey-pot/lib/env/PostgresDatabase", S.NonEmptyString).pipe(Config.redacted);
export const PostgresHost = S.Config("@honey-pot/lib/env/PostgresHost", S.NonEmptyString).pipe(Config.redacted);
export const PostgresPassword = S.Config("@honey-pot/lib/env/PostgresPassword", S.NonEmptyString).pipe(Config.redacted);
export const PostgresPrismaUrl = S.Config("@honey-pot/lib/env/PostgresPrismaUrl", S.NonEmptyString).pipe(Config.redacted);
export const PostgresUrl = S.Config("@honey-pot/lib/env/PostgresUrl", S.NonEmptyString).pipe(Config.redacted);
export const PostgresUrlNonPooling = S.Config("@honey-pot/lib/env/PostgresUrlNonPooling", S.NonEmptyString).pipe(
    Config.redacted,
);
export const PostgresUser = S.Config("@honey-pot/lib/env/PostgresUser", S.NonEmptyString).pipe(Config.redacted);
export const SupabaseAnonKey = S.Config("@honey-pot/lib/env/SupabaseAnonKey", S.NonEmptyString).pipe(Config.redacted);
export const SupabaseJwtSecret = S.Config("@honey-pot/lib/env/SupabaseJwtSecret", S.NonEmptyString).pipe(Config.redacted);
export const SupabasePublishableDefaultKey = S.Config(
    "@honey-pot/lib/env/SupabasePublishableDefaultKey",
    S.NonEmptyString,
).pipe(Config.redacted);
export const SupabaseSecretDefaultKey = S.Config("@honey-pot/lib/env/SupabaseSecretDefaultKey", S.NonEmptyString).pipe(
    Config.redacted,
);
export const SupabaseServiceRoleKey = S.Config("@honey-pot/lib/env/SupabaseServiceRoleKey", S.NonEmptyString).pipe(
    Config.redacted,
);
export const SupabaseUrl = S.Config("@honey-pot/lib/env/SupabaseUrl", S.NonEmptyString).pipe(Config.redacted);
export const VercelOidcToken = S.Config("@honey-pot/lib/env/VercelOidcToken", S.NonEmptyString).pipe(Config.redacted);
