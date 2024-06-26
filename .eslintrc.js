module.exports = {
    extends: '@vality/eslint-config-ng',
    overrides: [
        ...require('@vality/eslint-config-ng/configs').angular('dsh').overrides,
        ...require('@vality/eslint-config-ng/configs').importOrder(['@dsh/**']).overrides,
    ],
};
