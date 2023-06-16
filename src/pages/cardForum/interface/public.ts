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
}
export default CardForum