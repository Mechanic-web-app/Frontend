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
              <b-nav-item to="/admin/delete-car"> Usuń samochód </b-nav-item>
              <b-nav-item to="/admin/add-repair"> Dodaj naprawę </b-nav-item>
              <b-nav-item to="/admin/delete-opinion" active> Usuń opinię </b-nav-item>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </b-card-header>
      <b-card-body class="text-center" style="max-width: 110rem; margin: auto">
        <b-jumbotron bg-variant="primary" text-variant="white" border-variant="dark">
          <template #header> Lista opinii: </template>

          <template #lead>
            <br /><b-table striped hover responsive :items="opinions" :fields="fields">
              <template #cell(action)="data">
                <b-button @click="deleteOpinion(data.item.opinion_id)">
                  Usuń opinię
                </b-button>
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
  components: { topNavbar },
  data() {
    return {
      opinions: [],
      fields: [
        {
          key: "opinion_user_lastname",
          sortable: true,
          label: "Nazwisko",
        },
        {
          key: "opinion_user_name",
          sortable: false,
          label: "Imię",
        },
        {
          key: "opinion_description",
          sortable: true,
          label: "Opis",
        },
        {
          key: "opinion_rate",
          sortable: true,
          label: "Ocena",
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
    async getOpinions() {
      const result = await this.$opinion.getOpinions();
      if (result.status === true) {
        this.opinions = result.data;
      }
    },
    async deleteOpinion(id) {
      {
        const result = await this.$opinion.deleteOpinion(id);

        if (result.status === true) {
          alert("Pomyślnie usunięto opinię");
          this.$router.go();
        }
      }
    },
  },
  mounted() {
    this.getOpinions();
  },
};
</script>

<style></style>
