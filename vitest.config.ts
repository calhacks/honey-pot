import tsConfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig(() => {
	return {
		plugins: [tsConfigPaths()],
		test: {
			environment: "node",
			globals: true,
		},
	};
});
