<template>
  <div>
    <top-navbar></top-navbar>
    <div>
      <b-jumbotron
        class="aboutUs"
        bg-variant="primary"
        text-variant="white"
        border-variant="dark"
      >
        <h1>Ponad 20 lat doświadczenia</h1>

        <h2>Co przekłada się na tysiące zadowolonych klientów. Zostań jednym z nich!</h2>

        <hr class="my-4" />
        Nasze początki sięgają lat 2000, kiedy to jeszcze raczkowaliśmy w tematach
        motoryzacji niekoniecznie „u siebie”. Firmą opiekuje się i wspiera trzech braci,
        którzy stale doskonalą swoje umiejętności, czerpiąc wiedzę ze wszelkich możliwych
        źródeł, w tym szkoleń. Jesteśmy firmą prężnie działającą na rynku od 10 lat, a w
        tym czasie mierzyliśmy się już z przeróżnymi problemami, a jakość naszych usług
        stale rośnie, co pozwoliło na osiągnięcie znaczącej pozycji na rynku usług
        autoserwisowych Dolnego Śląska. Konsekwentna strategia rozwoju umożliwiła
        stopniowe poszerzanie oferty serwisowej i wprowadzanie najnowszych technologii.<br />
        • 20 lat doświadczenia<br />
        • 10 lat firmy na rynku <br />
        • Łączy nas pasja<br />
        • Zaufały nam już tysiące klientów<br />
        • Kompleksowo obsługujemy firmy w regionie
      </b-jumbotron>
      <b-jumbotron
        class="opinions"
        bg-variant="primary"
        text-variant="white"
        border-variant="dark"
      >
        <h1>Opinie o nas:</h1>

        <hr class="my-4" />

        <b-carousel
          id="carousel-animation"
          style="text-shadow: 0px 0px 2px #000"
          animation
          indicators
          img-width="1024"
          img-height="500"
        >
          <b-carousel-slide
            v-for="opinion in opinions"
            :key="opinion.opinion_id"
            img-src="https://i.imgur.com/JeFkd8p.png"
          >
            <h2>
              <b-form-rating
                inline
                variant="primary"
                v-model="opinion.opinion_rate"
                disabled
              ></b-form-rating>
              {{ opinion.opinion_user_lastname }}
              {{ opinion.opinion_user_name }}:
              {{ opinion.opinion_description }}
            </h2>
          </b-carousel-slide>
        </b-carousel>
      </b-jumbotron>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import topNavbar from "../../components/Navbar/topNavbar.vue";
export default {
  data() {
    return {
      opinions: [],
    };
  },
  components: {
    topNavbar,
  },
  computed: {
    ...mapGetters(["isAdmin", "isEmployee", "isUser", "isLogged"]),
  },
  methods: {
    async getOpinions() {
      const result = await this.$opinion.getOpinions();
      if (result.status === true) {
        this.opinions = result.data;
        console.log(this.opinions);
      }
    },
  },
  mounted() {
    this.getOpinions();
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
.aboutUs {
  width: 75%;
  margin: 5vh auto 0 auto;
}
.aboutUs h1 {
  font-size: 6vh;
}
.aboutUs h2 {
  font-size: 3vh;
}
.opinions h2 {
  font-size: 5vh !important;
}
.opinions h1 {
  font-size: 5vh;
}
.opinions {
  width: 75%;
  min-height: 50vh;
  margin: 5vh auto 0 auto;
}
@media only screen and (max-width: 800px) {
  .opinions .carousel-item img {
    min-height: 100vh !important ;
  }
}
</style>
