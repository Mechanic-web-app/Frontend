<template>
	<div>
		<top-navbar></top-navbar>
		<b-container fluid style="margin-top:50px;">
			<b-card-header
				style="max-width: 110rem; margin:auto;"
				class="mb-2"
				header-tag="nav"
			>
				<b-nav card-header pills>
					<b-nav-item to="/employee/menu" active>
						Panel główny
					</b-nav-item>
					<b-nav-item to="/employee/confirm-user">
						Zatwierdź użytkowników
					</b-nav-item>
					<b-nav-item to="/employee/add-car">
						Dodaj samochód do użytkownika
					</b-nav-item>
					<b-nav-item to="/employee/add-repair">
						Dodaj naprawę
					</b-nav-item>
				</b-nav>
			</b-card-header>
			<b-card-body
				class="text-center"
				style="max-width: 110rem; margin:auto;"
			>
				<b-jumbotron
					bg-variant="primary"
					text-variant="white"
					border-variant="dark"
				>
					<template #header>Witaj w panelu pracownika</template>

					<template #lead>
						Wybierz z powyższego panelu co chciałbyś zrobić.
					</template>
				</b-jumbotron>
			</b-card-body>
		</b-container>
	</div>
</template>

<script>
import topNavbar from "../../components/Navbar/topNavbar.vue";
export default {
	components: { topNavbar },
};
</script>

<style scoped>
.card-header {
	background: #363636;
}
.card-body {
	background: #464646;
}
</style>
