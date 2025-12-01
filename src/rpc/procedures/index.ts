import { Layer } from "effect";
import { AuthProcedures } from "@/rpc/procedures/auth/layer";
import { EventProcedures } from "@/rpc/procedures/event/layer";
import { ProfileProcedures } from "@/rpc/procedures/profile/layer";

export const Procedures = Layer.mergeAll(AuthProcedures, EventProcedures, ProfileProcedures);
