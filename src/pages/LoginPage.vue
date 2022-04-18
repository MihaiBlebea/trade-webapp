<template>
	<div>
		<PageTitle class="mb-4" title="Login" />

		<CenterLayout>
			<LoginForm />
		</CenterLayout>
	</div>
</template>

<script>
import CenterLayout from "./../layouts/CenterLayout.vue"
import PageTitle from "./../components/PageTitle.vue"
import LoginForm from "./../components/LoginForm.vue"

export default {
	components: {
		CenterLayout,
		PageTitle,
		LoginForm
	}
}
</script>
