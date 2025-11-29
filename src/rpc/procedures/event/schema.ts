import { Rpc, RpcGroup } from "@effect/rpc";
import { Schema } from "effect";
import { AdminUser } from "@/rpc/middleware/context";
import { Event } from "@/schema/supabase";

export const GetAllEvents = Rpc.make("GetAllEvents", {
	success: Schema.Array(Event),
	error: Schema.Unknown,
	payload: Schema.Struct({}),
}).middleware(AdminUser);

export type GetAllEventsSuccess = Rpc.Success<typeof GetAllEvents>;
export type GetAllEventsError = Rpc.Error<typeof GetAllEvents>;
export type GetAllEventsPayload = Rpc.Payload<typeof GetAllEvents>;

export class EventRpcs extends RpcGroup.make(GetAllEvents) {}
