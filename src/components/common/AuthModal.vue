<template>
  <div>
    <!-- 未登录状态载体 -->
    <div @click="showLogin = true">
      <slot>Login</slot>
    </div>
    <Modal v-model="showLogin"
           :lock-scroll="true"
           :footer-hide="true"
           :mask-closable="false"
           :width="650"
           :styles="{top: '20%'}"
           :class-name="normalBackground ? 'login-box normal-background' : 'login-box'">
      <div class="auth-body" v-if="showLogin">
        <div class="login-body">
          <div class="site-flag">
            <div class="site-tips">
              <span class="t1">
                欢迎来到it充电站
              </span>
              <span class="t2" v-if="actionType === 2">
                —— 工作不息，充电不止
              </span>
              <span class="t3" v-if="actionType === 1">
                —— 永远电量满满，永远激情澎湃
              </span>
            </div>
            <div class="logo-icon-img">
              <img src="https://lovbe-blog.oss-cn-chengdu.aliyuncs.com/sysconfig/background/cy2.png" alt="">
            </div>
          </div>
          <div class="login-main">
            <h1 class="title" v-if="loginType === 1">账号密码登录</h1>
            <h1 class="title" v-if="loginType === 2">快速登录 / 注册</h1>
            <h1 class="title" v-if="loginType === 3">重置密码</h1>
            <div class="panel-pwd" v-if="loginType === 1">
              <div class="pwd-input-group">
                <form>
                  <Input v-model="account"
                         class="account"
                         placeholder="请输入邮箱/手机号（国际号码加区号如+86）"
                         @on-change="checkALegitimacy(3)"
                         type="text"
                         maxlength="20"/>
                  <div class="error-text account-error">{{ accountError ? '请输入正确的手机号或邮箱' : '' }}</div>
                  <Input v-model="password"
                         maxlength="30"
                         type="password"
                         @on-change="checkALegitimacy(1)"
                         placeholder="请输入密码">
                    <Button slot="suffix"
                            ghost
                            @click="forgotPwd"
                            type="text">忘记密码
                    </Button>
                  </Input>
                  <div class="error-text">{{ pwdErrorMsg }}</div>
                </form>
              </div>
              <div class="button-group">
                <Button type="primary"
                        size="large"
                        @click="payloadLogin"
                        :loading="loginLading">
                  登录
                </Button>
                <Button size="large" @click="changeLoginType">
                  注册
                </Button>
              </div>
            </div>
            <div class="panel-verify" v-if="loginType === 2">
              <div class="verify-input-group">
                <form>
                  <Input v-model="account"
                         placeholder="请输入邮箱/手机号（国际号码加区号如+86）"
                         maxlength="20"
                         @on-change="checkALegitimacy(3)">
                  </Input>
                  <div class="error-text account-error">{{ accountError ? '请输入正确的手机号或邮箱' : '' }}</div>
                </form>
                <Input v-model="verifyCode"
                       maxlength="6"
                       placeholder="请输入验证码"
                       @on-change="checkALegitimacy(4)">
                  <Button slot="suffix"
                          type="text"
                          ghost
                          @click="getVerifyCode"
                          class="verify-code-btn"
                          :loading="codeLoading"
                          :disabled="sendCodeSuccess">
                    {{ btnValue }}
                  </Button>
                </Input>
                <div class="error-text">{{ verifyCodeError ? '请输入正确的验证码' : '' }}</div>
              </div>
              <Button size="large"
                      type="primary"
                      :loading="loginLading"
                      @click="quickLogin">
                登录 / 注册
              </Button>
            </div>
            <div class="panel-reset-pwd" v-if="loginType === 3">
              <div class="reset-input-group">
                <Input v-model="account"
                       placeholder="请输入邮箱/手机号（国际号码加区号如+86）"
                       maxlength="20"
                       @on-change="checkALegitimacy(3)">
                </Input>
                <div class="error-text account-error">{{ accountError ? '请输入正确的手机号或邮箱' : '' }}</div>
                <Input v-model="password"
                       placeholder="请输入新密码"
                       maxlength="30"
                       type="password"
                       @on-change="checkALegitimacy(2)">
                </Input>
                <div class="error-text account-error">{{ pwdErrorMsg }}</div>
                <Input v-model="verifyCode"
                       maxlength="6"
                       placeholder="请输入验证码">
                  <Button slot="suffix"
                          type="text"
                          ghost
                          @click="getVerifyCode"
                          :disabled="sendCodeSuccess"
                          :loading="codeLoading">
                    {{ btnValue }}
                  </Button>
                </Input>
                <div class="error-text">{{ verifyCodeError ? '请输入正确的验证码' : '' }}</div>
              </div>
              <div class="reset-action-group">
                <Button size="large"
                        type="primary"
                        @click="resetPassword"
                        :loading="loginLading">
                  修改
                </Button>
                <span class="return-login" @click="returnLogin">返回登录</span>
              </div>
            </div>
            <div class="other-login-box un-select" v-if="loginType < 3">
              <div class="oauth-box">
                <span>其它登录：</span>
                <div class="oauth">
                  <div class="oauth-bg">
                    <span class="iconfont qq"></span>
                    <span class="iconfont wechat"></span>
                    <span class="iconfont github"></span>
                  </div>
                </div>
              </div>
              <span class="clickable" @click="changeLoginType">
                {{ loginType === 1 ? '验证码登录' : '密码登录' }}
              </span>
            </div>
          </div>
        </div>
        <div class="agreement-box">
          注册登录即表示同意
          <a href="/lovbe/uagree" target="_blank">用户协议</a>
          和
          <a href="/lovbe/prypoy" target="_blank">隐私政策</a>
        </div>
      </div>
    </Modal>

    <Modal v-model="showSliderValidate"
           :lock-scroll="true"
           :footer-hide="true"
           :mask-closable="false"
           :width="300"
           :styles="{top: '28%'}">
      <div class="slider-verify-box" v-if="showSliderValidate" style="height: 200px;">
        <span class="content un-select">请先完成滑块验证</span>
        <div class="validation">
          <slider-validation @validate="validate"></slider-validation>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import SliderValidation from "@/components/common/SliderValidation";
