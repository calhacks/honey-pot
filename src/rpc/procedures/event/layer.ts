import { Console, Effect, pipe, Schema } from "effect";
import { ServerEnv } from "@/lib/env/server";
import { SupabaseServerClient } from "@/lib/supabase/client";
import { NodeTracer } from "@/lib/tracing/spans";
import { EventRpcs, GetAllEvents } from "@/rpc/procedures/event/schema";

export const EventProcedures = EventRpcs.toLayer({
	GetAllEvents: (_request) =>
		Effect.gen(function* () {
			const supabase = yield* SupabaseServerClient;

			return yield* pipe(
				Effect.tryPromise(() => supabase.from("events").select("*").order("title", { ascending: true })),
				Effect.filterOrFail(
					(response) => response.error === null,
					(response) => response.error,
				),
				Effect.andThen((response) => Schema.decodeUnknown(GetAllEvents.successSchema)(response.data)),
			);
		}).pipe(
			Effect.withSpan("@honey-pot/src/rpc/procedures/event/layer/EventProcedures/GetAllEvents"),
			Effect.tapErrorCause(Console.error),
			Effect.provide(SupabaseServerClient.Live),
			Effect.provide(ServerEnv.Live),
			Effect.provide(NodeTracer),
		),
});
