/*
    请求模块
*/
import axios from 'axios'
import store from '@/store'
// import JSONBig from 'json-bigint'

/* jsonbig转换过程的原理分析
const jsonStr = '{"art_id": 1245953273786007552}'
console.log(JSON.parse(jsonStr))
// art_id: 1245953273786007600
// JSONBig可以处理数据中超出JavaScript安全整数范围的问题
console.log(JSONBig.parse(jsonStr))

  // art_id: BigNumber
  //   c: Array(2)
  //   0: 12459
  //   1: 53273786007552

// 使用的时候需要把BigNumber类型的数据转换为字符串来使用
console.log(JSONBig.parse(jsonStr).art_id.toString())
// 1245953273786007552
// JSONBig.stringify()把JavaScript对象转换为JSON格式的字符串
console.log(JSONBig.stringify(JSONBig.parse(jsonStr)))
// {"art_id":1245953273786007552} */

const request = axios.create({
  baseURL: 'http://toutiao.itheima.net/' // 基础路径
  // 自定义后端返回的数据
  // transformRequest: [function (data, headers) {
  //   // axios默认会在内部这样处理后端返回的数据
  //   // data：后端返回的原始数据，说白了就是JSON格式的字符串
  //   try {
  //     return JSONBig.parse(data)
  //   } catch (err) {
  //     return data
  //   }
  // }]
})
// 请求拦截器
// Add a request interceptor
request.interceptors.request.use(function (config) {
  const { user } = store.state
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  // return config必不可少
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})
// 响应拦截器
export default request
