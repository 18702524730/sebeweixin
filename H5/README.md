##主要是微信公众号微商城H5页面，包含商标注册证邮寄地址等页面

## 基本用法
``` bash
$ npm install
$ npm run dev
```

# 目录结构
```
|____build              webpack打包的环境代码
|____config             webpack打包的配置文件
|____node_modules       项目运行依赖的npm包
|____src                项目代码文件夹
 |__api                 接口定义
 |__assets              css及打包图片资源 
 |__components          自定义组件
 |__mixins              一些混合公用方法
 |__mock                mock数据
 |__pages               页面组件
 |__plugins             vue插件
  |__flyio          
   |__config            接口请求配置管理
   |__interceptors.js   接口请求拦截器
   |__request           接口请求封装（包括loading及toast，接口的定制化配置及默认配置)
 |__router              路由管理
 |——store               vuex状态管理
  |__modules            store的管理文件
  |__index.js           实现store对modules文件下的自动注册
 |__utils               工具类
 |__App.vue             小程序的App页面
 |__main.js             小程序app.json配置
|____static             静态资源文件夹
|____.babelrc           es6语法转换配置文件
|____.editorconfig      编辑器配置
|____.eslintignore      eslint的忽略配置
|____.eslintrc.js       eslint配置
|____.gitignore         git push忽略配置
|____.postcssrc.js      postcss插件的配置文件
|____index.html         SPA的index页面
|____package.json       npm包配置文件
|____README.md          readme文档

```

主要的开发便利包含如下：

> 1. 使用了[vux]UI框架

> 2. 使用[flyio](https://wendux.github.io/dist/#/doc/flyio-en/readme)并封装了请求，

优点：根据[vuex官方推荐](https://vuex.vuejs.org/zh-cn/intro.html)，将background API封装到actions中，具体用法可在代码里查看。



