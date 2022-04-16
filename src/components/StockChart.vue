<template>
	<div>
		<div ref="chart"></div>
	</div>
</template>

<script>
import axios from "axios"
import { createChart } from "lightweight-charts"

export default {
	props: {
		symbol: {
			type: String,
			required: true
		}
	},
	data() {
		return {
			charts: []
		}
	},
	methods: {
		getCharts() {
			// let apiToken = getApiToken()
			// if (apiToken === undefined) {
			// 	console.error("undefined api token")
			// 	return
			// }

			// let options = {
			// 	headers: {
			// 		"Authorization": "Bearer " + apiToken
			// 	}
			// }

			axios.get(process.env.VUE_APP_BASE_URL + "/chart?symbol=" + this.symbol).then((result)=> {
				if (result.status !== 200) {
					throw Error("status code is not 200")
				}

				if (result.data.success !== true) {
					throw Error(result.data.error)
				}

				this.charts = result.data.chart
				this.renderChart()
			}).catch((e)=> {
				console.error(e)
			})
		},
		renderChart() {
			let chart = createChart(this.$refs["chart"])
			let candlestickSeries = chart.addCandlestickSeries()
			candlestickSeries.setData(this.charts.map((chart)=> {
				return {
					open: chart.open,
					close: chart.close,
					high: chart.high,
					low: chart.low,
					time: this.timestampToDate(chart.timestamp)
				}
			}))
		},
		timestampToDate(timestamp) {
			let date = new Date(timestamp * 1000)
			let year = date.getFullYear()
			let month = date.getMonth()
			if (month < 10) {
				month = "0" + month
			}
			let day = date.getDate()
			if (day < 10) {
				day = "0" + day
			}

			return year + "-" + month + "-" + day
		}
	},
	mounted() {
		this.getCharts()
	}
}
</script>