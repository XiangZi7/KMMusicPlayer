import globals from 'globals' //https://eslint.org/docs/latest/use/configure/language-options
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint' //https://typescript-eslint.io/getting-started/
import pluginVue from 'eslint-plugin-vue' //https://eslint.vuejs.org/user-guide/
import vueEslintParser from 'vue-eslint-parser' // vue文件解析器
import { FlatCompat } from '@eslint/eslintrc'
const compat = new FlatCompat({
  baseDirectory: __dirname,
})
//关闭所有不必要的或可能与Prettier冲突的规则。https://github.com/prettier/eslint-plugin-prettier?tab=readme-ov-file#configuration-new-eslintconfigjs
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

export default [
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parser: vueEslintParser, // 使用vue解析器，这个可以识别vue文件
      parserOptions: {
        ecmaVersion: 'latest',
        parser: tseslint.parser, // 在vue文件上使用ts解析器
        sourceType: 'module',
      },
    },
  },
  /** js推荐配置 */
  pluginJs.configs.recommended,
  /** vue推荐配置 */
  ...pluginVue.configs['flat/essential'],
  /** 继承自动导入配置 */
  ...compat.extends('./src/auto-import/eslintrc-auto-import.json'),
  ...tseslint.configs.recommended,
  eslintPluginPrettierRecommended,
  /** 自定义eslint配置 */
  {
    rules: {
      // 'vue/no-unused-vars': 'error',
      'prettier/prettier': [
        'error',
        {
          // endOfLine: "auto"
        },
      ],
    },

  },
  // 忽略文件
  {
    ignores: [
      '**/dist',
      './src/main.ts',
      '.vscode',
      '.idea',
      '*.sh',
      '**/node_modules',
      '*.md',
      '*.woff',
      '*.woff',
      '*.ttf',
      'yarn.lock',
      'package-lock.json',
      '/public',
      '/docs',
      '**/output',
      '.husky',
      '.local',
      '/bin',
      'Dockerfile'
    ]
  }
]
