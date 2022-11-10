//webView调用app的方法
export default {
    methods: {
        canEvalAction(canEval) {
            this.canEval = true;
        },
        //抬起键盘
        upKeyBord() {
            this.showInput = true;
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