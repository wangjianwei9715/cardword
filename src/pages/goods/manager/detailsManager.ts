/*
 * @FilePath: \jichao_app_2\src\pages\goods\manager\detailsManager.ts
 * @Author: wjw
 * @Date: 2023-11-03 14:49:34
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-07-10 16:13:36
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
	// 购买记录
	getBuyRecord(goodCode:string,cb:Function){
		app.http.GetWithCrypto(`dataApi/good/${goodCode}/latest_sales`,{},async ({list,dic}:any)=>{
			if(list){
				const data = list.slice(0, 6).map(({dicKey,time,num,anonymous}:any)=>{
					const userData = anonymous ? anonymousInfo : dic[dicKey];
					return {time,num,anonymous,...userData}
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
