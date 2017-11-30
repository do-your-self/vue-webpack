<template>
  <div id="app">
    <router-view></router-view>

    <!-- 提示框 -->
    <md-snackbar :md-position="vertical + ' ' + horizontal" ref="snackbar" :md-duration="duration">
      <span><md-icon>info</md-icon>{{msg}}</span>
      <md-button class="md-accent" @click="$refs.snackbar.close()">关闭</md-button>
    </md-snackbar>

  </div>
</template>

<script>
export default {
  name: 'app',
  data(){
    return {
      vertical: 'top',
      horizontal: 'center',
      duration: 4000,
      msg: '',
    }
  }
}
</script>

<style>
  html,body {
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    width: 100%;
    height: 100%;
  } 
</style>
