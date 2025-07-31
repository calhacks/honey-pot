import { Layer } from "effect";
import { LoginProcedures } from "@/rpc/procedures/login";
import { ProfileProcedures } from "@/rpc/procedures/profile";

export const Procedures = Layer.mergeAll(LoginProcedures, ProfileProcedures);
