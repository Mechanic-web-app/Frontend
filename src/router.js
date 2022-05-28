import VueRouter from "vue-router";
import store from "./store";
import addCar from "./views/adminPages/addCar.vue";
import addEmployee from "./views/adminPages/addEmployee.vue";
import addRepair from "./views/adminPages/addRepair.vue";
import adminMenu from "./views/adminPages/adminMenu.vue";
import confirmUser from "./views/adminPages/confirmUser.vue";
import deleteCar from "./views/adminPages/deleteCar.vue";
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
import haveNotPermission from "./views/haveNotPermission.vue";
import userProfile from "./views/userPages/userProfile.vue";

const routes = [
	{
		path: "/",
		name: "mainPage",
		component: mainPage,
	},
	{
		path: "/have-not-permission",
		name: "haveNotPermission",
		component: haveNotPermission,
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
		path: "/wizyta",
		name: "makeAppointment",
		component: makeAppointment,
	},
	{
		path: "/diagnostyka",
		name: "mechanicBotPage",
		component: mechanicBotPage,
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
		meta: {
			Admin: true,
		},
		name: "adminMenu",
		component: adminMenu,
	},
	{
		path: "/admin/add-car",
		meta: {
			Admin: true,
		},
		name: "addCar",
		component: addCar,
	},
	{
		path: "/admin/add-employee",
		meta: {
			Admin: true,
		},
		name: "addEmployee",
		component: addEmployee,
	},
	{
		path: "/admin/add-repair",
		meta: {
			Admin: true,
		},
		name: "addRepair",
		component: addRepair,
	},
	{
		path: "/admin/confirm-user",
		meta: {
			Admin: true,
		},
		name: "confirmUser",
		component: confirmUser,
	},
	{
		path: "/admin/delete-opinion",
		meta: {
			Admin: true,
		},
		name: "deleteOpinion",
		component: deleteOpinion,
	},
	{
		path: "/admin/delete-user",
		meta: {
			Admin: true,
		},
		name: "deleteUser",
		component: deleteUser,
	},
	{
		path: "/admin/delete-car",
		meta: {
			Admin: true,
		},
		name: "deleteCar",
		component: deleteCar,
	},
	{
		path: "/user/profile",
		meta: {
			User: true,
		},
		name: "userProfile",
		component: userProfile,
	},
	{
		path: "/employee/menu",
		meta: {
			Employee: true,
		},
		name: "employeeMenu",
		component: employeeMenu,
	},
	{
		path: "/employee/add-car",
		meta: {
			Employee: true,
		},
		name: "employeeAddCar",
		component: employeeAddCar,
	},
	{
		path: "/employee/add-repair",
		meta: {
			Employee: true,
		},
		name: "employeeAddRepair",
		component: employeeAddRepair,
	},
	{
		path: "/employee/confirm-user",
		meta: {
			Employee: true,
		},
		name: "employeeConfirmUser",
		component: employeeConfirmUser,
	},
	{
		path: "/employee/chat",
		meta: {
			Employee: true,
		},
		name: "employeeChat",
		component: employeeChat,
	},
];
const router = new VueRouter({
	mode: "history",
	linkActiveClass: "active",
	routes,
});

router.beforeEach((to, from, next) => {
	store.dispatch("restoreSession");

	const { isAdmin, isUser, isEmployee } = store.getters;
	if (to.meta.Admin && !isAdmin) {
		next({ name: "haveNotPermission" });
	} else if (to.meta.Employee && !isEmployee) {
		next({ name: "haveNotPermission" });
	} else if (to.meta.User && !isUser) {
		next({ name: "haveNotPermission" });
	} else {
		next();
	}
});

export default router;
