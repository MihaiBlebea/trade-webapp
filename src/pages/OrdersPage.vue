<template>
	<div>
		<h1 class="mb-4">Orders</h1>

		<OrderList />
	</div>
</template>

<script>
import OrderList from "./../components/OrderList.vue"

export default {
	components: {
		OrderList
	}
}
</script>
