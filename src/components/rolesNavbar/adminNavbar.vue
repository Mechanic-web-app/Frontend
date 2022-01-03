<template>
	<b-nav-item-dropdown right>
		<template #button-content>
			<em>Admin</em>
		</template>
		<b-dropdown-item to="/admin/menu">
			Admin menu
		</b-dropdown-item>
		<b-dropdown-item @click="destroySession">
			Sign Out
		</b-dropdown-item>
	</b-nav-item-dropdown>
</template>

<script>
import { mapActions } from "vuex";

export default {
	name: "adminNavbar",
	methods: {
		...mapActions(["destroySession"]),
	},
};
</script>

<style></style>
