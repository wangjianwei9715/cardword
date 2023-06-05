export default class navigateManager {
    private static instance: navigateManager;
	
	private constructor() {

	}
	static getIns(): navigateManager {
		if (!navigateManager.instance) {
			navigateManager.instance = new navigateManager();
		}
		return navigateManager.instance;
	}
	/**
	 * 跳转商品详情
	 * @param goodCode 商品编号 
	 * @param orther   额外参数   &a=b
	 */
	goGoodsDetails(goodCode:string,orther=''){
		if(!goodCode) return
		uni.navigateTo({
			url:`/pages/goods/goods_details?goodCode=${goodCode}${orther}`
		})
	}
	/**
	 * 跳转订单详情
	 * @param orderCode 订单编号 
	 * @param orther   额外参数   &a=b
	 * @param redirect  重定向 默认false
	 */
	goOrderDetails(orderCode:string,orther='',redirect=false){
		if(!orderCode) return;
		const _NavigateTo = redirect ? uni.redirectTo : uni.navigateTo
		_NavigateTo({
			url: `/pages/userinfo/order_details?code=${orderCode}${orther}`,
		});
	}
	/**
	 * 跳转资讯详情
	 * @param item 	 资讯信息
	 * @param type   资讯类型 视频资讯需要 广告位传100
	 * @param ad     广告位进入为1
	 * @param q      搜索内容可选
	 */
	goInformationDetail(item:any,type=100,ad=0,q?:string){
		if(!item) return;
		const articleCode = item.articleCode;
		const url = item.video_at&&item.video_at!='' ? `video?type=${type}&` : 'details?'
		uni.navigateTo({
			url:`/pages/information/${url}code=${articleCode}&ad=${ad}${q&&q!=''?'&q='+q:''}`
		})
	}
	navigateBack() {
		uni.navigateBack({ delta: 1 });
	}
}
