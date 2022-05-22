import axios from "axios";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "bootstrap/dist/css/bootstrap.css";
import ElementUI from "element-ui";
import elementLocale from "element-ui/lib/locale/lang/en";
import "element-ui/lib/theme-chalk/index.css";
import moment from "moment";
import Vue from "vue";
import VueAxios from "vue-axios";
import VueCookies from "vue-cookies";
import VueRouter from "vue-router";
import App from "./App.vue";
import cookieHelper from "./helpers/cookieHelper";
import chatHub from "./hubs/chatHub.js";
import "./index.css";
import router from "./router";
import authorizationService from "./services/authorizationService";
import carService from "./services/carService";
import chatRoomService from "./services/chatRoomService.js";
import chatService from "./services/chatService.js";
import repairService from "./services/repairService.js";
import userService from "./services/userService.js";
import store from "./store";
import { uuid }	from "vue-uuid"

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueRouter, ElementUI);
Vue.use(ElementUI, { locale: elementLocale });
Vue.use(VueCookies);
Vue.use(VueAxios, axios);
Vue.use(authorizationService);
Vue.use(userService);
Vue.use(carService);
Vue.use(repairService);
Vue.use(chatService);
Vue.use(chatRoomService);
Vue.use(chatHub);
Vue.use({uuid})

Vue.filter("formatDate", function (value) {
	if (value) {
		return moment(String(value)).format("MM/DD/YYYY hh:mm");
	}
}),
	(Vue.axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL);

Vue.axios.interceptors.request.use(
	(config) => {
		const token = cookieHelper.getSessionCookie();
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error),
);

Vue.axios.interceptors.response.use(
	(response) => response,
	async (error) => {
		let errorResponse = error.response;
		if (!errorResponse) {
			router.push({
				name: "Login",
			});
			errorResponse = {
				data: {
					success: false,
					message: "Connection error",
				},
			};
		}
		Vue.prototype.$notify({
			message: error.response.data.Message,
			timeout: 3000,
			icon: "now-ui-icons ui-1_bell-53",
			horizontalAlign: "right",
			verticalAlign: "top",
			type: "danger",
		});
		return Promise.reject(errorResponse);
	},
);
Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount("#app");
