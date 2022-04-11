<template>
	<div>
		<h1 class="mb-4">Order</h1>

		<OrderForm />
	</div>
</template>

<script>
import OrderForm from "../components/OrderForm.vue"

export default {
	components: {
		OrderForm
	}
}
</script>
