<template>
	<div>
		<top-navbar></top-navbar>
		<b-container fluid style="margin-top:50px;">
			<b-card
				tag="article"
				style="max-width: 50rem; margin:auto;"
				class="mb-2"
			>
				<img src="../../assets/profile.jpg" style="width:10rem;" />
				<h1>Twój profil</h1>
				<b-card-text>
					Twoje dane:<br />
					Imię: {{ userName }}<br />
					Nazwisko: {{ userLastname }}<br />
					Numer telefonu: {{ userPhone }}<br />
					Email: {{ userEmail }}<br />
					<b-button href="#" variant="primary"
						>Edytuj swoje dane</b-button
					>
				</b-card-text>

				<b-jumbotron lead="Twoje samochody:">
					<b-table striped hover :items="cars" :fields="fields">
						<template #cell(action)="scope">
							<b-button
								v-b-modal="scope.item.car_id"
								@click="getRepairs(scope.item.car_id)"
							>
								Pokaż naprawy
							</b-button>
							<b-modal
								:id="scope.item.car_id"
								:title="
									scope.item.car_brand +
										' ' +
										scope.item.car_model +
										' ' +
										scope.item.car_reg_number
								"
								size="xl"
							>
								<b-table
									striped
									hover
									:items="repairs"
									:fields="repairFields"
								>
								</b-table>
							</b-modal>
						</template>
					</b-table>
				</b-jumbotron>
			</b-card>
		</b-container>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import topNavbar from "../../components/Navbar/topNavbar.vue";

export default {
	data() {
		return {
			cars: [],
			repairs: [],
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
			repairFields: [
				{
					key: "repair_description",
					sortable: false,
					label: "Opis",
				},
				{
					key: "repair_cost",
					sortable: false,
					label: "Koszt (zł)",
				},
				{
					key: "repair_date",
					sortable: true,
					label: "Data",
				},
			],
		};
	},
	computed: {
		...mapGetters([
			"userName",
			"userLastname",
			"userId",
			"userPhone",
			"userEmail",
		]),
	},
	components: {
		topNavbar,
	},
	methods: {
		async getCars() {
			const result = await this.$car.getCar(this.userId);
			if (result.status === true) {
				this.cars = result.data;
				console.log(this.cars);
			}
		},
		async getRepairs(carId) {
			const result = await this.$repair.getRepairsByCar(carId);
			if (result.status === true) {
				this.repairs = result.data;
				console.log(this.repairs);
			}
		},
	},
	mounted() {
		this.getCars();
	},
};
</script>

<style></style>
