<template>
	<div>
		<top-navbar></top-navbar>
		<b-container fluid style="margin-top: 50px">
			<b-card-header
				style="max-width: 110rem; margin: auto"
				class="mb-2"
				header-tag="nav"
			>
				<b-nav toggleable="lg" card-header pills>
					<b-navbar-toggle target="adminNav"></b-navbar-toggle>
					<b-collapse id="adminNav" is-nav>
						<b-navbar-nav>
							<b-nav-item to="/admin/menu" active>
								Panel główny
							</b-nav-item>
							<b-nav-item
								to="/admin/add-employee"
								class="text-gray-500"
							>
								Dodaj pracownika
							</b-nav-item>
							<b-nav-item
								to="/admin/confirm-user"
								class="text-gray-500"
							>
								Zatwierdź użytkowników
							</b-nav-item>
							<b-nav-item
								to="/admin/delete-user"
								class="text-gray-500"
							>
								Usuń użytkownika</b-nav-item
							>
							<b-nav-item
								to="/admin/add-car"
								class="text-gray-500"
							>
								Dodaj samochód do użytkownika
							</b-nav-item>
							<b-nav-item
								to="/admin/add-repair"
								class="text-gray-500"
							>
								Dodaj naprawę
							</b-nav-item>
							<b-nav-item
								to="/admin/delete-opinion"
								class="text-gray-500"
							>
								Usuń opinię
							</b-nav-item>
						</b-navbar-nav>
					</b-collapse>
				</b-nav>
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

<style scoped></style>
