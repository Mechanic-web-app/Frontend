<template>
	<div>
		<top-navbar></top-navbar>
		<b-container fluid style="margin-top: 50px">
			<b-card-header
				style="max-width: 110rem; margin: auto"
				class="mb-2"
				header-tag="nav"
			>
				<b-navbar toggleable="lg" card-header pills>
					<b-navbar-toggle target="adminNav"></b-navbar-toggle>
					<b-collapse id="adminNav" is-nav>
						<b-navbar-nav>
							<b-nav-item to="/admin/menu" active>
								Panel główny
							</b-nav-item>
							<b-nav-item to="/admin/add-employee">
								Dodaj pracownika
							</b-nav-item>
							<b-nav-item to="/admin/confirm-user">
								Zatwierdź użytkowników
							</b-nav-item>
							<b-nav-item to="/admin/delete-user">
								Usuń użytkownika</b-nav-item
							>
							<b-nav-item to="/admin/add-car">
								Dodaj samochód do użytkownika
							</b-nav-item>
							<b-nav-item to="/admin/add-repair">
								Dodaj naprawę
							</b-nav-item>
							<b-nav-item to="/admin/delete-opinion">
								Usuń opinię
							</b-nav-item>
						</b-navbar-nav>
					</b-collapse>
				</b-navbar>
			</b-card-header>
			<b-card-body
				class="text-center"
				style="max-width: 110rem; margin: auto"
			>
				<b-jumbotron
					bg-variant="primary"
					text-variant="white"
					border-variant="dark"
				>
					<template #header>Witaj w panelu admina</template>

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

<style>
.navbar-light .navbar-nav .nav-link.active {
	background-color: #007bff;
	color: white;
	padding: 0.5vw;
}
.navbar-light .navbar-nav .nav-link {
	border-radius: 0.25rem;
	color: white;
}
.card-header a:link {
	color: white !important;
}
</style>
