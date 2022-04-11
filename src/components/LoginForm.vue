<template>
	<div>
		<div class="mb-3">
			<label class="form-label">Email</label>
			<input name="email" type="email" class="form-control" v-model="email">
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
			email: "",
			password: ""
		}
	},
	methods: {
		submit() {
			if (this.email === "") {
				console.error("email not valid")
				return
			}

			if (this.password === "") {
				console.error("password not valid")
				return
			}

			let payload = {
				email: this.email,
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
			this.email = ""
			this.password = ""
		}
	}
}
</script>
