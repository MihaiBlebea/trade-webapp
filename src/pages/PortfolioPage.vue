<template>
	<div>
		<h1 class="mb-4">Portfolio</h1>

		<AccountBalance class="mb-3"/>
		<hr/>
		<PositionList />
	</div>
</template>

<script>
import PositionList from "./../components/PositionList.vue"
import AccountBalance from "./../components/AccountBalance.vue"

export default {
	components: {
		PositionList,
		AccountBalance
	}
}
</script>
