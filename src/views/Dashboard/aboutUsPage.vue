<template>
	<div>
		<top-navbar></top-navbar>
		<div style="background: white">WITAJ NA STRONIE WARSZTATU</div>
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
				this.$chatHub.$on(
					"push-notification",
					(userName, userLastname) => {
						alert(
							userName + " " + userLastname + " wysłał wiadomość",
						);
					},
				);
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
</style>
