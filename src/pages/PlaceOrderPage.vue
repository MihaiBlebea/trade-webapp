<template>
	<div>
		<PageTitle class="mb-4" title="Order" :nav-back="true" />

		<CenterLayout>
			<OrderForm />
		</CenterLayout>
	</div>
</template>

<script>
import CenterLayout from "./../layouts/CenterLayout.vue"
import PageTitle from "./../components/PageTitle.vue"
import OrderForm from "./../components/OrderForm.vue"

export default {
	components: {
		CenterLayout,
		PageTitle,
		OrderForm
	}
}
</script>
