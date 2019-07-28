 function get_group_cpu() {
   $.ajax({
           type:"POST",
           url:"/status/group_cpu_chart",
           dataType:'json',
           beforeSend:function(XMLHttpRequest){
              $('#group_memory').html("<img src='/static/img/timg.gif' />");
            },
            success:function(mydata){
               if(mydata.status=="success"){
                    // 图表配置
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
                                    series: mydata.json_group_cpu_data
                            });
                    }

                    createChart();

                                // 图标配置结束

                           }else if(data.status=="fail"){
                                $('#group_cpu').html('Something wrong！');
                           }
                        }
                   })

}



