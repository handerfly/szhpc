 function get_cpu() {
   $.ajax({
           type:"POST",
           url:"/status/cpu_chart",
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
                    var chart_bar = Highcharts.chart('CPU',{
                        chart: {
                            zoomType: 'x'
                        },
                        title: {
                            text: 'CPU使用率'
                        },
                        subtitle: {
                            text: document.ontouchstart === undefined ?
                            '鼠标拖动可以进行缩放' : '手势操作进行缩放'
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
                                text: '集群总体CPU使用率 %'
                            },

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
                                        [0, '#66CDAA'],
                                        [1, '#AFEEEE'],
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
                            name: '集群总体CPU使用率',
                            data: data.json_cpu_data
                        }]
                    });

               }else if(data.status=="fail"){
                    $('#CPU').html('Something wrong！');
               }
            }
       })

}


