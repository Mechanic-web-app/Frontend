import requestSender from "../helpers/requestSender.js";
import store from "../store";

export default function (Vue) {
	Vue.auth = {
		async logIn(loginRequest) {
			const result = await requestSender.send(
				{
					method: "post",
					url:
						process.env.VUE_APP_API_BASE_URL +
						`/api/authentication/login`,
				},
				loginRequest,
			);
			if (result.status)
				store.dispatch("setSession", result.data.accessToken);
			return result;
		},
		async register(registerRequest) {
			const result = await requestSender.send(
				{
					method: "post",
					url:
						process.env.VUE_APP_API_BASE_URL +
						`/api/authentication/register`,
				},
				registerRequest,
			);
			return result;
		},
		async registerByAdmin(registerRequest) {
			const result = await requestSender.send(
				{
					method: "post",
					url:
						process.env.VUE_APP_API_BASE_URL +
						`/api/authentication/registerByAdmin`,
				},
				registerRequest,
			);
			return result;
		},
	};

	Object.defineProperties(Vue.prototype, {
		$auth: {
			get: () => Vue.auth,
		},
	});
}
