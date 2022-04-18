<template>
	<div>
		<PageTitle class="mb-4" title="Home" />

		<CenterLayout>
			<p class="text-muted text-center">This is the home page</p>
		</CenterLayout>
	</div>
</template>

<script>
import CenterLayout from "./../layouts/CenterLayout.vue"
import PageTitle from "./../components/PageTitle.vue"

export default {
	components: {
		CenterLayout,
		PageTitle
	}
}
</script>
