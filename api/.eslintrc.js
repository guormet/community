module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [ 'eslint:recommended', 'standard' ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    // Possible Errors
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off', // 禁用 console
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off', // 禁用 debugger
    'require-atomic-updates': 'off',
    // Stylistic Issues
    'array-bracket-spacing': [ 'error', 'always' ], // 强制在括号内使用空格
    'block-spacing': 'error', // 强制在代码块中开括号前和闭括号后有空格
    'brace-style': 'error', // 大括号风格要求
    'comma-dangle': [ 'error', 'never' ], // 禁止使用拖尾逗号
    'comma-spacing': [ 'error', { before: false, after: true } ], // 强制在逗号前禁止空格逗号后加空格
    'comma-style': [ 'error', 'last' ], // 逗号风格

    quotes: [ 'error', 'single' ], // 强制使用一致的单引号
    semi: [ 'error', 'always' ], // 要求使用分号代替 ASI
    'space-before-blocks': 'error', // 要求语句块之前的空格
    'space-before-function-paren': 'error', // 要求函数圆括号之前有一个空格
    'space-in-parens': [ 'error', 'never' ], // 强制圆括号内的空格
    'space-infix-ops': 'error', // 要求中缀操作符周围有空格
    'space-unary-ops': 'error', // 要求在一元操作符之前或之后存在空格
    'spaced-comment': [ 'error', 'always' ], // 要求在注释前有空白 (space 或 tab)
    'switch-colon-spacing': 'error', // 强制在 switch 的冒号左右有空格
    'template-tag-spacing': [ 'error', 'always' ], // 要求在模板标记和它们的字面量之间有空格
    'no-useless-constructor': 'off' // 无内容的方法
  }
};
