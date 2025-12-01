import { AuthRpcs } from "@/rpc/procedures/auth/schema";
import { EventRpcs } from "@/rpc/procedures/event/schema";
import { ProfileRpcs } from "@/rpc/procedures/profile/schema";

export const Rpcs = AuthRpcs.merge(EventRpcs, ProfileRpcs);
