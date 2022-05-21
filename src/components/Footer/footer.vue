<template>
	<section class="bg-slate-600">
		<div
			class="max-w-screen-xl px-4 py-12 mx-auto space-y-8 overflow-hidden sm:px-6 lg:px-8"
		>
			<nav class="flex flex-wrap justify-center -mx-5 -my-2">
				<div class="px-5 py-2">
					<a
						href="/"
						class="text-base leading-6 text-gray-500 hover:text-gray-700"
					>
						Strona główna
					</a>
				</div>
				<div class="px-5 py-2">
					<a
						href="/uslugi"
						class="text-base leading-6 text-gray-500 hover:text-gray-700"
					>
						Usługi
					</a>
				</div>
				<div class="px-5 py-2">
					<a
						href="/o-nas"
						class="text-base leading-6 text-gray-500 hover:text-gray-700"
					>
						O nas
					</a>
				</div>
				<div class="px-5 py-2">
					<a
						href="/diagnostyka"
						class="text-base leading-6 text-gray-500 hover:text-gray-700"
					>
						BOT Diagnosta
					</a>
				</div>
				<div class="px-5 py-2">
					<a
						href="/kontakt"
						class="text-base leading-6 text-gray-500 hover:text-gray-700"
					>
						Kontakt
					</a>
				</div>
				<div class="px-5 py-2">
					<a
						href="/wizyta"
						class="text-base leading-6 text-gray-500 hover:text-gray-700"
					>
						Umów się na wizytę
					</a>
				</div>
			</nav>
			<p class="mt-8 text-base leading-6 text-center text-gray-400">
				© 2022 BNS F.H.U | ul. Skłodowskiej-Curie 98, 59-300 Lubin
			</p>
		</div>
	</section>
</template>

<script>
export default {
	name: "Footer",
};
</script>

<style>
.bg-slate-600 {
	display: flex;
	flex-direction: column;
	min-height: 20vh;
}
</style>
