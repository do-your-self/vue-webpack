<template>
  <md-card style="width:100%;">

    <md-card-header>
      <div class="md-title">新增</div>
      <div class="md-subhead">添加一个新的产品策略</div>
    </md-card-header>

    <md-card-content>
      <md-layout md-align="center" md-gutter="16">
        <md-layout md-flex="55">
          <form style="width:100%;">
            <md-layout md-gutter="16">
              <md-input-container :class="{'md-input-invalid':$v.form.prod_id.$error}">
                <label for="prod_id">产品</label>
                <md-select name="prod_id" v-model="form.prod_id" style="width:100%">
                  <md-option v-for="item in list" :key="item.value" :value="item.value">{{item.label}}</md-option>
                </md-select>
                <span class="md-error">不允许为空</span>
              </md-input-container>
              <md-input-container :class="{'md-input-invalid':$v.form.stg_type.$error}">
                <label for="stg_type">策略类型</label>
                <md-select name="stg_type" v-model="form.stg_type" style="width:100%">
                  <md-option value="股票多空策略">股票多空策略</md-option>
                  <md-option value="量化对冲策略">量化对冲策略</md-option>
                  <md-option value="债券策略">债券策略</md-option>
                  <md-option value="套利策略">套利策略</md-option>
                  <md-option value="CTA策略">CTA策略</md-option>
                  <md-option value="宏观对冲策略">宏观对冲策略</md-option>
                  <md-option value="另类策略">另类策略</md-option>
                </md-select>
                <span class="md-error">不允许为空</span>
                </md-select>
              </md-input-container>

              <md-input-container :class="{'md-input-invalid':$v.form.year_start_backtesting.$error}">
                <label>产品数量</label>
                <md-input v-model="form.year_start_backtesting"
                          @input="$v.form.year_start_backtesting.$touch()"></md-input>
                <md-icon class="font">只</md-icon>
                <span class="md-error">不允许为空</span>
              </md-input-container>
              <md-input-container :class="{'md-input-invalid':$v.form.year_end_backtesting.$error}">
                <label>产品规模</label>
                <md-input v-model="form.year_end_backtesting"
                          @input="$v.form.year_end_backtesting.$touch()"></md-input>
                <md-icon class="font">万</md-icon>
                <span class="md-error">不允许为空</span>
              </md-input-container>

              <md-layout md-gutter>
                <md-layout md-flex="49">
                  <md-input-container :class="{'md-input-invalid':$v.form.stg_proportion_from.$error}">
                    <label>策略占比区间开始</label>
                    <md-input v-model.number="form.stg_proportion_from"
                              @input="$v.form.stg_proportion_from.$touch()"></md-input>
                    <span class="md-error">不允许为空</span>
                  </md-input-container>
                </md-layout>
                &nbsp;&nbsp;_&nbsp;&nbsp;
                <md-layout md-flex="50">
                  <md-input-container :class="{'md-input-invalid':$v.form.stg_proportion_to.$error}">
                    <label>策略占比区间结束</label>
                    <md-input v-model.number="form.stg_proportion_to"
                              @input="$v.form.stg_proportion_to.$touch()"></md-input>
                    <span class="md-error">不允许为空</span>
                  </md-input-container>

                </md-layout>
              </md-layout>
              <md-input-container :class="{'md-input-invalid':$v.form.desc.$error}">
                <label>策略描述</label>
                <md-textarea v-model="form.desc" maxlength="100" @input="$v.form.desc.$touch()"></md-textarea>
                <span class="md-error">不允许为空</span>
              </md-input-container>

            </md-layout>

            <!-- 提示框 -->
            <md-snackbar :md-position="vertical + ' ' + horizontal" ref="snackbar" :md-duration="duration">
              <span>{{msg}}</span>
              <md-button class="md-accent" @click="$refs.snackbar.close()">关闭</md-button>
            </md-snackbar>

          </form>
        </md-layout>
      </md-layout>

      <md-layout md-align="center">
        <md-button class="md-primary md-raised" @click="submitForm">提交</md-button>
        <md-button class="md-dense md-raised" @click="cancelForm">取消</md-button>
      </md-layout>
    </md-card-content>
  </md-card>


</template>

<script>
  import {required} from 'vuelidate/lib/validators'

  export default {
    data() {
      return {
        items: [],
        staff: [],
        list: [],
        form: {
          "stg_type": "",
          "year_start_backtesting": "",
          "year_end_backtesting": "",
          "stg_proportion_from": "",
          "stg_proportion_to": "",
          "desc": "",
          "prod_id": ""
        },
        vertical: 'top',
        horizontal: 'center',
        duration: 4000,
        msg: ''
      }
    },
    validations: {
      form: {
        prod_id: {
          required
        },
        stg_type: {
          required
        },
        year_start_backtesting: {
          required
        },
        year_end_backtesting: {
          required
        },
        stg_proportion_from: {
          required
        },
        stg_proportion_to: {
          required
        },
        desc: {
          required
        }
      }
    },
    mounted() {
      this.api.getProduct(50, 1).then(response => {
        this.states = response.data.items;
        this.list = this.states.map(item => {
          return {value: item.id, label: item.full_name};
        });
      }).catch((err) => {
      })
    },
    methods: {
      message(msg) {
        this.msg = msg;
        this.$refs.snackbar.open();
      },
      getData(response) {      //拿到返回的数据
        if (response) {
          if (response.status === 401) {
            this.$router.push('/login');
            //可以把无效的token清楚掉
            this.$store.dispatch('UserLogout');
          } else {
            this.loading = false;
            this.form = response.data;
            if (this.form.sex) {
              this.form.sex = '1';
            } else {
              this.form.sex = '0';
            }
          }
        }
      },
      submitForm() {
        this.$v.form.$touch();
        if (!this.$v.$error) {
          let opt = this.form;
          this.api.addProdStg(opt)
            .then(response => {
              this.message('添加成功');
              this.$router.push('/home/prodStg');
            }).catch((err) => {
          })
        }
      },
      cancelForm(formName) {
        this.message('取消');
        this.$router.push('/home/prodStg');
      }
    }
  }
</script>

<style scoped>
  .font {
    font-size: 14px;
  }
</style>




