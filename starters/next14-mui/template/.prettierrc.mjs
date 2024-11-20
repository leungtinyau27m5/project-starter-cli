export default {
    plugins: [
      "@trivago/prettier-plugin-sort-imports",
    ],
    importOrder: ["<THIRD_PARTY_MODULES>", "@mui/(.*)$", "^@/(.*)$", "^[./]"],
    importOrderSeparation: true,
    importOrderSortSpecifiers: true,
  
    printWidth: 120,
    trailingComma: "all",
    singleQuote: true,
    semi: false,
};