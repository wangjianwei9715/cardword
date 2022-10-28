//webView调用app的方法
export default {
    methods: {
        canEvalAction(canEval) {
            this.canEval = true;
        },
        //点赞
        addLike(likeNum) {
            this.LiveSocket.send("RequestLike", {
                num: +likeNum
            });
        },
        showConfig() {
            if (!this.onPreview && !this.onLive) {
                uni.showToast({
                    title: "请先开始直播或预览",
                    icon: "none"
                });
                return;
            }
            this.liveConfigToolShow = true;
        },
    }
}