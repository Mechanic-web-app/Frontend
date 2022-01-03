<template>
	<div>
		<top-navbar></top-navbar>
		<b-container fluid style="margin-top:50px;">
			<b-card
				title="Twój profil"
				img-src="/src/assets/profile.jpg"
				img-alt="Image"
				img-width="1rem"
				tag="article"
				style="max-width: 50rem; margin:auto;"
				class="mb-2"
			>
				<b-card-text>
					Twoje dane:<br />
					Imię: {{ userName }}<br />
					Nazwisko: {{ userLastname }}<br />
					Numer telefonu<br />
					Email:<br />
					<b-button href="#" variant="primary"
						>Edytuj swoje dane</b-button
					>
				</b-card-text>

				<b-jumbotron lead="Twoje samochody:">
					<b-button variant="primary" href="#">More Info</b-button>
				</b-jumbotron>
			</b-card>
		</b-container>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import topNavbar from "../../components/Navbar/topNavbar.vue";

export default {
	computed: {
		...mapGetters(["userName", "userLastname"]),
	},
	components: {
		topNavbar,
	},
};
</script>

<style></style>
