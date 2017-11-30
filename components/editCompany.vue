<template>
  <md-card style="width:100%;">
    <md-card-header>
      <div class="md-title">编辑</div>
      <div class="md-subhead">修改/完善公司信息</div>
    </md-card-header>

    <md-card-content>
      <form style="width:100%;">
        <md-layout md-gutter="16">
          <md-layout md-flex="30" md-flex-offset="15">
            <md-input-container :class="{'md-input-invalid':$v.form.mgrcomp_short_name.$error}">
              <label>投顾公司简称</label>
              <md-input required v-model="form.mgrcomp_short_name" @input="$v.form.mgrcomp_short_name.$touch()"></md-input>
              <span class="md-error">不允许为空</span>
            </md-input-container>
            <md-input-container :class="{'md-input-invalid':$v.form.date_establishment.$error}">
              <label>成立时间</label>
              <md-input required v-model="form.date_establishment" type="date"
                        @input="$v.form.date_establishment.$touch()"></md-input>
              <span class="md-error">不允许为空</span>
            </md-input-container>
            <md-input-container :class="{'md-input-invalid':$v.form.reg_capital.$error}">
              <label>注册资本</label>
              <md-input required v-model.number="form.reg_capital" @input="$v.form.reg_capital.$touch()"></md-input>
              <span class="md-error">不允许为空</span>
            </md-input-container>
            <md-input-container :class="{'md-input-invalid':$v.form.num_staff.$error}">
              <label>员工数量</label>
              <md-input required v-model.number="form.num_staff" @input="$v.form.num_staff.$touch()"></md-input>
              <span class="md-error">不允许为空</span>
            </md-input-container>
            <md-input-container :class="{'md-input-invalid':$v.form.num_rd.$error}">
              <label>投研人数</label>
              <md-input required v-model.number="form.num_rd" @input="$v.form.num_rd.$touch()"></md-input>
              <span class="md-error">不允许为空</span>
            </md-input-container>
            <md-input-container :class="{'md-input-invalid':$v.form.num_trade.$error}">
              <label>交易人员数(含运维)</label>
              <md-input required v-model.number="form.num_trade" @input="$v.form.num_trade.$touch()"></md-input>
              <span class="md-error">不允许为空</span>
            </md-input-container>
            <md-input-container :class="{'md-input-invalid':$v.form.desc_hardware.$error}">
              <label>基础硬件硬件信息</label>
              <md-textarea required v-model="form.desc_hardware" maxlength="100"
                           @input="$v.form.desc_hardware.$touch()"></md-textarea>
              <span class="md-error">不允许为空</span>
            </md-input-container>
            <md-input-container :class="{'md-input-invalid':$v.form.desc_trading_platform.$error}">
              <label>交易平台,商业平台(如TB,讯投),或自建平台</label>
              <md-textarea required v-model="form.desc_trading_platform" maxlength="100"
                           @input="$v.form.desc_trading_platform.$touch()"></md-textarea>
              <span class="md-error">不允许为空</span>
            </md-input-container>
            <div class="inputCon">
              <md-checkbox name="my-test1" v-model="form.risk_role_backup">人员备份</md-checkbox>
              <md-checkbox name="my-test1" v-model="form.risk_web_backup">网络冗余</md-checkbox>
              <md-checkbox name="my-test1" v-model="form.risk_power_backup">电源冗余</md-checkbox>
            </div>
          </md-layout>
          <md-layout md-flex="30" md-flex-offset="5">
            <md-input-container :class="{'md-input-invalid':$v.form.reg_id.$error}">
              <label>协会注册备案号</label>
              <md-input required v-model="form.reg_id" @input="$v.form.reg_id.$touch()"></md-input>
              <span class="md-error">不允许为空</span>
            </md-input-container>
            <md-input-container :class="{'md-input-invalid':$v.form.address.$error}">
              <label>地址</label>
              <md-input required v-model="form.address" @input="$v.form.address.$touch()"></md-input>
              <span class="md-error">不允许为空</span>
            </md-input-container>
            <md-input-container :class="{'md-input-invalid':$v.form.shareholder_names.$error}">
              <label>股东名单</label>
              <md-input required v-model="form.shareholder_names" @input="$v.form.shareholder_names.$touch()"></md-input>
              <span class="md-error">不允许为空</span>
            </md-input-container>
            <md-input-container :class="{'md-input-invalid':$v.form.num_it.$error}">
              <label>IT人数</label>
              <md-input required v-model.number="form.num_it" @input="$v.form.num_it.$touch()"></md-input>
              <span class="md-error">不允许为空</span>
            </md-input-container>
            <md-input-container :class="{'md-input-invalid':$v.form.num_risk_mgr.$error}">
              <label>风控人数</label>
              <md-input required v-model.number="form.num_risk_mgr" @input="$v.form.num_risk_mgr.$touch()"></md-input>
              <span class="md-error">不允许为空</span>
            </md-input-container>
            <md-input-container :class="{'md-input-invalid':$v.form.num_master.$error}">
              <label>硕士及以上学历人数</label>
              <md-input required v-model.number="form.num_master" @input="$v.form.num_master.$touch()"></md-input>
              <span class="md-error">不允许为空</span>
            </md-input-container>
            <md-input-container :class="{'md-input-invalid':$v.form.desc_risk_mgr.$error}">
              <label>其他风控措施</label>
              <md-textarea required v-model="form.desc_risk_mgr" maxlength="100"
                           @input="$v.form.desc_risk_mgr.$touch()"></md-textarea>
              <span class="md-error">不允许为空</span>
            </md-input-container>
            <md-input-container :class="{'md-input-invalid':$v.form.desc_db.$error}">
              <label>数据库类型</label>
              <md-textarea required v-model="form.desc_db" maxlength="100" @input="$v.form.desc_db.$touch()"></md-textarea>
              <span class="md-error">不允许为空</span>
            </md-input-container>
            <md-input-container :class="{'md-input-invalid':$v.form.desc_backup.$error}">
              <label>数据库备份及系统冗余</label>
              <md-textarea required v-model="form.desc_backup" maxlength="100"
                           @input="$v.form.desc_backup.$touch()"></md-textarea>
              <span class="md-error">不允许为空</span>
            </md-input-container>

          </md-layout>
        </md-layout>

        <!-- 提示框 -->
        <md-snackbar :md-position="vertical + ' ' + horizontal" ref="snackbar" :md-duration="duration">
          <span><md-icon>info</md-icon>{{msg}}</span>
          <md-button class="md-accent" @click="$refs.snackbar.close()">关闭</md-button>
        </md-snackbar>

      </form>

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
        form: this.$route.query.form,
        vertical: 'top',
        horizontal: 'center',
        duration: 4000,
        msg: ''
      }
    },
    validations: { //验证规则
      form: {
        address: {
          required
        },
        date_establishment: {
          required
        },
        desc_backup: {
          required
        },
        desc_db: {
          required
        },
        desc_hardware: {
          required
        },
        desc_risk_mgr: {
          required
        },
        desc_trading_platform: {
          required
        },
        mgrcomp_short_name: {
          required
        },
        num_it: {
          required
        },
        num_master: {
          required
        },
        num_rd: {
          required
        },
        num_risk_mgr: {
          required
        },
        num_staff: {
          required
        },
        num_trade: {
          required
        },
        reg_capital: {
          required
        },
        reg_id: {
          required
        },
        shareholder_names: {
          required
        }
      }
    },
    methods: {
      message(msg) {
        this.msg = msg;
        this.$refs.snackbar.open();
      },
      submitForm() {
        this.$v.form.$touch();
        if (!this.$v.$error) {                       
          this.form.num_staff = Number(this.form.num_staff);
          this.form.num_trade = Number(this.form.num_trade);
          this.form.num_rd = Number(this.form.num_rd);
          this.form.num_risk_mgr = Number(this.form.num_risk_mgr);
          this.form.reg_capital = Number(this.form.reg_capital);
          this.form.num_it = Number(this.form.num_it);
          this.form.num_master = Number(this.form.num_master);
          this.form.risk_role_backup = !!this.form.risk_role_backup;
          this.form.risk_web_backup = !!this.form.risk_web_backup;
          this.form.risk_power_backup = !!this.form.risk_power_backup;
          let opt = this.form;
          delete this.form.id;
          delete this.form.user;
          this.api.setCompany(opt)
            .then(response => {
              this.message('修改成功');
              this.$router.push({
                path:'/home/company',
                query: {
                  'form':this.form
                }
              });
            }).catch((err) => {
          })
        }
      },
      cancelForm(formName) {
        this.message('取消')
        this.$router.push('/home/company');
      }
    }
  }
</script>

<style scoped>
</style>


