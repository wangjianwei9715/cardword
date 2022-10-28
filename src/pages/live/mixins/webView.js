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
    }
}