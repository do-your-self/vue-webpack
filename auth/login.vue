<template>
  <md-layout md-align="center" md-gutter="35" style="min-height: 540px;margin-top:200px;">
    <md-layout md-flex="25">
      <form novalidate class="form">
        <md-tabs md-fixed style="background:#fff;">
          <md-tab md-label="登录">
            <md-input-container :class="{'md-input-invalid':$v.loginForm.username.$error}">
              <md-icon>person</md-icon>
              <label>用户名</label>
              <md-input type="text" required v-model="loginForm.username" @input="$v.loginForm.username.$touch()"></md-input>
              <span class="md-error" v-if="$v.loginForm.username.$error&&$v.loginForm.username.minLength">不允许为空</span>
              <span class="md-error" v-if="!$v.loginForm.username.minLength">用户名不能少于5位</span>
            </md-input-container>

            <md-input-container md-has-password :class="{'md-input-invalid':$v.loginForm.password.$error}">
              <md-icon>lock</md-icon>
              <label>密码</label>
              <md-input type="password" required v-model="loginForm.password" @input="$v.loginForm.password.$touch()"></md-input>
              <span class="md-error" v-if="$v.loginForm.password.$error&&$v.loginForm.password.minLength">不允许为空</span>
              <span class="md-error" v-if="!$v.loginForm.password.minLength">密码不能少于5位</span>
            </md-input-container>
            <md-checkbox v-model="rempsw">记住密码</md-checkbox>
            <md-button class="btn md-raised md-primary" @click="submitLogin">提交</md-button>
          </md-tab>
          <md-tab md-label="注册">
            <md-input-container :class="{'md-input-invalid':$v.regForm.username.$error}">
              <md-icon>person</md-icon>
              <label>用户名</label>
              <md-input type="text" required v-model="regForm.username" @input="$v.regForm.username.$touch()"></md-input>
              <span class="md-error" v-if="$v.regForm.username.$error&&$v.regForm.username.minLength">不允许为空</span>
              <span class="md-error" v-if="!$v.regForm.username.minLength">用户名不能少于5位</span>
            </md-input-container>
            <md-input-container md-has-password :class="{'md-input-invalid':$v.regForm.password.$error}">
              <md-icon>lock</md-icon>
              <label>密码</label>
              <md-input type="password" required v-model="regForm.password" @input="$v.regForm.password.$touch()"></md-input>
              <span class="md-error" v-if="$v.regForm.password.$error&&$v.regForm.password.minLength">不允许为空</span>
              <span class="md-error" v-if="!$v.regForm.password.minLength">密码不能少于5位</span>
            </md-input-container>
            <md-input-container :class="{'md-input-invalid':$v.regForm.email.$error}">
              <md-icon>email</md-icon>
              <label>邮箱</label>
              <md-input type="email" required v-model="regForm.email" @input="$v.regForm.email.$touch()"></md-input>
              <span class="md-error" v-if="$v.regForm.email.$error&&$v.regForm.email.email">不允许为空</span>
              <span class="md-error" v-if="!$v.regForm.email.email">请填写正确的邮箱格式</span>
            </md-input-container>
            <md-input-container :class="{'md-input-invalid':$v.regForm.company_name.$error}">
              <label>公司</label>
              <md-input required v-model="regForm.company_name" @input="$v.regForm.company_name.$touch()"></md-input>
              <span class="md-error">不允许为空</span>
            </md-input-container>
            <md-input-container :class="{'md-input-invalid':$v.regForm.code.$error}">
              <label>邀请码</label>
              <md-input required v-model="regForm.code" @input="$v.regForm.code.$touch()"></md-input>
              <span class="md-error">不允许为空</span>
            </md-input-container>
            <md-button class="btn md-raised md-primary" @click="submitReg">提交</md-button>
          </md-tab>
        </md-tabs>

        <!-- 提示框 -->
        <md-snackbar :md-position="vertical + ' ' + horizontal" ref="snackbar1" :md-duration="duration">
          <span><md-icon>info</md-icon>{{msg}}</span>
          <md-button class="md-accent" @click="$refs.snackbar1.close()">关闭</md-button>
        </md-snackbar>

      </form>
    </md-layout>
    <md-layout md-flex="25" class="right-bg"></md-layout>
  </md-layout>
</template>

