const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const configs = require('@vality/ng-configs');

module.exports = [
    ...tseslint.configs.recommended,
    {
        ignores: ['**/dist'],
    },
    {
        files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
        rules: {},
    },
    ...configs.baseEslintConfig,
    {
        files: ['**/*.ts'],
        rules: {
            '@angular-eslint/prefer-standalone': 'off',
        },
    },
    ...angular.configs.tsRecommended,
    ...angular.configs.templateRecommended,
    ...angular.configs.templateAccessibility,
    {
        files: ['**/*.ts'],
        rules: {
            '@angular-eslint/directive-selector': [
                'error',
                {
                    type: 'attribute',
                    prefix: 'dsh',
                    style: 'camelCase',
                },
            ],
            '@angular-eslint/component-selector': [
                'error',
                {
                    type: 'element',
                    prefix: 'dsh',
                    style: 'kebab-case',
                },
            ],
        },
    },
    {
        files: ['**/*.html'],
        // Override or add rules here
        rules: {},
    },
    ...configs.appEslintConfig({ internalPatterns: ['@dsh/**'] }),
    {
        files: ['**/*.ts'],
        rules: {
            '@angular-eslint/prefer-standalone': 'off',
        },
    },
];
