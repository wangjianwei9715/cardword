import { app } from "@/app"
export function followActionByUser(userId: number, isFollow: boolean): Promise<Boolean> {
    return new Promise((resolve, reject) => {
        app.http.Post(`cardCircle/${isFollow ? 'un/' : ''}follow/user/${userId}`, {}, (res: any) => {
            resolve(true)
        }, (err: any) => {
            reject(false)
        })
    })
}