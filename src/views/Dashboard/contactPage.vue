<template>
  <div>
    <top-navbar></top-navbar>
    <div class="contactForm">
      <b-jumbotron bg-variant="primary" text-variant="white">
        <h1>Skontaktuj się z nami</h1>
        <h2>
          Masz jakieś pytania? Zapraszamy do bezpośredniego kontaktu. Nasz zespół
          skontaktuje się z Tobą w ciągu kilku godzin, aby Ci pomóc.
        </h2>
        <b-row
          class="info d-flex justify-content-center"
          style="min-height: 50vh; width: 50%; margin: auto"
        >
          <b-row class="d-flex justify-content-center align-items-start flex-wrap">
            <b-row class="d-flex justify-content-center align-items-center mb-auto p-8">
              <b-icon icon="envelope" font-scale="4"></b-icon>
            </b-row>
            <b-row
              class="d-flex justify-content-center align-items-center mb-auto p-8 text-center"
            >
              <h3>bsn@gmail.com</h3>
            </b-row>
          </b-row>
          <b-row class="d-flex justify-content-center align-items-start flex-wrap">
            <b-row class="d-flex justify-content-center align-items-center mb-auto p-8">
              <b-icon icon="telephone" font-scale="4"></b-icon>
            </b-row>
            <b-row
              class="d-flex justify-content-center align-items-center mb-auto p-8 text-center"
            >
              <h3>+48 123 456 789</h3>
            </b-row>
          </b-row>
          <b-row class="geoInfo">
            <b-row class="d-flex justify-content-center align-items-center mb-auto p-8">
              <b-icon icon="geo-alt" font-scale="4"></b-icon>
            </b-row>
            <b-row
              class="d-flex justify-content-center align-items-center mb-auto p-8 text-center"
            >
              <h3>ul. Skłodowskiej-Curie 98, 59-300 Lubin</h3>
            </b-row>
          </b-row>
        </b-row>
      </b-jumbotron>
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
  methods: {
    employeeChatObserver() {
      if (this.isEmployee) {
        this.connect();
        this.$chatHub.$on("push-notification", (userName, userLastname) => {
          alert(userName + " " + userLastname + " wysłał wiadomość");
        });
        console.log("Employee connected to hub");
      }
    },
  },
  mounted() {
    this.employeeChatObserver();
  },
};
</script>

<style>
.nav {
  min-width: 100%;
}
* {
  padding: 0;
  margin: 0;
}
.contactForm {
  width: 80%;
  margin: 10vh auto 0 auto;
}
.contactForm .jumbotron {
  min-height: 60vh;
}
.contactForm .jumbotron h1 {
  text-align: center;
  font-size: 5vh;
  margin-bottom: 2vh;
}
.contactForm .jumbotron h2 {
  text-align: center;
  font-size: 2vh;
}
.contactForm .jumbotron h3 {
  font-size: 3vw;
}
.contactForm .form {
  margin-top: 10vh;
}
.geoInfo {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: nowrap;
}
@media only screen and (max-width: 800px) {
  .geoInfo {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
