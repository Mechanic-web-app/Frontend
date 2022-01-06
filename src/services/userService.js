import requestSender from "../helpers/requestSender";

export default function(Vue) {
	Vue.user = {
		async getUsers() {
			const result = await requestSender.send({
				method: "get",
				url: `https://localhost:44385/api/Users`,
			});
			return result;
		},
		async addUser(request) {
			const result = await requestSender.send(
				{
					method: "post",
					url: `https://localhost:44385/api/Authentication/register`,
				},
				request,
			);
			return result;
		},
		async addEmployee(request) {
			const result = await requestSender.send(
				{
					method: "post",
					url: `https://localhost:44385/api/Authentication/employeeRegister`,
				},
				request,
			);
			return result;
		},
		async getUser(id) {
			const result = await requestSender.send({
				method: "get",
				url: `https://localhost:44385/api/Users/${+id}`,
			});
			return result;
		},
		async updateUser(id, request) {
			const result = await requestSender.send(
				{
					method: "put",
					url: `https://localhost:44385/api/Users/${id}`,
				},
				request,
			);
			return result;
		},
		async deleteUser(id) {
			const result = await requestSender.send({
				method: "delete",
				url: `https://localhost:44385/api/Users/${id}`,
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
