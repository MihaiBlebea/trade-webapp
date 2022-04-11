<template>
	<div v-for="(pos, index) in positions" :key="index">
		<h5 class="pointer" v-on:click="navigateToSymbol(pos.symbol)">
			{{ pos.symbol }}
		</h5>
		<div class="d-flex justify-content-between">
			<span>{{ pos.quantity }} shares</span>
			<div class="pointer text-success" v-on:click="sellOrder(pos.symbol)">Sell</div>
		</div>
		<hr v-if="index < positions.length - 1"/>
	</div>
</template>

<script>
import axios from "axios"

export default {
	data() {
		return {
			positions: []
		}
	},
	methods: {
		getPortfolio() {
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
			this.$router.push("/order/" + symbol)
		},
		navigateToSymbol(symbol) {
			this.$router.push("/symbol/" + symbol)
		},
		getToken: ()=> localStorage.getItem("apiToken")
	},
	mounted() {
		this.getPortfolio()
	}
}
</script>

<style scoped>
.pointer {
	cursor: pointer;
}
</style>
