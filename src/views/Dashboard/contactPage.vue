<template>
	<div>
		<top-navbar></top-navbar>
		<div class="contactForm">
			<b-jumbotron bg-variant="primary" text-variant="white">
				<h1>Skontaktuj się z nami</h1>
				<h2>
					Masz jakieś pytania? Zapraszamy do bezpośredniego kontaktu.
					Nasz zespół skontaktuje się z Tobą w ciągu kilku godzin, aby
					Ci pomóc.
				</h2>
				<b-row class="form d-flex flex-wrap">
					<b-col cols="12" md="8" class="d-flex flex-wrap">
						<b-form-input
							v-model="text"
							placeholder="Imię i nazwisko"
							style="width: 45%"
						>
						</b-form-input>
						<b-form-input
							v-model="text"
							placeholder="E-mail"
							style="width: 45%; margin-left: 10%"
						>
						</b-form-input>
						<b-form-input
							v-model="text"
							placeholder="Temat"
							style="width: 100%; margin-top: 2vh"
						>
						</b-form-input>
						<b-form-textarea
							v-model="text"
							placeholder="Treść wiadomości"
							style="width: 100%; margin-top: 2vh"
						>
						</b-form-textarea>
						<b-button
							variant="light"
							style="width: 30%; height: 5vh; margin-top: 2vh"
						>
							Wyślij</b-button
						>
					</b-col>

					<b-col cols="12" md="4" class="databox d-flex flex-wrap">
						<b-col
							class="width:100%;d-flex align-items-center justify-content-center"
						>
							<b-row
								><b-icon icon="geo-alt" font-scale="5"></b-icon
							></b-row>
							<b-row>
								ul. Skłodowskiej-Curie 98, 59-300 Lubin
							</b-row>
						</b-col>
						<b-col
							class="width:100%;d-flex align-items-center justify-content-center"
						>
							<b-icon icon="telephone" font-scale="5"></b-icon>
							+48 123 456 789
						</b-col>
						<b-col
							class="width:100%;d-flex align-items-center justify-content-center"
						>
							<b-icon icon="envelope" font-scale="5"></b-icon>
							bsn@gmail.com
						</b-col>
					</b-col>
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
.contactForm .form {
	margin-top: 10vh;
}
</style>
