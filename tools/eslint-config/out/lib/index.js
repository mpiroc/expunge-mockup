"use strict";
const ERROR = `error`;
const ALWAYS = `always`;
const NEVER = `never`;
const OFF = `off`;
const READONLY = `readonly`;
module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [`@rushstack`],
    globals: {
        Atomics: READONLY,
        SharedArrayBuffer: READONLY
    },
    parserOptions: {
        project: `tsconfig.json`,
        sourceType: `module`,
        tsconfigRootDir: `${__dirname}/../../`
    },
    rules: {
        '@typescript-eslint/adjacent-overload-signatures': ERROR,
        '@typescript-eslint/array-type': [
            ERROR,
            {
                default: 'array',
                readonly: 'array'
            }
        ],
        '@typescript-eslint/await-thenable': ERROR,
        'brace-style': OFF,
        '@typescript-eslint/brace-style': ERROR,
        'camelcase': OFF,
        '@typescript-eslint/camelcase': [
            ERROR,
            {
                'properties': ALWAYS
            }
        ],
        'func-call-spacing': OFF,
        '@typescript-eslint/func-call-spacing': ERROR,
        '@typescript-eslint/generic-type-naming': [
            ERROR,
            '^T[A-Z][a-zA-Z]+$'
        ],
        'indent': OFF,
        // The ESLint extension for VS Code is very buggy when this rule is enabled.
        // '@typescript-eslint/indent': [
        //     ERROR,
        //     4
        // ]
        '@typescript-eslint/member-delimiter-style': [
            ERROR,
            {
                'singleline': {
                    'delimiter': 'comma'
                },
                'multiline': {
                    'delimiter': 'none'
                }
            }
        ],
        'no-empty-function': OFF,
        '@typescript-eslint/no-empty-function': ERROR,
        '@typescript-eslint/no-empty-interface': OFF,
        '@typescript-eslint/no-extra-parens': ERROR,
        '@typescript-eslint/no-extraneous-class': ERROR,
        'no-magic-numbers': OFF,
        '@typescript-eslint/no-magic-numbers': [
            ERROR,
            {
                'ignore': [
                    -1,
                    0,
                    1
                ]
            }
        ],
        '@typescript-eslint/no-misused-promises': ERROR,
        '@typescript-eslint/no-non-null-assertion': ERROR,
        '@typescript-eslint/no-require-imports': ERROR,
        '@typescript-eslint/no-this-alias': ERROR,
        '@typescript-eslint/no-type-alias': OFF,
        '@typescript-eslint/no-unnecessary-condition': [
            ERROR,
            {
                'ignoreRhs': true
            }
        ],
        '@typescript-eslint/no-unnecessary-qualifier': ERROR,
        // ESLint has issues with type aliases and generics, i.e. type Foo<T> = import('foo').Foo<T>
        // '@typescript-eslint/no-unnecessary-type-arguments': ERROR
        '@typescript-eslint/no-unnecessary-type-assertion': ERROR,
        'no-useless-constructor': OFF,
        '@typescript-eslint/no-useless-constructor': ERROR,
        '@typescript-eslint/prefer-for-of': ERROR,
        '@typescript-eslint/prefer-function-type': OFF,
        '@typescript-eslint/prefer-includes': ERROR,
        '@typescript-eslint/prefer-readonly': ERROR,
        '@typescript-eslint/prefer-regexp-exec': ERROR,
        '@typescript-eslint/prefer-string-starts-ends-with': ERROR,
        '@typescript-eslint/promise-function-async': ERROR,
        'quotes': OFF,
        '@typescript-eslint/quotes': [
            ERROR,
            'backtick',
            {
                'avoidEscape': true
            }
        ],
        '@typescript-eslint/require-array-sort-compare': ERROR,
        'require-await': OFF,
        '@typescript-eslint/require-await': ERROR,
        '@typescript-eslint/restrict-plus-operands': ERROR,
        'semi': OFF,
        '@typescript-eslint/semi': [
            ERROR,
            NEVER
        ],
        '@typescript-eslint/strict-boolean-expressions': OFF,
        '@typescript-eslint/triple-slash-reference': [
            ERROR,
            {
                'path': NEVER,
                'types': NEVER,
                'lib': NEVER
            }
        ],
        '@typescript-eslint/type-annotation-spacing': ERROR,
        '@typescript-eslint/unbound-method': ERROR,
        '@typescript-eslint/unified-signatures': ERROR
    },
};
//# sourceMappingURL=index.js.map