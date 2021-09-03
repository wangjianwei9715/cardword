export default class PayManager {
    constructor() {
        // #ifdef APP-PLUS
        // #endif
    }
    paymentAlipay(orderInfo, cb) {
        console.log('orderInfo========', orderInfo);
        uni.requestPayment({
            provider: 'alipay',
            orderInfo: orderInfo,
            success: function (res) {
                console.log('success:' + JSON.stringify(res));
                if (cb)
                    cb();
            },
            fail: function (err) {
                console.log('fail:' + JSON.stringify(err));
            }
        });
    }
    static getIns() {
        if (!PayManager.instance) {
            PayManager.instance = new PayManager();
        }
        return PayManager.instance;
    }
}
//# sourceMappingURL=PayManager.js.map