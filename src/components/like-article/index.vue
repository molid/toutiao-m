<template>
    <van-button :class="{
        liked: value === 1
    }" :loading="loading" :icon="value===1 ? 'good-job' : 'good-job-o'"  @click="onLiked"></van-button>
</template>

<script>
import { addLike, deleteLike } from '@/api/article'
export default {
  name: 'LikeArticle',
  components: {

  },
  props: {
    value: {
      type: Number,
      required: true
    },
    articleId: {
      type: [Number, String, Object],
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
    async onLiked() {
      this.loading = true
      let status = -1
      try {
        if (this.value === 1) {
          // 已点赞，取消点赞
          await deleteLike(this.articleId)
        } else {
          // 未点赞，点赞
          await addLike(this.articleId)
          status = 1
        }
        this.$emit('input', status)
        this.$toast.success(status === 1 ? '点赞成功' : '取消点赞')
      } catch (err) {
        console.log(err)
      }
      this.loading = false
    }
  }
}
</script>

<style scoped lang="less">
    .liked {
        .van-icon {
            color: #e5645f;
        }
    }
</style>
