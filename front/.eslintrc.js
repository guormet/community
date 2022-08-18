module.exports = {
    'env': {
        'browser': true,
        'es6': true,
        'node': true
    },

    'extends': [
        'eslint:recommended',
        'plugin:vue/essential'
    ],

    'globals': {
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly'
    },
    'parserOptions': {
        'ecmaVersion': 2018,
        'sourceType': 'module',
        'parser': '@babel/eslint-parser'
    },

    'plugins': [
        'vue'
    ],

    'rules': {
        // Possible Errors
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',  // 禁用 console
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn', // 禁用 debugger
        'no-alert': process.env.NODE_ENV === 'production' ? 'error' : 'warn',    // 禁用 alert、confirm 和 prompt
        // Variables
        'init-declarations': [ 'error', 'always' ],   // 强制或禁止变量声明语句中初始化 
        'no-undefined': 'error',    // 不允许使用undefined变量
        'no-undef-init': 'error',   // 不允许初始化变量值为 undefined
        'no-restricted-globals': [ 'error', 'event' ],    // 禁用特定的全局变量
        'no-use-before-define': 'error',    // 禁止定义前使用
        // Stylistic Issues
        'array-bracket-spacing': [ 'error', 'always' ],   // 强制在括号内使用空格
        'block-spacing': 'error',   // 强制在代码块中开括号前和闭括号后有空格
        'brace-style': 'error', // 大括号风格要求
        'comma-dangle': [ 'error', 'never' ], // 禁止使用拖尾逗号
        'comma-spacing': [ 'error', { 'before': false, 'after': true } ], // 强制在逗号前禁止空格逗号后加空格
        'comma-style': [ 'error', 'last' ],   // 逗号风格

        'quotes': [ 'error', 'single' ],  // 强制使用一致的单引号
        'semi': [ 'error', 'always' ],    // 要求使用分号代替 ASI
        'space-before-blocks': 'error', // 要求语句块之前的空格
        'space-before-function-paren': 'error', // 要求函数圆括号之前有一个空格
        'space-in-parens': [ 'error', 'never' ], // 强制圆括号内的空格
        'space-infix-ops': 'error', // 要求中缀操作符周围有空格
        'space-unary-ops': 'error', // 要求在一元操作符之前或之后存在空格
        'spaced-comment': [ 'error', 'always' ],  // 要求在注释前有空白 (space 或 tab) 
        'switch-colon-spacing': 'error',    // 强制在 switch 的冒号左右有空格
        'template-tag-spacing': [ 'error', 'always' ],    // 要求在模板标记和它们的字面量之间有空格
        
        // ECMAScript 6
        'arrow-parens': [ 'error', 'always' ],    // 要求箭头函数的参数使用圆括号
        // Best Practices
        'curly': 'error',   // 强制所有控制语句使用一致的括号风格
        'default-case': 'error',    // 要求 switch 语句中有 default 分支
        'eqeqeq': 'error',  // 要求使用 === 和 !==
        'no-empty-function': 'error',   // 禁止出现空函数
        'no-eval': 'error', // 禁用 eval()
        'require-await': 'error',   // 禁止使用不带 await 表达式的 async 函数
        'no-useless-call': 'error', // 禁止不必要的 .call() 和 .apply()
        'no-useless-return': 'error',   // 禁止多余的 return 语句
        'no-void': 'error', // 禁止使用void操作符
        

        // 不允许重复的attributes
        'vue/no-duplicate-attributes': 'warn',
        // 不允许重复的keys
        'vue/no-dupe-keys': 'error',
        // 在computed properties中禁用异步actions
        'vue/no-async-in-computed-properties': 'error',
        // 在 <template> 标签下不允许解析错误
        'vue/no-parsing-error': [ 'error', {
            'x-invalid-end-tag': false
        } ],
        // 不允许覆盖保留关键字
        'vue/no-reserved-keys': 'error',
        // 不允许在computed properties中出现副作用。
        'vue/no-side-effects-in-computed-properties': 'error',
        // <template>不允许key属性
        'vue/no-template-key': 'warn',
        // 在 <textarea> 中不允许mustaches
        'vue/no-textarea-mustache': 'error',
        // 不允许在v-for或者范围内的属性出现未使用的变量定义
        'vue/no-unused-vars': 'warn',
        // <component>标签需要v-bind:is属性
        'vue/require-component-is': 'error',
        // render 函数必须有一个返回值
        'vue/require-render-return': 'error',
        // 保证 v-bind:key 和 v-for 指令成对出现
        'vue/require-v-for-key': 'error',
        // 检查默认的prop值是否有效
        'vue/require-valid-default-prop': 'error',
        // 保证computed属性中有return语句 
        'vue/return-in-computed-property': 'error',
        // 强制校验 template 根节点
        'vue/valid-template-root': 'error',
        // 强制校验 v-bind 指令
        'vue/valid-v-bind': 'error',
        // 强制校验 v-cloak 指令
        'vue/valid-v-cloak': 'error',
        // 强制校验 v-else-if 指令
        'vue/valid-v-else-if': 'error',
        // 强制校验 v-else 指令 
        'vue/valid-v-else': 'error',
        // 强制校验 v-for 指令
        'vue/valid-v-for': 'error',
        // 强制校验 v-html 指令
        'vue/valid-v-html': 'error',
        // 强制校验 v-if 指令
        'vue/valid-v-if': 'error',
        // 强制校验 v-model 指令
        'vue/valid-v-model': 'error',
        // 强制校验 v-on 指令
        'vue/valid-v-on': 'error',
        // 强制校验 v-once 指令
        'vue/valid-v-once': 'error',
        // 强制校验 v-pre 指令
        'vue/valid-v-pre': 'error',
        // 强制校验 v-show 指令
        'vue/valid-v-show': 'error',
        // 强制校验 v-text 指令
        'vue/valid-v-text': 'error',
        'vue/comment-directive': 0,
        // 属性传值需划线隔开，如myProp -> my-prop
        'vue/attribute-hyphenation': [ 'error', 'always', {
            'ignore': []
        } ],
        // 强制第一个属性的位置
        'vue/html-closing-bracket-newline': [ 'error', {
            'singleline': 'never',
            'multiline': 'never'
        } ],
        // 缩进2个单位
        'vue/html-indent': [ 'error', 2, {
            'attribute': 1,
            'baseIndent': 1,
            'closeBracket': 0,
            'alignAttributesVertically': true,
            'ignores': []
        } ],
        // 强制props小驼峰命名
        'vue/prop-name-casing': [ 'error', 'camelCase' ],
        // 不允许多个空格
        'vue/no-multi-spaces': [ 'error', {
            'ignoreProperties': false
        } ],
        // 引号一致用双引号
        'vue/html-quotes': [ 'error', 'double', { 'avoidEscape': false } ],
        // 内容和元素要换行
        // "vue/singleline-html-element-content-newline": ["error", {
        //     "ignoreWhenNoAttributes": true,
        //     "ignoreWhenEmpty": true,
        //     "ignores": ["pre", "textarea"]
        // }]
        // 禁止模板中使用this
        'vue/this-in-template': [ 'error', 'never' ]


    }
};
