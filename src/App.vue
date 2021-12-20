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
		...mapGetters(["user", "isLogged", "isAdmin"]),
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
			} else {
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
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}
* {
	padding: 0;
	margin: 0;
}
</style>
