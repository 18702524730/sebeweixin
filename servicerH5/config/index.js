// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
    build: {
        env: require('./prod.env'),
        index: path.resolve(__dirname, '../dist/index.html'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: './',//'/servicerH5/',
        productionSourceMap: false,
        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report
    },
    dev: {
        env: require('./dev.env'),
        port: 8083,
        autoOpenBrowser: false,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        //开发环境反向代理
        proxyTable: {
            //proxy all requests starting with /api to jsonplaceholder
            //proxy the request /api/posts/1 to http://jsonplaceholder.typicode.com/posts/1
            //用户中心项目名
            '/iprp_portal': {
                // target: 'http://192.168.1.123:8382',
                //target: 'http://192.168.1.189:8099',
                target: 'http://testuser.ipsebe.com',
                changeOrigin: true,
                pathRewrite: {
                    // '^/portalsite-cnsebe': '/portalsite-cnsebe'
                    // '^/iprp_portal': ''
                    '^/iprp_portal': ''
                },
                cookieDomainRewrite: "",
            },
            //服务商
            '/iprp_servicer': {
                // target: 'http://testsp.ipsebe.com',
                target: 'http://192.168.1.189:8060',
                changeOrigin: true,
                pathRewrite: {
                    '^/iprp_servicer': '/iprp_servicer'
                },
                cookieDomainRewrite: "",
            },
            //门户项目名
            '/portalsite-cnsebe': {
                //target: 'http://192.168.1.189:8070',
                target: 'http://cart.ipsebe.com',
                //target: 'http://www.ipsebe.com',
                changeOrigin: true,
                pathRewrite: {
                    // '^/portalsite-cnsebe': '/portalsite-cnsebe'
                    // '^/iprp_portal': ''
                    '^/portalsite-cnsebe': ''
                },
                cookieDomainRewrite: "",
            },

            '/user': {
                target: 'http://testuser.ipsebe.com',
                changeOrigin: true,
                pathRewrite: {
                    // '^/portalsite-cnsebe': '/portalsite-cnsebe'
                    '^/user': ''
                },
                cookieDomainRewrite: "",
            },

            '/ipp': {
                target: 'http://testuser.ipsebe.com',
                changeOrigin: true,
                pathRewrite: {
                    '^/ipp': ''
                },
                cookieDomainRewrite: "",
            },

            '/cz': {
                target: 'http://testcz.ipsebe.com',
                changeOrigin: true,
                pathRewrite: {
                    // '^/portalsite-cnsebe': '/portalsite-cnsebe'
                    '^/cz': ''
                },
                cookieDomainRewrite: "",
            },
            //支付
            '/pay': {
                // target: 'http://192.168.1.123:8382',
                target: 'http://testiprp.ipsebe.com',
                //target: 'http://www.ipsebe.com',
                changeOrigin: true,
                pathRewrite: {
                    // '^/portalsite-cnsebe': '/portalsite-cnsebe'
                    // '^/iprp_portal': ''
                    '^/pay': ''
                },
                cookieDomainRewrite: "",
            }

        },
        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        cssSourceMap: false
    }
}
