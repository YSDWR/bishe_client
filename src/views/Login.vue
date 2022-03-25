<template>
  <div class="login-container">
    <div class="title">医疗废弃物溯源系统</div>
    <el-form ref="loginForm" :model="form" label-width="80px" style="width: 430px;" class="el-from" :rules="rules">
      <el-form-item label="账号:" prop="user">
        <el-input v-model="form.user" style="width: 260px;"></el-input>
      </el-form-item>
      <el-form-item label="密码:" prop="password">
        <el-input v-model="form.password" show-password style="width: 260px;"></el-input>
      </el-form-item>
      <div class="btn-container">
        <el-button type="primary" @click="onSubmit('loginForm')">登录</el-button>
        <el-button @click="resetForm('loginForm')">重置</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    data() {
      return {
        form: {
          user: '2018217640',
          password: '2018217640'
        },
        rules: {
          user: [
            { required: true, message: '请输入账号', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ],
        }
      }
    },
    methods: {
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (!valid) {
            console.log('error submit!!');
            return false;
          } else {
            this.$http.post('login', this.form).then(res => {
              if (res.data.status) {
                let {token} = res.data
                window.localStorage.setItem('token', 'Bearer ' + token)
                this.$router.push('/home')
              } else {
                console.log(res.data);
                this.$message.error('登陆失败');
              }
            })
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped>
  .login-container {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* background-image: url('../assets/home.png'); */
  }

  .btn-container {
    margin: 0 100px;
    display: flex;
    justify-content: space-evenly;
  }

  .title {
    padding: 8px;
    font-size: 20px;
  }
</style>