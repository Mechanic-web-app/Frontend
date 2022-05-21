import VueRouter from "vue-router";
import store from "./store";
import addCar from "./views/adminPages/addCar.vue";
import addEmployee from "./views/adminPages/addEmployee.vue";
import addRepair from "./views/adminPages/addRepair.vue";
import adminMenu from "./views/adminPages/adminMenu.vue";
import confirmUser from "./views/adminPages/confirmUser.vue";
import deleteOpinion from "./views/adminPages/deleteOpinion.vue";
import deleteUser from "./views/adminPages/deleteUser.vue";
import aboutUsPage from "./views/Dashboard/aboutUsPage.vue";
import contactPage from "./views/Dashboard/contactPage.vue";
import mainPage from "./views/Dashboard/mainPage.vue";
import makeAppointment from "./views/Dashboard/makeAppointment.vue";
import mechanicBotPage from "./views/Dashboard/mechanicBotPage.vue";
import servicesPage from "./views/Dashboard/servicesPage.vue";
import signInPage from "./views/Dashboard/signInPage.vue";
import signUpPage from "./views/Dashboard/signUpPage.vue";
import employeeAddCar from "./views/employeePages/employeeAddCar.vue";
import employeeAddRepair from "./views/employeePages/employeeAddRepair.vue";
import employeeChat from "./views/employeePages/employeeChat.vue";
import employeeConfirmUser from "./views/employeePages/employeeConfirmUser.vue";
import employeeMenu from "./views/employeePages/employeeMenu.vue";
import userProfile from "./views/userPages/userProfile.vue";

const router = new VueRouter({
	mode: "history",
	routes: [
		{
			path: "/user/profile",
			name: "userProfile",
			component: userProfile,
		},
		{
			path: "/",
			name: "mainPage",
			component: mainPage,
		},
		{
			path: "/o-nas",
			name: "aboutUs",
			component: aboutUsPage,
		},
		{
			path: "/uslugi",
			name: "services",
			component: servicesPage,
		},
		{
			path: "/kontakt",
			name: "contact",
			component: contactPage,
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
			path: "/admin/menu",
			name: "adminMenu",
			component: adminMenu,
		},
		{
			path: "/admin/add-car",
			name: "addCar",
			component: addCar,
		},
		{
			path: "/admin/add-employee",
			name: "addEmployee",
			component: addEmployee,
		},
		{
			path: "/admin/add-repair",
			name: "addRepair",
			component: addRepair,
		},
		{
			path: "/admin/confirm-user",
			name: "confirmUser",
			component: confirmUser,
		},
		{
			path: "/admin/delete-opinion",
			name: "deleteOpinion",
			component: deleteOpinion,
		},
		{
			path: "/admin/delete-user",
			name: "deleteUser",
			component: deleteUser,
		},
		{
			path: "/employee/menu",
			name: "employeeMenu",
			component: employeeMenu,
		},
		{
			path: "/employee/add-car",
			name: "employeeAddCar",
			component: employeeAddCar,
		},
		{
			path: "/employee/add-repair",
			name: "employeeAddRepair",
			component: employeeAddRepair,
		},
		{
			path: "/employee/confirm-user",
			name: "employeeConfirmUser",
			component: employeeConfirmUser,
		},
		{
			path: "/employee/chat",
			name: "employeeChat",
			component: employeeChat,
		},
		{
			path: "/wizyta",
			name: "makeAppointment",
			component: makeAppointment,
		},
		{
			path: "/diagnostyka",
			name: "mechanicBotPage",
			component: mechanicBotPage,
		},
	],
});

router.beforeEach((to, from, next) => {
	store.dispatch("restoreSession");

	next(); //const { isAdmin, isEmployee, is, isLogged, user } = store.getters;
});

export default router;
