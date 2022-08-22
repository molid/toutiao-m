<template>
    <div class="channel-edit">
        <!-- 我的频道 -->
        <van-cell :border="false">
            <div class="title-text" slot="title">我的频道</div>
            <van-button class="edit-btn" type="danger" size="mini" plain round @click="isEdit = !isEdit">
                {{isEdit ? '完成' : '编辑'}}
            </van-button>
        </van-cell>
        <!--
            v-bind:class语法
            一个对象，对象中的key表示要作用的css类名
            对象中的value表示要计算出布尔值
            true,则作用该类名
            false,则不作用类名
         -->
        <van-grid class="my-grid" :gutter="10">
            <van-grid-item class="grid-item" v-for="(channel, index) in myChannels" :key="index"
                @click="onMyChannelClick(channel, index)">
                <van-icon v-show="isEdit && !fiexdChannels.includes(channel.id)" slot="icon" name="clear"></van-icon>
                <span class="text" slot="text" :class="{active: index === active}">{{channel.name}}</span>
            </van-grid-item>
        </van-grid>
        <!-- 频道推荐 -->
        <van-cell :border="false">
            <div class="title-text" slot="title">频道推荐</div>
        </van-cell>
        <van-grid class="recommend-grid" :gutter="10">
            <van-grid-item class="grid-item" v-for="(channel, index) in recommendChannels" :key="index"
                :text="channel.name" icon="plus" @click="onAddChannel(channel)" />
        </van-grid>
    </div>
</template>

<script>
import { getAllChannels, addUserChannel, deleteUserChannel } from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'
export default {
  name: 'ChannelEdit',
  components: {

  },
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      allChannels: [], // 所有频道列表
      isEdit: false, // 控制编辑状态的显示
      fiexdChannels: [0]// 固定频道，不允许删除
    }
  },
  computed: {
    // 获取用户登录后的user
    ...mapState(['user']),
    // 推荐频道=所有频道-用户频道
    /* 实现逻辑1 */
    /* recommendChannels() {
      const channels = []
      this.allChannels.forEach(channel => {
        // find遍历数组，找到满足条件的元素
        const ret = this.myChannels.find(myChannel => {
          return myChannel.id === channel.id
        })
        if (!ret) {
          channels.push(channel)
        }
      })
      return channels
    } */
    /* 计算属性会观测内部依赖数据的变化，如果依赖的数据发生变化，则计算属性会重新执行 */
    recommendChannels() {
      // 数组的filter方法：遍历数组，把符合条件的元素存储到新数组中
      return this.allChannels.filter(channel => {
        // const channels = []
        // 数组的find方法:遍历数组，把符合条件的第一个元素返回
        // 如果返回的是true,则filter把元素放到channels中
        return !this.myChannels.find(myChannel => {
          return myChannel.id === channel.id
        })
        // return channels
      })
    }
  },
  created() {
    this.loadAllChannels()
  },
  mounted() {

  },
  methods: {
    async loadAllChannels() {
      try {
        const { data } = await getAllChannels()
        this.allChannels = data.data.channels
      } catch (err) {
        this.$toast('数据获取失败')
      }
    },
    async onAddChannel(channel) {
      // eslint-disable-next-line vue/no-mutating-props
      this.myChannels.push(channel)
      //   数据持久化处理
      if (this.user) {
        try {
          // 已登录，数据传到数据库
          await addUserChannel({
            id: channel.id,
            sep: this.myChannels.length
          })
        } catch (err) {
          this.$toast('添加频道失败')
        }
      } else {
        // 未登录，数据本地保存
        setItem('TOUTIAO_CHANNELS', this.myChannels)
      }
    },
    // 点击编辑按钮，触发事件
    onMyChannelClick(channel, index) {
      if (this.isEdit) {
        // 编辑状态，删除频道
        // 参数1：要删除元素的开始索引
        // 参数2：要删除元素的个数
        // deBug: 固定频道目前只是不展示删除字体，但是点击还会删除
        /* 1. 如果是固定频道，则不删除 */
        if (this.fiexdChannels.includes(channel.id)) {
          return
        }
        /* 2.删除频道项 */
        // eslint-disable-next-line vue/no-mutating-props
        this.myChannels.splice(index, 1)
        /* 4.数据持久化 */
        this.deleteChannel(channel)
        /* 3.如果删除激活频道之前的频道，则更新激活的频道项 */
        // deBug: 删除激活标签前的标签，当前激活的标签发生改变，变成它后面一个
        if (index < this.active) {
          // 让激活频道索引-1,其实就是update-active做的事
          //   因为该函数在改变数值的基础上还关闭Dialog，所以添加控制这个的参数
          this.$emit('update-active', this.active - 1, true)
        }
      } else {
        // 非编辑状态,切换频道
        // 修改主组件中的active
        this.$emit('update-active', index, false)
      }
    },
    // 删除频道项
    async deleteChannel(channel) {
      if (this.user) {
        // 已登录，数据传到数据库
        try {
          await deleteUserChannel(channel.id)
        } catch (err) {
          this.$toast('删除频道失败')
        }
      } else {
        // 未登录，数据本地存储
        setItem('TOUTIAO_CHANNELS', this.myChannels)
      }
    }
  }

}
</script>

<style scoped lang="less">

.channel-edit {
    padding: 85px 0;
    .title-text {
        font-size: 32px;
        color: #333333;
    }
    .edit-btn {
        width: 104px;
        height: 48px;
        font-size: 26px;
        color: #f85959;
        border: 1px solid #f85959;
    }
    /deep/ .grid-item {
        width: 160px;
        height: 86px;
        .van-grid-item__content {
            white-space: nowrap;
            background-color: #f4f5f6;
            .van-grid-item__text, .text {
                font-size: 28px;
                color: #222;
                margin-top: 0;
            }
            .active {
                color: red;
            }
        }
    }
    /deep/ .my-grid {
            .grid-item {
                .van-grid-item__icon-wrapper {
                    position: unset;
                }
                .van-icon-clear {
                    position: absolute;
                    top: -10px;
                    right: -10px;
                    color: #cacaca;
                    font-size: 30px;
                    z-index: 2;
                }
            }
        }
    /deep/ .recommend-grid {
        .grid-item {
            .van-grid-item__content {
                flex-direction: row;
                .van-icon-plus {
                    font-size: 28px;
                    margin-right: 6px;
                }
            }
        }
    }
}
</style>
