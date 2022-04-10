'use strict';

module.exports = {
    plugins: ['import'],
    extends: ['plugin:import/errors', 'plugin:import/warnings', 'plugin:import/typescript'],
    rules: {
        'import/no-unresolved': 'off',
        'import/namespace': 'off',
        'import/no-cycle': 'error',
        ...require('./rules').createImportOrderRule(),
    },
};
