<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登录">
      <van-icon slot="left" name="cross" @click="$router.back()"></van-icon>
    </van-nav-bar>
    <!-- 登录表单 -->
    <!-- 表单验证
            1.给van-field组件配置rules验证规则
            2.当表单提交的时候会自动触发表单验证
            如果验证通过，会触发submit事件
            如果验证不通过，则不会
        -->
    <van-form ref="loginForm" @submit="onSubmit">
      <van-field v-model="user.mobile" name="mobile" placeholder="请输入手机号" :rules="userFormRules.mobile"
        maxlength="11">
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field v-model="user.code" name="code" placeholder="请输入验证码"
        :rules="userFormRules.code" maxlength="6">
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <!--倒计时 -->
          <van-count-down v-if="isCountDownShow" :time="1000 * 5" format="ss s" @finish="isCountDownShow=false" />
          <!-- native-type=button 可以防止点击该按钮时提交表单 -->
          <van-button class="send-sms-btn" round size="small" type="default" @click="onSendSms" native-type="button">
            获取验证码</van-button>
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
// 此处注意如果是单独导入某个请求接口需要用{}来解构
import { login, sendSms } from '@/api/user'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '13888888888',
        code: '246810'
      },
      //   验证规则
      userFormRules: {
        mobile: [{
          required: true,
          message: '手机号不能为空'
        }, {
          pattern: /^1[3|5|7|8]\d{9}$/,
          message: '手机号格式错误'
        }],
        code: [{
          required: true,
          message: '验证码不能为空'
        }, {
          pattern: /^\d{6}$/,
          message: '验证码格式错误'
        }]
      },
      //   控制倒计时组件显示隐藏
      isCountDownShow: false
    }
  },
  methods: {
    async onSubmit() {
    //   1.获取表单数据
      const user = this.user
      // TODO: 2.表单验证
      //   在组件中必须通过this.$toast来条用Toast组件
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true, // 禁用背景点击
        duration: 0 // 持续时间，默认是2000，如果为0，则持续展示
      })
      // 3.提交表单请求登录
      try {
        const { data } = await login(user)
        this.$store.commit('setUser', data.data)
        this.$toast.success('登录成功')
        // 登录成功后页面跳转
        // 注意： back的功能不严谨，后面讲功能优化的时候讲
        this.$router.back()
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('手机号或验证码错误！')
        } else {
          this.$toast.fail('登录失败，请稍后重试！')
        }
      }
    // 4.根据请求响应结果处理后续操作
    },
    async onSendSms() {
      // 1.验证手机号
      try {
        await this.$refs.loginForm.validate('mobile')
        console.log('验证通过')
        // 为了避免在此大量嵌套代码，捕获后直接return结束
      } catch (err) {
        return console.log('验证失败', err)
      }
      // 2.验证通过，显示倒计时
      this.isCountDownShow = true
      // 3.请求发送验证码
      try {
        await sendSms(this.user.mobile)
        this.$toast('发送成功')
      } catch (err) {
        // 发送失败，关闭倒计时
        this.isCountDownShow = false
        if (err.response.status === 429) {
          this.$toast('发送太频繁了，请稍后重试')
        } else {
          this.$toast('发送失败，请稍后重试')
        }
      }
    }

  }
}
</script>
<style lang="less" scoped>

    .toutiao {
        font-size: 37px;
    }
    .send-sms-btn {
        width: 152px;
        height: 46px;
        line-height: 46px;
        background-color: #ededed;
        font-size: 22px;
        color: #666;
    }
    .login-btn-wrap {
        padding: 53px 33px;
        .login-btn {
            background-color: #6db4fb;
            border: none;
            border-radius: 5px;
        }
    }
</style>
