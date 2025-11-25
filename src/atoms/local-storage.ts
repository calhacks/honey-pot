import { BrowserKeyValueStore } from "@effect/platform-browser";
import { Atom } from "@effect-atom/atom-react";
import { Schema } from "effect";

const LocalStorageRuntime = Atom.runtime(BrowserKeyValueStore.layerLocalStorage);

export const LocalStorageActiveEventIdAtom = Atom.kvs({
	runtime: LocalStorageRuntime,
	key: "active_event",
	schema: Schema.NullOr(Schema.UUID),
	defaultValue: () => null,
});
