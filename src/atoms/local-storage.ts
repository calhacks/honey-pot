import { BrowserKeyValueStore } from "@effect/platform-browser";
import { Atom } from "@effect-atom/atom-react";
import { Schema } from "effect";

const localStorageRuntime = Atom.runtime(BrowserKeyValueStore.layerLocalStorage);

export const activeEventAtom = Atom.kvs({
	runtime: localStorageRuntime,
	key: "active_event",
	schema: Schema.NullOr(Schema.UUID),
	defaultValue: () => null,
});
