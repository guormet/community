<template>
  <div class="layui-container fly-marginTop">
    <div
      class="fly-panel fly-panel-user"
      pad20>
      <div
        class="layui-tab layui-tab-brief"
        lay-filter="user">
        <ul class="layui-tab-title">
          <li class="layui-this">
            登入
          </li>
          <li>
            <router-link :to="{name: 'reg'}">
              注册
            </router-link>
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
                    <label
                      for="L_email"
                      class="layui-form-label">用户名</label>
                    <validation-provider
                      v-slot="{errors}"
                      name="email"
                      rules="required|email">
                      <div class="layui-input-inline">
                        <input
                          v-model="username"
                          type="text"
                          name="username"
                          placeholder="请输入用户名"
                          autocomplete="off"
                          class="layui-input">
                      </div>
                      <div class="layui-form-mid">
                        <span style="color: #c00;">{{ errors[0] }}</span>
                      </div>
                    </validation-provider>
                  </div>
                  <div class="layui-form-item">
                    <label
                      for="L_pass"
                      class="layui-form-label">密码</label>
                    <validation-provider
                      v-slot="{errors}"
                      name="password"
                      rules="required|min:6">
                      <div class="layui-input-inline">
                        <input
                          v-model="password"
                          type="password"
                          name="password"
                          placeholder="请输入密码"
                          autocomplete="off"
                          class="layui-input">
                      </div>
                      <div class="layui-form-mid">
                        <span style="color: #c00;">{{ errors[0] }}</span>
                      </div>
                    </validation-provider>
                  </div>
                  <div class="layui-form-item">
                    <validation-provider
                      v-slot="{errors}"
                      ref="codefield"
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
                          <div
                            ref="codeShow"
                            class="svg"
                            @click="_getCode()"/>
                        </div>
                      </div>
                      <div class="layui-form-mid">
                        <span style="color: #c00;">{{ errors[0] }}</span>
                      </div>
                    </validation-provider>
                  </div>
                  <div class="layui-form-item">
                    <button
                      class="layui-btn"
                      type="button"
                      @click="validate().then(submit)">
                      立即登录
                    </button>
                    <span style="padding-left:20px;">
                      <router-link :to="{name: 'forget'}">忘记密码？</router-link>
                    </span>
                  </div>
                  <div class="layui-form-item fly-form-app">
                    <span>或者使用社交账号登入</span>
                    <a
                      href="#"
                      onclick="layer.msg('正在通过QQ登入', {icon:16, shade: 0.1, time:0})"
                      class="iconfont icon-qq"
                      title="QQ登入"/>
                    <a
                      href="#"
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
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import { v4 as uuidv4 } from 'uuid';

import { login } from '@/api/login';
import { getCode } from '@/api/public';
import { aes_encrypt } from '@/utils/crypto';

export default {
  name: 'LoginPage',
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data () {
    return {
      username: '',
      password: '',
      code: '',
      svg: ''
    };
  },
  mounted () {
    let sid = '';
    if (localStorage.getItem('sid')) {
      sid = localStorage.getItem('sid');
    } else {
      sid = uuidv4();
      localStorage.setItem('sid', sid);
    }
    this.$store.commit('setSid', sid);
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
    async submit () {
      const isValid = await this.$refs.observer.validate();
      if (!isValid) {
        return;
      }
      login({
        username: this.username,
        password: aes_encrypt(this.password),
        code: this.code,
        sid: this.$store.state.sid
      })
      .then((res) => {
        if (res.code === 200) {
          this.username = '';
          this.password = '';
          this.code = '';
          requestAnimationFrame(() => {
            this.$refs.observer.reset();
          });
        } else if (res.code === 10002) {
          this.$refs.codefield.setErrors([
            res.msg
          ]);
        } else {
          this.$alert(res.msg);
        }
      })
      .catch((err) => {
        const data = err.response.data;
        if (data.code === 500) {
          this.$alert('用户名密码校验失败，请检查！');
        } else {
          this.$alert('服务器错误');
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
// 公用样式可以放在App.vue中
</style>
