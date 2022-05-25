import requestSender from "../helpers/requestSender";

export default function (Vue) {
	Vue.opinion = {
		async getOpinions() {
			const result = await requestSender.sendForUsers({
				method: "get",
				url: process.env.VUE_APP_API_BASE_URL + `/api/Opinions`,
			});
			return result;
		},
		async addOpinion(request) {
			const result = await requestSender.sendForUsers(
				{
					method: "post",
					url: process.env.VUE_APP_API_BASE_URL + `/api/Opinions`,
				},
				request,
			);
			return result;
		},
		async deleteOpinion(id) {
			const result = await requestSender.sendForUsers({
				method: "delete",
				url: process.env.VUE_APP_API_BASE_URL + `/api/Opinions/${id}`,
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
