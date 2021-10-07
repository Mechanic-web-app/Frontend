import ElementUI from "element-ui";
import elementLocale from "element-ui/lib/locale/lang/en";
import "element-ui/lib/theme-chalk/index.css";
import Vue from "vue";
import VueRouter from "vue-router";
import Vuesax from "vuesax";
import "vuesax/dist/vuesax.css";
import App from "./App.vue";
import router from "./router";

Vue.use(VueRouter, ElementUI);
Vue.use(ElementUI, { locale: elementLocale });
Vue.use(Vuesax);

Vue.config.productionTip = false;

new Vue({
	router,
	render: (h) => h(App),
}).$mount("#app");
