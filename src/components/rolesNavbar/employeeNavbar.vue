<template>
	<b-nav-item-dropdown right>
		<template #button-content>
			<em>Employee</em>
		</template>
		<b-dropdown-item to="/employee/menu">
			Employee menu
		</b-dropdown-item>
		<b-dropdown-item @click="destroySession">
			Sign Out
		</b-dropdown-item>
	</b-nav-item-dropdown>
</template>

<script>
import { mapActions } from "vuex";

export default {
	name: "employeeNavbar",
	methods: {
		...mapActions(["destroySession"]),
	},
};
</script>

<style></style>
