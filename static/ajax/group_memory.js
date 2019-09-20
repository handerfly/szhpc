 function get_group_memory() {
   $.ajax({
           type:"POST",
           url:"/status/group_memory_chart",
           dataType:'json',
           beforeSend:function(XMLHttpRequest){
              $('#group_memory').html("<img src='/static/img/timg.gif' />");
            },
            success:function(mydata){
               if(mydata.status=="success"){
                       // 图表配置
                    function createChart() {
                            Highcharts.chart('group_memory',{
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
                                    },

                                },
                                legend: {
                                    enabled: true
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
                                series: mydata.json_group_memory_data
                            });
                    }

                    createChart();

                                // 图标配置结束

                           }else if(data.status=="fail"){
                                $('#group_memory').html('Something wrong！');
                           }
                        }
                   })

}



