<template>
	<div>
		<PageTitle class="mb-4" title="Orders" />

		<CenterLayout>
			<OrderList />
		</CenterLayout>
	</div>
</template>

<script>
import CenterLayout from "./../layouts/CenterLayout.vue"
import PageTitle from "./../components/PageTitle.vue"
import OrderList from "./../components/OrderList.vue"

export default {
	components: {
		CenterLayout,
		PageTitle,
		OrderList
	}
}
</script>
