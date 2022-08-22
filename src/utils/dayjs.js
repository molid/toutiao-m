/*
  Day.js处理时间模块
*/
/*  加载 */
// ES6
import Vue from 'vue'
import dayjs from 'dayjs'
/*
    var dayjs = require('dayjs') ES5
*/

// 加载中文语言包 因为dayjs默认语言是英文，需要配置中文
import 'dayjs/locale/zh-cn'

// 加载处理相对时间的插件
/* ES5写法
var relativeTime = require('dayjs/plugin/relativeTime') */
import relativeTime from 'dayjs/plugin/relativeTime'

/* 配置 */
// 配置全局使用中文语言包
dayjs.locale('zh-cn')
// 获取当前最新日期
// console.log(dayjs().format('YYYY-MM-DD'))

// 配置使用处理相对时间的插件
dayjs.extend(relativeTime)

// console.log(dayjs().from(dayjs('1990-01-01')))
// 因为多个页面要用到时间处理，所以定义全局过滤器，可以在任何组件的模板中使用, 过滤器相当于全局可用的方法（仅供模板使用）
Vue.filter('relativeTime', value => {
  return dayjs().from(dayjs(value))
})
