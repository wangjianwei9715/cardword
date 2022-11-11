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
        //someThing Show webview将app内某些变量改为true
        showPack(key) {
            // if (key == "hbShow" && !this.honbao.list.length) {
            //     // this.getRedPackList(); //后续放到click事件中
            // }
            this[key] = true;
        },

    }
}