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
        :model="regForm"
        status-icon
        :rules="rules"
        ref="regForm"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="Email" prop="email" style="margin-top: 15vh">
          <el-input type="email" v-model="regForm.email" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="Hasło" prop="password">
          <el-input
            type="password"
            v-model="regForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="Potwierdź hasło" prop="checkPass">
          <el-input
            type="password"
            v-model="regForm.checkPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="Imię" prop="name">
          <el-input type="name" v-model="regForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Nazwisko" prop="lastname">
          <el-input
            type="lastname"
            v-model="regForm.lastname"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="Numer telefonu" prop="phone_number">
          <el-input
            type="phone_number"
            v-model="regForm.phone_number"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item style="margin-top: 5vh">
          <el-button type="primary" @click="submitForm('regForm')"
            >Zarejestruj się</el-button
          >
          <el-button @click="resetForm('regForm')">Reset</el-button>
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
    var validatePass = (rule, value, callback) => {
      if (value === "" || value.length < 4) {
        callback(new Error("Proszę wprowadzić hasło"));
      } else {
        if (this.regForm.checkPass !== "") {
          this.$refs.regForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Proszę wprowadzić hasło ponownie"));
      } else if (value !== this.regForm.password) {
        callback(new Error("Hasła są różne!"));
      } else {
        callback();
      }
    };
    var validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Proszę wprowadzić imię"));
      } else {
        callback();
      }
    };
    var validateLastname = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Proszę wprowadzić nazwisko"));
      } else {
        callback();
      }
    };
    var validatePhone = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Proszę wprowadzić numer telefonu"));
      } else {
        callback();
      }
    };
    return {
      regForm: {
        email: "",
        password: "",
        name: "",
        lastname: "",
        phone_number: "",
      },
      rules: {
        email: [{ validator: validateEmail, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        name: [{ validator: validateName, trigger: "blur" }],
        lastname: [{ validator: validateLastname, trigger: "blur" }],
        phone_number: [{ validator: validatePhone, trigger: "blur" }],
      },
    };
  },
  methods: {
    async submitForm() {
      let isValidForm = await this.$refs.regForm.validate();
      if (isValidForm) {
        const result = await this.$auth.register({
          email: this.regForm.email,
          password: this.regForm.password,
          name: this.regForm.name,
          lastname: this.regForm.lastname,
          phone_number: this.regForm.phone_number,
        });
        if (result.status === true) {
          alert(
            "Rejestracja przebiegła pomyślnie, poczekaj aż twoje konto zostanie aktywowane przez pracownika"
          );
          this.$router.push({ name: "mainPage" });
        }
      }
    },
    resetForm(regForm) {
      this.$refs[regForm].resetFields();
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
  min-height: 500px;
}
</style>
