import { app } from "@/app"

// 商家积分和权重
export function getMerchantIntegral() {
    return new Promise((resolve, reject) => {
        app.http.Get("dataApi/me/home", {}, (res: any) => {
            resolve(res.data)
        }, (err: any) => {
            reject(err)
        })
    })
}