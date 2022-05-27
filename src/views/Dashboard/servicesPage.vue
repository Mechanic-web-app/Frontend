<template>
  <div>
    <top-navbar></top-navbar>
    <div class="services-info text-center">
      <h1>Oferowane przez nas usługi:</h1>
    </div>
    <div class="services">
      <b-row class="d-flex justify-content-center flex-wrap" style="min-height: 100vh">
        <b-col
          cols="12"
          md="4"
          class="d-flex justify-content-center align-items-start flex-wrap"
        >
          <b-row class="d-flex justify-content-center align-items-center mb-auto p-4">
            <img src="../../assets/mechanic.svg" style="width: 25vh" alt="" />
          </b-row>
          <b-row
            class="d-flex justify-content-center align-items-center mb-auto p-4 text-center"
          >
            Mechaniczne naprawy pojazdów
          </b-row>
        </b-col>
        <b-col
          cols="12"
          md="4"
          class="d-flex justify-content-center align-items-start flex-wrap"
        >
          <b-row class="d-flex justify-content-center align-items-center mb-auto p-4">
            <img src="../../assets/diagnostic.svg" style="width: 25vh" alt="" />
          </b-row>
          <b-row
            class="d-flex justify-content-center align-items-center mb-auto p-4 text-center"
          >
            Diagnostyka komputerowa
          </b-row>
        </b-col>
        <b-col
          cols="12"
          md="4"
          class="d-flex justify-content-center align-items-start flex-wrap"
        >
          <b-row class="d-flex justify-content-center align-items-center mb-auto p-4">
            <img src="../../assets/car.svg" style="width: 25vh" alt="" />
          </b-row>
          <b-row
            class="d-flex justify-content-center align-items-center mb-auto p-4 text-center"
          >
            Kompleksowa renowacja pojazdów
          </b-row>
        </b-col>
        <b-col
          cols="12"
          md="4"
          class="d-flex justify-content-center align-items-start flex-wrap"
        >
          <b-row class="d-flex justify-content-center align-items-center mb-auto p-4">
            <img src="../../assets/oil.svg" style="width: 25vh" alt="" />
          </b-row>
          <b-row
            class="d-flex justify-content-center align-items-center mb-auto p-4 text-center"
          >
            Serwis pojazdów (filtry, oleje, płyny eksploatacyjne)
          </b-row>
        </b-col>
        <b-col
          cols="12"
          md="4"
          class="d-flex justify-content-center align-items-start flex-wrap"
        >
          <b-row class="d-flex justify-content-center align-items-center mb-auto p-4">
            <img src="../../assets/paint.svg" style="width: 25vh" alt="" />
          </b-row>
          <b-row
            class="d-flex justify-content-center align-items-center mb-auto p-4 text-center"
          >
            Blacharstwo i lakiernictwo
          </b-row>
        </b-col>
        <b-col
          cols="12"
          md="4"
          class="d-flex justify-content-center align-items-start flex-wrap"
        >
          <b-row
            class="d-flex justify-content-center align-items-center mb-auto p-4 text-center"
          >
            <img src="../../assets/wheel.svg" style="width: 25vh" alt="" />
          </b-row>
          <b-row
            class="d-flex justify-content-center align-items-center mb-auto p-4 text-center"
          >
            Serwis i depozyt ogumienia
          </b-row>
        </b-col>
      </b-row>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import topNavbar from "../../components/Navbar/topNavbar.vue";
export default {
  components: {
    topNavbar,
  },
  computed: {
    ...mapGetters(["isAdmin", "isEmployee", "isUser", "isLogged"]),
  },
};
</script>

<style>
.nav {
  min-width: 100%;
}
.services {
  width: 80%;
  margin: auto;
  font-size: 2.5vh;
  font-weight: 500;
  color: white;
}
* {
  padding: 0;
  margin: 0;
}
.services-info {
  width: 100%;
  min-height: 10vh;
  margin-top: 10vh;
  margin-bottom: 10vh;
}
.services-info h1 {
  color: white;
  font-weight: 500;
  font-size: 7.5vh;
}
.b-col {
  border: 1px solid white;
}
</style>
