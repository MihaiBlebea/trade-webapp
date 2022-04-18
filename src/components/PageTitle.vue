<template>
	<div class="bg-main">
		<CenterLayout>
			<div 
				v-if="navBack" 
				class="pointer" 
				v-bind:class="{'mt-3': navBack, 'mb-1': navBack}"
				v-on:click="back"
			>
				<i class="fa fa-arrow-left" aria-hidden="true"></i>
				<span class="ms-1">Back</span>
			</div>
			<h1 class="mb-3" v-bind:class="{'mt-5': !navBack}">{{ title }}</h1>
		</CenterLayout>
	</div>
</template>

<script>
import CenterLayout from "./../layouts/CenterLayout.vue"

export default {
	props: {
		title: {
			type: String,
			required: true
		},
		navBack: {
			type: Boolean,
			required: false,
			default: false
		}
	},
	components: {
		CenterLayout
	},
	methods: {
		back() {
			this.$router.back()
		}
	}
}
</script>

<style scoped>
.pointer {
	cursor: pointer;
}

.pointer:hover {
	color: black;
	transition-duration: 0.5s;
}
</style>


