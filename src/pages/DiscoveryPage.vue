<template>
	<div>
		<PageTitle class="mb-4" title="Discovery" />

		<CenterLayout>
			<SymbolSearch />
		</CenterLayout>
	</div>
</template>

<script>
import CenterLayout from "./../layouts/CenterLayout.vue"
import PageTitle from "./../components/PageTitle.vue"
import SymbolSearch from "./../components/SymbolSearch.vue"

export default {
	components: {
		CenterLayout,
		PageTitle,
		SymbolSearch
	}
}
</script>
