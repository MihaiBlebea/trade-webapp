<template>
	<div>
		<h1 class="mb-4">Account</h1>

		<AccountBalance class="mb-3" />
		<hr/>
		<button type="button" class="btn btn-primary" v-on:click="signOut">
			Sign out
		</button>

	</div>
</template>

<script>
import { clearApiToken } from "./../mixin.js"
import AccountBalance from "./../components/AccountBalance.vue"

export default {
	components: {
		AccountBalance
	},
	methods: {
		signOut() {
			clearApiToken()
			this.$router.push("/login")
		}
	}
}
</script>
