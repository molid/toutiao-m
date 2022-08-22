<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button class="search-btn" slot="title" type="info" size="small" round icon="search"
      to="/search">搜索</van-button>
    </van-nav-bar>
    <!-- 频道列表 -->
    <!--
      v-model绑定当前激活标签对应的索引值，默认情况下开启第一个标签
      通过 animated 属性可以开启切换标签内容时的转场动画。
      通过 swipeable 属性可以开启滑动切换标签页。
    -->
    <van-tabs class="channel-tabs" v-model="active" animated swipeable>
      <!-- 特点：
      1.已经加载过的频道列表不需要重新加载
      2.未加载的频道列表懒加载
      如果用一个list存放会导致覆盖，如果用多个list会代码利用率很低，所以封装文章列表组件使用。
    -->
      <van-tab :title="channel.name" v-for="channel in channels" :key="channel.id">
        <!--文章列表 -->
        <article-list :channel="channel" />
      </van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div class="hamburger-btn" slot="nav-right" @click="isChennelEditShow = true">
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>

    <!-- 频道编辑弹出层 -->
    <van-popup v-model="isChennelEditShow" closeable position="bottom" close-icon-position="top-left"
      :style="{ height: '100%' }">
      <!-- 编辑频道组件 -->
      <channel-edit
        :my-channels="channels"
        :active="active"
        @update-active="onUpdateActive"></channel-edit>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list.vue'
import ChannelEdit from './components/channel-edit.vue'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'
export default {
  name: 'HomeIndex',
  components: {
    ArticleList,
    ChannelEdit
  },
  data() {
    return {
      active: 0,
      // 用户自己的频道列表数据
      channels: [],
      // 控制频道弹出层显示隐藏的状态
      isChennelEditShow: true
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created() {
    this.loadChannels()
  },
  methods: {
    async loadChannels() {
      /* try {
        const { data } = await getUserChannels()
        this.channels = data.data.channels
      } catch (err) {
        this.$toast('获取频道数据失败！')
      } */
      try {
        let channels = []
        // 已登录， 获取用户频道列表
        if (this.user) {
          const { data } = await getUserChannels()
          channels = data.data.channels
        } else {
          // 未登录，判断是否有本地的频道列表数据
          const localChannels = getItem('TOUTIAO_CHANNELS')
          if (localChannels) {
            // 有，拿来使用
            channels = localChannels
          } else {
            // 没有，请求获取默认频道列表
            const { data } = await getUserChannels()
            channels = data.data.channels
          }
        }
        this.channels = channels
      } catch (err) {
        this.$toast('获取频道失败')
      }
    },
    // 父组件监听子组件点击频道标签触发修改数据
    // 设置isChennelEditShow的默认值为true
    onUpdateActive(index, isChennelEditShow = true) {
      // 修改active
      this.active = index
      // 关闭频道列表编辑Dialog
      this.isChennelEditShow = isChennelEditShow
    }
  }
}
</script>

<style lang="less" scoped>

.home-container {
  padding-bottom: 100px;
  padding-top: 174px;
  /deep/ .van-nav-bar__title {
    max-width: unset !important;
  }
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
    }
  }

// 在scoped中，作用子组件的样式只能作用到其根节点，为了作用的更深，影响后面的子组件样式，需要加深度操作符 >>> 或者 /deep/
   /deep/ .channel-tabs {
    .van-tabs__wrap {
      height: 82px;
      position: fixed;
      top: 92px;
      z-index: 1;
      left: 0;
      right: 0;
    }
    .van-tab {
      // 右边框 下边框不需要设置 宽高
      min-width: 200px;//默认设置了width，所以给它最小width
      border-right: 1px solid #edeff3;
      font-size: 30px;
      color: #777777;
    }
    .van-tab--active {
      color: #333333;
    }
    // 这个是flex布局
    .van-tabs__nav {
      padding-bottom: 0;
    }
    .van-tabs__line {
      bottom: 8px;
      width: 31px !important;
      height: 6px;
      background-color: #3296fa;
    }
    // 这个是数据flex布局的子项目，。van_tab已经平分完了所有的宽度。
    .placeholder {
      // 设置为0,说明其不参与平分flex布局宽度
      flex-shrink: 0;
      width:66px;
      height: 82px;
    }
    .hamburger-btn {
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 66px;
      height: 82px;
      background-color: #fff;
      opacity: 0.902;
      i.toutiao {
        font-size: 33px;
      }
      &:before {
        content: "";
        position: absolute;
        left: 0;
        width: 1px;
        height: 100%;
        background-image: url(~@/assets/gradient-gray-line.png);
        background-size: contain;
      }
    }
  }
}
</style>