<script>
  import {required, minLength, email} from 'vuelidate/lib/validators'


  export default {
    data() {
      let user = window.localStorage.getItem('fofuser');  //从缓存获取用户名密码
      let psw = window.localStorage.getItem('fofpsw');
      let check = user ? true : false;    //判断记住密码状态
      return {
        rempsw: check,
        activeName: 'login', //选项卡
        loginForm: {        //表单v-model的值
          username: user || '',
          password: psw || ''
        },
        regForm: {
          username: '',
          password: '',
          email: '',
          company_name: '',
          code: ''
        },
        vertical: 'top',
        horizontal: 'center',
        duration: 4000,
        msg: ''
      }
    },  //验证注册登录
    validations: {
      loginForm: {
        username: {
          required,
          minLength: minLength(5)
        },
        password: {
          required,
          minLength: minLength(5)
        }
      },
      regForm: {
        username: {
          required,
          minLength: minLength(5)
        },
        password: {
          required,
          minLength: minLength(5)
        },
        email: {
          required,
          email
        },
        company_name: {
          required
        },
        code: {
          required
        }
      }
    },
    methods: {
      message(msg) {
        this.msg = msg;
        this.$refs.snackbar1.open();
      },
      submitLogin() {
        this.$v.loginForm.$touch();
        if (!this.$v.$error) {
          let opt = this.loginForm;
          this.api.userLogin(opt)
            .then(({data}) => {
              //解构赋值拿到data
              //账号存在
              if (data.success === false) {
                this.message('用户名或密码错误');
              }
              if (data.success) {
                this.message('登录成功');
                let token = data.token;
                let company = data.company;
                let admin = data.admin;
                if (this.rempsw) {    //缓存用户名密码
                  window.localStorage.setItem('fofuser', this.loginForm.username);
                  window.localStorage.setItem('fofpsw', this.loginForm.password);
                }
                this.$store.dispatch('UserLogin', token);    //vuex
                this.$store.dispatch('Company', company);
                this.$store.dispatch('User', data.name);
                this.$store.dispatch('Id', 'null');
                window.sessionStorage.setItem('user', data.name);
                window.sessionStorage.setItem('company', company);
                if (data.admin) {
                  this.$store.dispatch('Admin', 'true');
                } else {
                  this.$store.dispatch('Admin', 'false');
                }
                //如果用户手动输入"/"那么会跳转到这里来，即this.$route.query.redirect有参数

                if (admin) {
                  //跳转到指定的路由
                  this.$router.push({
                    path: '/home/user'
                  });
                } else {
                  //跳转到指定的路由
                  this.$router.push({
                    path: '/home/company'
                  });
                }
              } else {
                this.message('用户名或密码错误');
              }
            }).catch((err) => {
          });
        }
      },
      submitReg() {
        this.$v.regForm.$touch();
        if (!this.$v.$error) {
          this.api.userRegister(this.regForm)
            .then((data) => {
              switch (data.status) {
                case 200:
                  this.message('注册成功');
                  setTimeout(function () {
                    window.location.reload();
                  }, 2000)
                  break;
                case 433:
                  this.message('邀请码不存在'); //code过期 Invalid validation code
                  break;
                case 434:
                  this.message('投资公司已存在'); // User name already exists
                  break;
                case 435:
                  this.message('投资公司已存在'); //Company name already exists
                  break;
                case 436:
                  this.message('邮箱已存在'); //Email already exists
                  break;
              }
            }).catch((err) => {
          });
        }
      }
    }
  }
</script>

<style>
  #app {
    overflow: hidden;
  }

  .form {
    width: 100%;
    background: #fff;
    padding: 20px 40px;
    border-radius: 5px 0 0 5px;
    box-shadow: 0 20px 60px -2px rgba(27, 33, 58, .4);
  }

  .right-bg {
    background: url(../assets/login.jpg) no-repeat;
    background-size: auto 600px;
    border-radius: 0 5px 5px 0;
    box-shadow: 0 20px 60px -2px rgba(27, 33, 58, .4);

  }

  .btn {
    width: 100%;
    font-weight: 800 !important;
  }

  .md-theme-default.md-tabs > .md-tabs-navigation {
    background-color: rgba(255, 255, 255, 0) !important;
  }

  .md-tabs .md-tab-header {
    letter-spacing: 1px !important;
    font-size: 20px !important;
    font-weight: 300 !important;
    color: #8b8c8d !important;
  }

  .md-input-container {
    margin: 2px 0 23px !important;
    float: left;
  }
</style>
