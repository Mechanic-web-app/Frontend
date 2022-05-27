<template>
  <div>
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      background-color="gray"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="1">
        <router-link :to="{ name: 'mainPage' }"> Wróć do strony głównej </router-link>
      </el-menu-item>
    </el-menu>
    <div class="container">
      <el-form
        :model="loginForm"
        status-icon
        :rules="rules"
        ref="loginForm"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="Email" prop="email">
          <el-input type="email" v-model="loginForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Hasło" prop="password">
          <el-input type="password" v-model="loginForm.password" autocomplete="off">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')">
            Zaloguj się
          </el-button>
          <el-button @click="resetForm('loginForm')"> Reset </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    var validateEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Proszę wprowadzić email"));
      } else {
        callback();
      }
    };
    var validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Proszę wprowadzić hasło"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        email: "",
        password: "",
      },
      rules: {
        email: [{ validator: validateEmail, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
      },
    };
  },
  methods: {
    async submitForm() {
      let isValidForm = await this.$refs.loginForm.validate();
      if (isValidForm) {
        const result = await this.$auth.logIn({
          email: this.loginForm.email,
          password: this.loginForm.password,
        });
        if (result.status === true) {
          alert("Zalogowano pomyślnie");
          this.$router.push({ name: "mainPage" });
        } else {
          alert(
            "Podczas logowania wystąpił błąd. Sprawdź poprawność wprowadzonych danych oraz czy twoje konto zostało potwierdzone."
          );
        }
        console.log(result);
      }
    },
    resetForm(loginForm) {
      this.$refs[loginForm].resetFields();
    },
  },
};
</script>
<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 25px;
  height: 500px;
}
</style>
