import { useEffectSWR } from "@/hooks/use-effect-swr";
import { Rpc, rpc } from "@/rpc/client/browser";
import type { GetProfileByIdPayload } from "@/rpc/procedures/profile/schema";

const GetCurrentProfileKey = "get-current-profile";

export function useGetCurrentProfile(payload: GetProfileByIdPayload) {
	return useEffectSWR(GetCurrentProfileKey, () => rpc(Rpc.GetProfileById(payload)));
}
