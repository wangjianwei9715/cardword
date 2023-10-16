/*
 * @FilePath: \jichao_app_2\src\pages\merchant\utils\util.ts
 * @Author: wjw
 * @Date: 2023-10-13 14:56:52
 * @LastEditors: 
 * @LastEditTime: 2023-10-16 13:34:02
 * Copyright: 2023 .
 * @Descripttion: 
 */
import { app } from "@/app"

// 商家积分和权重
export function getMerchantIntegral() {
    return new Promise((resolve, reject) => {
        app.http.Get("dataApi/merchant/integral/info", {}, (res: any) => {
            resolve(res.data)
        }, (err: any) => {
            reject(err)
        })
    })
}