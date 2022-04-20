<template>
	<div>
		<div v-if="hasFilledOrders" class="mb-5">
			<h3 class="mb-3">Filled</h3>
			<div class="mb-3" v-for="(order, index) in filled" :key="index">
				<OrderItem
					:order="order"
					v-on:nav-to-symbol="navigateToSymbol"
				/>

				<hr v-if="index < filled.length - 1" />
			</div>
		</div>

		<div v-if="hasPendingOrders">
			<h3 class="mb-3">Pending</h3>
			<div v-for="(order, index) in pending" v-bind:key="index">
				<OrderItem 
					:order="order"
					v-on:nav-to-symbol="navigateToSymbol" 
					v-on:cancel="cancelOrder"
				/>
					
				<hr v-if="index < filled.length - 1" />
			</div>
		</div>

		<div v-if="!hasAnyOrders">
			<p class="text-muted text-center">No orders</p>
		</div>
	</div>
</template>

<script>
import { getApiToken } from "./../mixin.js"
import axios from "axios"
import OrderItem from "./OrderItem.vue"

export default {
	components: {
		OrderItem
	},
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
		},
		hasFilledOrders() {
			return this.filled.length > 0
		},
		hasPendingOrders() {
			return this.pending.length > 0
		},
		hasAnyOrders() {
			return this.orders.length > 0
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
