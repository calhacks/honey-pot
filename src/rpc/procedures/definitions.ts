import { EventRpcs } from "@/rpc/procedures/event/schema";
import { LoginRpcs } from "@/rpc/procedures/login/schema";
import { ProfileRpcs } from "@/rpc/procedures/profile/schema";

export const Rpcs = EventRpcs.merge(LoginRpcs, ProfileRpcs);
