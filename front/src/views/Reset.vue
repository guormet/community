<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel fly-panel-user" pad20>
      <div class="layui-tab layui-tab-brief" lay-filter="user">
        <ul class="layui-tab-title">
          <li>
            <router-link to="/login">登录</router-link>
          </li>
          <li class="layui-this">
            <router-link to="/forget">重置密码</router-link>
          </li>
        </ul>
        <div class="layui-form layui-tab-content" id="LAY_ucm" style="padding: 20px 0;">
          <validation-observer
            ref="observer"
            v-slot="{ validate }">
            <div class="layui-tab-item layui-show">
              <div class="layui-form layui-form-pane">
                <form>
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
                    <button class="layui-btn" type="button" @click="validate().then(submit)">提交</button>
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
  import { reset } from '@/api/login';
  import { getCode } from '@/api/public';
  import { getParam } from '@/utils/common';
  import { aes_encrypt } from '@/utils/crypto';
  import { v4 as uuidv4 } from 'uuid';
  

  export default {
    name: 'ResetPage',
    components: {
      ValidationProvider,
      ValidationObserver
    },
    data () {
      return {
        key: '',
        password: '',
        repassword: '',
        code: '',
        svg: '',
        username: ''
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
      
      this.key = getParam('key');
      this.username = decodeURIComponent(getParam('username'));
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
          // ABORT!!
          return;
        }
        reset({
          key: this.key,
          password: aes_encrypt(this.password), 
          sid: this.$store.state.sid,
          code: this.code,
          username: this.username
        }).then((res) => {
          if (res.code === 200) {
            this.$alert(res.msg);
            setTimeout(() => {
              this.$router.push('/login');
            }, 1000);
          } else {
            this._getCode();
            if (res.msg instanceof Object) {
              this.$refs.observer.setErrors(res.msg);
            } else {
              this.$alert(res.msg);
            }
          }
        });
      }
    }
  };
</script>

<style lang="scss" scoped>

</style>