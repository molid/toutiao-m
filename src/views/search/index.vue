<template>
    <div class="search-container">
        <!-- 搜索栏 -->
        <!-- 注意： form的作用是用手机运行的时候，点击搜索栏会弹出带搜索按钮的输入键盘 -->

        <form action="/" class="search-form">
            <van-search v-model="searchText" show-action placeholder="请输入搜索关键词" background="#3296fa" @search="onSearch"
                @cancel="onCancel" @focus="isResultShow = false" />
        </form>
        <!-- 注意： 以下三个组件的展示逻辑： 输入框内无文本-搜索历史， 输入框获取到焦点-搜索联想建议 输入框回车或点击搜索按钮-搜索结果 -->
        <!-- 搜索结果 -->
        <search-result v-if="isResultShow" :search-text="searchText" />
        <!-- 搜索联想建议 -->
        <search-suggest v-else-if="searchText" :search-text="searchText" @search="onSearch" />
        <!-- 搜索历史记录 -->
        <search-history v-else />
    </div>
</template>

<script>
import SearchHistory from './components/search-history'
import SearchSuggest from './components/search-suggest'
import SearchResult from './components/search-result'
export default {
  name: 'SearchIndex',
  components: {
    SearchHistory,
    SearchSuggest,
    SearchResult
  },
  props: {

  },
  data() {
    return {
      // 搜索文本
      searchText: '',
      isResultShow: false // 搜索结果是否展示
    }
  },
  computed: {

  },
  created() {

  },
  mounted() {

  },
  methods: {
    // 回车或点击搜索按钮的时候会触发该事件
    // 点击联想建议的van-cell也会触发该事件，而且会把事件传递给search-result组件
    onSearch(val) {
      this.searchText = val
      this.isResultShow = true
    },
    onCancel() {
      this.$router.back()
    }
  }
}
</script>

<style scoped lang="less">

.search-container {
  padding-top: 108px;
  .van-search__action {
     color: #fff;
  }
  .search-form {
   position: fixed;
   top:0;
   left: 0;
   right: 0;
   z-index: 1;
  }
}
</style>
