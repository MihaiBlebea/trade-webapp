<template>
	<div>
		<div v-if="hasPositions">
			<div class="d-flex justify-content-between mb-2">
				<div>Equity:</div>
				<div><i>{{ fmtAmount(equity) }}</i></div>
			</div>
			<div class="d-flex justify-content-between mb-2">
				<div>Investment:</div>
				<div><i>{{ fmtAmount(investment) }}</i></div>
			</div>
			<div 
				class="d-flex justify-content-between mb-2" 
				v-bind:class="{ 'text-success': isProfit, 'text-danger': !isProfit }"
			>
				<div>{{ diffLabel }}:</div>
				<div><i>{{ fmtAmount(diffValue) }}</i></div>
			</div>
			<hr/>
			<div v-for="(pos, index) in positions" :key="index">
				<PositionItem 
					:position="pos" 
					v-on:nav-to-symbol="navigateToSymbol"
					v-on:sell="sellOrder"
				/>
				<hr v-if="index < positions.length - 1"/>
			</div>
		</div>
		<div v-else>
			<p class="text-muted text-center">No positions</p>
		</div>
	</div>
</template>

<script>
import { getApiToken } from "./../mixin.js"
import axios from "axios"
import PositionItem from "./PositionItem.vue"

export default {
	components: {
		PositionItem
	},
	data() {
		return {
			positions: []
		}
	},
	computed: {
		hasPositions() {
			return this.positions.length > 0
		},
		equity() {
			return this.positions.reduce((total, pos) => total += pos.total_value, 0)
		},
		investment() {
			return this.positions.reduce((total, pos) => total += pos.bought_total_price, 0)
		},
		isProfit() {
			return this.diffValue > 0
		},
		diffLabel() {
			return this.isProfit ? "Profit" : "Loss"
		},
		diffValue() {
			return this.equity - this.investment
		}
	},
	methods: {
		getPortfolio() {
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

			axios.get(process.env.VUE_APP_BASE_URL + "/positions", options).then((result)=> {
				if (result.status !== 200) {
					throw Error("status code is not 200")
				}

				if (result.data.success !== true) {
					throw Error(result.data.error)
				}

				this.positions = result.data.positions
			}).catch((e)=> {
				console.error(e)
			})
		},
		sellOrder(symbol) {
			this.$router.push("/order?symbol=" + symbol + "&direction=sell")
		},
		navigateToSymbol(symbol) {
			this.$router.push("/symbol/" + symbol)
		},
		fmtAmount(amount) {
			let val = "$" + Math.round(amount * 100) / 100
			return amount > 0 ? val : "-" + val
		}
	},
	mounted() {
		this.getPortfolio()
	}
}
</script>
