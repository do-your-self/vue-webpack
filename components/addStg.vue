<template>
  <md-card style="width:100%;">

    <md-card-header>
      <div class="md-title">新增</div>
      <div class="md-subhead">添加一个新的策略</div>
    </md-card-header>

    <md-card-content>
      <md-layout md-align="center" md-gutter="16">
        <md-layout md-flex="55">
          <form style="width:100%;">
            <md-input-container :class="{'md-input-invalid':$v.form.stg_type.$error}">
              <label for="stg_type">策略类型</label>
              <md-select name="stg_type" v-model="form.stg_type" placeholder="请选择策略类型" style="width:100%">
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
            <md-input-container :class="{'md-input-invalid':$v.form.product_count.$error}">
              <label>产品数量</label>
              <md-input v-model.number="form.product_count" @input="$v.form.product_count.$touch()" type="number"></md-input>
              <md-icon class="font">只</md-icon>
              <span class="md-error">不允许为空</span>
            </md-input-container>
            <md-input-container :class="{'md-input-invalid':$v.form.scale.$error}">
              <label>规模</label>
              <md-input v-model.number="form.scale" @input="$v.form.scale.$touch()" type="number"></md-input>
              <md-icon class="font">万</md-icon>
              <span class="md-error">不允许为空</span>
            </md-input-container>
            <md-input-container :class="{'md-input-invalid':$v.form.scale_ceiling.$error}">
              <label>规模上限</label>
              <md-input v-model.number="form.scale_ceiling" @input="$v.form.scale_ceiling.$touch()" type="number"></md-input>
              <span class="md-error">不允许为空</span>
            </md-input-container>

            <!-- 提示框 -->
            <md-snackbar :md-position="vertical + ' ' + horizontal" ref="snackbar" :md-duration="duration">
              <span><md-icon>info</md-icon>{{msg}}</span>
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
        form: {
          "stg_type": "",
          "product_count": "",
          "scale": "",
          "scale_ceiling": ""
        },
        vertical: 'top',
        horizontal: 'center',
        duration: 4000,
        msg: ''
      }
    },
    validations: {
      form: {
        stg_type: {
          required
        },
        product_count: {
          required
        },
        scale: {
          required
        },
        scale_ceiling: {
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
          this.form.product_count = Number(this.form.product_count);
          this.form.scale = Number(this.form.scale);
          this.form.scale_ceiling = Number(this.form.scale_ceiling);
          let opt = this.form;
          this.api.addStg(opt)
            .then(response => {
              this.message('修改成功');
              this.$router.push('/home/stg');
            }).catch((err) => {
          })
        }
      },
      cancelForm(formName) {
        this.message('取消');
        this.$router.push('/home/stg');
      }
    }
  }
</script>

<style scoped>
  .font {
    font-size: 14px;
  }
</style>




