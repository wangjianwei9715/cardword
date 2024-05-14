/*
 * @FilePath: \jichao_app_2\src\pages\goods\manager\detailsManager.ts
 * @Author: wjw
 * @Date: 2023-11-03 14:49:34
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-05-14 11:35:43
 * Copyright: 2023 .
 * @Descripttion: 
 */
import { app } from "@/app";
export const anonymousInfo = {
	userName:"匿名用户",
	avatar:app.defaultAvatar
}
export default class detailsManager {
    private static instance: detailsManager;
	/**
	 * @tipBtn		左下角按钮
	 * @id 			{Number}	唯一值
	 * @name 		{String}	标题
	 * @url			{String}	图标
	 * @class		{String}	class名
	 */
    tipBtn: { [x: string]: any }[] = [
		{
			id: 1,
			name: '客服',
			url: '../../static/goods/detail/kf.png',
			class: 'kf'
		},
		{ id: 2, name: '我的卡密', url: '../../static/goods/detail/my-card.png', class: 'order' }
	]
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
	// 购买记录
	getBuyRecord(goodCode:string,cb:Function){
		app.http.GetWithCrypto(`dataApi/good/${goodCode}/latest_sales`,{},async ({list,dic}:any)=>{
			if(list){
				const data = list.slice(0, 5).map(({dicKey,time,num,anonymous}:any)=>{
					const {userName,avatar} = anonymous ? anonymousInfo : dic[dicKey];
					return {time,num,userName,avatar,anonymous}
				});
				cb(data)
			}
		})
	}
	// 商品精彩时刻
	reqSeriesCards(goodCode:string,cb:Function) {
		app.http.Get(`dataApi/cardCheck/good/rarityCard/list/${goodCode}`, {}, ({list}: any) => {
			cb(list||[])
		})
	}
	queryCoupon(data:any,cb:Function){
		// 商品非在售 或 禁用优惠券
		if((data.state!=1&&data.state!=0) || (data.bit & 1) == 1) return;
		app.http.Get(`dataApi/coupon/merchant/online/good/${data.goodCode}/brief`,{},(res:any)=>{
			cb(res.list||[])
		})
	}
}
