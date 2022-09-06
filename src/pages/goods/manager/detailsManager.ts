export default class detailsManager {
    private static instance: detailsManager;
	/**
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
	 * @favorType 			{Boolean}   是否收藏
	 */
	favorType = false;
	/**
	 * @operaType 			{Int}   	玩法类型 1:拼团形式 2:随机方式
	 */
	operaType = 0;
	/**
	 * @shareShow 			{Boolean}   分享弹窗显示
	 */
	shareShow = false
	private constructor() {
    }
	static getIns(): detailsManager {
		if (!detailsManager.instance) {
			detailsManager.instance = new detailsManager();
		}
		return detailsManager.instance;
	}
}
