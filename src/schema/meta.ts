import { Schema } from "effect";

export const Development = Schema.Literal("development");
export type Development = typeof Development.Type;

export const Preview = Schema.Literal("preview");
export type Preview = typeof Preview.Type;

export const Production = Schema.Literal("production");
export type Production = typeof Production.Type;

export const Environment = Schema.Union(Development, Preview, Production);
export type Environment = typeof Environment.Type;
