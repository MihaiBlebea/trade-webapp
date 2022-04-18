<template>
	<canvas ref="chart"></canvas>
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
			const ctx = this.$refs["chart"].getContext("2d")
			new Chart(ctx, {
				type: "line",
				data: {
					labels: this.charts.map((chart)=> this.timestampToDate(chart.timestamp)).slice(0, 10),
					datasets: [{
						label: "Price",
						data: this.charts.map((chart)=> chart.close).slice(0, 10),
						fill: false,
						borderColor: "rgb(75, 192, 192)",
						tension: 0.1,
						borderWidth: 2,
						pointHoverRadius: 20,
						pointHitRadius: 20,
					}]
				},
				options: {
					responsive: true,
					events: ["click", "touchstart"],
					tooltips: {
						mode: "index",
						intersect: false
					},
					scales: {
						y: {
							ticks: {
								callback: function(val, index) {
									// Hide every 2nd tick label
									return index % 2 === 0 ? this.getLabelForValue(val) : '';
								},
								color: 'red'
							}
						},
						yAxes: [{
							display: true,
						}],
						xAxes: [{
							display: false,
						}]
					},
					plugins: {
						tooltip: {
							callbacks: {
								title: function () {
									return "ceva"
								},
								label: function (tooltipItem, data) {
									console.log(data)
									return "cev"
								},
								footer: function () {
									return "cfff"
								}
							},
							enabled: false
						}
					}
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