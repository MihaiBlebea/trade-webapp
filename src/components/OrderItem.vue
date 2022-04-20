<template>
	<div class="d-flex">
		<SymbolLogo 
			class="me-3" 
			:symbol="order.symbol" 
			v-on:click="$emit('nav-to-symbol', order.symbol)"
		/>
		<div class="w-100">
			<h5 class="pointer" v-on:click="$emit('nav-to-symbol', order.symbol)">{{ order.title }}</h5>
			<div class="d-flex justify-content-between">
				<span class="text-muted">{{ order.direction }} x{{ order.quantity }}</span>
				<div 
					class="pointer text-danger"
					v-if="order.status !== 'filled'"
					v-on:click="$emit('cancel', order.id)"
				>Cancel</div>
			</div>
		</div>
	</div>
</template>

<script>
import SymbolLogo from "./SymbolLogo.vue"

export default {
	components: {
		SymbolLogo
	},
	props: {
		order: {
			type: Object,
			required: true
		}
	},
	mounted() {
		console.log(this.order)
	}
}
</script>