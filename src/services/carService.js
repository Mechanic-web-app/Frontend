import requestSender from "../helpers/requestSender";

export default function (Vue) {
	Vue.car = {
		async getCars() {
			const result = await requestSender.sendForUsers({
				method: "get",
				url: process.env.VUE_APP_API_BASE_URL + `/api/Cars`,
			});
			return result;
		},
		async addCar(request) {
			const result = await requestSender.sendForUsers(
				{
					method: "post",
					url: process.env.VUE_APP_API_BASE_URL + `/api/Cars`,
				},
				request,
			);
			return result;
		},
		async getCar(id) {
			const result = await requestSender.sendForUsers({
				method: "get",
				url:
					process.env.VUE_APP_API_BASE_URL + `/api/Cars/byUser/${id}`,
			});
			return result;
		},
		async deleteCar(id) {
			const result = await requestSender.sendForUsers({
				method: "delete",
				url: process.env.VUE_APP_API_BASE_URL + `/api/Cars/${id}`,
			});
			return result;
		},
	};

	Object.defineProperties(Vue.prototype, {
		$car: {
			get: () => Vue.car,
		},
	});
}
