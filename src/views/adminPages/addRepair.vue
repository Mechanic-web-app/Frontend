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
					<b-nav-item to="/admin/add-car">
						Dodaj samochód do użytkownika
					</b-nav-item>
					<b-nav-item to="/admin/add-repair" active>
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
					<template #header>Lista samochodów:</template>

					<template #lead>
						<br /><b-table
							striped
							hover
							:items="cars"
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
										:model="addedRepair"
										status-icon
										:rules="rules"
										ref="addedRepair"
									>
										<el-form-item
											label="Opis naprawy"
											prop="description"
										>
											<el-input
												type="description"
												v-model="
													addedRepair.description
												"
												autocomplete="off"
											></el-input>
										</el-form-item>
										<el-form-item label="Koszt" prop="cost">
											<el-input-number
												type="cost"
												v-model="addedRepair.cost"
												autocomplete="off"
												controls-position="right"
												:step="0.01"
												style="width:100%;"
											></el-input-number>
										</el-form-item>
										<el-form-item label="Date" prop="date">
											<el-input
												type="date"
												v-model="addedRepair.date"
												autocomplete="off"
											></el-input>
										</el-form-item>
									</el-form>
									<br />
									<b-button
										@click="
											addRepair(
												addedRepair.description,
												addedRepair.cost,
												addedRepair.date,
												scope.item.car_id,
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
	data() {
		var validateDescription = (rule, value, callback) => {
			if (value === "") {
				callback(new Error("Proszę wprowadzić email"));
			} else {
				callback();
			}
		};
		var validateCost = (rule, value, callback) => {
			if (value === "") {
				callback(new Error("Proszę wprowadzić email"));
			} else {
				callback();
			}
		};
		var validateDate = (rule, value, callback) => {
			if (value === "") {
				callback(new Error("Proszę wprowadzić email"));
			} else {
				callback();
			}
		};
		return {
			cars: [],
			fields: [
				{
					key: "car_brand",
					sortable: false,
					label: "Marka",
				},
				{
					key: "car_model",
					sortable: false,
					label: "Model",
				},
				{
					key: "car_reg_number",
					sortable: true,
					label: "Numer rejestracyjny",
				},
				{
					key: "action",
					label: "Akcja",
					sortable: false,
				},
			],
			addedRepair: {
				description: "",
				cost: null,
				date: "",
			},
			rules: {
				description: [
					{ validator: validateDescription, trigger: "blur" },
				],
				cost: [{ validator: validateCost, trigger: "blur" }],
				date: [{ validator: validateDate, trigger: "blur" }],
			},
		};
	},
	components: { topNavbar },
	methods: {
		async getCars() {
			const result = await this.$car.getCars();
			if (result.status === true) {
				this.cars = result.data;
				console.log(this.cars);
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
		async addRepair(description, cost, date, car_id) {
			let isValidForm = true;
			if (isValidForm) {
				const result = await this.$repair.addRepair({
					repair_description: description,
					repair_cost: cost,
					repair_date: date,
					repaired_car_id: car_id,
				});

				if (result.status === true) {
					alert("Samochód dodany pomyślnie");
					this.$router.push({ name: "addCar" });
				}
			}
		},
	},
	mounted() {
		this.getCars();
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
