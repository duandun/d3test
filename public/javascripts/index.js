$(document).ready(function($) {
	// 饼图
	var width = 600; //SVG绘制区域的宽度
	var height = 600; //SVG绘制区域的高度

	var svg = d3.select("body") //选择<body>
		.append("svg") //在<body>中添加<svg>
		.attr("width", width) //设定<svg>的宽度属性
		.attr("height", height); //设定<svg>的高度属性

	//1.确定初始数据
	var dataset = [
		["小米", 60.8],
		["三星", 58.4],
		["联想", 47.3],
		["苹果", 46.6],
		["华为", 41.3],
		["酷派", 40.1],
		["其他", 111.5]
	];

	//2.转换数据
	var pie = d3.layout.pie()
		.value(function(d) {
			return d[1];
		});

	var piedata = pie(dataset);

	console.log(piedata);

	//3.绘制

	//字体大小
	var fontsize = 14;

	//外半径和内半径
	var outerRadius = 400 / 3;
	var innerRadius = 0;

	//创建弧生成器
	var arc = d3.svg.arc()
		.innerRadius(innerRadius)
		.outerRadius(outerRadius);

	var color = d3.scale.category20();

	//添加对应数目的弧组，即<g>元素
	var arcs = svg.selectAll("g")
		.data(piedata) //绑定转换后的数据piedata
		.enter()
		.append("g")
		.attr("transform", "translate(" + (outerRadius) + "," + (outerRadius) + ")");

	//绘制弧
	arcs.append("path")
		.attr("fill", function(d, i) {
			return color(i); //设定弧的颜色
		})
		.attr("d", function(d) {
			return arc(d); //使用弧生成器
		});


	//绘制弧内的文字
	arcs.append("text")
		.attr("transform", function(d) {
			var x = arc.centroid(d)[0] * 1.4; //文字的x坐标
			var y = arc.centroid(d)[1] * 1.4; //文字的y坐标
			return "translate(" + x + "," + y + ")";
		})
		.attr("text-anchor", "middle")
		.style("font-size", fontsize)
		.text(function(d) {
			//计算市场份额的百分比
			var percent = Number(d.value) / d3.sum(dataset, function(d) {
				return d[1];
			}) * 100;

			//保留1位小数点，末尾加一个百分号返回
			return percent.toFixed(1) + "%";
		});



	//添加一个提示框
	var tooltip = d3.select("body")
		.append("div")
		.attr("class", "tooltip")
		.style("opacity", 0.0);

	arcs.on("mouseover", function(d) {
		/*
				鼠标移入时，
				（1）通过 selection.html() 来更改提示框的文字
				（2）通过更改样式 left 和 top 来设定提示框的位置
				（3）设定提示框的透明度为1.0（完全不透明）
				*/

		tooltip.html(d.data[0] + "的出货量为" + "<br />" + d.data[1] + " 百万台")
			.style("left", (d3.event.pageX) + "px")
			.style("top", (d3.event.pageY + 20) + "px")
			.style("opacity", 1.0);
	})
		.on("mousemove", function(d) {
			/* 鼠标移动时，更改样式 left 和 top 来改变提示框的位置 */

			tooltip.style("left", (d3.event.pageX) + "px")
				.style("top", (d3.event.pageY + 20) + "px");
		})
		.on("mouseout", function(d) {
			/* 鼠标移出时，将透明度设定为0.0（完全透明）*/

			tooltip.style("opacity", 0.0);
		});

	// 柱形图
	
	//画布大小
	var width = 400;
	var height = 400;

	//在 body 里添加一个 SVG 画布	
	var svg = d3.select("body")
		.append("svg")
		.attr("width", width)
		.attr("height", height);

	//画布周边的空白
	var padding = {left:30, right:30, top:20, bottom:20};

	//定义一个数组
	var dataset = [10, 20, 30, 40, 33, 24, 12, 5];
		
	//x轴的比例尺
	var xScale = d3.scale.ordinal()
		.domain(d3.range(dataset.length))
		.rangeRoundBands([0, width - padding.left - padding.right]);

	//y轴的比例尺
	var yScale = d3.scale.linear()
		.domain([0,d3.max(dataset)])
		.range([height - padding.top - padding.bottom, 0]);

	//定义x轴
	var xAxis = d3.svg.axis()
		.scale(xScale)
		.orient("bottom");
		
	//定义y轴
	var yAxis = d3.svg.axis()
		.scale(yScale)
		.orient("left");

	//矩形之间的空白
	var rectPadding = 4;

	//添加矩形元素
	var rects = svg.selectAll(".MyRect")
		.data(dataset)
		.enter()
		.append("rect")
		.attr("class","MyRect")
		.attr("transform","translate(" + padding.left + "," + padding.top + ")")
		.attr("x", function(d,i){
			return xScale(i) + rectPadding/2;
		} )
		.attr("y",function(d){
			return yScale(d);
		})
		.attr("width", xScale.rangeBand() - rectPadding )
		.attr("height", function(d){
			return height - padding.top - padding.bottom - yScale(d);
		});

	//添加文字元素
	var texts = svg.selectAll(".MyText")
		.data(dataset)
		.enter()
		.append("text")
		.attr("class","MyText")
		.attr("transform","translate(" + padding.left + "," + padding.top + ")")
		.attr("x", function(d,i){
			return xScale(i) + rectPadding/2;
		} )
		.attr("y",function(d){
			return yScale(d);
		})
		.attr("dx",function(){
			return (xScale.rangeBand() - rectPadding)/2;
		})
		.attr("dy",function(d){
			return 20;
		})
		.text(function(d){
			return d;
		});

	//添加x轴
	svg.append("g")
		.attr("class","axis")
		.attr("transform","translate(" + padding.left + "," + (height - padding.bottom) + ")")
		.call(xAxis); 
		
	//添加y轴
	svg.append("g")
		.attr("class","axis")
		.attr("transform","translate(" + padding.left + "," + padding.top + ")")
		.call(yAxis);

	// 直方图
	var width = 500;
	var height = 500;
	
	//添加SVG绘制区域
	var svg = d3.select("body").append("svg")
						.attr("width",width)
						.attr("height",height);
	
	//生成随机数组
	var rand = d3.random.normal(0,25);
	var dataset = [];
	for(var i=0;i<100;i++){
		dataset.push( rand() );
	}
	console.log(dataset);

	//定义布局
	var bin_num = 15;
	var histogram = d3.layout.histogram()
						.range([-50,50])
						.bins(bin_num)
						.frequency(true);
	
	//转换数据，输出数据
	var data = histogram(dataset);
	console.log(data);
	
	//定义比例尺
	var max_height = 400;
	var rect_step = 30;
	var heights = [];
	for(var i=0;i<data.length;i++){
		heights.push( data[i].y );
	}
	var yScale = d3.scale.linear()
						.domain([d3.min(heights),d3.max(heights)])
						.range([0,max_height]);
	
	//绘制图形
	var graphics = svg.append("g")
						.attr("transform","translate(30,20)");
	
	//绘制矩形
	graphics.selectAll("rect")
			.data(data)
			.enter()
			.append("rect")
			.attr("x",function(d,i){
				return i * rect_step; 
			})
			.attr("y", function(d,i){
				return max_height - yScale(d.y);
			})
			.attr("width", function(d,i){
				return rect_step - 2; 
			})
			.attr("height", function(d){
				return yScale(d.y);
			})
			.attr("fill","steelblue");
	
	//绘制坐标轴的直线
	graphics.append("line")
			.attr("stroke","black")
			.attr("stroke-width","1px")
			.attr("x1",0)
			.attr("y1",max_height)
			.attr("x2",data.length * rect_step)
			.attr("y2",max_height);
	
	//绘制坐标轴的分隔符直线
	graphics.selectAll(".linetick")
			.data(data)
			.enter()
			.append("line")
			.attr("stroke","black")
			.attr("stroke-width","1px")
			.attr("x1",function(d,i){
				return i * rect_step + rect_step/2;
			})
			.attr("y1",max_height)
			.attr("x2",function(d,i){
				return i * rect_step + rect_step/2;
			})
			.attr("y2",max_height + 5);
	
	//绘制文字
	graphics.selectAll("text")
			.data(data)
			.enter()
			.append("text")
			.attr("font-size","10px")
			.attr("x",function(d,i){
				return i * rect_step; 
			})
			.attr("y", function(d,i){
				return max_height;
			})
			.attr("dx",rect_step/2 - 8)
			.attr("dy","15px")
			.text(function(d){
				return Math.floor(d.x);
			});
});