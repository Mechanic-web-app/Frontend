import Vue from "vue";
import Vuex from "vuex";
import cookieHelper from "../helpers/cookieHelper";
import parseJwt from "../helpers/parseJwt";
import router from "../router";
Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		user: null,
	},
	getters: {
		user: (state) => state.user,
		isLogged: (state) => !!state.user,
		isAdmin: (state) => !!state.user && state.user.Role === "Admin",
		isEmployee: (state) => !!state.user && state.user.Role === "Employee",
		isUser: (state) => !!state.user && state.user.Role === "User",
		userName: (state) => state.user.Name,
		userLastname: (state) => state.user.Lastname,
		userId: (state) => state.user.User_id,
		userRole: (state) => state.user.Role,
		userPhone: (state) => state.user.Phone_number,
		userEmail: (state) => state.user.Email,
	},
	mutations: {
		storeUser(state, user) {
			state.user = user;
		},
		storeFullname(state, fullname) {
			state.user.Fullname = fullname;
		},
	},
	actions: {
		setSession({ commit }, token) {
			commit("storeUser", parseJwt(token));
			cookieHelper.setSessionCookie(token);
		},
		setFullName({ commit }, fullname) {
			commit("storeFullname", fullname);
		},
		restoreSession({ dispatch, state }) {
			if (cookieHelper.hasSessionCookie() && state.user === null) {
				dispatch("setSession", cookieHelper.getSessionCookie());
			}
		},
		destroySession({ commit }) {
			commit("storeUser", null);
			cookieHelper.deleteSessionCookie();
			router.push({ name: "mainPage" });
		},
	},
});
