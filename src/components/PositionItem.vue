<template>
	<div class="d-flex">
		<SymbolLogo 
			class="me-3 pointer" 
			:symbol="position.symbol" 
			v-on:click="$emit('nav-to-symbol', position.symbol)" 
		/>
		<div class="w-100">
			<h5 class="pointer mb-1" v-on:click="$emit('nav-to-symbol', position.symbol)">
				{{ position.symbol }}
			</h5>
			<div class="d-flex justify-content-between mb-1">
				<span>{{ position.quantity }} shares</span>
				<div class="pointer" v-on:click="$emit('sell', position.symbol)"><strong>Sell</strong></div>
			</div>
			<div class="d-flex justify-content-between">
				<span>{{ fmtAmount(position.bought_total_price) }} bought</span>
				<div>
					{{ fmtAmount(position.total_value) }} value • 
					<span v-if="isProfit" class="text-success">({{ fmtAmount(profit) }})</span>
					<span v-else class="text-danger">({{ fmtAmount(profit) }})</span>
				</div>
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
		position: {
			type: Object,
			required: true
		}
	},
	computed: {
		profit() {
			return this.position.total_value - this.position.bought_total_price
		},
		isProfit() {
			return this.profit > 0
		}
	},
	methods: {
		fmtAmount(amount) {
			let val = "$" + Math.round(amount * 100) / 100
			return amount > 0 ? val : "-" + val
		}
	}
}
</script>

<style scoped>
.pointer {
	cursor: pointer;
}
</style>
