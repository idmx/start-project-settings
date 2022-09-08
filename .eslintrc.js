const path = require("path");
const APP_DIR = process.cwd();

module.exports = {
	env: {
		browser: true,
		node: true,
		es2021: true,
	},
	globals: {
		localStorage: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:import/typescript",
		"plugin:react-hooks/recommended",
		"prettier",
	],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		tsconfigRootDir: path.resolve(APP_DIR, "src"),
		project: path.resolve(APP_DIR, "./tsconfig.json"),
		sourceType: "module",
		codeFrame: false,
		ecmaFeatures: {
			jsx: true,
			experimentalObjectRestSpread: true,
		},
		ecmaVersion: "latest",
	},
	plugins: ["@typescript-eslint", "react", "prettier", "import", "promise", "simple-import-sort"],
	rules: {
		"@typescript-eslint/no-namespace": "off",
		"@typescript-eslint/no-var-requires": 0,
		"react/jsx-filename-extension": [1, { extensions: [".js", ".jsx", ".ts", ".tsx"] }],
		"no-use-before-define": ["error", { functions: false }],
		"prettier/prettier": ["error"],
		"react/require-default-props": "off",
		"react/prop-types": "off",
		"react/no-array-index-key": "off",
		"react/display-name": "off",
		indent: ["error", "tab", { SwitchCase: 1 }],
		"linebreak-style": 0,
		quotes: ["error", "double"],
		semi: ["error", "always"],
		"simple-import-sort/imports": "error",
		"simple-import-sort/exports": "error",
		eqeqeq: ["error", "always"],
		"import/no-cycle": ["error"],
	},
	settings: {
		react: {
			version: "detect",
		},
	},
	overrides: [
		// override "simple-import-sort" config
		{
			files: ["*.js", "*.jsx", "*.ts", "*.tsx"],
			rules: {
				"simple-import-sort/imports": [
					"error",
					{
						groups: [
							// `react` first, then packages starting with a character and @
							["^react$", "^[a-z]", "^@[a-z]"],
							// Aliases starting with `@`
							["^@"],
							// Packages starting with `~`
							["^~"],
							// Imports starting with `../`
							["^\\.\\.(?!/?$)", "^\\.\\./?$"],
							// Imports starting with `./`
							["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
							// Style imports
							["^.+\\.s?css$"],
							// Side effect imports
							["^\\u0000"],
						],
					},
				],
			},
		},
	],
};
