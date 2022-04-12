<template>
	<div>
		<div class="mb-3">
			<label class="form-label">Email</label>
			<input 
				name="email" 
				type="email" 
				class="form-control"
				v-bind:class="{'is-invalid': emailErr}"
				v-model="email"
			>
			<div class="invalid-feedback">
				Invalid email format.
			</div>
		</div>
		<div class="mb-3">
			<label class="form-label">Password</label>
			<input 
				name="password" 
				type="password" 
				class="form-control"
				v-bind:class="{'is-invalid': passwordErr}" 
				v-model="password"
			>
			<div class="invalid-feedback">
				Invalid password.
			</div>
		</div>
		<div class="d-flex justify-content-between align-items-center">
			<button 
				type="submit" 
				class="btn btn-primary" 
				v-bind:disabled="processing" 
				v-on:click="submit"
			>
				{{ buttonLabel }}
			</button>
			<router-link to="/register">Register</router-link>
		</div>
	</div>
</template>

<script>
import axios from "axios"
import { setApiToken } from "./../mixin.js"

export default {
	data() {
		return {
			email: "",
			emailErr: false,
			password: "",
			passwordErr: false,
			processing: false
		}
	},
	computed: {
		buttonLabel() {
			return this.processing ? "Processing" : "Login"
		}
	},
	methods: {
		submit() {
			this.emailErr = false
			this.passwordErr = false
			
			if (this.email === "") {
				console.error("email not valid")
				this.emailErr = true
				return
			}

			if (this.password === "") {
				console.error("password not valid")
				this.passwordErr = true
				return
			}

			let payload = {
				email: this.email,
				password: this.password
			}

			this.toggleProcessing()

			axios.post(process.env.VUE_APP_BASE_URL + "/login", payload).then((result)=> {
				if (result.status !== 200) {
					throw Error("status code is not 200")
				}

				if (result.data.success !== true) {
					throw Error(result.data.error)
				}

				setApiToken(result.data.account.api_token)
				this.clear()
				this.toggleProcessing()
				this.$router.push("/discovery")
			}).catch((e)=> {
				console.error(e)
				this.emailErr = true
				this.passwordErr = true
				this.toggleProcessing()
			})
		},
		clear() {
			this.email = ""
			this.password = ""
			this.emailErr = false
			this.passwordErr = false
		},
		toggleProcessing() {
			this.processing = !this.processing
		}
	}
}
</script>
