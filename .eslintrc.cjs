module.exports = {
  root: true,
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    'eslint:recommended',
    './src/auto-import/eslintrc-auto-import.json',
    'plugin:vue/vue3-recommended',
    '@vue/eslint-config-prettier',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-essential'
  ],
  "overrides": [
    {
      "env": {
        "node": true
      },
      "files": [
        ".eslintrc.{js,ts,cjs}"
      ],
      "parserOptions": {
        "sourceType": "script"
      }
    }
  ],
  "parserOptions": {
    "ecmaVersion": "latest",
    "parser": "@typescript-eslint/parser",
    "sourceType": "module"
  },
  "plugins": [
    "@typescript-eslint",
    "vue"
  ],
  "rules": {
    // 要求使用 let 或 const 而不是 var
    'no-var': 'error',
    // 禁止出现未使用过的变量
    'no-unused-vars': ['error'],
    // 关闭名称校验
    'vue/multi-word-component-names': 'off',
    // 非生产环境启用 debugger
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 强制可嵌套的块的最大深度
    'max-depth': ['error', 5],
    // 强制函数最大代码行数
    // 'max-lines-per-function': [
    //   'error',
    //   {
    //     max: 200,
    //     skipBlankLines: true
    //   }
    // ],
    // 强制每一行中所允许的最大语句数量
    'max-statements-per-line': ['error', {max: 1}],
    "@typescript-eslint/no-explicit-any": "off",
    // 禁止使用no-namespace
    "@typescript-eslint/no-namespace": "off",
  }
}
