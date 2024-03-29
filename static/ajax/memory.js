 function get_memory() {
   $.ajax({
           type:"POST",
           url:"/status/memory_chart",
           dataType:'json',
//            data: {
//                time: new Date().getTime(),
//                period: '60',
//            },

            beforeSend:function(XMLHttpRequest){
              $('#Memory').html("<img src='/static/img/timg.gif' />");
            },
            success:function(data){
               if(data.status=="success"){
                    // 图表配置
                    var chart_bar = Highcharts.chart('Memory',{
                        chart: {
                            zoomType: 'x'
                        },
                        title: {
                            text: ''
                        },
                        subtitle: {
                            text: ''
                        },
                        xAxis: {
                            type: 'datetime',
                            dateTimeLabelFormats: {
//                                millisecond: '%H:%M:%S.%L',
                                millisecond: '%m-%d %H:%M',
                                second: '%H:%M:%S',
                                minute: '%H:%M',
                                hour: '%H:%M',
                                day: '%m-%d',
                                week: '%m-%d',
                                month: '%Y-%m',
                                year: '%Y'
                            }
                        },
                        tooltip: {
                            dateTimeLabelFormats: {
                                millisecond: '%m-%d %H:%M',
                                second: '%m-%d %H:%M',
                                minute: '%H:%M',
                                hour: '%H:%M',
                                day: '%Y-%m-%d',
                                week: '%m-%d',
                                month: '%Y-%m',
                                year: '%Y'
                            }
                        },
                        yAxis: {
                            title: {
                                text: '集群总体内存使用率 %'
                            }
                        },
                        legend: {
                            enabled: false
                        },
                        plotOptions: {
                            area: {
                                fillColor: {
                                    linearGradient: {
                                        x1: 0,
                                        y1: 0,
                                        x2: 0,
                                        y2: 1
                                    },
                                    stops: [
                                        [0, Highcharts.getOptions().colors[0]],
                                        [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                                    ]
                                },
                                marker: {
                                    radius: 2
                                },
                                lineWidth: 1,
                                states: {
                                    hover: {
                                        lineWidth: 1
                                    }
                                },
                                threshold: null
                            }
                        },
                        series: [{
                            type: 'area',
                            name: '集群总体内存使用率',
                            data: data.json_memory_data


                        }]
                    });

               }else if(data.status=="fail"){
                    $('#Memory').html('Something wrong！');
               }
            }
       })

}



