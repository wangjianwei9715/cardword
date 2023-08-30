
export default class goodsManager {
    private static instance: goodsManager;
	gameplayType = {
		1:"随机卡种",
		2:"随机球队",
		3:"随机球员",
		4:"随机卡盒",
		5:"随机卡包",
		10:"自选球队",
		11:"选队随机",
		12:"自选卡种"
	}
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
		const allowedTypes = [10, 11, 12];
		return allowedTypes.includes(item.pintuan_type);
	}
	
}
