<template>
  <div class="my-container">
    <!-- 已登录头部 -->
    <div v-if="user" class="header user-info">
      <div class="base-info">
        <div class="left">
          <van-image class="avatar" round :src="userInfo.photo" fit="cover" />
          <span class="name">{{userInfo.name}}</span>
        </div>
        <div class="right">
          <van-button type="primary" round size="mini" to="/user/profile">编辑资料</van-button>
        </div>
      </div>
      <div class="data-info">
        <div class="data-item">
          <span class="count">{{ userInfo.art_count }}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.follow_count }}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.fans_count }}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.like_count }}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
    <!-- 未登录头部 -->
    <div v-else class="header not-login">
      <div class="login-btn" @click="$router.push('/login')">
        <img src="~@/assets/mobile.png" class="mobile-img" alt="">
        <span class="text">登录 / 注册</span>
      </div>
    </div>
    <!-- 导航 -->
    <van-grid class="grid-nav" :column-num="2" clickable>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-shoucang"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-lishi"></i>
        <span class="text" slot="text">历史</span>
      </van-grid-item>
    </van-grid>
    <van-cell title="消息通知" is-link />
    <van-cell title="小智同学" class="mb-9" is-link />
    <van-cell v-if="user" class="logout-cell" title="退出登录" @click="onLogout" clickable />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'

export default {
  name: 'MyIndex',
  components: {},
  props: {},
  data() {
    return {
      // 用户自己的信息
      userInfo: {}
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {

  },
  created() {
    // 如果用户登录了则请求加载用户信息
    if (this.user) {
      this.loadUserInfo()
    }
  },
  mounted() {

  },
  methods: {
    onLogout() {
      // 退出提示
      // 在组件中需要使用this.$dialog来调用弹框组件
      this.$dialog.confirm({
        title: '确认退出吗？'
      })
        .then(() => {
          // on confirm
          // 确认退出： 清除登录状态（容器中的user+本地存储中的user)
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          // on cancel
          console.log('取消执行这里')
        })
    },
    async loadUserInfo() {
      try {
        const { data } = await getUserInfo()
        this.userInfo = data.data
      } catch (err) {
        this.$toast('获取用户自身信息失败，请稍后重试')
      }
    }
  }
}
</script>

<style lang="less" scoped>

 .my-container {
  .header {
    height: 361px;
    // background: url('../../assets/banner.png');
    // 注意：在vue-cli中@代表src,且在css中使用@需要在前面加~
    background: url('@/assets/banner.png');
    background-size: cover;
  }

  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items:center;
      .mobile-img {
        width: 132px;
        height: 132px;
      }
      .text {
        font-size: 28px;
        color: #fff;
      }
    }
  }

  .user-info{
    .base-info{
      height: 231px;
      padding: 76px 32px 23px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        align-items: center;
        .avatar {
          width: 132px;
          height: 132px;
          margin-right: 23px;
          border: 4px solid #fff;
        }
        .name {
          font-size: 30px;
          color: #fff;
        }
      }
    }
    .data-info{
      display:flex;
      .data-item {
          height: 130px;
          display: flex;
          flex: 1;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .count {
            font-size: 36px;
          }
          .text {
            font-size: 23px;
          }
      }
    }
  }
  .grid-nav {
    .grid-item {
      height: 141px;
      i.toutiao {
        font-size: 45px;
      }
      .toutiao-shoucang {
        color: #eb5253;
      }
      .toutiao-lishi {
        color: #ff9d1d;
      }
      span.text {
        font-size: 28px;
      }
    }
  }
  .logout-cell {
    text-align: center;
    color: #d86262;
  }

  .mb-9 {
    margin-bottom: 9px;
  }
 }
</style>
