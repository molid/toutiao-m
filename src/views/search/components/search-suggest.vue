<template>
    <div class="search-suggest">
      <!-- 在点击van-cell的时候会给父组件发一个自定义事件 -->
        <van-cell
            v-for="(text, index) in suggestions"
            :key="index"
            icon="search"
            @click="$emit('search', text)" >
            <div slot="title" v-html="hightlight(text)"></div>
            </van-cell>
    </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search'
// 按需加载的好处，只会把使用到的成员打包到结果中
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggest',
  components: {

  },
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      suggestions: [] // 联想建议数据列表

    }
  },
  computed: {

  },
  watch: {
    searchText: {
      /* handler(value) {
        this.loadSearchSuggestions(value)
      }, */
      /*
        debounce函数 防抖
        参数1： 一个函数
        参数2： 延迟时间，单位是毫秒
        返回值：防抖之后的函数
      */
      handler: debounce(function (value) {
        this.loadSearchSuggestions(value)
      }, 10),
      //   将立即以表达式的当前值触发回调：
      immediate: true
    }
  },
  created() {

  },
  mounted() {

  },
  methods: {
    async loadSearchSuggestions(q) {
      try {
        const { data } = await getSearchSuggestions(q)
        this.suggestions = data.data.options
      } catch (err) {
        this.$toast('数据获取失败，请稍后重试')
      }
    },
    hightlight(text) {
      console.log(text)
      // bug:[Vue warn]: Error in render: "TypeError: Cannot read properties of null (reading 'replace')"
      // 原因：每次输入停顿或者回车就会触发获取关联数据的方法，但是不是每次都能拿到关联数据，因此就会存在text为空的情况
      if (text) {
        const hightlightStr = `<span class="active">${this.searchText}</span>`
        /*
          正则表达式//中间的内容都会当作匹配字符来使用，而不是数据变量
          如果需要根据数据变量动态的创建正则表达式，则手动new RegExp
          RegExp正则表达式构造函数
          参数1： 匹配模式字符串，它会根据这个字符串创建正则对象
          参数2：匹配模式，要写到字符串中

        */
        //   text.replace(/this.searchText/gi, hightlightStr)  错误
        const reg = new RegExp(this.searchText, 'gi')
        return text.replace(reg, hightlightStr)
      }
    }

  }
}
</script>

<style scoped lang="less">
    .search-suggest {
        /deep/ span.active {
            color: #3296fa;
        }
    }
</style>
