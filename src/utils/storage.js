/*
    封装本地存储操作模块
*/

/* 存储数据 */
export const setItem = (key, value) => {
  // 将数组、对象类型的数据转换为JSON格式字符串进行存储
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}
/* 获取数据 */
export const getItem = (key) => {
  const value = window.localStorage.getItem(key)
  try {
    //   如果是数组、对象类型的数据从此处返回，如果是其余数据类型则报错，被catch然后返回
    return JSON.parse(value)
  } catch (err) {
    return value
  }
}
/* 删除数据 */
export const removeItem = (key) => {
  window.localStorage.removeItem(key)
}
