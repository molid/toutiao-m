<template>
    <div class="update-photo">
        <img class="img" :src="img" ref="img">
        <div class="toolbar">
            <div class="cancel" @click="$emit('close')">取消</div>
            <div class="confirm" @click="onConfirm">完成</div>
        </div>
    </div>
</template>

<script>
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { updateUserPhoto } from '@/api/user'
export default {
  name: 'UpdatePhoto',
  components: {

  },
  props: {
    img: {
      type: [String, Object],
      required: true
    }
  },
  data() {
    return {
      cropper: null
    }
  },
  watch: {

  },
  computed: {

  },
  created() {

  },
  mounted() {
    const image = this.$refs.img
    this.cropper = new Cropper(image, {
      viewMode: 1, // 裁剪纸的查看模式
      dragMode: 'move', // 拖动模式
      aspectRatio: 1, // 截图的比例
      autoCropArea: 1, // 自动截图的区域
      cropBoxMovable: false, // 裁剪纸是否可以移动
      cropBoxResizable: false, // 裁剪纸是否可以缩放
      background: false,
      movable: true
    })
  },
  methods: {
    onConfirm() {
      /* 此处获取处理的结果有两种方案，对应服务器处理截图和客户端处理截图 */
    //   方法一： 拿到截图的数据交给服务器处理
    /* {x: 560, y: 0, width: 720, height: 720, rotate: 0, …}
        height: 720
        rotate: 0
        scaleX: 1
        scaleY: 1
        width: 720
        x: 560
        y: 0 */
      //   console.log(this.cropper.getData())
      //   方法二： 客户端处理截图 纯客户端的裁剪使用getCroppedCanvas获取裁剪的文件对象
      this.cropper.getCroppedCanvas().toBlob((blob) => {
        this.updateUserPhoto(blob)
      })
    },
    async updateUserPhoto(blob) {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0
      })
      try {
        /* 错误用法
      updateUserPhoto({
        photo: blob
      }) */
        /* 如果接口要求Content-Type 是 multipart/form-data 则必须传递FormData对象 */
        const formData = new FormData()

        // Pass the image file name as the third parameter if necessary.
        formData.append('photo', blob)
        const { data } = await updateUserPhoto(formData)
        // 关闭弹出层
        this.$emit('close')
        // 更新视图
        this.$emit('update-photo', data.data.photo)
        this.$toast.success('更新成功')
      } catch (err) {
        this.$toast.fail('更新失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
    .update-photo {
        background-color: #000;
        height: 100%;
        .toolbar {
            position: fixed;
            left: 0;
            right: 0;
            bottom: 0;
            // 内容水平排列
            display: flex;
            // 内容左右两端对齐
            justify-content: space-between;
            .cancel, .confirm {
                width: 90px;
                height: 90px;
                font-size: 30px;
                display: flex;
                justify-content: center;
                align-items: center;
                color: #fff;
            }
        }
        .img {
                display: block;
                max-width: 100%;
            }
    }
</style>
