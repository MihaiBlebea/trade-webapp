<template>
	<div class="position-relative">
		<input 
			type="text" 
			placeholder="search symbol" 
			class="form-control" 
			v-model="symbol" 
			v-on:blur="clear" 
			v-on:focus="search"
		>
		<div class="card mb-2 position-absolute w-100" v-if="results.length > 0">
			<div class="card-body" style="max-height: 200px; overflow: auto;">
				<div
					class="select"
					v-for="(res, index) in results"
					v-bind:key="index"
					style="cursor: pointer;" 
					v-on:click="navigate" 
					v-on:mouseover="select(res.symbol)"
					v-on:mouseleave="unselect(res.symbol)"
				>
					<div class="d-flex justify-content-between">
						{{ res.symbol }}
						<span class="text-muted">{{ res.title }}</span>
					</div>
					<hr v-if="index < results.length - 1"/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from "axios"

export default {
	data() {
		return {
			symbol: "",
			results: [],
			selected: null
		}
	},
	watch: {
		symbol(val) {
			if (val.length < 2) {
				this.results = []
				return
			}

			this.search()
		}
	},
	methods: {
		select(symbol) {
			this.selected = symbol
		},
		unselect(symbol) {
			if (this.selected === symbol) {
				this.selected = null
			}
		},
		navigate() {
			this.symbol = ""
			this.$router.push("/symbol/" + this.selected)
		},
		clear() {
			if (this.selected !== null) {
				this.navigate()
			}
			this.results = []
		},
		search() {
			let apiToken = this.getToken()
			if (apiToken === undefined) {
				console.error("undefined api token")
				return
			}

			if (this.symbol === "") {
				return
			}

			let options = {
				headers: {
					"Authorization": "Bearer " + this.getToken()
				}
			}

			axios.get(process.env.VUE_APP_BASE_URL + "/symbols?search=" + this.symbol, options).then((result)=> {
				console.log(result.data)
				if (result.status !== 200) {
					throw Error("status code is not 200")
				}

				if (result.data.success !== true) {
					throw Error(result.data.error)
				}

				this.results = result.data.symbols
			}).catch((e)=> {
				console.error(e)
			})
		},
		getToken: ()=> localStorage.getItem("apiToken")
	}
}
</script>
