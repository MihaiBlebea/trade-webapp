<template>
	<div
		v-on:touchstart="touchHandler"
		v-on:touchend="touchHandler"
	>
		<slot></slot>
	</div>
</template>

<script>
export default {
	data() {
		return {
			touchStartX: null,
			touchEndX: null,
			routes: [
				"/",
				"/discovery",
				"/orders",
				"/portfolio",
				"/account"
			]
		}
	},
	computed: {
		currentIndex() {
			let found = null
			this.routes.forEach((route, index)=> {
				if (route === this.$route.path) {
					found = index
				}
			})

			return found
		}
	},
	methods: {
		touchHandler(ev) {
			if (!["touchstart", "touchend"].includes(ev.type)) {
				return
			}

			if (this.shouldIgnore()) {
				console.log("ignore route")
				return
			}
			
			if (ev.type === "touchstart") {
				this.touchStartX = ev.touches[0].clientX
			}

			if (ev.type === "touchend") {
				this.touchEndX = ev.changedTouches[0].clientX
			}

			if (this.touchStartX === null || this.touchEndX === null) {
				return
			}

			if (this.touchStartX - this.touchEndX < 0) {
				console.log("swipe right")
				this.swipedRight()
			}

			if (this.touchStartX - this.touchEndX > 0) {
				console.log("swipe left")
				this.swipedLeft()
			}

			this.clearTouchEvents()
		},
		shouldIgnore() {
			return !this.routes.includes(this.$route.path)
		},
		swipedRight() {
			let currentIndex = this.currentIndex + 1
			if (currentIndex >= this.routes.length) {
				currentIndex = this.routes.length - currentIndex
			}

			let url = this.routes[currentIndex]

			this.navigateTo(url)
		},
		swipedLeft() {
			let currentIndex = this.currentIndex - 1
			if (currentIndex < 0) {
				currentIndex = this.routes.length + currentIndex
			}

			let url = this.routes[currentIndex]

			this.navigateTo(url)
		},
		clearTouchEvents() {
			this.touchStartX = null
			this.touchEndX = null
		},
		navigateTo(url) {
			this.$router.push(url)
		}
	}
}
</script>