var path = require('path')
var utils = require('./utils')

var projectRoot = path.resolve(__dirname, '../')
const vuxLoader = require('vux-loader')

var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

let webpackConfig = {
    entry: {
        app: './src/main.js'
    },
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test' ? config.build.assetsPublicPath : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            'mock': path.resolve(__dirname, '../src/mock'),
            'src': path.resolve(__dirname, '../src'),
            'assets': path.resolve(__dirname, '../src/assets'),
            'components': path.resolve(__dirname, '../src/components'),
            '@': resolve('src')
        }
    },
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('test')]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.scss$/,
                loaders: ["style", "css", "sass"]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    }
}


module.exports = vuxLoader.merge(webpackConfig, {
    plugins: ['vux-ui', 'progress-bar', 'duplicate-style',
      {
        name: 'less-theme',
        path: 'src/assets/css/vux_theme.less'
      },
      {
        name: 'after-less-parser',
        fn: function (source) {
          if (this.resourcePath.replace(/\\/g, '/').indexOf('vux/src/components') > -1) {
            source = source.replace(/px/g, 'PX')
          }
          return source
        }
      },
      {
        name: 'style-parser',
        fn: function (source) {
          if (this.resourcePath.replace(/\\/g, '/').indexOf('vux/src/components') > -1) {
            source = source.replace(/px/g, 'PX')
          }
          // 避免转换PX.less文件路径
          if (source.indexOf('PX.less') > -1) {
            source = source.replace(/PX.less/g, 'px.less')
          }
          return source
        }
      }
    ]
})
