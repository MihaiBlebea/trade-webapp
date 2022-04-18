<template>
	<div>
		<PageTitle class="mb-4" title="Register" />

		<CenterLayout>
			<RegisterForm />
		</CenterLayout>
	</div>
</template>

<script>
import CenterLayout from "./../layouts/CenterLayout.vue"
import PageTitle from "./../components/PageTitle.vue"
import RegisterForm from "./../components/RegisterForm.vue"

export default {
	components: {
		CenterLayout,
		PageTitle,
		RegisterForm
	}
}
</script>
