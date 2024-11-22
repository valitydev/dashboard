import { IgnorePlugin, Configuration } from 'webpack';

export default {
    plugins: [
        new IgnorePlugin({
            resourceRegExp: /^\.\/locale$/,
            contextRegExp: /moment$/,
        }),
    ],
} as Configuration;
