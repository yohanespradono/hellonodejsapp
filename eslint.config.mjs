// eslint.config.js
import { defineConfig } from "eslint/config";

globalThis.structuredClone = globalThis.structuredClone || (obj => JSON.parse(JSON.stringify(obj)));

export default defineConfig([
	// matches all files ending with .js
	{
		files: ["**/*.js"],
		rules: {
			semi: "error",
		},
	},

	// matches all files ending with .js except those in __tests
	{
		files: ["**/*.js"],
		ignores: ["__tests/**"],
		rules: {
			"no-console": "error",
		},
	},
]);
