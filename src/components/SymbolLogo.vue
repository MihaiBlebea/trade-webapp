<template>
	<img class="img-fluid img-thumbnail" :src="logoUrl" />
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
			return "https://universal.hellopublic.com/companyLogos/" + this.symbol + "@2x.png"
		}
	}
}
</script>