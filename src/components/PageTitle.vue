<template>
	<div class="bg-main">
		<CenterLayout>
			<h1 class="mb-3 mt-5">{{ title }}</h1>
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
		}
	},
	components: {
		CenterLayout
	}
}
</script>


