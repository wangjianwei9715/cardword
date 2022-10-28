import { $confirm } from '../utils/tools'
//socket回调
export default {
    data() {
        return {
            onlineNum: 0,
        }
    },
    onLoad() {
    },
    methods: {
        BackLoginBroadCastRoom1001(res) {
            console.log("登陆房间回调", res);
            if (res.msg) {
                $confirm(res.msg, '直播间提示', false).then(confirm => {
                    uni.navigateBack({ delta: 1 });
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
        SendRoomData(res) {
            this.onlineNum = res.online
        },
    }
}