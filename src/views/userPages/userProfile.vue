<template>
  <div>
    <top-navbar></top-navbar>
    <b-container fluid style="margin-top: 50px">
      <b-card tag="article" style="max-width: 50rem; margin: auto" class="mb-2">
        <img src="../../assets/profile.svg" style="width: 10rem" />
        <b-card-text>
          Twoje dane:<br />
          Imię: {{ userName }}<br />
          Nazwisko: {{ userLastname }}<br />
          Numer telefonu: {{ userPhone }}<br />
          Email: {{ userEmail }}<br />
          <b-button v-b-modal.modal-1 variant="primary">Edytuj swoje dane</b-button>
          <b-button v-b-modal.modal-2 variant="primary" style="margin-left: 1vw"
            >Wystaw opinię</b-button
          >
          <b-modal id="modal-1" title="Edytuj swoje dane">
            <div class="container">
              <el-form
                :model="updateForm"
                status-icon
                :rules="rules"
                ref="updateForm"
                label-width="120px"
                class="demo-ruleForm"
              >
                <el-form-item label="Email" prop="email">
                  <el-input
                    type="email"
                    v-model="updateForm.email"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
                <el-form-item label="Imię" prop="name">
                  <el-input
                    type="name"
                    v-model="updateForm.name"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
                <el-form-item label="Nazwisko" prop="lastname">
                  <el-input
                    type="lastname"
                    v-model="updateForm.lastname"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
                <el-form-item label="Numer telefonu" prop="phone_number">
                  <el-input
                    type="phone_number"
                    v-model="updateForm.phone_number"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
              </el-form>
            </div>
            <template #modal-footer>
              <div class="w-100">
                <b-button
                  variant="primary"
                  size="sm"
                  class="float-right"
                  @click="submitForm('updateForm')"
                >
                  Wyślij zmiany
                </b-button>
              </div></template
            >
          </b-modal>
          <b-modal id="modal-2" title="Wystaw opinię">
            <div class="container">
              <b-form-rating
                v-model="opinionRate"
                variant="primary"
                class="mb-2"
              ></b-form-rating>
              <b-form-textarea
                id="textarea"
                v-model="opinionDescription"
                placeholder="Tu wpisz treść swojej opinii"
                rows="3"
                max-rows="6"
              ></b-form-textarea>
            </div>
            <template #modal-footer>
              <div class="w-100">
                <b-button
                  variant="primary"
                  size="sm"
                  class="float-right"
                  @click="submitOpinion()"
                  :disabled="opinionRate === null || opinionDescription === null"
                >
                  Wyślij opinię
                </b-button>
              </div></template
            >
          </b-modal>
        </b-card-text>

        <b-jumbotron lead="Twoje samochody:" style="margin-top: 3vh">
          <b-table responsive striped hover :items="cars" :fields="fields">
            <template #cell(action)="scope">
              <b-button
                v-b-modal="scope.item.car_id"
                @click="getRepairs(scope.item.car_id)"
              >
                Pokaż naprawy
              </b-button>
              <b-modal
                :id="scope.item.car_id"
                :title="
                  scope.item.car_brand +
                  ' ' +
                  scope.item.car_model +
                  ' ' +
                  scope.item.car_reg_number
                "
                size="xl"
              >
                <b-table striped responsive hover :items="repairs" :fields="repairFields">
                </b-table>
              </b-modal>
            </template>
          </b-table>
        </b-jumbotron>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
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
      updateForm: {
        email: this.$store.getters.userEmail,
        name: this.$store.getters.userName,
        lastname: this.$store.getters.userLastname,
        phone_number: this.$store.getters.userPhone,
      },
      rules: {
        email: [{ validator: validateEmail, trigger: "blur" }],
        name: [{ validator: validateName, trigger: "blur" }],
        lastname: [{ validator: validateLastname, trigger: "blur" }],
        phone_number: [{ validator: validatePhone, trigger: "blur" }],
      },
      cars: [],
      repairs: [],
      fields: [
        {
          key: "car_brand",
          sortable: false,
          label: "Marka",
        },
        {
          key: "car_model",
          sortable: false,
          label: "Model",
        },
        {
          key: "car_reg_number",
          sortable: true,
          label: "Numer rejestracyjny",
        },
        {
          key: "action",
          label: "Akcja",
          sortable: false,
        },
      ],
      repairFields: [
        {
          key: "repair_description",
          sortable: false,
          label: "Opis",
        },
        {
          key: "repair_cost",
          sortable: false,
          label: "Koszt (zł)",
        },
        {
          key: "repair_date",
          sortable: true,
          label: "Data",
        },
      ],
      opinionRate: null,
      opinionDescription: null,
    };
  },
  computed: {
    ...mapGetters(["userName", "userLastname", "userId", "userPhone", "userEmail"]),
  },
  components: {
    topNavbar,
  },
  methods: {
    async getCars() {
      const result = await this.$car.getCar(this.userId);
      if (result.status === true) {
        this.cars = result.data;
        console.log(this.cars);
      }
    },
    async getRepairs(carId) {
      const result = await this.$repair.getRepairsByCar(carId);
      if (result.status === true) {
        this.repairs = result.data;
        console.log(this.repairs);
      }
    },
    async submitForm() {
      let isValidForm = await this.$refs.updateForm.validate();
      if (isValidForm) {
        const result = await this.$user.profileUpdate(this.$store.getters.userId, {
          email: this.updateForm.email,
          name: this.updateForm.name,
          lastname: this.updateForm.lastname,
          phone_number: this.updateForm.phone_number,
        });
        if (result.status === true) {
          alert(
            "Zmiana danych przebiegła pomyślie, nowe dane będą widoczne w profilu po ponownym zalogowaniu"
          );
          this.$router.push({ name: "userProfile" });
        }
      }
    },
    async submitOpinion() {
      const result = await this.$opinion.addOpinion({
        Opinion_user_id: this.$store.getters.userId,
        Opinion_description: this.opinionDescription,
        Opinion_rate: this.opinionRate,
        Opinion_user_name: this.$store.getters.userName,
        Opinion_user_lastname: this.$store.getters.userLastname,
      });
      if (result.status === true) {
        alert("Opinia została wysłana pomyślnie. Dziękujemy!");
        this.$router.go();
      }
    },
  },
  mounted() {
    this.getCars();
  },
};
</script>

<style>
.card-body h1 {
  color: white;
}
.card-text {
  color: white;
}
</style>
