<template>
  <md-table-card style="width:100%;">
    <md-table md-sort="calories">

      <!-- table header -->
      <md-table-header>
        <md-table-row>
          <md-table-head md-sort-by="username">用户名</md-table-head>
          <md-table-head md-sort-by="comp_name">公司名称</md-table-head>
          <md-table-head md-sort-by="create_time">注册时间</md-table-head>
          <md-table-head md-sort-by="active">激活</md-table-head>
          <md-table-head md-sort-by="mgrcomp_id" style="width:100px;text-align:center;">操作</md-table-head>
        </md-table-row>
      </md-table-header>

      <!-- table body -->
      <md-table-body>
        <md-table-row v-for="(row, rowIndex) in tableData" :key="rowIndex" :md-item="row">
          <md-table-cell v-for="(column, columnIndex) in row" :key="columnIndex" v-if="columnIndex !== 'id'">
            <span v-if="columnIndex !== 'id' && columnIndex !== 'active'">{{ column }}</span>
            <span v-if="columnIndex == 'active'">{{ column ? '是' : '否' }}</span>
          </md-table-cell>
          <md-table-cell>
            <md-button class="md-raised md-primary md-icon-button" @click="del(index,row.id)">
              <md-icon>delete</md-icon>
            </md-button>
          </md-table-cell>
        </md-table-row>
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
<!--     <md-snackbar :md-position="vertical + ' ' + horizontal" ref="snackbar" :md-duration="duration">
      <span><md-icon>info</md-icon>{{msg}}</span>
      <md-button class="md-accent" @click="$refs.snackbar.close()">关闭</md-button>
    </md-snackbar> -->

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
        total: 0,
        currentPage: 1,
        vertical: 'top',
        horizontal: 'center',
        duration: 4000,
        msg: '',
        id: '',
        index: ''
      }
    },
    beforeCreate() {
      this.api.getUser(10, 1).then((response) => {
        this.getData(response);
      });
    },
    methods: {
      getData: function (response) {
        if (response) {
          if (response.status === 401) {
            this.$router.push('/login');
            //可以把无效的token清楚掉
            this.$store.dispatch('UserLogout');
          } else {
            this.tableData = response.data.items;
            this.total = response.data.total;
            this.currentPage = response.data.page;
            this.loading = false;
          }
        }
      },
      //判断确定取消操作并关闭回话框
      closeDialog(ref, e) {
        if (e == 'submit') {
          this.api.delUser(this.id).then(response => {
            this.tableData.splice(this.index, 1);
            this.msg = '删除成功';
            this.$refs.snackbar.open();
            --this.total;
            if (this.total % 10 == 0) {
              --this.currentPage;
            }
            this.api.getUser(10, this.currentPage).then((response) => {
              this.getData(response);
            });
          }).catch((err) => {
          })
        } else {
          this.msg = '已取消删除';
          this.$refs.snackbar.open();
        }
        this.$refs[ref].close();
      },
      del(index, id) {
        this.$refs['dialog'].open();
        this.id = id;
        this.index = index;
      },
      handleCurrentChange(val) {
        this.loading = true;
        this.api.getUser(10, val.page).then((response) => {
          this.getData(response);
        });
      }
    }
  }
</script>





