<template>
  <md-list style="width:100%;background:#eee;">
    <md-list-item @click="routerLink('/home/company')" :class="{'md-primary': active=='/home/company'?true:false}">
      <md-icon class="md-primary">business</md-icon>
      <span>公司信息</span>
    </md-list-item>
    <md-list-item @click="routerLink('/home/staff')" :class="{'md-primary': active=='/home/staff'?true:false}">
      <md-icon class="md-primary">group</md-icon>
      <span>职工信息</span>
    </md-list-item>
    <md-list-item @click="routerLink('/home/stg')" :class="{'md-primary': active=='/home/stg'?true:false}">
      <md-icon class="md-primary">short_text</md-icon>
      <span>策略信息</span>
    </md-list-item>
    <md-list-item @click="routerLink('/home/product')" :class="{'md-primary': active=='/home/product'?true:false}">
      <md-icon class="md-primary">show_chart</md-icon>
      <span>产品信息</span>
    </md-list-item>
    <md-list-item @click="routerLink('/home/prodStg')" :class="{'md-primary': active=='/home/prodStg'?true:false}">
      <md-icon class="md-primary">shuffle</md-icon>
      <span>产品策略信息</span>
    </md-list-item>
  </md-list>
</template>

<script>
  export default {
    data(){
      return {
        active: this.$router.currentRoute.fullPath
      }
    },
    methods: {
      routerLink(path) {
        this.$router.push(path)
        this.active = path;
      }
    }
  }
</script>

<style>

</style>


