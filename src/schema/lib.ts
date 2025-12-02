import { Schema } from "effect";

export const FileFromSelf = Schema.declare((input: unknown): input is File => input instanceof File, {
	identifier: "FileFromSelf",
	description: "The `File` type in JavaScript",
});
