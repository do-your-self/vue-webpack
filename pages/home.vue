<template>
  <div class="side">
    <v-header></v-header>
    <md-layout md-gutter v-if="$store.state.admin=='false'||$store.state.id!='null'" class="main">
      <md-layout md-flex="15">
        <v-menu></v-menu>
      </md-layout>
      <md-layout style="padding:50px;">
        <router-view></router-view>
      </md-layout>
    </md-layout>
    <md-layout md-align="center" v-if="$store.state.admin=='true'&&$store.state.id=='null'">
      <md-layout md-flex="80">
        <router-view></router-view>
      </md-layout>
    </md-layout>
  </div>
</template>

<script>
  import Header from '../components/header'
  import Menu from '../components/menu'

  export default {
    data() {
      return {}
    },
    components: {
      'v-header': Header,
      'v-menu': Menu
    }
  }
</script>

<style>
  .side {
    width: 100%;
    height: 100%;
  }

  .main {
    width: 100%;
    height: 100%;
    position: absolute !important;
    top: 0;
    padding-top: 64px;
  }
  .loading {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 999;
    background: rgba(255, 255, 255, 0.8);
    text-align: center;
  }
  .spinner {
    top: 50%;
    margin-top: -25px;
  }
</style>



