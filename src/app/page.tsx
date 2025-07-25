import { Live, Rpc } from "@/rpc/client";
import { Effect } from "effect";

export default function Home() {
    // const profiles = useGetAllProfiles();
    // console.log(profiles);

    return <div>Hello World</div>;
}


const useGetAllProfiles = () => Effect.gen(function* () {
    const rpc = yield* Rpc;
    const response = yield* rpc.GetAllProfiles({})
    return response;
}).pipe(Effect.provide(Live), Effect.runSync)