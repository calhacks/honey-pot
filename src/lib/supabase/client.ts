import { type CookieOptions, createServerClient } from "@supabase/ssr";
import { Config, Effect } from "effect";
import { cookies } from "next/headers";
import { Env } from "@/lib/env";
import type { Database } from "@/lib/supabase/database.types";

export class SupabaseServerClient extends Effect.Service<SupabaseServerClient>()(
    "@honey-pot/lib/supabase/client/SupabaseServerClient",
    {
        effect: Effect.gen(function* () {
            yield* Env;

            const supabasePublishableKey = yield* Config.nonEmptyString("@honey-pot/lib/env/SupabasePublishableDefaultKey");
            const supabaseSecretKey = yield* Config.nonEmptyString("@honey-pot/lib/env/SupabaseSecretDefaultKey");
            const cookieStore = yield* Effect.tryPromise(() => cookies());

            const supabaseClient = createServerClient<Database>(supabasePublishableKey, supabaseSecretKey, {
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
