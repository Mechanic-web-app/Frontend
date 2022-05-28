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
              <b-nav-item to="/admin/add-employee"> Dodaj pracownika </b-nav-item>
              <b-nav-item to="/admin/confirm-user"> Zatwierdź użytkowników </b-nav-item>
              <b-nav-item to="/admin/delete-user"> Usuń użytkownika </b-nav-item>
              <b-nav-item to="/admin/add-car"> Dodaj samochód do użytkownika </b-nav-item>
              <b-nav-item to="/admin/delete-car" active> Usuń samochód </b-nav-item>
              <b-nav-item to="/admin/add-repair"> Dodaj naprawę </b-nav-item>
              <b-nav-item to="/admin/delete-opinion"> Usuń opinię </b-nav-item>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </b-card-header>
      <b-card-body class="text-center" style="max-width: 110rem; margin: auto">
        <b-jumbotron bg-variant="primary" text-variant="white" border-variant="dark">
          <template #header>Lista samochodów:</template>

          <template #lead>
            <br /><b-table striped hover responsive :items="cars" :fields="fields">
              <template #cell(action)="data">
                <b-button @click="deleteCar(data.item.car_id)"> Usuń samochód </b-button>
                A
              </template>
            </b-table>
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
    return {
      cars: [],
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
    };
  },
  components: { topNavbar },
  methods: {
    async getCars() {
      const result = await this.$car.getCars();
      if (result.status === true) {
        this.cars = result.data;
      }
    },
    async deleteCar(id) {
      {
        const result = await this.$car.deleteCar(id);

        if (result.status === true) {
          alert("Pomyślnie usunięto samochód");
          this.$router.go();
        }
      }
    },
  },
  mounted() {
    this.getCars();
  },
};
</script>

<style></style>
