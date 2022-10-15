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
            找回密码
            <!--重置密码-->
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
              <!-- 重置密码 -->
              <!--
            <div class="fly-msg">{{d.username}}，请重置您的密码</div>
            <div class="layui-form layui-form-pane"  style="margin-top: 30px;">
              <form action="/user/repass" method="post">
                <div class="layui-form-item">
                  <label for="L_pass" class="layui-form-label">密码</label>
                  <div class="layui-input-inline">
                    <input type="password" id="L_pass" name="pass" required lay-verify="required" autocomplete="off" class="layui-input">
                  </div>
                  <div class="layui-form-mid layui-word-aux">6到16个字符</div>
                </div>
                <div class="layui-form-item">
                  <label for="L_repass" class="layui-form-label">确认密码</label>
                  <div class="layui-input-inline">
                    <input type="password" id="L_repass" name="repass" required lay-verify="required" autocomplete="off" class="layui-input">
                  </div>
                </div>
                <div class="layui-form-item">
                  <label for="L_vercode" class="layui-form-label">人类验证</label>
                  <div class="layui-input-inline">
                    <input type="text" id="L_vercode" name="vercode" required lay-verify="required" placeholder="请回答后面的问题" autocomplete="off" class="layui-input">
                  </div>
                  <div class="layui-form-mid">
                    <span style="color: #c00;">{{d.vercode}}</span>
                  </div>
                </div>
                <div class="layui-form-item">
                  <input type="hidden" name="username" value="{{d.username}}">
                  <input type="hidden" name="email" value="{{d.email}}">
                  <button class="layui-btn" alert="1" lay-filter="*" lay-submit>提交</button>
                </div>
              </form>
            </div>

            <div class="fly-error">该重置密码链接已失效，请重新校验您的信息</div>
            <div class="fly-error">非法链接，请重新校验您的信息</div>
              -->

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
                        <span style="color: #c00;">
                          {{ errors[0] }}
                        </span>
                      </div>
                    </validation-provider>
                  </div>
                  <div class="layui-form-item">
                    <validation-provider
                      v-slot="{errors}"
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
                      type="button"
                      class="layui-btn"
                      @click="validate().then(submit)">
                      提交
                    </button>
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
import { forget } from '@/api/login';
import { getCode } from '@/api/public';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import { v4 as uuidv4 } from 'uuid';
export default {
  name: 'ForgetPage',
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data () {
    return {
      username: '',
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
      forget({
        username: this.username,
        code: this.code
      }).then((res) => {
        if (res.code === 200) {
          this.$alert('邮件发送成功');
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
// 公用样式可以放在App.vue中
</style>
