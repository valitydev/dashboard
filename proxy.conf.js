const url = require('url');

require('dotenv').config({ path: ['.env', process.env.NODE_ENV].filter(Boolean).join('.') });

const { PROXY_TARGET } = process.env;
const REQUIRED_ENV = [PROXY_TARGET];

if (REQUIRED_ENV.findIndex((e) => !e) !== -1) {
    throw new Error('[proxy.conf.js] Set required environment variables!');
}

/**
 * http://localhost/__subdomain to https://subdomain.target.com
 */
function createSubdomainByPathProxy(target, subdomainPathPrefix = '__') {
    const SUBDOMAIN_PARAM_REGEXP = `^/${subdomainPathPrefix}(?<param>[a-zA-Z0-9-]+)`;
    const { host, port, protocol } = url.parse(target);
    return {
        context: `/${subdomainPathPrefix}*/**`,
        target: 'localhost',
        router: function (req) {
            const param = req.url.match(new RegExp(SUBDOMAIN_PARAM_REGEXP)).groups.param;
            return `${protocol}//${param}.${host}${port ? `:${port}` : ''}`;
        },
        pathRewrite: { [SUBDOMAIN_PARAM_REGEXP]: '' },
        secure: false,
        logLevel: 'debug',
        changeOrigin: true,
        onProxyReq: (req) => {
            req.setHeader('origin', `https://dashboard.${host}${port ? `:${port}` : ''}`);
        },
    };
}

module.exports = [createSubdomainByPathProxy(PROXY_TARGET)];
