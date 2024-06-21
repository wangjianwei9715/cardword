/*
 * @Author: lsj a1353474135@163.com
 * @Date: 2022-10-28 10:07:21
 * @LastEditors: lsj a1353474135@163.com
 * @LastEditTime: 2022-11-11 11:52:20
 * @FilePath: \card-world\src\pages\live\mixins\socketBack.js
 * @Description: socket接收回调
 */
import { $confirm, $toast, packInsertAlgorithm } from '../utils/tools'
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
                //         url: "/pages/index/index_v3"
                //     });
                // }
                app.navigateTo.switchTab(0)
            })
        },
        BackSendMerchantCoupon(res) {
            this.checkBack(res).then(() => {
                uni.hideLoading();
                $toast.success('发送成功')
            })
        },
        BroadCastMerchantCoupon(res) {
            console.log("广播优惠券", res);
            this.showCouponList = packInsertAlgorithm(res.list, this.showCouponList)
        },
        //抢券回调
        BackGetMerchantCoupon(res) {
            this.checkBack(res)
                .then(res => {
                    console.log("抢券成功");
                    this.clickCoupon = { ...res.coupon, id: this.clickCoupon.id };
                    this.showCoupon = true;
                })
                .catch(err => {
                    const failMsg = ["很遗憾,已经领完了", "优惠券未找到或已经领完"];
                    if (failMsg.includes(err)) {
                        const failGetIndex = this.showCouponList.findIndex(item => {
                            return +this.clickCoupon.id == +item.id;
                        });
                        if (failGetIndex >= 0) this.showCouponList.splice(failGetIndex, 1);
                    } else {
                        this.clickCoupon = {};
                    }
                });
            console.log("抢券回调", res);
        },
    }
}