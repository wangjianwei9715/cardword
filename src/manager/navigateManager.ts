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
	 * 跳转资讯详情
	 * @param item 资讯信息
	 * @param ad   广告位进入为1
	 */
	goInformationDetail(item:any,ad=0){
		if(!item) return;
		const articleCode = item.articleCode;
		const url = item.video_at&&item.video_at!='' ? 'video' : 'details'
		uni.navigateTo({
			url:`/pages/information/${url}?code=${articleCode}&ad=${ad}`
		})
	}
}
