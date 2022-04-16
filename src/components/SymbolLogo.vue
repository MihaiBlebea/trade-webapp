<template>
	<img class="img-fluid" :src="logoUrl" />
</template>

<script>
export default {
	props: {
		symbol: {
			type: String,
			required: true
		}
	},
	computed: {
		logoUrl() {
			return "https://universal.hellopublic.com/companyLogos/" + this.symbol + "@3x.png"
		}
	}
}
</script>

<style scoped>
.img-fluid {
	max-height: 64px;
	max-width: 64px;
	border-radius: 15px;
}
</style>