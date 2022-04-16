<template>
	<canvas ref="chart" width="400" height="400"></canvas>
</template>

<script>
import axios from "axios"
import { Chart } from "chart.js"


export default {
	props: {
		symbol: {
			type: String,
			required: true
		}
	},
	data() {
		return {
			charts: [],
			chartData: null,
			chartOptions: {
				responsive: true,
				maintainAspectRatio: false,
			},
			ready: false
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
			const ctx = this.$refs["chart"].getContext('2d');
			new Chart(ctx, {
				type: "line",
				data: {
					labels: this.charts.map((chart)=> this.timestampToDate(chart.timestamp)).slice(0, 10),
					datasets: [{
						label: "Share price",
						data: this.charts.map((chart)=> chart.close).slice(0, 10),
						fill: false,
						borderColor: "rgb(75, 192, 192)",
						tension: 0.1,
						borderWidth: 2,
						pointHoverRadius: 20,
						pointHitRadius: 20
						// backgroundColor: [
						// 	'rgba(255, 99, 132, 0.2)',
						// 	'rgba(54, 162, 235, 0.2)',
						// 	'rgba(255, 206, 86, 0.2)',
						// 	'rgba(75, 192, 192, 0.2)',
						// 	'rgba(153, 102, 255, 0.2)',
						// 	'rgba(255, 159, 64, 0.2)'
						// ],
						// borderColor: [
						// 	'rgba(255, 99, 132, 1)',
						// 	'rgba(54, 162, 235, 1)',
						// 	'rgba(255, 206, 86, 1)',
						// 	'rgba(75, 192, 192, 1)',
						// 	'rgba(153, 102, 255, 1)',
						// 	'rgba(255, 159, 64, 1)'
						// ],
						// borderWidth: 1
					}]
				},
				options: {
					responsive: true,
					events: ["click", "touchstart"],
					tooltips: {
						mode: 'index',
						intersect: true
					},
					scales: {
						yAxes: [{
							display: true,
							scaleLabel: {
									display: true,
									labelString: "Price"
							}
						}]
					},
				}
			})
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