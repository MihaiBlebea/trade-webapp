const { defineConfig } = require('@vue/cli-service')

process.env.VUE_APP_BASE_URL = "http://localhost:8081"
// process.env.VUE_APP_BASE_URL = "https://trading-platform.cap-rover.purpletreetech.com/api/v1"

module.exports = defineConfig({
	transpileDependencies: true
})
