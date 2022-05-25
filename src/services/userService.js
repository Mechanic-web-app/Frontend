import requestSender from "../helpers/requestSender";

export default function (Vue) {
	Vue.user = {
		async getUsers() {
			const result = await requestSender.sendForUsers({
				method: "get",
				url: process.env.VUE_APP_API_BASE_URL + `/api/Users/`,
			});
			return result;
		},
		async addUser(request) {
			const result = await requestSender.sendForUsers(
				{
					method: "post",
					url: process.env.VUE_APP_API_BASE_URL + `/api/Authentication/register`,
				},
				request,
			);
			return result;
		},
		async addEmployee(request) {
			const result = await requestSender.sendForUsers(
				{
					method: "post",
					url: process.env.VUE_APP_API_BASE_URL + `/api/Authentication/employeeRegister`,
				},
				request,
			);
			return result;
		},
		async getUser(id) {
			const result = await requestSender.sendForUsers({
				method: "get",
				url: process.env.VUE_APP_API_BASE_URL + `/api/Users/${+id}`,
			});
			return result;
		},
		async confirmUser(id, request) {
			console.log(id);
			const result = await requestSender.sendForUsers(
				{
					method: "put",
					url: process.env.VUE_APP_API_BASE_URL + `/api/Users/${id}`,
				},
				request,
			);
			return result;
		},
		async profileUpdate(id, request) {
			console.log(id);
			const result = await requestSender.sendForUsers(
				{
					method: "put",
					url: process.env.VUE_APP_API_BASE_URL + `/api/Users/profileUpdate/${id}`,
				},
				request,
			);
			return result;
		},
		async deleteUser(id) {
			const result = await requestSender.sendForUsers({
				method: "delete",
				url: process.env.VUE_APP_API_BASE_URL + `/api/Users/${id}`,
			});
			return result;
		},
		async getUnactiveUsers() {
			const result = await requestSender.sendForUsers({
				method: "get",
				url: process.env.VUE_APP_API_BASE_URL + `/api/Users/byNotConfirmed/false`,
			});
			return result;
		},
	};

	Object.defineProperties(Vue.prototype, {
		$user: {
			get: () => Vue.user,
		},
	});
}
