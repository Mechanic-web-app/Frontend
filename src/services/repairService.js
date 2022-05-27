import requestSender from "../helpers/requestSender";

export default function (Vue) {
	Vue.repair = {
		async getRepairs() {
			const result = await requestSender.sendForUsers({
				method: "get",
				url: `/api/Repairs`,
			});
			return result;
		},
		async addRepair(request) {
			const result = await requestSender.sendForUsers(
				{
					method: "post",
					url: `/api/Repairs`,
				},
				request,
			);
			return result;
		},
		async getRepairsByCar(id) {
			const result = await requestSender.sendForUsers({
				method: "get",
				url: `/api/Repairs/byCar/${id}`,
			});
			return result;
		},
		async updateUser(id, request) {
			const result = await requestSender.sendForUsers(
				{
					method: "put",
					url: `/api/Repairs/${id}`,
				},
				request,
			);
			return result;
		},
		async deleteCar(id) {
			const result = await requestSender.sendForUsers({
				method: "delete",
				url: `/api/Repairs/${id}`,
			});
			return result;
		},
	};

	Object.defineProperties(Vue.prototype, {
		$repair: {
			get: () => Vue.repair,
		},
	});
}