import {emailRegex, verifyTelLawful} from "@/utils"
import authApi from "@/api/AuthApi";
import userApi from "@/api/UserApi";

export default {
  name: "AuthModal",
  data() {
    return {
      showLogin: false,
      showSliderValidate: false,
      // 登录按钮loading
      loginLading: false,
      // 验证码按钮loading
      codeLoading: false,
      // 登录类型：1 密码登录， 2 验证码登录 3 重置密码
      loginType: 1,
      // 行为类型 1注册 2登录
      actionType: 1,
      accountError: false,
      pwdErrorMsg: '',
      verifyCodeError: false,
      // 国家区号
      account: null,
      password: null,
      verifyCode: null,
      sliderValidateResult: false,
      sendCodeSuccess: false,
      btnValue: '获取验证码',
      sendCodeInterval: null
    }
  },
  props: ['quickRegister', 'normalBackground'],
  components: {
    SliderValidation
  },
  methods: {
    forgotPwd() {
      this.loginType = 3;
    },
    changeLoginType() {
      this.loginType = this.loginType === 1 ? 2 : 1;
    },
    validate() {
      this.showSliderValidate = false;
      let svScene = 1;
      if (this.loginType < 3) {
        svScene = this.account.indexOf('@') === -1 ? 1 : 2;
      } else {
        svScene = this.account.indexOf('@') === -1 ? 9 : 10;
      }
      this.codeLoading = true;
      authApi.getSvCookie(this, svScene).then(data => {
        this.codeLoading = false;
        if (!data?.result) {
          return;
        }
        this.sliderValidateResult = true;
        let svToken = data.data.tn;
        if (!svToken) {
          return;
        }
        this.codeLoading = true;
        authApi.sendPayloadCode(this, svScene, svToken).then(result => {
          this.codeLoading = false;
          if (!result?.result) {
            return;
          }
          // 短信发送成功
          let tmp = this.account && this.account.indexOf('@') !== -1 ? '邮箱' : '手机';
          tmp = '已发送短信验证码到指定' + tmp;
          this.$Message.success(tmp);
          this.sendCodeSuccess = true;
          let time = 60;
          this.btnValue = '重新获取(' + time + ')';
          this.sendCodeInterval = setInterval(() => {
            if (time > 0) {
              time = time - 1;
              this.btnValue = '重新获取(' + time + ')';
            } else {
              this.btnValue = '获取验证码';
              this.sendCodeSuccess = false;
              clearInterval(this.sendCodeInterval);
              this.sendCodeInterval = null;
            }
          }, 1000)
        })
      })
    },
    getVerifyCode() {
      let check = this.checkALegitimacy(3);
      if (this.loginType === 3) {
        check = this.checkALegitimacy(2);
      }
      if (check) {
        this.showSliderValidate = true;
      }
    },
    payloadLogin() {
      let checkResult = this.checkALegitimacy(1) & this.checkALegitimacy(3);
      if (!checkResult) {
        return;
      }
      this.loading = true
      authApi.payloadLogin(this).then(data => {
        this.loading = false;
        if (!data?.result) {
          return;
        }
        this.showLogin = false;
        this.$Message.success('登陆成功!')
        let loginData = data.data;
        let userInfo = {
          token: loginData.acToken,
          uid: loginData.userId,
          rfToken: loginData.rfToken
        }
        // 保存token到store中
        this.$store.commit('login', userInfo)
        // 获取用户信息
        this.reqUserInfo(userInfo);
      })
    },
    quickLogin() {
      let checkResult = this.checkALegitimacy(4) & this.checkALegitimacy(3);
      if (!checkResult) {
        return;
      }
      this.loginLading = true;
      authApi.verifyCodeLogin(this).then(data => {
        this.loginLading = false;
        if (!data?.result) {
          return;
        }
        this.showLogin = false;
        this.$Message.success('登陆成功!')
        let loginData = data.data;
        let userInfo = {
          token: loginData.acToken,
          uid: loginData.userId,
          rfToken: loginData.rfToken
        }
        // 保存token到store中
        this.$store.commit('login', userInfo)
        // 获取用户信息
        this.reqUserInfo(userInfo);
      })
    },
    resetPassword() {
      let checkResult = this.checkALegitimacy(2) & this.checkALegitimacy(3) & this.checkALegitimacy(4);
      if (!checkResult) {
        return;
      }
      this.loginLading = true;
      authApi.resetPassword(this).then(data => {
        this.loginLading = false;
        if (!data?.result) {
          return;
        }
        this.$Message.success('密码重置成功!')
        this.loginType = 1;
      })
    },
    checkALegitimacy(checkType) {
      // 1. 密码简单校验
      if (checkType === 1) {
        if (this.password == null || this.password.length === 0) {
          this.pwdErrorMsg = '请输入密码';
          return false;
        }
        this.pwdErrorMsg = '';
      }

      // 2. 密码格式校验
      if (checkType === 2) {
        if (this.password === null || this.password.length === 0) {
          this.pwdErrorMsg = '请输入密码';
          return false;
        } else if (this.password && this.password.length < 8) {
          this.pwdErrorMsg = '密码长度不能小于8位';
          return false;
        } else if (this.password && this.password.length >= 8) {
          this.pwdErrorMsg = '';
        }
        let set = new Set();
        let allNumber = 0;
        for (let char of this.password) {
          set.add(char);
          if (char >= 48 && char <= 57) {
            ++allNumber;
          }
        }
        if (set.size <= 2 || allNumber === this.password.length) {
          this.pwdErrorMsg = '密码过于简单，必须包含数字和字母';
          return false;
        }
        this.pwdErrorMsg = '';
      }

      // 3. 校验邮箱和手机号码
      if (checkType === 3) {
        if (!this.account) {
          this.accountError = true;
          return false;
        }

        let indexOf = this.account.indexOf("@");
        if ((indexOf !== -1 && !emailRegex.test(this.account)) || (indexOf === -1 && !verifyTelLawful(this.account))) {
          // 邮箱校验
          this.accountError = true;
          return false;
        }
        this.accountError = false;
      }

      // 4. 验证码校验
      if (checkType === 4) {
        if (!this.verifyCode || this.verifyCode.length !== 6) {
          this.verifyCodeError = true;
          return false;
        } else {
          this.verifyCodeError = false;
        }
      }
      return true;
    },
    returnLogin() {
      this.loginType = 1;
    },
    reqUserInfo(userInfo) {
      let routeName = this.$route.name;
      if (routeName !== 'Reader' && routeName !== 'SColumnReadHome' && routeName !== 'ReadCenter') {
        // 页面刷新获取用户信息
        this.$router.go(0);
      } else {
        // 阅读页面的路由不刷新体验更好
        userApi.getUserInfo(userInfo.uid).then(data => {
          if (!data?.result) {
            return;
          }
          let loginUser = data.data;
          userInfo = {...userInfo, ...loginUser};
          // 保存userInfo到store中
          this.$store.commit('login', userInfo)
        })
      }
    }
  },
  watch: {
    "loginType"() {
      this.accountError = false;
      this.pwdErrorMsg = '';
      this.verifyCodeError = false;
      this.account = null;
      this.password = null;
      this.verifyCode = null;
      this.sliderValidateResult = false;
      this.loginLading = false;
      this.codeLoading = false;
    },
    "showLogin"(val) {
      if (!val) {
        this.loginType = this.quickRegister ? 2 : 1;
      }
    }
  },
  mounted() {
    if (this.quickRegister) {
      this.loginType = 2;
    }
  }
}
</script>

