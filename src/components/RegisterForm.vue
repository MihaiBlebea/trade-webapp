<template>
	<div>
		<div class="mb-3">
			<label class="form-label">Username</label>
			<input 
				name="username" 
				type="text" 
				class="form-control"
				v-bind:class="{'is-invalid': usernameErr}"
				v-model="username"
			>
			<div class="invalid-feedback">
				Invalid username.
			</div>
		</div>
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
		<div class="mb-3">
			<label class="form-label">Confirm password</label>
			<input 
				name="confirm-password" 
				type="password" 
				class="form-control"
				v-bind:class="{'is-invalid': confirmErr}"
				v-model="confirm">
			<div class="invalid-feedback">
				Password does not match.
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
			<router-link to="/login">Login</router-link>
		</div>
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
			confirm: "",
			usernameErr: false,
			emailErr: false,
			passwordErr: false,
			confirmErr: false,
			processing: false
		}
	},
	computed: {
		buttonLabel() {
			return this.processing ? "Processing" : "Register"
		}
	},
	methods: {
		submit() {
			this.clearErrors()

			if (this.username === "") {
				console.error("username not valid")
				this.usernameErr = true
				return
			}

			if (this.email === "") {
				console.error("username not valid")
				this.emailErr = true
				return
			}

			if (this.password === "") {
				console.error("password not valid")
				this.passwordErr = true
				return
			}

			if (this.confirm === "") {
				console.error("confirm not valid")
				this.confirmErr = true
				return
			}

			if (this.password !== this.confirm) {
				console.error("passowrd not matching confirm")
				this.passwordErr = true
				this.confirmErr = true
				return
			}

			let payload = {
				username: this.username,
				email: this.email,
				password: this.password
			}

			this.toggleProcessing()

			axios.post(process.env.VUE_APP_BASE_URL + "/register", payload).then((result)=> {
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
				this.toggleProcessing()
			})
		},
		clear() {
			this.username = ""
			this.email = ""
			this.password = ""
			this.confirm = ""

			this.clearErrors()
		},
		clearErrors() {
			this.usernameErr = false
			this.emailErr = false
			this.passwordErr = false
			this.confirmErr = false
		},
		toggleProcessing() {
			this.processing = !this.processing
		}
	}
}
</script>
