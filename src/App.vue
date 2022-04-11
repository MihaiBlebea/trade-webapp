<template>
	<div>
		<ScrollContainer>
			<div class="container pt-5">
				<div class="row justify-content-center mb-2">
					<div class="col-12 col-md-6 row">
						<div class="col">
							<router-view></router-view>
						</div>
					</div>
				</div>
			</div>
		</ScrollContainer>
		<FixedFooter />
	</div>
</template>

<script>
import { checkApiToken } from "./mixin.js"
import ScrollContainer from "./components/ScrollContainer.vue"
import FixedFooter from "./components/FixedFooter.vue"

export default {
	name: "App",
	components: {
		ScrollContainer,
		FixedFooter
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
		}
	},
	mounted() {
		this.auth(this.$route)
	},
}
</script>
