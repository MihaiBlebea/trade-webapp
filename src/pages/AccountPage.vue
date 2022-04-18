<template>
	<div>
		<PageTitle class="mb-4" title="Account" />

		<CenterLayout>
			<AccountBalance class="mb-3" />
			<hr/>
			<button type="button" class="btn btn-primary" v-on:click="signOut">
				Sign out
			</button>
		</CenterLayout>
	</div>
</template>

<script>
import { clearApiToken } from "./../mixin.js"
import CenterLayout from "./../layouts/CenterLayout.vue"
import PageTitle from "./../components/PageTitle.vue"
import AccountBalance from "./../components/AccountBalance.vue"

export default {
	components: {
		CenterLayout,
		AccountBalance,
		PageTitle
	},
	methods: {
		signOut() {
			clearApiToken()
			this.$router.push("/login")
		}
	}
}
</script>
