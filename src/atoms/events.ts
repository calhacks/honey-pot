import { Atom, Result } from "@effect-atom/atom-react";
import { Array, Effect, Option } from "effect";
import { LocalStorageActiveEventIdAtom } from "@/atoms/local-storage";
import { ServerRpcClient } from "@/rpc/client/server";
import type { Event } from "@/schema/supabase";

const GetAllEventsKey = "get-all-events";

export const GetAllEventsAtom = ServerRpcClient.query("GetAllEvents", {}, { reactivityKeys: [GetAllEventsKey] });

export const ActiveEventAtom = Atom.make((get) =>
	// oxlint-disable-next-line eslint/require-yield
	Effect.gen(function* () {
		const events = Result.getOrElse(get(GetAllEventsAtom), () => [] as readonly Event[]);
		const activeEventId = get(LocalStorageActiveEventIdAtom);

		if (activeEventId === null) {
			return Array.head(events);
		}

		const activeEvent = Array.findFirst(events, (event) => event.id === activeEventId);
		return Option.match(activeEvent, {
			onNone: () => Array.head(events),
			onSome: (event) => Option.some(event),
		});
	}),
);
