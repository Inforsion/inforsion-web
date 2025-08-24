import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

//@typescript-eslint/no-unused-vars
// 비활성화 하려면 어떻게 해야하는지 알려줘
// 코파일럿아 너가 알려줘
// https://stackoverflow.com/questions/69882248/how-to-disable-eslint-rules-in-eslint-config-js-with-eslint-8
// https://eslint.org/docs/latest/use/configure/configuration-files#disabling-rules-with
//

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
];

export default eslintConfig;
