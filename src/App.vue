<template>
	<div>
		<router-view />
	</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import cookieHelper from "./helpers/cookieHelper";
import roleRedirect from "./helpers/roleRedirect";
export default {
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
	background-color: #121212;
}
</style>
