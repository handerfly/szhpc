$(function(){
      $.ajax({
        type:'POST',
        url:"/status/get_selected_option",
        dataType:"json",
        data:{pid:0},
        success:function(data){
          $("#main_id").empty();
          var soft_threshold = "";
          var hard_threshold = "";
          var back_data ="";
          for(var i=0;i<data.length;i++){
            if(i == 0){
                soft_threshold = data[0].softbytes;
                hard_threshold = data[0].hardbytes;
                back_data      = data[0].back_data;

            }

            $("#main_id").append('<option value='+data[i].username+'>'+data[i].username+'</option>');

          };
          Highcharts.chart('storage',{
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
                                text: '磁盘已使用(TB)'
                            },
                            //1
                           plotLines: [{
								value: 17.59,
								color: 'green',
								dashStyle: 'shortdash',
								width: 2,
								label: {
										text: '软阈值'
								}
						}, {
								value: 18,
								color: 'red',
								dashStyle: 'shortdash',
								width: 2,
								label: {
										text: '硬阈值'
								}
						}]
                            //end1
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
                            type: 'line',
                            name: data[0].username+'磁盘已使用(TB)',
                            data: back_data
                        }]
                    });
       }
    });
});



 $("select").change(function() {
        //var title_value = $(this).text();
        var select_value = $('select option:selected').val();
        //var id  = $(this).val();  获取选中的ID值
        var url   = "/status/storage_chart";
        $.ajax({
            url: url,
            type: 'POST',
            dataType: 'json',
            data: {username: select_value},
            success:function(select_data) {
                    // 图表配置
                    var chart_bar = Highcharts.chart('storage',{
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
                                text: '磁盘已使用(TB)'
                            },
                            //1
                           plotLines: [{
								value: select_data.soft_threshold,
								color: 'green',
								dashStyle: 'shortdash',
								width: 2,
								label: {
										text: 'Last quarter minimum'
								}
						}, {
								value: select_data.hard_threshold,
								color: 'red',
								dashStyle: 'shortdash',
								width: 2,
								label: {
										text: 'Last quarter maximum'
								}
						}]
                            //end1
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
                            type: 'line',
                            name: select_value+'磁盘已使用(TB)',
                            data: select_data.back_data
                        }]
                    });

            }
        })
    });





