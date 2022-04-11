<template>
	<div>
		<h1 class="mb-4">Symbol {{ symbolNameUpper }}</h1>
		<div v-if="symbol !== null">
			<h4 class="mb-3 d-flex justify-content-between">
				<div>{{ symbol.symbol }}</div>
				<div class="text-muted">{{ symbol.title }}</div>
			</h4>
			<hr/>
			<div class="mb-3">
				<p v-for="(d, index) in descriptions" :key="index">{{ d }}</p>
			</div>

			<div class="mb-4 d-flex justify-content-center">
				<button type="button" class="btn btn-primary" v-on:click="placeOrder">
					Place order
				</button>
			</div>

			<div class="d-flex justify-content-between">
				<p>Beta:</p>
				<p>{{ symbol.beta }}</p>
			</div>
			<div class="d-flex justify-content-between">
				<p>Book value:</p>
				<p>{{ symbol.bookValue }}</p>
			</div>
			<div class="d-flex justify-content-between">
				<p>Quarterly growth:</p>
				<p>{{ symbol.earningsQuarterlyGrowth }}</p>
			</div>
			<div class="d-flex justify-content-between">
				<p>Profit margin:</p>
				<p>{{ symbol.profitMargins }}</p>
			</div>
			<div class="d-flex justify-content-between">
				<p>Total # shares:</p>
				<p>{{ symbol.sharesOutstanding }}</p>
			</div>
		</div>
	</div>
</template>

<script>
import axios from "axios"

export default {
	props: ["name"],
	data() {
		return {
			symbol: null,
		}
	},
	computed: {
		descriptions() {
			return this.symbol.longBusinessSummary.split(".").filter((d)=> {
				return d !== ""
			}).map((d)=> {
				return d + "."
			})
		},
		symbolNameUpper() {
			return this.name.toUpperCase()
		}
	},
	methods: {
		getSymbol(symbol) {
			let apiToken = this.getToken()
			if (apiToken === undefined) {
				console.error("undefined api token")
				return
			}

			let options = {
				headers: {
					"Authorization": "Bearer " + this.getToken()
				}
			}

			axios.get(process.env.VUE_APP_BASE_URL + "/symbol?symbol=" + symbol, options).then((result)=> {
				console.log(result.data)
				if (result.status !== 200) {
					throw Error("status code is not 200")
				}

				if (result.data.success !== true) {
					throw Error(result.data.error)
				}

				this.symbol = result.data.symbol
			}).catch((e)=> {
				console.error(e)
			})
		},
		placeOrder() {
			this.$router.push("/order?direction=buy&symbol=" + this.symbol.symbol)
		},
		getToken: ()=> localStorage.getItem("apiToken")
	},
	mounted() {
		this.getSymbol(this.name)
	}
}
</script>
