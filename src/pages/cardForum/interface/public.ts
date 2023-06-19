/*
 * @Author: lsj a1353474135@163.com
 * @Date: 2023-06-13 16:00:25
 * @LastEditors: lsj a1353474135@163.com
 * @LastEditTime: 2023-06-19 10:12:52
 * @FilePath: \card-world\src\pages\cardForum\interface\public.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
declare module CardForum {
    interface Tab {
        index: number;
        list: Array<{
            label: string;
            value: number
        }>
    }
    interface Topics {
        id: number;
        /* 话题名称 */
        name: string;
        /* 话题图片 */
        pic?: string;
        /* 累计动态数量 */
        cardCircleNum?: number;
        /* 累计参与用户 */
        userUseNum?: number;
        isActivity?: boolean;
    }
    interface ActionItem {
        name: string;
        subname?: string;
        color?: string;
        disabled?: boolean
        loading?: boolean
    }

    interface RewardUserInfo {
        /* 用户昵称 */
        userName: string
        /* 用户头像 */
        avatar: string
    }
}
export default CardForum