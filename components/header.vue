<template>
  <md-toolbar>
    <md-button class="md-icon-button">
      <md-icon>home</md-icon>
    </md-button>
    <md-layout style="flex: 1" v-if="$store.state.admin=='true'">   <!-- user is admin -->
      <h2 style="float:left;font-size: 20px;font-weight: 400;">复华投资投顾管理系统</h2>
      <md-button @click="routerLink('/home/user')" :class="{'md-raised': active=='/home/user'?true:false}">用户管理
      </md-button>
      <md-button @click="routerLink('/home/allCompany')" :class="{'md-raised': active=='/home/allCompany'?true:false}">
        公司管理
      </md-button>
      <md-button @click="routerLink('/home/staff')" :class="{'md-raised': active=='/home/staff'?true:false}">职工管理
      </md-button>
      <md-button @click="routerLink('/home/stg')" :class="{'md-raised': active=='/home/stg'?true:false}">策略管理
      </md-button>
      <md-button @click="routerLink('/home/product')" :class="{'md-raised': active=='/home/product'?true:false}">产品管理
      </md-button>
      <md-button @click="routerLink('/home/prodStg')" :class="{'md-raised': active=='/home/prodStg'?true:false}">
        产品策略管理
      </md-button>
    </md-layout>
    <h2 class="md-title" style="flex: 1" v-if="$store.state.admin=='false'">复华投资投顾管理系统</h2>
    <md-button>
      <md-icon>person
      </md-icon>&nbsp;&nbsp;{{$store.state.user.length > 10 ? $store.state.user.substr(0, 10) + '...' : $store.state.user}}
      <md-tooltip md-direction="bottom">{{$store.state.user}}</md-tooltip>
    </md-button>

    <router-link tag="md-button" to="/home/invitation" class="md-button" v-if="$store.state.admin=='true'">
      <md-icon>group_add</md-icon>&nbsp;&nbsp;邀请用户
    </router-link>
    <md-button @click="logout">
      <md-icon>exit_to_app</md-icon>&nbsp;&nbsp;登出
    </md-button>

    <!-- 提示框 -->
    <md-snackbar :md-position="vertical + ' ' + horizontal" ref="snackbar" :md-duration="duration">
      <span><md-icon>info</md-icon>{{msg}}</span>
      <md-button class="md-accent" @click="$refs.snackbar.close()">关闭</md-button>
    </md-snackbar>

  </md-toolbar>
</template>


<script>
  export default {
    data() {
      return {
        active: this.$router.currentRoute.fullPath,
        vertical: 'top',
        horizontal: 'center',
        duration: 4000,
        msg: ''
      }
    },
    methods: {
      message(msg) {
        this.msg = msg;
        this.$refs.snackbar.open();
        this.$router.push('/login');
      },
      routerLink(path) {
        this.$router.push(path)
        this.active = path;
        this.$store.dispatch('Id', "null");
      },
      logout() {
        this.message('登出成功')
        //清除token
        this.$store.dispatch('UserLogout');
        if (!this.$store.state.token) {
          this.msg = '登出成功';
          this.$refs.snackbar.open();
          this.$router.push('/login');
        } else {
          this.$message({
            type: 'info',
            message: '登出失败'
          })
        }
      }
    }
  }
</script>


<style>
  .md-toolbar {
    z-index: 100;
  }
</style>


