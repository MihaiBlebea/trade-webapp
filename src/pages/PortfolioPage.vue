<template>
	<div>
		<PageTitle class="mb-4" title="Portfolio" />

		<CenterLayout>
			<AccountBalance class="mb-3"/>
			<hr/>
			<PositionList />
		</CenterLayout>
	</div>
</template>

<script>
import CenterLayout from "./../layouts/CenterLayout.vue"
import PositionList from "./../components/PositionList.vue"
import AccountBalance from "./../components/AccountBalance.vue"
import PageTitle from "./../components/PageTitle.vue"

export default {
	components: {
		CenterLayout,
		PositionList,
		AccountBalance,
		PageTitle
	}
}
</script>
