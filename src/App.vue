<template>
  <div>
    <router-view />
    <Footer></Footer>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import cookieHelper from "./helpers/cookieHelper";
import roleRedirect from "./helpers/roleRedirect";
import Footer from "./components/Footer/footer.vue";
export default {
  components: {
    Footer,
  },
  computed: {
    ...mapGetters(["isAdmin", "isEmployee", "isUser", "isLogged"]),
    hasToken() {
      return cookieHelper.hasSessionCookie();
    },
  },
  methods: {
    ...mapActions(["destroySession"]),
    restoreSession() {
      this.$router.push(roleRedirect[this.user.role]);
    },
    employeeChatObserver() {
      if (this.isEmployee) {
        this.connect();
        this.$chatHub.$on("push-notification", (userName, userLastname) => {
          if (userName !== "Employee") {
            alert(userName + " " + userLastname + " wysłał wiadomość");
          }
        });
        console.log("Employee connected to hub");
      }
    },
  },
  watch: {
    user(newVal) {
      if (newVal !== null) {
        this.restoreSession(newVal);
      } else {
        this.$router.push({ name: "signIn" });
      }
    },
    hasToken(newVal) {
      if (!newVal) this.destroySession();
    },
  },
  mounted() {
    this.employeeChatObserver();
  },
};
</script>

<style>
@font-face {
  font-family: "Roboto-Regular";
  src: url("./assets/fonts/Roboto-Regular.ttf");
}
body {
  background-color: #2e2e2e;
}
a:link {
  text-decoration: none;
}
</style>
