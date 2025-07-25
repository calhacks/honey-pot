import { type CookieOptions, createServerClient } from "@supabase/ssr";
import { Effect, Redacted } from "effect";
import { cookies } from "next/headers";
import { Env } from "@/lib/env";
import type { Database } from "@/lib/supabase/database.types";

export class SupabaseServerClient extends Effect.Service<SupabaseServerClient>()(
    "@honey-pot/lib/supabase/client/SupabaseServerClient",
    {
        effect: Effect.gen(function* () {
            const { supabasePublishableDefaultKey, supabaseSecretDefaultKey } = yield* Env;
            const cookieStore = yield* Effect.tryPromise(() => cookies());

            const supabaseClient = createServerClient<Database>(Redacted.value(supabasePublishableDefaultKey), Redacted.value(supabaseSecretDefaultKey), {
                cookies: {
                    getAll: () => cookieStore.getAll(),
                    setAll: (cookies: { name: string; value: string; options: CookieOptions }[]) =>
                        Effect.try(() =>
                            cookies.forEach(({ name, value, options }) => cookieStore.set(name, value, options)),
                        ).pipe(Effect.runSync),
                },
            });
            return yield* Effect.succeed({ supabaseClient });
        }),
        dependencies: [Env.Default],
    },
) { }
