<template>
	<div v-if="isReady">
		<div class="d-flex justify-content-between mb-2">
			<div>Balance:</div>
			<div><i>${{ account.balance - account.pending_balance }}</i></div>
		</div>
		<div class="d-flex justify-content-between">
			<div>Pending balance:</div>
			<div><i>${{ account.pending_balance }}</i></div>
		</div>
	</div>
</template>

<script>
import { getApiToken } from "./../mixin.js"
import axios from "axios"

export default {
	data() {
		return {
			account: null,
		}
	},
	computed: {
		isReady() {
			return this.account !== null
		}
	},
	methods: {
		getAccount() {
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

			axios.get(process.env.VUE_APP_BASE_URL + "/account", options).then((result)=> {
				console.log(result.data)
				if (result.status !== 200) {
					throw Error("status code is not 200")
				}

				if (result.data.success !== true) {
					throw Error(result.data.error)
				}

				this.account = result.data.account
			}).catch((e)=> {
				console.error(e)
			})
		}
	},
	mounted() {
		this.getAccount()
	}
}
</script>
