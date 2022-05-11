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
	},
	watch: {
		user(newVal) {
			if (newVal !== null) {
				this.restoreSession(newVal);
				console.log(newVal);
			} else {
				console.log("dupa");
				this.$router.push({ name: "Login" });
			}
		},
		hasToken(newVal) {
			if (!newVal) this.destroySession();
		},
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
