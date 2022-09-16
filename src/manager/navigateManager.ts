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
	 * @param goodCode 商品code 
	 * @param orther   额外参数   &a=b
	 */
	goGoodsDetails(goodCode:string,orther=''){
		if(!goodCode) return
		uni.navigateTo({
			url:`/pages/goods/goods_details?goodCode=${goodCode}${orther}`
		})
	}
}
