<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="个人信息" left-arrow @click-left="$router.back()" />
    <!-- 隐藏的上传文件按钮 -->
    <input type="file" hidden ref="file" @change="onFileChange">
    <!-- 个人信息 -->
    <van-cell title="头像" is-link class="photo-cell" center @click="$refs.file.click()">
      <van-image class="avatar" fit="cover" round :src="user.photo" />
    </van-cell>
    <van-cell title="昵称" :value="user.name" is-link @click="isUpdateNameShow = true" />
    <van-cell title="性别" :value="user.gender === 0 ? '男' : '女'" is-link @click="isUpdateGenderShow = true" />
    <van-cell title="生日" :value="user.birthday" is-link @click="isUpdateBirthdayShow = true" />
    <!-- 编辑昵称 -->
    <van-popup v-model="isUpdateNameShow" style="height: 100%" position="bottom">
      <update-name v-if="isUpdateNameShow" @close="isUpdateNameShow = false" v-model="user.name" />
    </van-popup>
    <!-- 编辑性别 -->
    <van-popup v-model="isUpdateGenderShow" position="bottom">
      <update-gender v-if="isUpdateGenderShow" @close="isUpdateGenderShow = false" v-model="user.gender" />
    </van-popup>
    <!-- 编辑生日 -->
    <van-popup v-model="isUpdateBirthdayShow" position="bottom">
      <update-birthday v-if="isUpdateBirthdayShow" @close="isUpdateBirthdayShow = false" v-model="user.birthday" />
    </van-popup>
    <!-- 编辑头像 -->
    <van-popup v-model="isUpdatePhotoShow" position="bottom" style="height:100%;" @close="isUpdatePhotoShow = false">
      <update-photo v-if="isUpdatePhotoShow" :img="img" @close="isUpdatePhotoShow = false" @update-photo="user.photo = $event"></update-photo>
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import UpdateName from './components/update-name'
import UpdateGender from './components/update-gender'
import UpdateBirthday from './components/update-birthday'
import UpdatePhoto from './components/update-photo'
export default {
  name: 'UserProfile',
  components: {
    UpdateName,
    UpdateGender,
    UpdateBirthday,
    UpdatePhoto
  },
  props: {

  },
  data() {
    return {
      user: {}, // 用户个人资料
      isUpdateNameShow: false,
      isUpdateGenderShow: false,
      isUpdateBirthdayShow: false,
      isUpdatePhotoShow: false,
      img: null // 预览的图片
    }
  },
  watch: {

  },
  computed: {

  },
  created() {
    this.loadUserProfile()
  },
  mounted() {

  },
  methods: {
    async loadUserProfile() {
      try {
        const { data } = await getUserProfile()
        this.user = data.data
      } catch (err) {
        this.$toast('数据获取失败')
      }
    },
    onFileChange() {
      // 获取文件对象
      const file = this.$refs.file.files[0]
      // 基于文章对象获取blob数据
      this.img = window.URL.createObjectURL(file)
      // 展示预览图片的弹出层
      this.isUpdatePhotoShow = true
      // file-input 如果选择了同一个文件不会触发change事件
      // 解决办法就是每次使用完毕，把它的value清空
      this.$refs.file.value = ''
    }
  }
}
</script>

<style scoped lang="less">

    .user-profile {
        .avatar {
            width: 60px;
            height: 60px;
        }
    }
</style>
