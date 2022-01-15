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
							<template #row-details="scope">
								<b-card style="background:white;!important">
									<el-form
										:model="addedCar"
										status-icon
										:rules="rules"
										ref="addedCar"
									>
										<el-form-item
											label="Brand"
											prop="brand"
										>
											<el-input
												type="brand"
												v-model="addedCar.brand"
												autocomplete="off"
											></el-input>
										</el-form-item>
										<el-form-item
											label="Model"
											prop="model"
										>
											<el-input
												type="model"
												v-model="addedCar.model"
												autocomplete="off"
											></el-input>
										</el-form-item>
										<el-form-item
											label="Registration number"
											prop="regNumber"
										>
											<el-input
												type="regNumber"
												v-model="addedCar.regNumber"
												autocomplete="off"
											></el-input>
										</el-form-item>
									</el-form>
									<br />
									<b-button
										@click="
											addCar(
												addedCar.brand,
												addedCar.model,
												addedCar.regNumber,
												scope.item.user_id,
											)
										"
									>
										Add Car
									</b-button>
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
		var validateBrand = (rule, value, callback) => {
			if (value === "") {
				callback(new Error("Proszę wprowadzić email"));
			} else {
				callback();
			}
		};
		var validateModel = (rule, value, callback) => {
			if (value === "") {
				callback(new Error("Proszę wprowadzić email"));
			} else {
				callback();
			}
		};
		var validateRegNumber = (rule, value, callback) => {
			if (value === "") {
				callback(new Error("Proszę wprowadzić email"));
			} else {
				callback();
			}
		};
		return {
			users: [],
			addedCar: {
				brand: "",
				model: "",
				regNumber: "",
				userId: "",
			},
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
			rules: {
				brand: [{ validator: validateBrand, trigger: "blur" }],
				model: [{ validator: validateModel, trigger: "blur" }],
				regNumber: [{ validator: validateRegNumber, trigger: "blur" }],
			},
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
		async addCar(brand, model, regNumber, user_id) {
			//let isValidForm = true;
			console.log(brand, model, regNumber, user_id);
			/*if (isValidForm) {
				const result = await this.$car.addCar({
					car_brand: brand,
					car_model: model,
					car_reg_number: regNumber,
					car_user_id: user_id,
				});

				if (result.status === true) {
					alert("Samochód dodany pomyślnie");
					this.$router.push({ name: "addCar" });
				}
			}*/
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
