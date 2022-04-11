<template>
	<footer class="footer bg-secondary footer-fixed">
		<div class="container">
			<div class="row justify-content-center mb-2">
				<div class="col-12 col-md-6 row">
					<div class="col d-flex justify-content-evenly">
						<router-link to="/">Home</router-link>
						<router-link to="/discovery">Discovery</router-link>
						<router-link to="/orders">Orders</router-link>
						<router-link to="/portfolio">Portfolio</router-link>
						<router-link to="/account">Account</router-link>
					</div>
				</div>
			</div>
		</div>
    </footer>
</template>

<style scoped>
.footer-fixed {
	position: fixed;
	bottom: 0;
	width: 100%;
	height: 60px;
	line-height: 60px;
}
</style>