<template>
  <md-table-card style="width:100%;">
    <md-toolbar v-if="$store.state.admin=='false'">
      <h1 class="md-title">
        <md-button class="md-icon-button" @click="add">
          <md-icon>add</md-icon>
        </md-button>
      </h1>
    </md-toolbar>

    <md-table-alternate-header md-selected-label="selected">
      <md-button class="md-icon-button">
        <md-icon>delete</md-icon>
      </md-button>

      <md-button class="md-icon-button">
        <md-icon>more_vert</md-icon>
      </md-button>
    </md-table-alternate-header>

    <md-table md-sort="calories">
      <!-- table header -->
      <md-table-header>
        <md-table-row>
          <md-table-head md-sort-by="name">姓名</md-table-head>
          <md-table-head md-sort-by="sex">性别</md-table-head>
          <md-table-head md-sort-by="position">当前职位</md-table-head>
          <md-table-head md-sort-by="birthday">生日</md-table-head>
          <md-table-head md-sort-by="education_highest">最高学历</md-table-head>
          <md-table-head md-sort-by="university_graduated">毕业院校</md-table-head>
          <md-table-head md-sort-by="share_held">占股比例</md-table-head>
          <md-table-head md-sort-by="year_start_related_industry">从业年限</md-table-head>
          <md-table-head md-sort-by="mgrcomp_id" style="width:100px;text-align:center;">操作</md-table-head>
        </md-table-row>
      </md-table-header>

      <!-- table body -->
      <md-table-body>
        <md-table-row v-for="(row, rowIndex) in tableData" :key="rowIndex" :md-item="row">
          <md-table-cell v-for="(column, columnIndex) in row" :key="columnIndex"
                         v-if="columnIndex !== 'desc_past_job' && columnIndex !== 'desc_hist_achievement' && columnIndex !== 'punishment' && columnIndex !== 'conflict' && columnIndex !== 'id' && columnIndex !== 'mgrcomp_id'">
            <span
              v-if="columnIndex !== 'desc_past_job' && columnIndex !== 'desc_hist_achievement' && columnIndex !== 'punishment' && columnIndex !== 'conflict' && columnIndex !== 'id' && columnIndex !== 'mgrcomp_id'">{{ column
              }}</span>
          </md-table-cell>
          <md-table-cell>
            <md-button class="md-raised md-primary md-icon-button" @click="edit(rowIndex,row.id)"
                       :disabled="$store.state.admin=='true'">
              <md-icon>edit</md-icon>
            </md-button>
            <md-button class="md-raised md-primary md-icon-button" @click="del(rowIndex,row.id)"
                       :disabled="$store.state.admin=='true'">
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
        msg: '',
        id: '',
        index: ''
      }
    },
    beforeCreate() {
      if (this.$store.state.admin == 'true' && this.$store.state.id == 'null') {
        this.api.getAllStaff(10, 1).then((response) => {
          this.getData(response);
        });
      } else if (this.$store.state.admin == 'true' && this.$store.state.id != 'null') {
        let id = this.$store.state.id;
        this.api.getIdStaff(id, 10, 1).then((response) => {
          this.getData(response);
        });
      } else {
        this.api.getStaff(10, 1).then((response) => {
          this.getData(response);
        });
      }
    },
    methods: {
      message(msg) {
        this.msg = msg;
        this.$refs.snackbar.open();
      },
      //判断确定取消操作并关闭回话框
      closeDialog(ref, e) {
        if (e == 'submit') {
          this.api.delStaff(this.id).then(response => {
            this.tableData.splice(this.index, 1);
            this.msg = '删除成功';
            this.$refs.snackbar.open();
            --this.total;
            if (this.total % 10 == 0) {
              --this.currentPage;
            }
            this.api.getStaff(10, this.currentPage).then((response) => {
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
      getData: function (response) {      //拿到返回的数据
        if (response) {
          if (response.status === 401) {
            this.$router.push('/login');
            //可以把无效的token清楚掉
            this.$store.dispatch('UserLogout');
          } else {
            let resp = response.data.items;
            for (var i = 0; i < resp.length; i++) {
              for (var k in resp[i]) {
                if (k === 'sex' && resp[i][k] === false) {
                  resp[i][k] = '女';
                } else if (k === 'sex' && resp[i][k] === true) {
                  resp[i][k] = '男';
                }
              }
            }
            this.tableData = resp;
            this.currentPage = response.data.page;
            this.total = response.data.total;
            this.loading = false;
          }
        }
      },
      add() {
        this.$router.push('/home/addStaff')
      },
      edit(index, id) {
        this.$router.push({
          path: '/home/editStaff',
          query: this.tableData[index]
        })
      },
      del(index, id) {
        this.$refs['dialog'].open();
        this.id = id;
        this.index = index;
      },
      handleCurrentChange(opt) {
        this.loading = true;
        let val = opt.page;
        if (this.$store.state.admin == 'true' && this.$store.state.id == 'null') {
          this.api.getAllStaff(10, val).then((response) => {
            this.getData(response);
          });
        } else if (this.$store.state.admin == 'true' && this.$store.state.id != 'null') {
          let id = this.$store.state.id;
          this.api.getIdStaff(id, 10, val).then((response) => {
            this.getData(response);
          });
        } else {
          this.api.getStaff(10, val).then((response) => {
            this.getData(response);
          });
        }
      }
    }
  }
</script>

<style>

</style>




