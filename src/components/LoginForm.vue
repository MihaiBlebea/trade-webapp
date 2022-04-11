<template>
	<div>
		<div class="mb-3">
			<label class="form-label">Username</label>
			<input name="username" type="text" class="form-control" v-model="username">
		</div>
		<div class="mb-3">
			<label class="form-label">Password</label>
			<input name="password" type="password" class="form-control" v-model="password">
		</div>
		<button type="submit" class="btn btn-primary" v-on:click="submit">Login</button>
	</div>
</template>

<script>
import axios from "axios"
import { setApiToken } from "./../mixin.js"

export default {
	data() {
		return {
			username: "",
			password: ""
		}
	},
	methods: {
		submit() {
			if (this.username === "") {
				console.error("username not valid")
				return
			}

			if (this.password === "") {
				console.error("password not valid")
				return
			}

			let payload = {
				username: this.username,
				password: this.password
			}

			axios.post(process.env.VUE_APP_BASE_URL + "/login", payload).then((result)=> {
				if (result.status !== 200) {
					throw Error("status code is not 200")
				}

				if (result.data.success !== true) {
					throw Error(result.data.error)
				}

				setApiToken(result.data.account.api_token)
				this.clear()
				this.$router.push("/discovery")
			}).catch((e)=> {
				console.error(e)
			})
		},
		clear() {
			this.username = ""
			this.password = ""
		}
	}
}
</script>
