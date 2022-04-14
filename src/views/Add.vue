<template>
  <div>
    <h4>添加初始数据</h4>
    <el-form ref="form" :model="form" label-width="80px" style="max-width: 400px">
      <el-form-item label="分类">
        <el-select v-model="form.classification" placeholder="选择分类">
          <el-option label="感染性废物" value="感染性废物"></el-option>
          <el-option label="病理性废物" value="病理性废物"></el-option>
          <el-option label="损伤性废物" value="损伤性废物"></el-option>
          <el-option label="药物性废物" value="药物性废物"></el-option>
          <el-option label="化学性废物" value="化学性废物"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="科室">
        <el-select v-model="form.department" placeholder="选择科室">
          <el-option label="急诊科" value="急诊科"></el-option>
          <el-option label="内科" value="内科"></el-option>
          <el-option label="外科" value="外科"></el-option>
          <el-option label="妇产科" value="妇产科"></el-option>
          <el-option label="儿科" value="儿科"></el-option>
          <el-option label="眼科" value="眼科"></el-option>
          <el-option label="耳鼻喉科" value="耳鼻喉科"></el-option>
          <el-option label="口腔科" value="口腔科"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="重量-kg">
        <el-input v-model="form.weight"></el-input>
      </el-form-item>
      <el-form-item label="回收人员">
        <el-select v-model="form.recylePersonId" placeholder="选择人员">
          <el-option  v-for="item in personArr" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="回收时间">
        <el-col :span="11">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.date1"
            style="width: 100%"
          ></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-time-picker
            placeholder="选择时间"
            v-model="form.recyleTime"
            style="width: 100%"
          ></el-time-picker>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
    <!-- <h6>{{this.timeTransfer(this.form.date2)}}</h6> -->
  </div>
</template>
<script>
export default {
  name: 'add',
  data() {
    return {
      form: {
        classification: '',
        department: '',
        weight: 0,
        recylePersonId: '',
        date1: null,
        recyleTime: null,
      },
      personArr: []
    }
  },
  created() {
    this.getPerson()
  },
  methods: {
    onSubmit() {
      this.form.recyleTime = this.timeTransfer(this.form.date1, this.form.recyleTime)
      this.form.weight = parseFloat(this.form.weight)
      // console.log(this.form)
      this.$http.post('packageinfo', this.form).then(res => {
        if(res.data.status) {
          this.$message({
              message: '成功',
              type: 'success'
            })
        }else {
            this.$message.error('失败');
          }
      })
    },
    timeTransfer(ntime, ntime2) {
      // const ntime =  new Date(new Date(+new Date(time) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, ''))
      let year = ntime.getFullYear()
      let month = ntime.getMonth() + 1
      let day = ntime.getDate()
      let hour = ntime2.getHours()
      let minute = ntime2.getMinutes()
      return '' + year + '-' + month + '-' + day + ' ' + hour + ':' + minute 
    },
    async getPerson() {
      this.personArr = (await this.$http.get('staff')).data
    }
  }
};
</script>
<style>
</style>