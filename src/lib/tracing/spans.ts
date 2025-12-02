import { OtlpTracer } from "@effect/opentelemetry";
import { FetchHttpClient } from "@effect/platform";
import { NodeFileSystem } from "@effect/platform-node";
import { ATTR_DEPLOYMENT_ENVIRONMENT_NAME } from "@opentelemetry/semantic-conventions/incubating";
import { Effect, Layer, Redacted } from "effect";
import { ServerEnv } from "@/lib/env/server";

export const NodeTracer = Effect.gen(function* () {
	const {
		BetterStackOtelBearerToken,
		BetterStackOtelServiceName,
		BetterStackOtelTracesEndpoint,
		VercelEnvironment,
		VercelGitCommitSha,
	} = yield* ServerEnv;

	return OtlpTracer.layer({
		url: Redacted.value(BetterStackOtelTracesEndpoint),
		headers: {
			Authorization: `Bearer ${Redacted.value(BetterStackOtelBearerToken)}`,
		},
		resource: {
			serviceName: Redacted.value(BetterStackOtelServiceName),
			serviceVersion: Redacted.value(VercelGitCommitSha),
			attributes: { [ATTR_DEPLOYMENT_ENVIRONMENT_NAME]: Redacted.value(VercelEnvironment) },
		},
	}).pipe(Layer.provide(FetchHttpClient.layer));
}).pipe(Effect.provide(ServerEnv.Live), Effect.provide(NodeFileSystem.layer), Layer.unwrapEffect);
