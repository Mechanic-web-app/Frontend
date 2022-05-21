import requestSender from "../helpers/requestSender";

export default function (Vue) {
	Vue.chat = {
		async sendMessage(request) {
			const result = await requestSender.send(
				{
					method: "post",
					url: "/chat",
				},
				request,
			);

			return result;
		},
	};

	Object.defineProperties(Vue.prototype, {
		$chat: {
			get: () => Vue.chat,
		},
	});
}
