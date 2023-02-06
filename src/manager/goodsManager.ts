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
