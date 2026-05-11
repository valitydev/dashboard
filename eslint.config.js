const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const configs = require('@vality/ng-configs');

module.exports = tseslint.config(
    { ignores: ['**/dist'] },
    {
        files: ['**/*.ts'],
        extends: [...tseslint.configs.recommended, ...angular.configs.tsRecommended],
        processor: angular.processInlineTemplates,
        rules: {
            '@angular-eslint/prefer-standalone': 'off',
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
        extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
        rules: {},
    },
    ...configs.baseEslintConfig,
    ...configs.appEslintConfig({ internalPatterns: ['@dsh/**'] }),
);
