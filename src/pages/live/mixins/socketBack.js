import { $confirm, $toast } from '../utils/tools'
//socket回调
export default {
    data() {
        return {
            onlineNum: 0,
            systemKickOut: false
        }
    },
    onLoad() {
    },
    methods: {
        //socket回调统一处理
        checkBack(res) {
            return new Promise((resolve, reject) => {
                if (res.msg) {
                    const noTipsError = ["不存在的红包", "红包抢光了"];
                    if (noTipsError.includes(res.msg)) {
                        reject(res.msg);
                        return;
                    }
                    $toast.info(res.msg)
                    reject(res.msg);
                } else {
                    resolve(res);
                }
            });
        },
        BackLoginBroadCastRoom1001(res) {
            console.log("登陆房间回调", res);
            if (res.msg) {
                $confirm(res.msg, '直播间提示', false).then(confirm => {
                    app.platform.pageBack(1)
                })
            } else {
                uni.hideLoading();
                const { gm, point, applyLianmai } = res;
                this.userProfile.gm = gm ?? false;
                this.userProfile.point = point ?? 0;
                this.applyLianmai = applyLianmai ?? false;
                this.showWebView();
            }
        },
        BroadCastLike(res) {
            this.liveData.likeNum = res.finalLikeNum;
            this.informH5Action(
                "hasOtherManClickLike",
                [this.liveData.likeNum, res.list],
                true
            );
        },
        BackHeartBeat(res) {
            // console.log(res);
        },
        BroadCastChatMessage(res) {
            this.informH5Action("BroadCastChatMessageBack", res, false);
        },
        SendRoomData(res) {
            this.onlineNum = res.online
        },
        BackGmChatBid(res) {
            this.checkBack(res).then(data => {
                $toast.success('禁言成功')
            });
        },
        BackGmKickOutRoom(res) {
            this.checkBack(res).then(data => {
                $toast.success('踢出房间成功')
            });
        },
        KickOut(res) {
            console.log("被踢出房间的通知", JSON.stringify(res));
            this.systemKickOut = true;
            if (res.why == '直播已结束') {
                this.liveData.state = 3
            }
            this.stopPlayingStream(this.streamID);
            $confirm(res.why, '直播间提示', false).then(() => {
                // this.stopPlayingStream(this.streamID);
                // if (this.lmStreanID != "0") this.stopPlayingStream(this.lmStreanID);
                // if (this.lmUser.uid == this.userData.uid)
                //     this.stopPublishingStream(false, true);
                // if (res.confirm) {
                //     // this.leaveRoom()
                //     uni.switchTab({
                //         url: "/pages/index/index"
                //     });
                // }
                uni.switchTab({
                    url: "/pages/index/index"
                });
            })
        },
    }
}