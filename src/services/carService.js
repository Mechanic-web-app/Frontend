import requestSender from "../helpers/requestSender";

export default function (Vue) {
	Vue.car = {
		async getCars() {
			const result = await requestSender.sendForUsers({
				method: "get",
				url: `/api/Cars`,
			});
			return result;
		},
		async addCar(request) {
			const result = await requestSender.sendForUsers(
				{
					method: "post",
					url: `/api/Cars`,
				},
				request,
			);
			return result;
		},
		async getCar(id) {
			const result = await requestSender.sendForUsers({
				method: "get",
				url:
					`/api/Cars/byUser/${id}`,
			});
			return result;
		},
		async deleteCar(id) {
			const result = await requestSender.sendForUsers({
				method: "delete",
				url: `/api/Cars/${id}`,
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
