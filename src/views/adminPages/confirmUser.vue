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
              <b-nav-item to="/admin/confirm-user" active>
                Zatwierdź użytkowników
              </b-nav-item>
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
          <template #header>Lista użytkowników:</template>

          <template #lead>
            <br /><b-table
              striped
              hover
              responsive
              :items="unactiveUsers"
              :fields="fields"
            >
              <template #cell(action)="data">
                <b-button @click="confirmUser(data.item.user_id)">
                  Zatwierdź użytkownika
                </b-button>
              </template>
              <template> </template>
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
  components: { topNavbar },
  data() {
    return {
      unactiveUsers: [],
      fields: [
        {
          key: "lastname",
          sortable: true,
          label: "Nazwisko",
        },
        {
          key: "name",
          sortable: false,
          label: "Imię",
        },
        {
          key: "action",
          label: "Akcja",
          sortable: false,
        },
      ],
    };
  },
  methods: {
    async getUnactiveUsers() {
      const result = await this.$user.getUnactiveUsers();
      if (result.status === true) {
        this.unactiveUsers = result.data;
      }
    },
    async confirmUser(id) {
      {
        const result = await this.$user.confirmUser(id, {
          user_confirmed: true,
        });

        if (result.status === true) {
          alert("Pomyślnie aktywowano użytkownika");
          this.$router.go();
        }
      }
    },
  },
  mounted() {
    this.getUnactiveUsers();
  },
};
</script>

<style></style>
