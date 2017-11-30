<template>
  <md-table-card style="width:100%;">
    <md-table md-sort="calories">

      <!-- table header -->
      <md-table-header>
        <md-table-row>
          <md-table-head md-sort-by="user">投顾公司</md-table-head>
          <md-table-head md-sort-by="mgrcomp_short_name">公司简称</md-table-head>
          <md-table-head md-sort-by="reg_id">协会注册备案号</md-table-head>
          <md-table-head md-sort-by="address">地址</md-table-head>
          <md-table-head md-sort-by="date_establishment">成立时间</md-table-head>
          <md-table-head md-sort-by="reg_capital">注册资本</md-table-head>
          <md-table-head md-sort-by="shareholder_names">股东名单</md-table-head>
          <md-table-head md-sort-by="num_staff">员工数量</md-table-head>
        </md-table-row>
      </md-table-header>

      <!-- table body -->
      <md-table-body>
        <tr class="md-table-row" v-for="(row, rowIndex) in tableData" @click="link(rowIndex)" :key="rowIndex"
            :md-item="row">
          <md-table-cell v-for="(column, columnIndex) in row" :key="columnIndex"
                         v-if="columnIndex !== 'id' && columnIndex !== 'num_rd' && columnIndex !== 'num_trade' && columnIndex !== 'num_it' && columnIndex !== 'num_risk_mgr' && columnIndex !== 'num_master' && columnIndex !== 'desc_hardware' && columnIndex !== 'desc_trading_platform' && columnIndex !== 'desc_db' && columnIndex !== 'desc_backup' && columnIndex !== 'desc_risk_mgr' && columnIndex !== 'risk_role_backup' && columnIndex !== 'risk_web_backup' && columnIndex !== 'risk_power_backup' && columnIndex !== 'mgrcomp_id'">
            <span
              v-if="columnIndex !== 'id' && columnIndex !== 'num_rd' && columnIndex !== 'num_trade' && columnIndex !== 'num_it' && columnIndex !== 'num_risk_mgr' && columnIndex !== 'num_master' && columnIndex !== 'desc_hardware' && columnIndex !== 'desc_trading_platform' && columnIndex !== 'desc_db' && columnIndex !== 'desc_backup' && columnIndex !== 'desc_risk_mgr' && columnIndex !== 'risk_role_backup' && columnIndex !== 'risk_web_backup' && columnIndex !== 'risk_power_backup' && columnIndex !== 'mgrcomp_id'">{{ column
              }}</span>
          </md-table-cell>
        </tr>
      </md-table-body>
    </md-table>

    <!-- loading -->
    <div v-show="loading" class="loading"><md-spinner md-indeterminate class="spinner"></md-spinner></div>
    
    <!-- 分页 -->
    <md-table-pagination
      md-size="5"
      :md-total="total"
      :md-page="currentPage"
      md-label="行"
      md-separator="共"
      :md-page-options="[10]"
      @pagination="handleCurrentChange">
    </md-table-pagination>

    <!-- 提示框 -->
    <md-snackbar :md-position="vertical + ' ' + horizontal" ref="snackbar" :md-duration="duration">
      <span><md-icon>info</md-icon>{{msg}}</span>
      <md-button class="md-accent" @click="$refs.snackbar.close()">关闭</md-button>
    </md-snackbar>

    <!-- 对话弹框 -->
    <md-dialog md-open-from="#custom" md-close-to="#custom" ref="dialog">
      <md-dialog-title>
        <md-icon class="md-size-2x md-warn">info</md-icon>
        提示
      </md-dialog-title>
      <md-dialog-content>此操作将永久删除该条信息, 是否继续?</md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-raised" @click="closeDialog('dialog','cancel')">取消</md-button>
        <md-button class="md-raised md-primary" @click="closeDialog('dialog','submit')">确定</md-button>
      </md-dialog-actions>
    </md-dialog>

  </md-table-card>
</template>

<script>
  export default {
    data() {
      return {
        loading: true,
        tableData: [],
        currentPage: 1,
        total: 0,
        vertical: 'top',
        horizontal: 'center',
        duration: 4000,
        msg: ''
      }
    },
    beforeCreate() {
      this.api.getAllCompany(10, 1).then((response) => {
        this.getData(response);
      });
    },
    methods: {
      getData(response) {
        if (response) {
          if (response.status === 401) {
            this.$router.push('/login');
            //可以把无效的token清楚掉
            this.$store.dispatch('UserLogout');
          } else {
            this.tableData = response.data.items;
            this.currentPage = response.data.page;
            this.total = response.data.total;
            this.loading = false;
          }
        }
      },
      closeDialog(clo, res) {
        this.dialogFormVisible = clo;
        if (res === "success") {
          this.api.getAllCompany(10, this.currentPage).then((response) => {
            this.getData(response);
          });
        }
      },
      link(index) {
        let id = this.tableData[index].mgrcomp_id
        this.$store.dispatch('Id', id);
        this.$router.push({
          path: '/home/company',
          name: 'company',
          params: {
            id: id
          }
        });
      },
      handleCurrentChange(val) {
        this.loading = true;
        this.api.getAllCompany(10, val.page).then((response) => {
          this.getData(response);
        });
      }
    }
  }
</script>

<style>

</style>



