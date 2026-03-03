// eslint.config.js
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";

export default [
    {
        ignores: ["node_modules/**"],
    },

    {
        files: ["**/*.ts", "**/*.tsx"],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                project: ["tsconfig.json"],
                createDefaultProgram: true,
            },
        },
        settings: {
            react: {
                version: "detect",
            },
        },

        plugins: {
            "@typescript-eslint": tseslint,
            react: reactPlugin,
            "react-hooks": reactHooks,
            "jsx-a11y": jsxA11y,
        },

        rules: {
            /* ==== React ==== */
            ...reactPlugin.configs.recommended.rules,

            /* ==== A11Y ==== */
            ...jsxA11y.configs.recommended.rules,

            /* ==== React Hooks ==== */
            "react-hooks/rules-of-hooks": "error",
            "react-hooks/exhaustive-deps": "warn",

            /* ==== Naming Conventions TypeScript ==== */
            "@typescript-eslint/naming-convention": [
                "error",
                {
                    selector: "default",
                    format: ["strictCamelCase"],
                },
                {
                    selector: "variable",
                    modifiers: ["const"],
                    format: ["strictCamelCase", "UPPER_CASE"],
                },
                {
                    selector: "method",
                    format: ["strictCamelCase"],
                    leadingUnderscore: "allow",
                },
                {
                    selector: "typeLike",
                    format: ["StrictPascalCase"],
                },
            ],

            /* ==== Style ==== */
            "brace-style": ["error", "allman", { allowSingleLine: true }],
            indent: ["error", 4, { SwitchCase: 1 }],
            "no-extra-semi": ["error"],
            "comma-dangle": ["error", "always-multiline"],
            "keyword-spacing": ["error", { before: true, after: true }],
            "no-trailing-spaces": ["error"],
            "no-multiple-empty-lines": [
                "error",
                { max: 1, maxEOF: 0 },
            ],
            "eol-last": ["error", "always"],
            quotes: [
                "error",
                "double",
                { avoidEscape: true, allowTemplateLiterals: false },
            ],
            "no-console": ["error", { allow: ["error", "trace"] }],
            "no-var": "warn",

            /* ==== React ==== */
            "react/react-in-jsx-scope": "off",
            "react/prop-types": "off",
        },
    },
];