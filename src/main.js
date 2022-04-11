import { createApp } from "vue"
import { createRouter, createWebHashHistory } from "vue-router"
import App from "./App.vue"
import HomePage from "./pages/HomePage.vue"
import AccountPage from "./pages/AccountPage.vue"
import DiscoveryPage from "./pages/DiscoveryPage.vue"
import OrdersPage from "./pages/OrdersPage.vue"
import PortfolioPage from "./pages/PortfolioPage.vue"
import SymbolPage from "./pages/SymbolPage.vue"
import PlaceOrderPage from "./pages/PlaceOrderPage.vue"
import LoginPage from "./pages/LoginPage.vue"
import RegisterPage from "./pages/RegisterPage.vue"
import NotFoundPage from "./pages/NotFoundPage.vue"

const routes = [
	{ path: "/", component: HomePage },
	{ path: "/login", component: LoginPage },
	{ path: "/register", component: RegisterPage },
	{ path: "/account", component: AccountPage },
	{ path: "/discovery", component: DiscoveryPage },
	{ path: "/orders", component: OrdersPage },
	{ path: "/portfolio", component: PortfolioPage },
	{ path: "/symbol/:name", component: SymbolPage, props: true},
	{ path: "/order", component: PlaceOrderPage, props: route => ({ symbolQuery: route.query.symbol, directionQuery: route.query.direction })},
	{ path: "/:pathMatch(.*)*", name: "page-not-found", component: NotFoundPage },
]

const router = createRouter({
	history: createWebHashHistory(),
	routes,
})

const app = createApp(App)

app.use(router)

app.mount("#app")