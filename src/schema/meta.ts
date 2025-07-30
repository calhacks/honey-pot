import { Schema as S } from "effect";

export const Development = S.Literal("development");
export type Development = S.Schema.Type<typeof Development>;

export const Preview = S.Literal("preview");
export type Preview = S.Schema.Type<typeof Preview>;

export const Production = S.Literal("production");
export type Production = S.Schema.Type<typeof Production>;

export const Environment = S.Union(Development, Preview, Production);
export type Environment = S.Schema.Type<typeof Environment>;
