import nextConfig from "eslint-config-next";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

// eslint-disable-next-line import/no-anonymous-default-export
export default [
    ...nextConfig,  // 注意：这里是展开，而不是 nextConfig()
    {
        files: ["**/*.ts", "**/*.tsx"],
        languageOptions: {
            parser: tsParser,
        },
        plugins: {
            "@typescript-eslint": tseslint,
        },
        rules: {},
    },
];