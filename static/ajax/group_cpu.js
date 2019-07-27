 function get_group_cpu() {
var seriesOptions = [],
		seriesCounter = 0,
		names = ['MSFT', 'AAPL', 'GOOG'];
/**
     * Create the chart when all data is loaded
     * @returns {undefined}
     */
function createChart() {
		Highcharts.stockChart('group_cpu', {
				chart: {
						zoomType: null,
						// pinchType: null
				},
				rangeSelector: {
						selected: 4
				},
				yAxis: {
						labels: {
								formatter: function () {
										return (this.value > 0 ? ' + ' : '') + this.value + '%';
								}
						},
						plotLines: [{
								value: 0,
								width: 2,
								color: 'silver'
						}]
				},
				plotOptions: {
						series: {
								compare: 'percent',
								showInNavigator: true
						}
				},
				tooltip: {
						pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
						valueDecimals: 2,
						followTouchMove: false,
						split: true
				},
				series: seriesOptions
		});
}
$.each(names, function (i, name) {
		$.getJSON('https://data.jianshukeji.com/jsonp?filename=json/' + name.toLowerCase() + '-c.json&callback=?',    function (data) {
				seriesOptions[i] = {
						name: name,
						data: data
				};
				// As we're loading the data asynchronously, we don't know what order it will arrive. So
				// we keep a counter and create the chart when all the data is loaded.
				seriesCounter += 1;
				if (seriesCounter === names.length) {
						createChart();
				}
		});
});
}


