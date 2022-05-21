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
					<b-navbar-toggle target="employeeNav"></b-navbar-toggle>
					<b-collapse id="employeeNav" is-nav>
						<b-navbar-nav>
							<b-nav-item to="/employee/menu">
								Panel główny
							</b-nav-item>
							<b-nav-item to="/employee/confirm-user">
								Zatwierdź użytkowników
							</b-nav-item>
							<b-nav-item to="/employee/add-car">
								Dodaj samochód do użytkownika
							</b-nav-item>
							<b-nav-item to="/employee/add-repair" active>
								Dodaj naprawę
							</b-nav-item>
							<b-nav-item to="/employee/chat"> Czat </b-nav-item>
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
												style="width: 100%"
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
import { mapGetters } from "vuex";
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
	computed: {
		...mapGetters(["isAdmin", "isEmployee", "isUser", "isLogged"]),
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
		this.getCars();
		this.employeeChatObserver();
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
