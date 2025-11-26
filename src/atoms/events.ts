import { Atom, Result } from "@effect-atom/atom-react";
import { Array, Option, pipe } from "effect";
import { LocalStorageActiveEventIdAtom } from "@/atoms/local-storage";
import { ServerRpcClient } from "@/rpc/client/server";

const GetAllEventsKey = "get-all-events";

export const GetAllEventsAtom = ServerRpcClient.query("GetAllEvents", {}, { reactivityKeys: [GetAllEventsKey] });

export const ActiveEventAtom = Atom.make((get) => {
	const events = get(GetAllEventsAtom);
	const activeEventId = get(LocalStorageActiveEventIdAtom);

	if (activeEventId === null) {
		return events.pipe(Result.map(Array.head));
	}

	return events.pipe(
		Result.map((events) =>
			pipe(
				Array.findFirst(events, (event) => event.id === activeEventId),
				Option.orElse(() => Array.head(events)),
			),
		),
	);
});
