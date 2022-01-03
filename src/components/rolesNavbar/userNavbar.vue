<template>
	<b-nav-item-dropdown right>
		<template #button-content>
			<em>User</em>
		</template>
		<b-dropdown-item to="/user/profile">
			Profile
		</b-dropdown-item>
		<b-dropdown-item @click="destroySession">
			Sign Out
		</b-dropdown-item>
	</b-nav-item-dropdown>
</template>

<script>
import { mapActions } from "vuex";

export default {
	name: "userNavbar",
	methods: {
		...mapActions(["destroySession"]),
	},
};
</script>

<style></style>
