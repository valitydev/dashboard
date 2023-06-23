module.exports = {
    extends: '@vality/eslint-config',
    overrides: [
        ...require('@vality/eslint-config/configs').angular('dsh').overrides,
        ...require('@vality/eslint-config/configs').importOrder(['@dsh/**']).overrides,
    ],
};
