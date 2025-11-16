import { useEffectSWR } from "@/hooks/use-effect-swr";
import { Rpc, rpc } from "@/rpc/client/browser";
import type { GetProfileByIdPayload } from "@/rpc/rpc/profile";

const UseGetCurrentProfileKey = "use-get-current-profile";

export function useGetCurrentProfile(payload: GetProfileByIdPayload) {
	return useEffectSWR(UseGetCurrentProfileKey, () => rpc(Rpc.GetProfileById(payload)));
}
