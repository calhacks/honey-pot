# Honey Pot Schemas

This directory contains schemas for the Honey Pot API.

## General Guidelines

- Create schemas for any non-trivial or specifiable types (literals, structs, enums, etc.)

### `rpc/*`

- Prefer using types defined in `supabase.ts` over redefining them here
  - e.g. use `ProfileTable.ProfileDb.fields.id` instead of `S.UUID`
- Inserts should never contain optional fields
- Take time to consider whether a property should be:
  - `Schema.Nullable`
  - `Schema.optional`