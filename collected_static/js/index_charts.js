var EchartDonutsPair = function(){
    var _this = this

    this.node_donut = echarts.init(document.getElementById("nodes-chart"));
    this.core_donut = echarts.init(document.getElementById("cores-chart"));

    var opt = {
        series:[
            {
                type:'pie',
                radius: ['50%', '75%'],
                startAngle:270,
                hoverOffset:6,
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center',
                        formatter:function(params){
                            return "{line|"+params.name+"\n"+params.value+"\n"+Math.round(params.percent)+"%}";
                        }
                    },
                    emphasis: {
                        show: true,
                        fontSize: '17',
                        fontWeight: 'normal',
                        color: 'rgb(50,50,50)',
                            rich:{
                                line:{lineHeight:20}
                            }
                    }
                },
                labelLine: {
                    normal: {show: false}
                },
            },
            {
                type:'pie',
                radius: ['46%', '46%'],
                startAngle:270,
                avoidLabelOverlap: false,
                hoverOffset:2,
                label: {
                    normal: {show: false},
                    emphasis: {show: false}
                },
                labelLine: {
                    normal: {show: false}
               }
            },
        ]
    }

    this.node_donut.setOption(opt)
    this.node_donut.setOption({color:['#ae0001','#daa013','#b8860b']})
    this.node_donut.showLoading()

    this.core_donut.setOption(opt)
    this.core_donut.setOption({color:['#ae0001','#021496','#000060']})
    this.core_donut.showLoading()

    this.node_donut.on("click", function(params){
        window.location.href="/stat/wmyh"
    })
    this.core_donut.on("click", function(params){
        window.location.href="/stat/wmyh"
    })

    var mouseover_action = function(params,who){
        for(var i=0;i<3;i++){
            who.dispatchAction({
                type: 'downplay',
                seriesIndex:[0,1],
                dataIndex:i
            });
        }
        who.dispatchAction({
            type: 'highlight',
            seriesIndex:[0,1],
            dataIndex:params.dataIndex
        });
    }

    var mouseout_action = function(who){
        for(var i=0;i<3;i++){
            who.dispatchAction({
            type: 'downplay',
            seriesIndex:[0,1],
            dataIndex:i
            });
        }
        who.dispatchAction({
            type: 'highlight',
            seriesIndex:[0,1],
            dataIndex:1
        });
    }

    this.node_donut.on("mouseover", function(params){mouseover_action(params,_this.node_donut)})
    this.node_donut.on("mouseout", function(params){mouseout_action(_this.node_donut)})
    this.core_donut.on("mouseover", function(params){mouseover_action(params,_this.core_donut)})
    this.core_donut.on("mouseout", function(params){mouseout_action(_this.core_donut)})

    this.refresh = function(data){
        this.core_donut.hideLoading()
        this.node_donut.hideLoading()

        var node_dataset = {
            series:[
                {
                    data:[
                        {name:"不可用", value:data.node_error},
                        {name:"运行中", value:data.node_busy+data.node_running},
                        {name:"可用", value:data.node_available}
                    ]
                },{
                    data:[
                        {name:"不可用", value:data.node_error},
                        {name:"运行中", value:data.node_busy+data.node_running},
                        {name:"可用", value:data.node_available}
                    ]
                }
            ]
        }

        var core_dataset = {
            series:[
                {
                data:[
                    {name:"不可用", value:data.cpu_error},
                    {name:"运行中", value:data.cpu_alloc},
                    {name:"可用", value:data.cpu_free}
                ]
                },{
                data:[
                    {name:"不可用", value:data.cpu_error},
                    {name:"运行中", value:data.cpu_alloc},
                    {name:"可用", value:data.cpu_free}
                ]
                }
            ]
        }

        this.node_donut.setOption(node_dataset)
        this.core_donut.setOption(core_dataset)

        mouseout_action(_this.node_donut)
        mouseout_action(_this.core_donut)
    }

    this.resize = function(){
        var w = $("nodes-chart").parent().width();
        if(w>max_width)
    		w=max_width;
        $("nodes-chart").height(w-10)
        $("cores-chart").height(w-10)
        this.node_donut.resize()
        this.core_donut.resize()
        mouseout_action(_this.node_donut)
        mouseout_action(_this.core_donut)
    }

}
var async_url="/stat/wmyh/async"
var title_style = {
	fontSize: 20,
	align : "center",
	fontWeight: "normal"
}
var all_donuts = new EchartDonutsPair()
var pue_opt = {
	title: {
		left: 'center',
		text:"实时 PUE",
		textStyle : title_style,
	},
	series: [
		{
			name: 'PUE',
			type: 'gauge',
			radius:"65%",
			max:5,
			detail: {formatter:'{value}',color: 'rgb(50,50,50)',fontSize:'17'},
			data: [{value: 5, name: 'PUE'}],
			axisLine: { // 坐标轴线
				lineStyle: {
					color: [
						[1/5, '#000060'],
						[4/5, '#021496'],//根据实际数据动态改变
						[1, '#ae0001']
					],
					width: 30, //半径
					shadowColor: '#fff', //默认透明
					shadowBlur: 1
				}
			}
		}
	]
};
var power_opt = {
	title: {
		left: 'center',
		text:"电力负荷",
		textStyle : title_style,
	},
   series: [
		{
			name: '电力负荷',
			type: 'gauge',
			radius:"65%",
			max:150,
			detail: {formatter:'{value}',color: 'rgb(50,50,50)',fontSize:'17'},
			data: [{value: 50, name: 'KW'}],
			axisLine: { // 坐标轴线
				lineStyle: {
					color: [
						[1/5, '#b8860b'],
						[4/5, '#eead0e'],//根据实际数据动态改变
						[1, '#ae0001']
					],
					width: 30, //半径
					shadowColor: '#fff', //默认透明
					shadowBlur: 1
				}
			}
		}
	]
};

var g_pue = echarts.init(document.getElementById('pue'))
var g_power = echarts.init(document.getElementById('sys-load'))

$.get(async_url,function(data){
	all_donuts.refresh(data.node.all_nodes)

	g_pue.setOption(pue_opt)
	g_power.setOption(power_opt)

        var pue_data = {
                series:[{data:[{name:"PUE", value:data.pue.pue }]}]
        }
        var power_data = {
                series:[{data:[{name:"KW", value:data.pue.power }]}]
        }
        g_pue.setOption(pue_data)
        g_power.setOption(power_data)

	$(window).resize(function(){
		all_donuts.resize()
		g_pue.resize()
		g_power.resize()
	})
	setInterval(function(){
		$.get(async_url,function(data){
			all_donuts.refresh(data.node.all_nodes)

			var pue_data = {
				series:[{data:[{name:"PUE", value:data.pue.pue }]}]
			}
			var power_data = {
				series:[{data:[{name:"KW", value:data.pue.power }]}]
			}
			g_pue.setOption(pue_data)
			g_power.setOption(power_data)
		})
	},15000)
})

