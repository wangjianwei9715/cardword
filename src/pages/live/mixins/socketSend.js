/*
 * @Author: lsj a1353474135@163.com
 * @Date: 2022-11-10 18:04:55
 * @LastEditors: lsj a1353474135@163.com
 * @LastEditTime: 2022-11-11 12:01:51
 * @FilePath: \card-world\src\pages\live\mixins\socketSend.js
 * @Description:socket发送
 */
import { $confirm, $toast } from '../utils/tools'
const app = getApp().globalData.app
//socket发送
export default {
    data() {
        return {

        }
    },
    onLoad() {
    },
    methods: {
        //点赞
        addLike(likeNum) {
            this.LiveSocket.send("RequestLike", {
                num: +likeNum
            });
        },
        //禁言
        GmChatBid(uid, name) {
            uni.showLoading();
            this.LiveSocket.send("GmChatBid", uid ? { uid } : { name });
        },
        //管理员进行踢出房间操作
        GmKickOutRoom(uid, name) {
            this.LiveSocket.send("GmKickOutRoom", uid ? { uid } : { name });
        },
        //发送消息
        async sendTalk(content = "", isThanks = false) {
            if (!content || content.length > 100) {
                $toast.info(!content ? '发送的内容不能为空' : '发送的内容长度超出限制')
                return;
            }
            uni.showLoading({
                title: "发送中"
            });
            if (isThanks) this.hbPackShow = false
            await this.LiveSocket.send('RequestSendChatMessage', { content })
            uni.hideLoading()
            this.inputText = "";
            this.showInput = false;
        },
        //发送优惠券
        sendCoupon(sendItem) {
            console.log("发送的优惠券的参数", sendItem);
            uni.showLoading();
            this.LiveSocket.send("RequestSendMerchantCoupon", sendItem).then(() => {
                this.sendCouponShow = false;
            });
        },
        //抢券
        onClickCoupon(id) {
            uni.$u.throttle(() => {
                this.clickCoupon = this.showCouponList[0];
                app.platform.UIClickFeedBack()
                this.LiveSocket.send("RequestGetMerchantCoupon", { id });
            }, 500)
        }
    }
}