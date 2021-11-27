import Vue from "vue";
import VueRouter from "vue-router";
import mainPage from "./components/mainPage.vue";
import signInPage from "./components/signInPage.vue";
import signUpPage from "./components/signUpPage.vue";
import testing from "./components/testing.vue";
Vue.use(VueRouter);

export default new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes: [
		{
			path: "/",
			name: "mainPage",
			component: mainPage,
		},
		{
			path: "/sign-in",
			name: "signIn",
			component: signInPage,
		},
		{
			path: "/sign-up",
			name: "signUp",
			component: signUpPage,
		},
		{
			path: "/testing",
			name: "testing",
			component: testing,
		},
	],
});
