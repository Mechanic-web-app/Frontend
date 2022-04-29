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
					<b-nav-item to="/admin/menu">
						Panel główny
					</b-nav-item>
					<b-nav-item to="/admin/add-employee">
						Dodaj pracownika
					</b-nav-item>
					<b-nav-item to="/admin/confirm-user">
						Zatwierdź użytkowników
					</b-nav-item>
					<b-nav-item to="/admin/delete-user" active>
						Usuń użytkownika
					</b-nav-item>
					<b-nav-item to="/admin/add-car">
						Dodaj samochód do użytkownika
					</b-nav-item>
					<b-nav-item to="/admin/add-repair">
						Dodaj naprawę
					</b-nav-item>
					<b-nav-item to="/admin/delete-opinion">
						Usuń opinię
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
					<template #header> Lista użytkowników: </template>

					<template #lead>
						<br /><b-table
							striped
							hover
							:items="users"
							:fields="fields"
						>
							<template #cell(action)="data">
								<b-button
									@click="deleteUser(data.item.user_id)"
								>
									Usuń użytkownika
								</b-button>
							</template>
						</b-table>
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
	data() {
		return {
			users: [],
			fields: [
				{
					key: "lastname",
					sortable: true,
					label: "Nazwisko",
				},
				{
					key: "name",
					sortable: false,
					label: "Imię",
				},
				{
					key: "email",
					sortable: true,
					label: "E-mail",
				},
				{
					key: "action",
					label: "Akcja",
					sortable: false,
				},
			],
		};
	},
	methods: {
		async getUsers() {
			const result = await this.$user.getUsers();
			if (result.status === true) {
				this.users = result.data;
				console.log(this.users);
			}
		},
		async deleteUser(id) {
			{
				const result = await this.$user.deleteUser(id);

				if (result.status === true) {
					alert("Pomyślnie usunięto użytkownika");
					this.$router.go();
				}
			}
		},
	},
	mounted() {
		this.getUsers();
	},
};
</script>

<style scoped>
.card-header {
	background: #363636;
}
.card-body {
	background: #bdbdbd;
}
</style>
