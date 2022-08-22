<template>
    <div class="article-list">
        <van-pull-refresh v-model="isreFreshLoading" @refresh="onRefresh" :success-text="refreshSuccessText" :success-duration="1500">
            <van-list v-model="loading" :error.sync="error" error-text="请求失败，点击重新加载" :finished="finished"
                finished-text="没有更多了" @load="onLoad">
                <article-item
                v-for="(article, index) in list"
                :key="index"
                :article="article"
                >

                </article-item>
                <!-- <van-cell v-for="(article, index) in list" :key="index" :title="article.title" /> -->
            </van-list>
        </van-pull-refresh>
    </div>
</template>

<script>
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/article-item'
export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      list: [], // 存储列表数据的数组
      loading: false, // 控制架子啊中loading状态
      finished: false, // 控制数据加载结束的状态
      timestamp: null, // 请求获取下一页数据的时间戳
      error: false, // 控制列表加载失败的提示状态
      isreFreshLoading: false, // 控制下拉刷新的loading状态
      refreshSuccessText: '刷新成功' // 下拉刷新成功时的提示文本
    }
  },
  methods: {
    // 初始化或滚动到底部的时候会触发调用onLoad
    async onLoad() {
      try {
        // 1.请求获取数据
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now()
        })
        /* // 模拟随机失败的情况
        if (Math.random() > 0.5) {
          JSON.parse('abcdefg')
        } */
        // 2.把请求结果数据放到list数组中
        const { results } = data.data
        // 数组的展开操作符，会将数组中的元素一个个拿出来
        this.list.push(...results)
        // 3.本次数据加载结束之后要把加载状态设置为结束
        this.loading = false
        // 4.判断数据是否全部加载完成
        if (results.length) {
          // 更新获取下一页数据的时间戳
          this.timestamp = data.data.pre_timestamp
        } else {
          // 没有数据了，将finished设置为true,不再加载更多
          this.finished = true
        }
      } catch (err) {
        // 展示错误提示
        this.error = true
        // 把加载状态设置为结束
        this.loading = false
      }
    },
    // 当下拉刷新的时候会触发调用该函数
    async onRefresh() {
      try {
        // 请求获取数据
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now()
        })
        /* // 模拟随机失败的情况
        if (Math.random() > 0.5) {
          JSON.parse('abcdefg')
        } */
        const { results } = data.data
        // 将数据追加到列表的顶部
        this.list.unshift(...results)
        // 关闭下拉刷新列表的loading状态
        this.isreFreshLoading = false
        // 更新下拉刷新成功提示的文本
        this.refreshSuccessText = `刷新成功，更新了${results.length}条数据`
      } catch (err) {
        this.refreshSuccessText = '刷新失败'
        this.isreFreshLoading = false
      }
    }
  }

}
</script>

<style lang="less" scoped>
    .article-list {
        // 百分比单位是相对于父元素的
        // height: 100%;
        height: 79vh;
        overflow-y: auto;
    }
</style>
