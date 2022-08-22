<template>
    <div>
        <!--
            cell单元格的to的用法
            cell单元格的to属性与VueRouter中的RouterLink组件中的to属性用法是一样的
            :to="'/article/'" + article.art_id
            :to="`/article/${article.art_id}`"
         -->
        <van-cell class="article-item" :to="{
                    // 根据路由名称进行跳转
            name: 'article',
                    // 传递路由动态参数
            params: {
                // 属性： 路由路径中设计的动态参数名称
                        articleId: article.art_id
                    }
        }">
            <div class="title van-multi-ellipsis--l2" slot="title">{{article.title}}</div>
            <div slot="label">
                <div class="cover-wrap" v-if="article.cover.type===3">
                    <div class="cover-item" v-for="(img, index) in article.cover.images" :key="index">
                        <van-image class="cover-item-image" :src="img" fit="cover" />
                    </div>
                </div>
                <div class="label-info-wrap">
                    <span>{{ article.aut_name}}</span>
                    <span>{{ article.comm_count}} 评论</span>
                    <span>{{ article.pubdate | relativeTime}}</span>
                </div>
            </div>
            <van-image class="right-cover" v-if="article.cover.type===1" slot="default" :src="article.cover.images[0]"
                fit="cover" />
        </van-cell>
    </div>
</template>

<script>
export default {
  name: 'ArticleItem',
  components: {

  },
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data() {
    return {

    }
  },
  created() {
  }
}
</script>

<style lang="less" scoped>

.article-item {
    .title {
        font-size: 32px;
        color: #3a3a3a;
    }
    .van-cell__value {
        flex: unset;
        width:232px;
        height: 146px;
        // 因为图片是固定的，但是title的文本长度不固定
        padding-left: 25px;
    }
    .right-cover {
        width: 232px;
        height: 146px;
    }
    .label-info-wrap span {
        font-size: 22px;
        color:#b4b4b4;
        margin-right: 25px;
    }
    .cover-wrap {
        display: flex;
        padding:30px, 0;
        .cover-item {
            flex:1;
            height: 146px;
            &:not(:last-child) {
                padding-right:4px;
            }
            .cover-item-image {
                width: 100%;
                height: 146px;
            }
        }

    }
}
</style>
