<template>
	<div class="scrollable">
		<slot></slot>
	</div>
</template>

<style scoped>
.scrollable {
	height: -moz-calc(100vh - 60px);
	height: -webkit-calc(100vh - 60px);
	height: -o-calc(100vh - 60px);
	height: calc(100vh - 60px);
	overflow-y: scroll;
}
</style>