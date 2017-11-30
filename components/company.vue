<template>
  <md-table-card style="width:100%;">

    <md-card-header>
      <md-card-header-text>
        <div class="md-title">{{form.mgrcomp_short_name}}<span class="md-subhead">(投顾公司简称)</span></div>
      </md-card-header-text>

      <router-link tag="md-button" :to="{path:'/home/editCompany',query: {'form': form}}" class="md-raised md-primary" v-if="$store.state.admin=='false'">
        <md-icon>edit</md-icon>
        编辑
      </router-link>
    </md-card-header>
    <div style="padding:0 20px">
      <div style="padding:0 20px;width:700px;float:left;">
        <div>
          <md-icon class="md-primary">beenhere</md-icon>
          <span class="md-subhead leftW">协会注册备案号</span>{{form.reg_id}}</div>
        <div>
          <md-icon class="md-primary">place</md-icon>
          <span class="md-subhead leftW">地址</span>
          {{form.address}}
        </div>
        <div>
          <md-icon class="md-primary">insert_invitation</md-icon>
          <span class="md-subhead leftW">成立时间</span>
          {{form.date_establishment}}
        </div>
        <div>
          <md-icon class="md-primary">attach_money</md-icon>
          <span class="md-subhead leftW">注册资本</span>
          {{form.reg_capital}}
        </div>
        <div>
          <md-icon class="md-primary">assignment</md-icon>
          <span class="md-subhead leftW">股东名单</span>
          {{form.shareholder_names}}
        </div>

      </div>
      <div style="padding:0 20px 20px;width:400px;float:right;">
        <div class="num-con">
          <div>{{form.num_staff}}
          <md-icon class="md-size-2x" v-if="!form.num_staff">supervisor_account</md-icon></div>
          <span>员工数量</span>
        </div>
        <div class="num-con">
          <div>{{form.num_rd}}
          <md-icon class="md-size-2x" v-if="!form.num_rd">supervisor_account</md-icon></div>
          <span>投研人数</span>
        </div>
        <div class="num-con">
          <div>{{form.num_trade}}
          <md-icon class="md-size-2x" v-if="!form.num_trade">supervisor_account</md-icon></div>
          <span>交易人员数(含运维)</span>
        </div>
        <div class="num-con">
          <div>{{form.num_it}}
          <md-icon class="md-size-2x" v-if="!form.num_it">supervisor_account</md-icon></div>
          <span>IT人数</span>
        </div>
        <div class="num-con">
          <div>{{form.num_risk_mgr}}
          <md-icon class="md-size-2x" v-if="!form.num_risk_mgr">supervisor_account</md-icon></div>
          <span>风控人数</span>
        </div>
        <div class="num-con">
          <div>{{form.num_master}}
          <md-icon class="md-size-2x" v-if="!form.num_master">supervisor_account</md-icon></div>
          <span>硕士及以上学历人数</span>
        </div>
      </div>
    </div>

    <md-tabs class="tab">
      <md-tab md-label="基础硬件硬件信息">
        <p>{{form.desc_hardware}}</p>
      </md-tab>
      <md-tab md-label="平台">
        <p>{{form.desc_trading_platform}}</p>
      </md-tab>
      <md-tab md-label="数据库类型">
        <p>{{form.desc_db}}</p>
      </md-tab>
      <md-tab md-label="数据库备份及系统冗余">
        <p>{{form.desc_backup}}</p>
      </md-tab>
      <md-tab md-label="其他风控措施">
        <p>{{form.desc_risk_mgr}}</p>
      </md-tab>

    </md-tabs>
    </md-layout>
    <!-- loading -->
    <div v-show="loading" class="loading"><md-spinner md-indeterminate class="spinner"></md-spinner></div>
  </md-table-card>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          "address": "",
          "date_establishment": "",
          "desc_backup": "",
          "desc_db": "",
          "desc_hardware": "",
          "desc_risk_mgr": "",
          "desc_trading_platform": "",
          "mgrcomp_short_name": "",
          "num_it": "",
          "num_master": "",
          "num_rd": "",
          "num_risk_mgr": "",
          "num_staff": "",
          "num_trade": "",
          "reg_capital": "",
          "reg_id": "",
          "risk_power_backup": "",
          "risk_role_backup": "",
          "risk_web_backup": "",
          "shareholder_names": ""
        },
        loading:true
      }
    },
    beforeCreate() {
      let admin = this.$store.state.admin;
      if (admin == "true" && this.$store.state.id != "null") {
        let id = this.$store.state.id;
        this.api.getIdCompany(id).then((response) => {
          this.getData(response);
        });
      } else {
        this.api.getCompany().then((response) => {
          this.getData(response);
        });
      }
    },
    methods: {
      getData(response) {      //拿到返回的数据
        if (response) {
          if (response.status === 401) {
            this.$router.push('/login');
            //可以把无效的token清楚掉
            this.$store.dispatch('UserLogout');
          } else {
            if (response != {}) {
              this.form = response.data;
              this.loading = false;
            }
          }
        }
      }
    }
  }
</script>

<style>
  p {
    text-indent: 2em;
    min-height: 40px;
  }

  .md-divider.md-inset {
    margin: 20px !important;
  }

  .leftW {
    display: inline-block;
    width: 150px;
    font-weight: 800 !important;
    padding: 5px 0;
  }

  .num-con {
    display: inline-block;
    width: 100px;
    height: 114px;
    margin: 0 0 10px 15px;
    font-size: 28px;
    font-weight: 800;
    text-align: center;
    line-height: 100px;
    background: #eee;
  }

  .num-con div {
    height: 50px;
  }

  .num-con span {
    opacity: .54;
    font-size: 12px;
    letter-spacing: .01em;
    line-height: 20px;
    display: inline-block;
    font-weight: 100;
  }

  .md-theme-default.tab > .md-tabs-navigation {
    background-color: #eee !important;
  }

  .md-tabs .md-tab-header {
    font-size: 14px !important;
  }
</style>


