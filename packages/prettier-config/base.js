export const prettierConfig = {
  plugins: [
    "@trivago/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
  trailingComma: "all",
  bracketSpacing: true,
  singleQuote: false,
  semi: true,
  printWidth: 100,
  tabWidth: 4,
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrder: [
    "<THIRD_PARTY_MODULES>",
    "@repo/(.*)$",
    "@repo/ui/(.*)$",
    "@repo/ui/styles",

    "^[./]",
  ],
};
