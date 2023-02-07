export default class goodsManager {
    private static instance: goodsManager;
	
	private constructor() {

	}
	static getIns(): goodsManager {
		if (!goodsManager.instance) {
			goodsManager.instance = new goodsManager();
		}
		return goodsManager.instance;
	}
	/**
	 * 列表拼团进度
	*/
	listPlan(item:any,type:string){
		const width = Math.round((Number(item.lockNum) + Number(item.currentNum)) / Number(item.totalNum) * 10000)/100;
		const saleRatio = item.saleRatio>0&&item.saleRatio<1?Math.round((item.saleRatio)*10000)/100:0;
		const str = saleRatio > width ? 
		`${saleRatio}%`:
		`余${item.totalNum-(item.currentNum+item.lockNum)}/${item.totalNum}`
		return type=='str' ? str : Math.max(width,saleRatio)
	}
	// 商品是否包含最低价
	hasLowestPrice(item: any) {
		return item.isSelect || item.discount != '' || item.pintuan_type == 11
	}
	// 自选类型
	ifSelectType(item: any) {
		return item.pintuan_type == 10 || item.pintuan_type == 11 || item.pintuan_type == 12
	}
	
}
