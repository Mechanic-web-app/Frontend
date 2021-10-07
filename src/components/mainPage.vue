<template>
	<div class="center example-nav">
		<vs-navbar
			not-line
			center-collapsed
			target-scroll="#padding-scroll-content"
			v-model="active"
		>
			<template #left>
				<img src="../assets/car-logo.svg" style="width:100px;" alt="" />
			</template>

			<template #right>
				<vs-navbar-item :active="active == 'guide'" id="guide">
					Guide
				</vs-navbar-item>
				<vs-navbar-item :active="active == 'docs'" id="docs">
					Documents
				</vs-navbar-item>
				<vs-navbar-item
					:active="active == 'components'"
					id="components"
				>
					Components
				</vs-navbar-item>
				<vs-navbar-item :active="active == 'license'" id="license">
					license
				</vs-navbar-item>
				<router-link :to="{ name: 'signIn' }">
					<button>Zaloguj się</button>
				</router-link>
				<router-link :to="{ name: 'signUp' }">
					<vs-button border transparent>Zarejestruj się</vs-button>
				</router-link>
			</template>
		</vs-navbar>
		<div class="square">
			<div class="child">
				child 1
			</div>
			<div class="child">
				child 2
			</div>
			<div class="child">
				child 3
			</div>
		</div>
	</div>
</template>

<script>
export default {};
</script>

<style>
.vs-navbar {
	background: rgb(0, 129, 223);
}
</style>
