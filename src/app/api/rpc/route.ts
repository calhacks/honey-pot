import type { NextRequest } from "next/server";
import { handler } from "@/rpc/handler";

export const POST = async (request: NextRequest) => {
	return handler(request);
};
