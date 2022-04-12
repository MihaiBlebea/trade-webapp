<template>
	<footer class="footer bg-secondary footer-fixed">
		<div class="container">
			<div class="row justify-content-center mb-2">
				<div class="col-12 col-md-6 row">
					<div class="col d-flex justify-content-evenly">
						<router-link to="/"><i class="fa fa-home"></i></router-link>
						<router-link to="/discovery"><i class="fa fa-globe"></i></router-link>
						<router-link to="/orders"><i class="fa fa-money"></i></router-link>
						<router-link to="/portfolio"><i class="fa fa-suitcase"></i></router-link>
						<router-link to="/account"><i class="fa fa-cogs"></i></router-link>
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

i {
	font-size: 28px;
	vertical-align: middle;
	color: white;
}
</style>