import { Layer } from "effect";
import { EventProcedures } from "@/rpc/procedures/event/layer";
import { LoginProcedures } from "@/rpc/procedures/login/layer";
import { ProfileProcedures } from "@/rpc/procedures/profile/layer";

export const Procedures = Layer.mergeAll(EventProcedures, LoginProcedures, ProfileProcedures);
