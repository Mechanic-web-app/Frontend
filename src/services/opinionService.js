import requestSender from "../helpers/requestSender";

export default function (Vue) {
	Vue.opinion = {
		async getOpinions() {
			const result = await requestSender.sendForUsers({
				method: "get",
				url: `https://localhost:44385/api/Opinions`,
			});
			return result;
		},
		async addOpinion(request) {
			const result = await requestSender.sendForUsers(
				{
					method: "post",
					url: `https://localhost:44385/api/Opinions`,
				},
				request,
			);
			return result;
		},
		async deleteOpinion(id) {
			const result = await requestSender.sendForUsers({
				method: "delete",
				url: `https://localhost:44385/api/Opinions/${id}`,
			});
			return result;
		},
		async deleteUser(id) {
			const result = await requestSender.sendForUsers({
				method: "delete",
				url: `https://localhost:44385/api/Users/${id}`,
			});
			return result;
		},
	};

	Object.defineProperties(Vue.prototype, {
		$opinion: {
			get: () => Vue.opinion,
		},
	});
}