<style scoped lang="less">
@import "../css/common-var";

.auth-body {
  color: var(--font-color);
  height: 340px;
  max-width: 100%;
  font-size: 14px;
  padding: 0 15px;
  margin: 5px 0;
  box-sizing: border-box;

  .login-body {
    display: flex;
    flex-direction: row;

    .site-flag {
      width: 40%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .site-tips {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        margin-bottom: 10px;

        .t1 {
          font-weight: 600;
          font-size: 18px;
          margin-bottom: 10px;
        }

        .t2 {
          margin-left: 30px;
          color: var(--title-color);
        }

        .t3 {
          margin-left: 5px;
          color: var(--title-color);
        }
      }

      .logo-icon-img {
        width: 100%;
        position: relative; /* 为绝对定位图片提供参照 */
        overflow: hidden;

        &::before {
          border-radius: 8px;
          background: #EFF0F0; /* 占位背景色 */
          animation: pulse 1.5s infinite; /* 呼吸动画 */
          content: "";
          display: block;
          padding-top: 100%; /* 1:1 宽高比（正方形） */
        }

        @keyframes pulse {
          0% { opacity: 0.4; }
          50% { opacity: 1; }
          100% { opacity: 0.5; }
        }

        img {
          position: absolute; /* 脱离文档流 */
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 6px;
        }
      }


    }

    .login-main {
      width: 60%;
      padding: 5px 10px 0 40px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .title {
        color: var(--font-color);
        font-size: 17px;
        font-weight: 500;
        margin-bottom: 8px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
      }

      /deep/ .ivu-input {
        height: 40px;
      }


      .panel-pwd, .panel-verify, .panel-reset-pwd {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
      }

      .pwd-input-group, .verify-input-group {

        .ivu-input-wrapper {
          margin-bottom: 5px;
        }

        /deep/ .ivu-input-suffix {
          width: unset;
          display: flex;
          align-items: center;
          padding-right: 1px;
        }

        .error-text {
          color: #F44336;
          font-size: 12px;
          line-height: 20px;
          min-height: 20px;
          margin-bottom: 10px;
          text-align: left;
          padding: 0 10px;
        }
      }

      .reset-input-group {
        /deep/ .ivu-input-suffix {
          width: unset;
          display: flex;
          align-items: center;
          padding-right: 1px;
        }

        .ivu-input-wrapper {
          margin-bottom: 3px;
        }

        .error-text {
          color: #F44336;
          font-size: 12px;
          line-height: 20px;
          min-height: 20px;
          margin-bottom: 8px;
          text-align: left;
          padding: 0 10px;
        }
      }

      .reset-action-group {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 5px;

        button {
          width: 45%;
        }

        .return-login {
          margin-right: 10px;
          cursor: pointer;
        }
      }

      .button-group {
        width: 100%;
        display: flex;
        flex-direction: row;

        button {
          width: 45%;
        }

        button:first-child {
          margin-right: 10%;
        }

        .ivu-btn-default {
          background-color: var(--modal-bg-color);
          color: var(--title-color);
          border-color: var(--border-color);

          &:hover {
            color: @primary-color;
            border-color: @primary-color;
          }
        }
      }

      .other-login-box {
        width: 100%;
        margin-top: 5px;
        display: flex;
        line-height: 30px;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        .oauth-box {
          display: flex;
          flex-direction: row;
          align-items: center;

          .oauth-bg {
            display: flex;
            align-items: center;

            .iconfont {
              font-size: 22px;
              line-height: 22px;
              margin-right: 5px;
            }
          }
        }

        .clickable {
          cursor: pointer;
        }
      }
    }
  }

  .agreement-box {
    text-align: center;
    margin-top: 15px;
  }
}

.slider-verify-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .content {
    margin-bottom: 30px;
  }

  .validation {
    width: 100%;
  }
}
</style>
