module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  // 複数のルールをまとめているものを指定
  // 内部のルールが重複する場合、後から指定したものが優先される
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended', // 型を必要としないプラグインの推奨ルールをすべて有効
    'plugin:@typescript-eslint/recommended-requiring-type-checking', // 型を必要とするプラグインの推奨ルールをすべて有効
    'prettier', // ESLint の情報に沿ってフォーマット
  ],
  // 使用するパーサ：TypeScriptの文法に対応できるよう設定
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true, // JSXもチェックする
    },
    // 最新のJS仕様の構文に対応?
    ecmaVersion: 'latest',
    // import, export を使うタイプのjs
    sourceType: 'module',
    tsconfigRootDir: __dirname, // tsconfig.jsonがある相対パスを指定
    project: ['./tsconfig.json'], // tsconfig.jsonを指定
  },
  // 使用するプラグインの指定
  plugins: ['react', '@typescript-eslint'],
  ignorePatterns: ['.eslintrc.js', 'build'],
  // 個々のルールを設定
  rules: {
    'no-use-before-define': 'off', // 関数や変数が定義される前に使われているとエラーになるデフォルトの機能をoff
    '@typescript-eslint/no-use-before-define': 'off',
    'import/prefer-default-export': 'off', // named exportがエラーになるので使えるようにoff
    // importのときに以下の拡張子を記述しなくてもエラーにしない
    'import/extensions': [
      'error',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    // jsx形式のファイル拡張子をjsxもしくはtsxに限定
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.jsx', '.tsx'],
      },
    ],
    // import React from 'react'が無くてもエラーを無くす
    'react/react-in-jsx-scope': 'off',
    // void演算子の許可
    'no-void': [
      'error',
      {
        allowAsStatement: true,
      },
    ],
  },
  settings: {
    // importするファイルをjsだけではなく、tsを含むファイルを許可する
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
