<template>
    <!-- 已关注按钮 -->
    <van-button v-if="isFollowed" class="follow-btn" round size="small" @click="onFollow" :loading="loading">已关注
    </van-button>
    <!-- 关注按钮 -->
    <van-button v-else class="follow-btn" round type="success" color="#3296fa" size="small" icon="plus"
        :loading="loading" @click="onFollow">关注
    </van-button>
</template>

<script>
import { deleteFollow, addFollow } from '@/api/user'
export default {
  name: 'FollowUser',
  components: {
  },
  model: {
    prop: 'isFollowed',
    event: 'update-is_followed'
  },
  props: {
    isFollowed: {
      type: Boolean,
      required: true
    },
    userId: {
      type: [String, Number, Object],
      required: true
    }
  },
  data() {
    return {
      loading: false
    }
  },
  watch: {

  },
  computed: {

  },
  created() {

  },
  mounted() {

  },
  methods: {
    async onFollow() {
      // 展示关注按钮的loading状态
      this.loading = true
      try {
        if (this.isFollowed) {
          // 已关注，取消关注
          await deleteFollow(this.userId)
        } else {
          // 没有关注，添加关注
          await addFollow(this.userId)
        }
        // this.$emit('update-is_followed', !this.isFollowed)
        this.$emit('update-is_followed', !this.isFollowed)
      } catch (err) {
        let message = '操作失败，请重试！'
        if (err.response && err.response.status === 400) {
          message = '你不能关注你自己！'
        }
        this.$toast(message)
      }
      // 关闭关注按钮的loading状态
      this.loading = false
    }
  }
}
</script>

<style scoped lang="less">

</style>
