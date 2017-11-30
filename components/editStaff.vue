<template>
  <md-card style="width:100%;">

    <md-card-header>
      <div class="md-title">编辑</div>
      <div class="md-subhead">修改职工信息</div>
    </md-card-header>

    <md-card-content>
      <form style="width:100%;">
        <md-layout md-gutter="16">
          <md-layout md-flex="30" md-flex-offset="15">

            <md-input-container :class="{'md-input-invalid':$v.form.name.$error}">
              <label>姓名</label>
              <md-input class="md-input" v-model.trim="form.name" @input="$v.form.name.$touch()"></md-input>
              <span class="md-error">不允许为空</span>
            </md-input-container>
            <md-input-container :class="{'md-input-invalid':$v.form.birthday.$error}">
              <label>出生年月</label>
              <md-input v-model="form.birthday" type="date" @input="$v.form.birthday.$touch()"></md-input>
              <span class="md-error">不允许为空</span>
            </md-input-container>
            <md-input-container :class="{'md-input-invalid':$v.form.education_highest.$error}">
              <label>最高学历</label>
              <md-input v-model="form.education_highest" @input="$v.form.education_highest.$touch()"></md-input>
              <span class="md-error">不允许为空</span>
            </md-input-container>
            <md-input-container :class="{'md-input-invalid':$v.form.year_start_related_industry.$error}">
              <label>从业年限</label>
              <md-input v-model.number="form.year_start_related_industry"
                        @input="$v.form.year_start_related_industry.$touch()"></md-input>
              <span class="md-error">不允许为空</span>
            </md-input-container>
            <md-input-container :class="{'md-input-invalid':$v.form.conflict.$error}">
              <label>利益冲突</label>
              <md-textarea v-model="form.conflict" maxlength="100" @input="$v.form.conflict.$touch()"></md-textarea>
              <span class="md-error">不允许为空</span>
            </md-input-container>
            <md-input-container :class="{'md-input-invalid':$v.form.desc_past_job.$error}">
              <label>过往从业经历</label>
              <md-textarea v-model="form.desc_past_job" @input="$v.form.desc_past_job.$touch()"></md-textarea>
              <span class="md-error">不允许为空</span>
            </md-input-container>
          </md-layout>
          <md-layout md-flex="30" md-flex-offset="5">
            <div class="inputCon">
              <md-radio v-model="form.sex" id="my-test4" name="my-test-group2" md-value="男" class="md-primary">男
              </md-radio>
              <md-radio v-model="form.sex" id="my-test5" name="my-test-group2" md-value="女" class="md-primary">女
              </md-radio>
            </div>
            <md-input-container :class="{'md-input-invalid':$v.form.position.$error}">
              <label>当前职位</label>
              <md-input v-model="form.position" @input="$v.form.position.$touch()"></md-input>
              <span class="md-error">不允许为空</span>
            </md-input-container>
            <md-input-container :class="{'md-input-invalid':$v.form.university_graduated.$error}">
              <label>毕业院校</label>
              <md-input v-model="form.university_graduated" @input="$v.form.university_graduated.$touch()"></md-input>
              <span class="md-error">不允许为空</span>
            </md-input-container>
            <md-input-container :class="{'md-input-invalid':$v.form.share_held.$error}">
              <label>占股比例</label>
              <md-input v-model.number="form.share_held" @input="$v.form.share_held.$touch()"></md-input>
              <span class="md-error">不允许为空</span>
            </md-input-container>
            <md-input-container :class="{'md-input-invalid':$v.form.punishment.$error}">
              <label>最近一次收到处罚</label>
              <md-textarea v-model="form.punishment" maxlength="100" @input="$v.form.punishment.$touch()"></md-textarea>
              <span class="md-error">不允许为空</span>
            </md-input-container>
            <md-input-container :class="{'md-input-invalid':$v.form.desc_hist_achievement.$error}">
              <label>历史业绩</label>
              <md-textarea v-model="form.desc_hist_achievement" maxlength="100"
                           @input="$v.form.desc_hist_achievement.$touch()"></md-textarea>
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
        form: this.$route.query,
        vertical: 'top',
        horizontal: 'center',
        duration: 4000,
        msg: ''
      }
    },
    validations: {
      form: {
        name: {
          required
        },
        birthday: {
          required
        },
        position: {
          required
        },
        education_highest: {
          required
        },
        university_graduated: {
          required
        },
        year_start_related_industry: {
          required
        },
        share_held: {
          required
        },
        desc_past_job: {
          required
        },
        desc_hist_achievement: {
          required
        },
        punishment: {
          required
        },
        conflict: {
          required
        }
      }
    },
    methods: {
      message(msg) {
        this.msg = msg;
        this.$refs.snackbar.open();
      },
      submitForm(formName) {
        this.$v.form.$touch();
        if (!this.$v.$error) {
          if (this.form.sex=='男') {
            this.form.sex = 1;
          } else {
            this.form.sex = 0;
          }
          this.form.year_start_related_industry = Number(this.form.year_start_related_industry);
          let opt = this.form;
          let id = this.form.id;
          delete this.form.id;
          delete this.form.mgrcomp_id;
          this.api.setStaff(id, opt)
            .then(response => {
              this.message('修改成功');
              this.$router.push('/home/staff');
            }).catch((err) => {
          })
        }
      },
      cancelForm(formName) {
        this.message('取消');
        this.$router.push('/home/staff');
      }
    }
  }
</script>

<style scoped>
  .inputCon {
    height: 82px;
    width: 100%;
    display: -ms-flexbox;
    display: flex;
    position: relative;
  }
</style>




