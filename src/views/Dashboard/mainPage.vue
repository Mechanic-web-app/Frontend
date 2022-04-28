<template>
	<div>
		<top-navbar></top-navbar>
		<div style="background:white;">
			WITAJ NA STRONIE WARSZTATU
		</div>
	</div>
</template>
<script>
import topNavbar from "../../components/Navbar/topNavbar.vue";
export default {
	components: {
		topNavbar,
	},

	/*


								<div class="userNav" v-if="!isLogged">
									<router-link :to="{ name: 'signIn' }">
										<button>Zaloguj się</button>
									</router-link>
									<router-link :to="{ name: 'signUp' }">
										<button>Zarejestruj się</button>
									</router-link>
								</div>
								<div v-else>
									<button @click.native="destroySession()">
										Wyloguj się
									</button>
								</div>*/
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
