import requestSender from "../helpers/requestSender";

export default function (Vue) {
	Vue.user = {
		async getUsers() {
			const result = await requestSender.sendForUsers({
				method: "get",
				url: `/api/Users/`,
			});
			return result;
		},
		async addUser(request) {
			const result = await requestSender.sendForUsers(
				{
					method: "post",
					url: `/api/Authentication/register`,
				},
				request,
			);
			return result;
		},
		async addEmployee(request) {
			const result = await requestSender.sendForUsers(
				{
					method: "post",
					url: `/api/Authentication/employeeRegister`,
				},
				request,
			);
			return result;
		},
		async getUser(id) {
			const result = await requestSender.sendForUsers({
				method: "get",
				url: `/api/Users/${+id}`,
			});
			return result;
		},
		async confirmUser(id, request) {
			const result = await requestSender.sendForUsers(
				{
					method: "put",
					url: `/api/Users/${id}`,
				},
				request,
			);
			return result;
		},
		async profileUpdate(id, request) {
			const result = await requestSender.sendForUsers(
				{
					method: "put",
					url: `/api/Users/profileUpdate/${id}`,
				},
				request,
			);
			return result;
		},
		async deleteUser(id) {
			const result = await requestSender.sendForUsers({
				method: "delete",
				url: `/api/Users/${id}`,
			});
			return result;
		},
		async getUnactiveUsers() {
			const result = await requestSender.sendForUsers({
				method: "get",
				url: `/api/Users/byNotConfirmed/false`,
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
