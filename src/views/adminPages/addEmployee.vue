<template>
  <div>
    <top-navbar></top-navbar>
    <b-container fluid style="margin-top: 50px">
      <b-card-header
        style="max-width: 110rem; margin: auto"
        class="mb-2"
        header-tag="nav"
      >
        <b-navbar toggleable="lg" card-header pills>
          <b-navbar-toggle target="adminNav"></b-navbar-toggle>
          <b-collapse id="adminNav" is-nav>
            <b-navbar-nav>
              <b-nav-item to="/admin/menu"> Panel główny </b-nav-item>
              <b-nav-item to="/admin/add-employee" active> Dodaj pracownika </b-nav-item>
              <b-nav-item to="/admin/confirm-user"> Zatwierdź użytkowników </b-nav-item>
              <b-nav-item to="/admin/delete-user"> Usuń użytkownika</b-nav-item>
              <b-nav-item to="/admin/add-car"> Dodaj samochód do użytkownika </b-nav-item>
              <b-nav-item to="/admin/delete-car"> Usuń samochód </b-nav-item>
              <b-nav-item to="/admin/add-repair"> Dodaj naprawę </b-nav-item>
              <b-nav-item to="/admin/delete-opinion"> Usuń opinię </b-nav-item>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </b-card-header>
      <b-card-body class="text-center" style="max-width: 110rem; margin: auto">
        <b-jumbotron bg-variant="primary" text-variant="white" border-variant="dark">
          <template #header> Dodaj konto </template>
          <template #lead>
            <div class="container">
              <el-form
                :model="regForm"
                status-icon
                :rules="rules"
                ref="regForm"
                label-width="120px"
                class="demo-ruleForm"
                style="margin-top: 20px; color: black"
              >
                <el-form-item label="Email" prop="email">
                  <el-input
                    type="email"
                    v-model="regForm.email"
                    autocomplete="off"
                  ></el-input>
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
                  <el-input
                    type="name"
                    v-model="regForm.name"
                    autocomplete="off"
                  ></el-input>
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
                <el-form-item>
                  <el-radio-group v-model="regForm.role">
                    <el-radio-button value="User" label="Użytkownik"></el-radio-button>
                    <el-radio-button value="Employee" label="Pracownik"></el-radio-button>
                    <el-radio-button value="Admin" label="Admin"></el-radio-button>
                  </el-radio-group>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm()">
                    Dodaj użytkownika
                  </el-button>
                  <el-button @click="resetForm('regForm')"> Reset </el-button>
                </el-form-item>
              </el-form>
            </div>
          </template>
        </b-jumbotron>
      </b-card-body>
    </b-container>
  </div>
</template>

<script>
import topNavbar from "../../components/Navbar/topNavbar.vue";
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
        role: "",
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
  components: { topNavbar },
  methods: {
    async submitForm() {
      let isValidForm = await this.$refs.regForm.validate();
      if (isValidForm) {
        const result = await this.$auth.registerByAdmin({
          email: this.regForm.email,
          password: this.regForm.password,
          name: this.regForm.name,
          lastname: this.regForm.lastname,
          phone_number: this.regForm.phone_number,
          role: this.regForm.role,
        });
        if (result.status === true) {
          alert("Rejestracja przebiegła pomyślnie");
          this.$router.push({ name: "adminMenu" });
        }
      }
    },
    resetForm(regForm) {
      this.$refs[regForm].resetFields();
    },
  },
};
</script>

<style>
.el-form {
  font-weight: bold !important;
}
.el-form-item__label {
  color: white !important;
}
</style>
