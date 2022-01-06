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
					<b-nav-item to="/admin/delete-user">
						Usuń użytkownika</b-nav-item
					>
					<b-nav-item to="/admin/add-car" active>
						Dodaj samochód do użytkownika
					</b-nav-item>
					<b-nav-item to="/admin/add-repair">
						Dodaj naprawę
					</b-nav-item>
					<b-nav-item to="/admin/delete-opinion">
						Usuń opinię</b-nav-item
					>
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
					<template #header>Lista użytkowników:</template>

					<template #lead>
						<br /><b-table
							striped
							hover
							:items="users"
							:fields="fields"
							@row-clicked="handleRowClicked"
						>
							<template #cell(action)="row">
								<b-button size="sm" @click="row.toggleDetails">
									{{ row.detailsShowing ? "Hide" : "Show" }}
									Details
								</b-button>
							</template>
							<template #row-details>
								<b-card>
									<b-button>Dodaj samochód</b-button>
								</b-card>
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
			}
		},
		handleRowClicked(item) {
			this.allOpenRows.map((ele) => {
				if (ele.id !== item.id && ele._showDetails) {
					this.$set(ele, "_showDetails", !ele._showDetails);
				}
			});
			this.allOpenRows = [];
			this.$set(item, "_showDetails", !item._showDetails);
			this.allOpenRows.push(item);
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
	background: #464646;
}
</style>
