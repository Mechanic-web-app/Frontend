<template>
	<div>
		<top-navbar></top-navbar>
		<div>
			<b-carousel
				id="carousel-fade"
				style="text-shadow: 0px 0px 2px #000"
				fade
				indicators
				img-width="1920"
				img-height="750"
			>
				<b-carousel-slide
					class="firstSlide"
					img-src="https://i.imgur.com/xAvDptg.jpg"
				>
					<h1>Witaj na stronie warsztatu BNS</h1>
					<h2>Sprawdź wykonywane przez nas usługi</h2>
					<b-button variant="primary">USŁUGI</b-button>
				</b-carousel-slide>
				<b-carousel-slide
					class="secondSlide"
					img-src="https://i.imgur.com/aIMASFv.jpg"
				>
					<h1>Umów się na wizytę</h1>
					<h2>
						Za pomocą naszego czatu on-line dostępnego w godzinach
						8-16
					</h2>
					<b-button variant="primary">USŁUGI</b-button>
				</b-carousel-slide>
				<b-carousel-slide
					class="thirdSlide"
					img-src="https://i.imgur.com/6I0oLva.jpg"
				>
					<h1>Zdiagnozuj swoją usterkę</h1>
					<h2>Za pomocą naszego BOTA</h2>
					<b-button variant="primary">USŁUGI</b-button>
				</b-carousel-slide>
			</b-carousel>
		</div>
		<div class="second">
			<div>
				<b-jumbotron
					bg-variant="primary"
					text-variant="white"
					border-variant="dark"
				>
					<h1>Ponad 15 lat doświadczenia</h1>

					<h2>
						Co przekłada się na tysiące zadowolonych klientów.
						Zostań jednym z nich!
					</h2>

					<hr class="my-4" />

					<p>
						Naciśnij przycisk, jeśli chcesz się o nas dowiedzieć
						więcej i przeczytać opinie.
					</p>

					<b-button variant="light" to="/o-nas">O nas</b-button>
				</b-jumbotron>
			</div>
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

@media only screen and (max-width: 800px) {
	.carousel-item img {
		height: 25vh !important ;
	}
}
* {
	padding: 0;
	margin: 0;
}
.carousel-caption h1 {
	font-size: 4vw;
	font-weight: 600;
	text-shadow: 0vw 0vw 10px #000000;
}
.carousel-caption h2 {
	font-size: 2vw;
	text-shadow: 0vw 0vw 20px #000000;
	margin: 2vh 0 2vh 0;
}
@media only screen and (max-width: 800px) {
	.carousel-caption h2 {
		font-size: 4vw;
		text-shadow: 0vw 0vw 20px #000000;
		margin: 1vh 0 1vh 0;
	}
}
@media only screen and (max-width: 800px) {
	.carousel-caption h1 {
		font-size: 5vw;
		font-weight: 600;
		text-shadow: 0vw 0vw 10px #000000;
	}
}
.second {
	margin-top: 20vh;
	margin-left: auto;
	width: 80%;
}
@media only screen and (max-width: 800px) {
	.second {
		margin-top: 20vw;
		margin-left: auto;
		width: 80%;
	}
}
.second .jumbotron {
	border-radius: 15em 0 0 15em;
	padding-left: 20vw;
	padding-top: 10vh;
	min-height: 30em;
}
.second h1 {
	font-size: 7vh;
	margin-bottom: 2vh;
}
.second h2 {
	font-size: 4vh;
}
@media only screen and (max-width: 800px) {
	.second h1 {
		font-size: 7vw;
		margin-bottom: 2vh;
	}
}
@media only screen and (max-width: 800px) {
	.second h2 {
		font-size: 4vw;
	}
}
</style>
