<template>
	<footer class="footer bg-secondary footer-fixed">
		<CenterLayout>
			<div class="d-flex justify-content-between">
				<router-link to="/"><i class="fa fa-home" v-bind:class="{'active': isActive('/')}"></i></router-link>
				<router-link to="/discovery"><i class="fa fa-globe" v-bind:class="{'active': isActive('/discovery')}"></i></router-link>
				<router-link to="/orders"><i class="fa fa-money" v-bind:class="{'active': isActive('/orders')}"></i></router-link>
				<router-link to="/portfolio"><i class="fa fa-suitcase" v-bind:class="{'active': isActive('/portfolio')}"></i></router-link>
				<router-link to="/account"><i class="fa fa-cogs" v-bind:class="{'active': isActive('/account')}"></i></router-link>
			</div>
		</CenterLayout>
    </footer>
</template>

<script>
import CenterLayout from "./../layouts/CenterLayout.vue"

export default {
	components: {
		CenterLayout
	},
	data() {
		return {

		}
	},
	methods: {
		isActive(url) {
			return this.$route.path === url
		}
	}
}
</script>

<style scoped>
.footer-fixed {
	position: fixed;
	bottom: 0;
	width: 100%;
	height: 60px;
	line-height: 60px;
}

i {
	font-size: 28px;
	vertical-align: middle;
	color: white;
}

.active {
	color: rgb(246, 18, 197);
}
</style>