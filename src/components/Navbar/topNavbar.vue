<template>
	<div>
		<b-navbar toggleable="lg" type="dark" variant="primary">
			<b-navbar-brand>
				<img
					src="../../assets/car-logo.svg"
					style="width: 15vh"
					alt=""
				/>
			</b-navbar-brand>

			<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

			<b-collapse id="nav-collapse" is-nav>
				<b-navbar-nav>
					<b-nav-item to="/"> Strona główna </b-nav-item>
					<b-nav-item>Usługi</b-nav-item>
					<b-nav-item>O nas</b-nav-item>
					<b-nav-item to="/diagnostyka">BOT Diagnosta </b-nav-item>
					<b-nav-item>Kontakt</b-nav-item>
					<b-nav-item to="/wizyta">Umów się na wizytę</b-nav-item>
				</b-navbar-nav>

				<b-navbar-nav class="ml-auto" v-if="isLogged">
					<admin-navbar v-if="isAdmin"></admin-navbar>
					<employee-navbar v-if="isEmployee"></employee-navbar>
					<user-navbar v-if="isUser"></user-navbar>
				</b-navbar-nav>
				<b-navbar-nav class="ml-auto" v-else>
					<b-button-group>
						<b-button to="sign-in">Zaloguj się</b-button>
						<b-button to="sign-up">Zarejestruj się</b-button>
					</b-button-group>
				</b-navbar-nav>
			</b-collapse>
		</b-navbar>
	</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import userNavbar from "../rolesNavbar/userNavbar.vue";
import employeeNavbar from "../rolesNavbar/employeeNavbar.vue";
import adminNavbar from "../rolesNavbar/adminNavbar.vue";

export default {
	computed: {
		...mapGetters(["isAdmin", "isEmployee", "isUser", "isLogged"]),
	},
	methods: {
		...mapActions(["destroySession"]),
		handleSelect(key, keyPath) {
			console.log(key, keyPath);
		},
	},
	components: {
		userNavbar,
		employeeNavbar,
		adminNavbar,
	},
	name: "topNavbar",
	props: {
		position: {
			type: String,
			default: "absolute",
		},
	},
};
</script>

<style></style>
