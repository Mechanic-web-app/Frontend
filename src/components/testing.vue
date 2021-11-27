<template>
	<button class="button" @click="generateId()">Generate V1</button>
</template>

<script>
import { uuid } from "vue-uuid";
export default {
	data() {
		return {
			roles: [],
			uuid: uuid.v1(),
		};
	},
	methods: {
		generateId() {
			console.log(this.$uuid.v1());
		},
	},
};
</script>
<style scoped>
.box {
	background-color: rgb(173, 32, 32);
	min-width: 100%;
	min-height: 100px;
}
html {
	margin: 0;
	padding: 0;
}
</style>
