/*
 * @FilePath: \jichao_app_2\src\pages\goods\manager\detailsManager.ts
 * @Author: wjw
 * @Date: 2022-10-26 15:51:09
 * @LastEditors: 
 * @LastEditTime: 2023-02-07 10:30:21
 * Copyright: 2023 .
 * @Descripttion: 
 */
export default class detailsManager {
    private static instance: detailsManager;
	/**
	 * @countData           倒计时相关数据
	 * @countInterval		倒计时方法
	 * @countDown           倒计时秒数
	 * @countDay 			天数
	 * @countHour			小时
	 * @countMinute			分钟
	 * @countSecond			秒数
	 */
	countData:{[x:string]:any} = {
		countInterval:'',
		countDown:'',
		countDay:'',
		countHour:'',
		countMinute:'',
		countSecond:''
	}
	/**
	 * @swiperData          {Object}    轮播相关数据
	 * @carouselLength 		{Number}	轮播图数量（不包含原封图）
	 * @swiperCurrent 		{Number}	轮播当前位置
	 * @swiperTab 			{String[]}	轮播区域右下角tab
	 * @swiperTabCurrent 	{Number}	轮播区域右下角tab选中项
	 */
	swiperData = {
		carouselLength:0,
		swiperCurrent:0,
		swiperTab:['商品', '原封图'],
		swiperTabCurrent:0
	}
	/**
	 * @picData         {Object}    图片内容
	 * @carousel 		{String[]}	轮播图
	 * @detailImg 		{String[]}	原封图
	 */
	picData:{[x:string]:any} = {
		carousel:[],
		detailImg:[]
	}
	/**
	 * @tipBtn		左下角按钮
	 * @id 			{Number}	唯一值
	 * @name 		{String}	标题
	 * @url			{String}	图标
	 * @class		{String}	class名
	 */
    tipBtn: { [x: string]: any } = [{
		id: 1,
		name: '客服',
		url: '../../static/goods/v2/icon_kefu.png',
		class: 'kf'
	}]
	/**
	 * @operaData           {Object}    拼团形式随机方式等内容数据
	 * @operaType 			{Int}   	玩法类型 1:拼团形式 2:随机方式
	 * @operaShow 			{Boolean}   玩法弹窗显示
	 */
	operaData = {
		operaType:0,
		operaShow:false
	}
	/**
	 * @choiceTeamData      自选球队数据
	 * @teamCheckShow       {Boolean}    弹窗显示
	 * @teamLeftSec 		{Number}   	 倒计时
	 * @teamData 			{Object}     球队列表
	 * 	@val    Number   id       	ID
	 *  @val    String   logo     	球队图标
	 *  @val    String   name     	球队名称
	 *  @val    Boolean  soldOut    是否售罄      
	 * @teamCheckIndex		{Number}   	 球队选择
	 * @branchData			{Object}     分支列表
	 * 	@val    Number   id       	ID
	 *  @val    String   name     	分支名称
	 *  @val    Number   price     	分支价格
	 *  @val    Boolean  soldOut    是否售罄     
	 *  @val    Boolean  lock    	是否锁定 
	 * @branchCheckIndex    {Number}   	 分支选择
	 * @baoduiLeftSec		{Number}   	 包队倒计时
	 * @baoduiState			{Number}   	 包队状态
	 * @cartData			{Object}     购物车信息
	 * 	@val    Number   id       	ID
	 *  @val    Number   noId       noID
	 *  @val    String   trunk     	球队
	 *  @val    String   trunkLogo  球队图标
	 *  @val    String   name     	分支名称
	 *  @val    Number   price     	分支价格
	 *  @val    Boolean  soldOut    是否售罄     
	 *  @val    Boolean  lock    	是否锁定 
	 * @randomMode			{Object}     随机模式数据
	 * 	@val    String   name     	名称
	 *  @val    Number   price     	价格
	 *  @val    Boolean  isExtend   是否有额外奖品
	 * @randomNum			{Number}   	 剩余随机组数
	 */
	choiceTeamData:any = {
		teamCheckShow:false,
		teamLeftSec:0,
		teamData:[],
		teamCheckIndex:0,
		branchData:[],
		branchCheckIndex:0,
		baoduiLeftSec:0,
		baoduiState:-1,
		cartData:[],
		randomMode:'',
		randomNum:0
	}
	/**
	 * @choiceTRData 	     选队随机数据
	 * @show       			 {Boolean}    选队窗口显示
	 * @data				 {Object}     选队随机数据
	 *  @val "id":1,
	 * 	@val "logo":"/pic/xxx.png",
	 *	@val "name":"湖人",
	 *	@val "price":1.00,//单价
	 *	@val "currentNum":10, //当前拼团数量
	 *	@val "totalNum":10, //总拼团数量
	 *	@val "lockNum":10, //拼团锁定数量
	 * @rData				 {Object}     剩余随机数据
	 *  @val "state":0, //0 展示阶段 ： 编号数量≤15件且2小时内无人购买将进入剩余随机模式
	 *	@val //1 倒计时阶段：2:59:59后进入剩余随机模式
	 *	@val //2 已进入剩余随机模式
	 *	@val "maxLeftNum":15,
	 *	@val "idleMinute":120, //闲置几分钟 120 = 2小时
	 *	@val "leftSecond":100, //倒计时
	 * @remainder			 {Object}     剩余随机配置
	 */
	choiceTRData:any = {
		show:false,
		data:[],
		rData:[],
		remainder:[]
	};
	/**
	 * @planData            商品进度数据
	 * @width       		{Number}     进度条宽度
	 * @str					{String}     进度说明				
	 */
	planData:any = {
		width:0,
		str:'',
		showMsg:true
	}
	/**
	 * @favorType 			是否收藏
	 */
	favorType:Boolean = false;
	private constructor() {
    }
	static getIns(): detailsManager {
		if (!detailsManager.instance) {
			detailsManager.instance = new detailsManager();
		}
		return detailsManager.instance;
	}
	/**
	 * 商品详情拼团进度
	*/
	detailsPlan(item:any){
		const width = Math.round((Number(item.lockNum) + Number(item.currentNum)) / Number(item.totalNum) * 10000)/100;
		const saleRatio = item.saleRatio>0&&item.saleRatio<1?Math.round((item.saleRatio)*10000)/100:0;
		const str = `${saleRatio}%`;
		return {
			width:Math.max(width,saleRatio),
			str,
			showMsg:width>=saleRatio
		}
	}
	/**
	 * 商品拼团详情说明
	*/
	setGoodsDesc(goodsData:any){
		const desc = decodeURIComponent(goodsData.desc);
		const newDesc = desc.indexOf('\n') > -1 ? desc.split('\n') : desc.split('\r');
		const series = { serieTitle:'', spec:'' }
		newDesc.forEach((x:any)=>{
			let data = x.indexOf('：')!=-1?x.split('：'):x.split(':');
			if(data[0] == '拼团系列') series.serieTitle = data[1];
			if(data[0] == '拼团规格') series.spec = data[1];
		})
		
		return [
			{name:'拼团系列',desc:`${series.serieTitle||goodsData.serieTitle}`},
			{name:'开售时间',desc:uni.$u.timeFormat(goodsData.startAt,'yyyy-mm-dd hh:MM:ss')},
			{name:'拼团编号',desc:`${goodsData.goodCode}`},
			{name:'产品规格',desc:`${series.spec||goodsData.spec.content}`},
			{name:'拼团份数',desc:`${goodsData.totalNum}份`},
			{name:'拼团时间',desc:`${(goodsData.overAt-goodsData.startAt)/86400}天`},
		]
	}
}
