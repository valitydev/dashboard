const url = require('url');

require('dotenv').config({ path: ['.env', process.env.NODE_ENV].filter(Boolean).join('.') });

const { PROXY_TARGET } = process.env;
const REQUIRED_ENV = [PROXY_TARGET];

if (REQUIRED_ENV.findIndex((e) => !e) !== -1) {
    throw new Error('[proxy.conf.js] Set required environment variables!');
}

module.exports = {
    // http://localhost/__api -> https://api.target.com
    '/__api': {
        target: `https://api.${PROXY_TARGET}`,
        secure: false,
        changeOrigin: true,
        pathRewrite: { '^/__api': '' },
        logLevel: 'debug',
        headers: { Origin: `https://dashboard.${PROXY_TARGET}` },
    },
};
