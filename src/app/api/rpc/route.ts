import type { NextRequest } from "next/server";
import { handler } from "@/rpc/router";

export const POST = async (request: NextRequest) => {
	return handler(request);
};
