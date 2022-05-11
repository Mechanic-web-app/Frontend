<template>
	<div>
		<top-navbar></top-navbar>
		<div style="background: white">WITAJ NA STRONIE WARSZTATU</div>
	</div>
</template>
<script>
import topNavbar from "../../components/Navbar/topNavbar.vue";
export default {
	components: {
		topNavbar,
	},
};
</script>

<style>
.nav {
	min-width: 100%;
}
* {
	padding: 0;
	margin: 0;
}
</style>
