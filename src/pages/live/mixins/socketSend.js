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
        GmChatBid(uid, name) {
            //禁言
            uni.showLoading();
            this.LiveSocket.send("GmChatBid", uid ? { uid } : { name });
        },
        GmKickOutRoom(uid, name) {
            //管理员进行踢出房间操作
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
    }
}