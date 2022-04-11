<template>
	<div>
		<div class="mb-3">
			<label class="form-label">Username</label>
			<input name="username" type="text" class="form-control" v-model="username">
		</div>
		<div class="mb-3">
			<label class="form-label">Email</label>
			<input name="email" type="email" class="form-control" v-model="email">
		</div>
		<div class="mb-3">
			<label class="form-label">Password</label>
			<input name="password" type="password" class="form-control" v-model="password">
		</div>
		<div class="mb-3">
			<label class="form-label">Confirm password</label>
			<input name="confirm-password" type="password" class="form-control" v-model="confirm">
		</div>
		<button type="submit" class="btn btn-primary" v-on:click="submit">Register</button>
	</div>
</template>

<script>
import axios from "axios"
import { setApiToken } from "./../mixin.js"

export default {
	data() {
		return {
			username: "",
			email: "",
			password: "",
			confirm: ""
		}
	},
	methods: {
		submit() {
			if (this.username === "") {
				console.error("username not valid")
				return
			}

			if (this.email === "") {
				console.error("username not valid")
				return
			}

			if (this.password === "") {
				console.error("password not valid")
				return
			}

			if (this.confirm === "") {
				console.error("confirm not valid")
				return
			}

			if (this.password !== this.confirm) {
				console.error("passowrd not matching confirm")
				return
			}

			let payload = {
				username: this.username,
				email: this.email,
				password: this.password
			}

			axios.post(process.env.VUE_APP_BASE_URL + "/register", payload).then((result)=> {
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
			this.email = ""
			this.password = ""
			this.confirm = ""
		}
	}
}
</script>
