<template>
	<div>
		<h3 class="mb-3">Filled</h3>
		<div class="mb-3" v-for="(order, index) in filled" :key="index">
			
			<h5 class="pointer" v-on:click="navigateToSymbol(order.symbol)">{{ order.symbol }}</h5>
			<div class="d-flex justify-content-between">
				<span class="text-muted">{{ order.direction }} x{{ order.quantity }}</span>
				<div class="pointer text-success" v-on:click="sellOrder(order)">Sell</div>
			</div>

			<hr v-if="index < filled.length - 1" />
		</div>
		<h3 class="mb-3 mt-5">Pending</h3>
		<div v-for="(order, index) in pending" v-bind:key="index">
			
			<h5 class="pointer" v-on:click="navigateToSymbol(order.symbol)">{{ order.symbol }}</h5>
			<div class="d-flex justify-content-between">
				<span class="text-muted">{{ order.direction }} x{{ order.quantity }}</span>
				<div class="pointer text-danger" v-on:click="cancelOrder(order)">Cancel</div>
			</div>
				
			<hr v-if="index < filled.length - 1" />
		</div>
	</div>
</template>

<script>
import { getApiToken } from "./../mixin.js"
import axios from "axios"

export default {
	data() {
		return {
			orders: []
		}
	},
	computed: {
		filled() {
			return this.orders.filter((order)=> order.status === "filled")
		},
		pending() {
			return this.orders.filter((order)=> order.status === "pending")
		}
	},
	methods: {
		getOrders() {
			let apiToken = getApiToken()
			if (apiToken === undefined) {
				console.error("undefined api token")
				return
			}

			let options = {
				headers: {
					"Authorization": "Bearer " + apiToken
				}
			}

			axios.get(process.env.VUE_APP_BASE_URL + "/orders", options).then((result)=> {
				if (result.status !== 200) {
					throw Error("status code is not 200")
				}

				if (result.data.success !== true) {
					throw Error(result.data.error)
				}

				this.orders = result.data.orders
			}).catch((e)=> {
				console.error(e)
			})
		},
		cancelOrder(order) {
			console.log(order)
		},
		sellOrder(order) {
			window.location.href = "/order_form.html?symbol=" + order.symbol + "&direction=sell"
		},
		navigateToSymbol(symbol) {
			this.$router.push("/symbol/" + symbol)
		}
	},
	mounted() {
		this.getOrders()
	}
}
</script>

<style scoped>
.pointer {
	cursor: pointer;
}
</style>
