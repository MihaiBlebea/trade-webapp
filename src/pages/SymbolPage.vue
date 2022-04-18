<template>
	<div>
		<PageTitle class="mb-4" :title="symbolTitle" :nav-back="true"/>

		<CenterLayout>
			<div v-if="symbol !== null">

				<div class="mb-3 d-flex justify-content-between align-items-center">
					<div>
						<h4 class="mb-0">{{ symbol.symbol }}</h4>
						<div class="text-muted">{{ symbol.industry }}</div>
					</div>
					<SymbolLogo :symbol="symbol.symbol" />
				</div>

				<div v-if="symbol !== null">
					<StockChart :symbol="symbol.symbol" />
				</div>

				<hr/>

				<div class="mb-4 d-flex justify-content-evenly">
					<button type="button" class="btn btn-primary" v-on:click="placeOrder">
						Sell
					</button>
					<button type="button" class="btn btn-primary" v-on:click="placeOrder">
						Buy
					</button>
				</div>

				<div class="d-flex justify-content-between">
					<p>Beta:</p>
					<p>{{ symbol.market_price }}</p>
				</div>
				<div class="d-flex justify-content-between">
					<p>Book value:</p>
					<p>{{ symbol.market_price }}</p>
				</div>
				<div class="d-flex justify-content-between">
					<p>Quarterly growth:</p>
					<p>{{ symbol.market_price }}</p>
				</div>
				<div class="d-flex justify-content-between">
					<p>Profit margin:</p>
					<p>{{ symbol.market_price }}</p>
				</div>
				<div class="d-flex justify-content-between">
					<p>Total # shares:</p>
					<p>{{ symbol.market_price }}</p>
				</div>
			</div>
		</CenterLayout>
	</div>
</template>

<script>
import CenterLayout from "./../layouts/CenterLayout.vue"
import PageTitle from "./../components/PageTitle.vue"
import SymbolLogo from "./../components/SymbolLogo.vue"
import StockChart from "./../components/StockChart.vue"
import { getApiToken } from "./../mixin.js"
import axios from "axios"

export default {
	components: {
		CenterLayout,
		PageTitle,
		SymbolLogo,
		StockChart
	},
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
		},
		symbolTitle() {
			return this.symbol === null ? "Symbol" : this.symbol.title
		}
	},
	methods: {
		getSymbol(symbol) {
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
		}
	},
	mounted() {
		this.getSymbol(this.name)
	}
}
</script>
