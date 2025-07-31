import { LoginRpcs } from "@/rpc/rpc/login";
import { ProfileRpcs } from "@/rpc/rpc/profile";

export const Rpcs = LoginRpcs.merge(ProfileRpcs);
