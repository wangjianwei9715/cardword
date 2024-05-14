import { _Maps } from "@/tools/map"
export default class navigateManager {
    private static instance: navigateManager;
	switchMap:{[x:number]:string} = {
		0:"/pages/index/index",
		1:"/pages/illustration/index",
		2:"/pages/cardForum/home",
		3:"/pages/index/message",
		4:"/pages/index/userinfo_v3"
	}
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
		const pages = getCurrentPages();
		const route:any = pages[pages.length - 1].route;
		const referer = route.indexOf("act")!=-1 ? "Act" : getRefererName(route);
		uni.navigateTo({
			url:`/pages/goods/goods_details?goodCode=${goodCode}${orther||"&referer="+referer}`
		})

		function getRefererName(route:string){
			const key = Object.keys(_Maps._RefererMaps).find(key => {
				return route.indexOf(key) != -1;
			});
			return (key && _Maps._RefererMaps[key]) || `pages_${route}`
		}
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
	navigateToAD(target: any) {
		if (target.goodCode != '') {
			this.goGoodsDetails(target.goodCode,"&referer=AD")
			return;
		} else if (target.url != '') {
			uni.navigateTo({
				url: '/pages/act/outLink/outLink?url=' + decodeURIComponent(target.url)
			})
			return;
		} else if (target.page != '') {
			if (decodeURIComponent(target.page) == '社群') {
				uni.$emit('showPaySuccess')
				return;
			}
			uni.navigateTo({
				url: decodeURIComponent(target.page)
			})
			return;
		}
	}
	goAlbumCreate(code:string,name:string){
		uni.navigateTo({
			url:`/pages/illustration/album/selectCard?seriesCode=${code}&name=${name}`
		})
	}
	goIllSeries(seriesCode:string){
		uni.navigateTo({
			url: `/pages/illustration/seriesDetail?seriesCode=${seriesCode}`
		})
	}
	goAlbumEdit(selectSeries:string,draftId:string){
		uni.navigateTo({
			url:`/pages/illustration/album/selectCard?editCodeList=${selectSeries}&draftId=${draftId}`
		})
	}
	goMallIndex(){
		uni.navigateTo({ url:"/pages/mall/mallIndex" })
	}
	goMedalIndex(userId:string|number,medalId?:number){
		this.pageJump(`/pages/userinfo/medal/index?userId=${userId}&medalId=${medalId||0}`)
	}
	goPersonHome(userId:string|number){
		this.pageJump( `/pages/cardForum/personHomePage?userId=${userId}`)
	}
	/**
	 * 跳转tabbar
	 * @param index  0:首页,1:图鉴,2:卡圈,3:消息,4:我的
	 */
	switchTab(index:number){
		uni.switchTab({
			url: this.switchMap[index]
		})
	}
	navigateBack(delta=1) {
		uni.navigateBack({ delta });
	}
	pageJump(url: string) {
		uni.navigateTo({ url })
	}
}
