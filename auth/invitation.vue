<template>
  <md-layout md-align="center" md-gutter="35" style="min-height: 600px;margin-top:220px;">
    <md-layout md-flex="30">
      <form style="width:100%;">
        <md-input-container :class="{'md-input-invalid':$v.email.$error}">
          <md-icon>email</md-icon>
          <label>邮箱</label>
          <md-input type="email" required v-model="email" @input="$v.email.$touch()"></md-input>
          <span class="md-error" v-if="$v.email.$error&&$v.email.email">不允许为空</span>
          <span class="md-error" v-if="!$v.email.email">请填写正确的邮箱格式</span>
        </md-input-container>
        <md-button class="md-raised md-primary" @click="submit">提交</md-button>
      </form>

      <!-- 提示框 -->
<!--       <md-snackbar :md-position="vertical + ' ' + horizontal" ref="snackbar" :md-duration="duration">
        <span><md-icon>info</md-icon>{{msg}}</span>
        <md-button class="md-accent" @click="$refs.snackbar.close()">关闭</md-button>
      </md-snackbar> -->

    </md-layout>
  </md-layout>
</template>

<script>
  import {required, email} from 'vuelidate/lib/validators'

  export default {
    data() {
      return {
        email: "",
        vertical: 'top',
        horizontal: 'center',
        duration: 4000,
        msg: ''
      }
    }, //验证注册登录
    validations: {
      email: {
        required,
        email
      }
    },
    methods: {
      message(msg) {
        this.msg = msg;
        this.$refs.snackbar.open();
      },
      submit() {
        this.$v.email.$touch();
        if (!this.$v.$error) { //验证通过
          this.api.sendMail({"email": this.email}).then(({data}) => {
            if (data.Success) {
              this.message('已发送');
            } else {
              this.message(data.statusText);
            }
          });
        } else { //验证不通过
          return false;
        }
      }
    }
  }
</script>

<style scoped>

  .md-input-container {
    margin: 2px 0 23px !important;
    float: left;
  }
</style>
