/*
 * @Author: lsj a1353474135@163.com
 * @Date: 2023-06-13 16:00:25
 * @LastEditors: lsj a1353474135@163.com
 * @LastEditTime: 2023-07-19 11:02:09
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
    interface QueryByFetch {
        fetchFrom: number
        fetchSize: number
        noteCommentId?: number
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
        activity?:boolean;
        formList?:boolean
    }
    interface ActionItem {
        name: string;
        subname?: string;
        color?: string;
        disabled?: boolean
        loading?: boolean
    }

    interface RewardUserInfo {
        /* 用户id */
        readonly userId: number
        /* 用户昵称 */
        readonly userName: string
        /* 用户头像 */
        readonly avatar: string
    }
    //动态详情
    interface ForumDetail {
        /** 编号*/
        readonly code: string,
        /** 作者名称*/
        readonly userName: string,
        /** 作者id*/
        readonly userId: number,
        /** 头像*/
        readonly avatar: string,
        /** 标志位，1 是否作者本人，2 是否关注作者，4 是否点赞，8 是否收藏 */
        bit: number,
        /** 标题 */
        readonly title: string,
        /**内容 */
        content: string,
        /**参与的话题，一个#代表一个话题 */
        topic: any,
        /**1 图文，2 视频，3 卡册 */
        readonly tp: number,
        /**图片或视频地址，多个逗号隔开 */
        readonly url: string,
        /**地址 */
        location: string,
        /**创建时间 */
        readonly created_at: number,
        /**点赞数量 */
        likeNum: number,
        /**评论数量 */
        commentNum: number,
        /**收藏数量 */
        collectNum: number,
        /**关联好物 */
        good: {
            /**商品编号 */
            readonly goodCode: string
            /**商品标题 */
            readonly title: string
            /**商品封面 */
            readonly cover: string
        }
        /**投票 */
        vote: {
            /**标题 */
            readonly voteTitle: string
            /**我选择的选项，0代表未选择 */
            myOption: number
            options: Array<{
                /**id */
                optionId: number
                readonly content: string
                poll: number
            }>
        }
        /**@商家 */
        merAt:Array<{
            readonly alias:string
            readonly merName:string
        }>
    }
    //评论内容
    interface Comment {
        id: number
        /**用户名称 */
        userName: string
        /**用户头像 */
        avatar: string
        /**回复的用户名 */
        replyUserName?: string
        /**评论内容 */
        content: string
        /**点赞数量 */
        likeNum: number
        /**是否点赞 */
        isLiked: boolean
        /**评论时间 */
        created_at: number
        /**我的评论 */
        host: boolean
        /**所在地 */
        location: string
        /**还剩多少条评论 */
        remainNum?: number
    }
    interface CommentFather extends Comment {
        lower: Array<Comment>
        loading: boolean
        queryParams: QueryByFetch
        isFetchEnd: boolean
    }
}
export default CardForum