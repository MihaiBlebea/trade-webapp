<template>
	<div>
		<SwipeNavigation>
			<ScrollContainer>
				<router-view></router-view>
			</ScrollContainer>
			<FixedFooter />
		</SwipeNavigation>
	</div>
</template>

<script>
import { checkApiToken } from "./mixin.js"
import ScrollContainer from "./components/ScrollContainer.vue"
import FixedFooter from "./components/FixedFooter.vue"
import SwipeNavigation from "./components/SwipeNavigation.vue"

export default {
	name: "App",
	components: {
		ScrollContainer,
		FixedFooter,
		SwipeNavigation
	},
	data() {
		return {}
	},
	watch:{
		$route (to) {
			this.auth(to)
		}
	},
	methods: {
		auth(to) {
			if (to.path === "/login" 
				|| to.path === "/register" 
				|| to.name === "page-not-found") {

				return
			}
			if (checkApiToken() === false) {
				this.$router.push("/login")
			}
		},
	},
	mounted() {
		this.auth(this.$route)
	},
}
</script>
