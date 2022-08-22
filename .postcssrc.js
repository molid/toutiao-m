// OostCSS配置文件
module.exports = {
  // 配置要使用的PostCSS插件
  plugins: {
    // 配置使用autoprefixer插件，生成浏览器CSS样式规则前缀
    // 因为VueCLI内部已经配置了，再次配置产生冲突
    // 'autoprefixer': {
    //     // 配置要兼容到的环境信息
    //     browsers: ['Android >= 4.0', 'iOS >= 8']
    // },
    // 配置使用postcss-pxtorem插件，把px转化为rem
    'postcss-pxtorem': {
      /*
                lib-flexible的REM适配方案：把一行分成十分，每份是十分之一。rootValue是设计稿宽度的十分之一。
                因为vant基于375设计的，因此建议rootValue是37.5.自行设计的设计稿宽度750，因此，rootVlaue是75
                rootValue:数字|函数类型
                函数类型： 处理每个css文件的时候都会调用，把被处理的css文件相关信息通过参数传递给该函数
            */
      rootValue({ file }) {
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      // 配置要转换的css的属性
      propList: ['*'],
      // 配置不要转换的样式资源
      exclude: 'github-markdown'
    }
  }
}
