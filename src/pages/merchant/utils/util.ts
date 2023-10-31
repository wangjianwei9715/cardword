import { app } from "@/app"
/**
 * @func 获取商家积分和权重
 * @author wjw
 * @returns Promise
 */
export function getMerchantIntegral():Promise<{integral:number;nowMonthWeight:number}> {
    return new Promise((resolve, reject) => {
        app.http.Get("dataApi/merchant/integral/info", {}, (res: any) => {
            resolve(res.data)
        }, (err: any) => {
            reject(err)
        })
    })
}
