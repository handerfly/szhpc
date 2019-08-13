function getDateStr(AddDayCount) {
    var dd = new Date();
    dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
    var y = dd.getFullYear();
    var m = dd.getMonth()+1;//获取当前月份的日期
    var d = dd.getDate();
    return y+'-'+(m<10?'0'+m:m)+'-'+d;
}
function getCurrentDate() {
  var now = new Date();
  var year = now.getFullYear(); //得到年份
  var month = now.getMonth();//得到月份
  var date = now.getDate();//得到日期
  var day = now.getDay();//得到周几
  var hour = now.getHours();//得到小时
  var minu = now.getMinutes();//得到分钟
  var sec = now.getSeconds();//得到秒
  month = month + 1;
  if (month < 10) month = "0" + month;
  if (date < 10) date = "0" + date;
  if (hour < 10) hour = "0" + hour;
  if (minu < 10) minu = "0" + minu;
  if (sec < 10) sec = "0" + sec;
  var time = "";
  //精确到天
  time = year + "-" + month + "-" + date;

  return time;
}


 function get_memory_history(obj) {
   $("#Memory_history_button button").removeClass("active")
   $(obj).addClass("active")
   switch ($(obj).attr("value")) {
        case "2days":
            s_date = getDateStr(-2);
            e_date = getCurrentDate();
            break;
        case "7days":
            s_date = getDateStr(-7);
            e_date = getCurrentDate();
            flg="7days";
             break;
        case "30days":
            s_date = getDateStr(-30);
            e_date = getCurrentDate();
            flg="30days";
             break;
        case "2month":
            s_date = getDateStr(-60);
            e_date = getCurrentDate();
            flg="2month";
             break;
        case "6month":
            s_date = getDateStr(-183);
            e_date = getCurrentDate();
            flg="6month";
             break;
        case "12month":
            s_date = getDateStr(-365);
            e_date = getCurrentDate();
            flg="12month";
    }
   $.ajax({
           type:"POST",
           url:"/status/memory_history",
           dataType:'json',
            data: {
                start_date: s_date,
                end_date: e_date,
            },

            beforeSend:function(XMLHttpRequest){
              $('#Memory_history').html("<img src='/static/img/timg.gif' />");
            },
            success:function(data){
                    // 图表配置
                    var chart_bar = Highcharts.chart('Memory_history',{
                        chart: {
                            zoomType: 'x'
                        },
                        title: {
                            text: '历史内存使用率'
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
                                text: '集群总体历史内存使用率 %'
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
                            name: '集群总体历史内存使用率',
                            data: data.memory_history_data
                        }]
                    });

            }
       })

}


function default_memory_history(){
$.ajax({
           type:"POST",
           url:"/status/memory_history",
           dataType:'json',
            data: {
                start_date: getDateStr(-30),
                end_date: getCurrentDate(),
            },

            beforeSend:function(XMLHttpRequest){
              $('#Memory_history').html("<img src='/static/img/timg.gif' />");
            },
            success:function(data){
                    // 图表配置
                    var chart_bar = Highcharts.chart('Memory_history',{
                        chart: {
                            zoomType: 'x'
                        },
                        title: {
                            text: '历史内存使用率'
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
                                text: '集群总体历史内存使用率 %'
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
                            name: '集群总体历史内存使用率',
                            data: data.memory_history_data
                        }]
                    });

            }
       })
}