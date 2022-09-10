<template>
  <div class="layui-container fly-marginTop">
    <div
      class="fly-panel fly-panel-user" pad20>
      <div
        class="layui-tab layui-tab-brief"
        lay-filter="user">
        <ul class="layui-tab-title">
          <li>
            <router-link :to="{name: 'login'}">
              登入
            </router-link>
          </li>
          <li class="layui-this">
            注册
          </li>
        </ul>
        <div
          id="LAY_ucm"
          class="layui-form layui-tab-content"
          style="padding: 20px 0;">
          <validation-observer
            ref="observer"
            v-slot="{ validate }">
            <div class="layui-tab-item layui-show">
              <div class="layui-form layui-form-pane">
                <form method="post">
                  <div class="layui-form-item">
                    <validation-provider
                      v-slot="{errors}"
                      ref="usernameField"
                      name="email"
                      rules="required|email">
                      <div class="layui-row">
                        <label
                          for="L_email"
                          class="layui-form-label">用户名</label>
                        <div class="layui-input-inline">
                          <input
                            v-model="username"
                            type="text"
                            name="username"
                            placeholder="请输入用户名"
                            autocomplete="off"
                            class="layui-input">
                        </div>
                        <div class="layui-form-mid layui-word-aux">
                          将会成为您唯一的登入名
                        </div>
                      </div>
                      <div class="layui-row">
                        <span style="color: #c00;">
                          {{ errors[0] }}
                        </span>
                      </div>
                    </validation-provider>
                  </div>
                  <div class="layui-form-item">
                    <label
                      for="L_username"
                      class="layui-form-label">昵称</label>
                    <validation-provider
                      v-slot="{errors}"
                      ref="nameField"
                      name="name"
                      rules="required|min:4|name">
                      <div class="layui-input-inline">
                        <input
                          v-model="name"
                          type="text"
                          name="name"
                          placeholder="请输入昵称"
                          autocomplete="off"
                          class="layui-input">
                      </div>
                      <div class="layui-form-mid">
                        <span style="color: #c00;">
                          {{ errors[0] }}
                        </span>
                      </div>
                    </validation-provider>
                  </div>
                  <div class="layui-form-item">
                    <validation-provider
                      v-slot="{errors}"
                      vid="confirmation"
                      name="password"
                      rules="required|min:6|max:16">
                      <div class="layui-row">
                        <label
                          for="L_pass"
                          class="layui-form-label">密码</label>
                        <div class="layui-input-inline">
                          <input
                            v-model="password"
                            type="password"
                            name="password"
                            placeholder="请输入密码"
                            autocomplete="off"
                            class="layui-input">
                        </div>
                        <div class="layui-form-mid layui-word-aux">
                          6到16个字符
                        </div>
                      </div>
                      <div class="layui-row">
                        <span style="color: #c00;">
                          {{ errors[0] }}
                        </span>
                      </div>
                    </validation-provider>
                  </div>
                  <div class="layui-form-item">
                    <validation-provider
                      v-slot="{ errors }"
                      name="repassword"
                      rules="confirmed:confirmation">
                      <div class="layui-row">
                        <label
                          for="L_repass"
                          class="layui-form-label">确认密码</label>
                        <div class="layui-input-inline">
                          <input
                            v-model="repassword"
                            type="password"
                            name="repassword"
                            placeholder="请输入密码"
                            autocomplete="off"
                            class="layui-input">
                        </div>
                        <div class="layui-form-mid">
                          <span style="color: #c00;">
                            {{ errors[0] }}
                          </span>
                        </div>
                      </div>
                    </validation-provider>
                  </div>
                  <div class="layui-form-item">
                    <validation-provider
                      v-slot="{errors}"
                      ref="codeField"
                      name="code"
                      rules="required|length:4">
                      <div class="layui-row">
                        <label
                          for="L_vercode"
                          class="layui-form-label">验证码</label>
                        <div class="layui-input-inline">
                          <input
                            v-model="code"
                            type="text"
                            name="code"
                            placeholder="请输入验证码"
                            autocomplete="off"
                            class="layui-input">
                        </div>
                        <div class>
                          <span
                            ref="codeShow"
                            class="svg"
                            @click="_getCode()"/>
                          <!-- <span style="color: #c00;">{{errors[0]}}</span> -->
                        </div>
                      </div>
                      <div class="layui-form-mid">
                        <span style="color: #c00;">
                          {{ errors[0] }}
                        </span>
                      </div>
                    </validation-provider>
                  </div>
                  <div class="layui-form-item">
                    <button
                      class="layui-btn"
                      type="button"
                      @click="validate().then(register)">
                      立即注册
                    </button>
                  </div>
                  <div class="layui-form-item fly-form-app">
                    <span>或者直接使用社交账号快捷注册</span>
                    <a
                      href
                      onclick="layer.msg('正在通过QQ登入', {icon:16, shade: 0.1, time:0})"
                      class="iconfont icon-qq"
                      title="QQ登入"/>
                    <a
                      href
                      onclick="layer.msg('正在通过微博登入', {icon:16, shade: 0.1, time:0})"
                      class="iconfont icon-weibo"
                      title="微博登入"/>
                  </div>
                </form>
              </div>
            </div>
          </validation-observer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCode } from '@/api/public';
import { reg } from '@/api/login';
import { aes_encrypt } from '@/utils/crypto';
import { ValidationProvider, ValidationObserver } from 'vee-validate';

export default {
  name: 'RegPage',
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data () {
    return {
      username: '',
      name: '',
      password: '',
      repassword: '',
      code: '',
      svg: ''
    };
  },
  mounted () {
    this._getCode();
  },
  methods: {
    _getCode () {
      let sid = this.$store.state.sid;
      getCode(sid).then((res) => {
        if (res.code === 200) {
          this.svg = res.data;
          this.$refs.codeShow.innerHTML = this.svg;
        }
      });
    },
    async register () {
      const isValid = await this.$refs.observer.validate();
      if (isValid) {
        reg({
          username: this.username,
          password: aes_encrypt(this.password),
          name: this.name,
          code: this.code,
          sid: this.$store.state.sid
        })
        .then((res) => {
          if (res.code === 200) {
            this.username = '';
            this.password = '';
            this.name = '';
            this.repassword = '';
            this.code = '';
            requestAnimationFrame(() => {
              this.$refs.observer.reset();
            });
            this.$alert(res.msg);
            this.$router.push('/login');
          } else if (res.code === 10002) {
            this.$refs.codeField.setErrors([
              res.msg
            ]);
          } else if (res.code === 10003) {
            this.$refs.usernameField.setErrors([
              res.msg
            ]);
          } else if (res.code === 10004) {
            this.$refs.nameField.setErrors([
              res.msg
            ]);
          } else {
            this.$alert(res.msg);
          } 
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
// 公用样式可以放在App.vue中
</style>
