const iosSheight: any = uni.getSystemInfoSync().statusBarHeight
export const androidConfig = {
    //导航栏
    statusBarColor: "#ffffff",
    navTitle: " ",
    navHeight: 0,
    isHideNav: true,
    //应用 Logo
    logoIconName: "static/login/logo_new.png",
    logoWidth: 88,  // 设置应用logo宽度，单位dp
    logoHeight: 88, // 设置应用logo高度，单位dp
    logoTopYOffset: 113, // 设置logo顶部Y轴偏移，单位dp
    //手机掩码
    maskNumberColor: "#333333", // 设置手机掩码颜色
    maskNumberSize: 24, // 设置手机掩码字体大小，单位sp
    maskNumberTopYOffset: 311, // 设置手机掩码顶部Y轴偏移，单位dp
    //认证品牌
    sloganSize: 12, // 设置认证品牌字体大小，单位sp
    sloganDpSize: 0, // 设置认证品牌字体大小，单位dp
    sloganColor: "#999999", // 设置认证品牌颜色
    sloganTopYOffset: 339, // 设置认证品牌顶部Y轴偏移，单位dp
    //登录按钮
    loginBtnText: "一键登录", // 设置登录按钮文本
    loginBtnTextSize: 16, // 设置登录按钮文本字体大小，单位sp
    loginBtnTextDpSize: 16, // 设置登录按钮文本字体大小，单位dp
    loginBtnTextColor: "#ffffff", // 设置登录按钮文本颜色
    loginBtnWidth: 290, // 设置登录按钮宽度，单位dp
    loginBtnHeight: 44, // 设置登录按钮高度，单位dp
    loginBtnTopYOffset: 393, // 设置登录按钮顶部Y轴偏移，单位dp
    // "loginBtnBottomYOffset": 0, // 设置登录按钮距离屏幕底部偏移，单位dp
    // "loginBtnXOffset": 0, // 设置登录按钮水平方向的偏移，单位dp
    loginBtnBackgroundRes: "static/login/loginBack.png", // 按钮背景图片相对路径名字
    //隐私协议
    privacyState: false,
    checkedImageName: "static/login/check.png",
    unCheckedImageName: "static/login/weixuan@2x.png",
    checkBoxWith: 11, // 设置隐私栏复选框宽度，单位 dp
    checkBoxHeight: 11, // 设置隐私栏复选框高度，单位 dp
    privacyTextColor: "#999999",
    privacyProtocolColor: "#263858",
    privacySize: 11,
    privacyTextStart: "  登录即您同意自动注册,并同意",
    protocolText: "《隐私协议》",
    protocolLink: "http://www.ka-world.com/share/h5/#/pages/xieyi/user_privacy",
    protocolNavColor: "#ffffff",
    isShowLoadingShow: true,
    // checkBoxMargin:4,
    privacyBottomYOffset: 10,
    privacyMarginLeft: 10,
    privacyMarginRight: 10,
    checkBoxGravity: 11,
    widgets: [
        {
            "viewId": "wxLogin",
            "type": "Button",
            "text": "",
            // "left": 110,
            "top": 453,
            // "right": 0,
            "bottom": 0,
            "width": 290,
            "height": 44,
            "clickable": true,
            "backgroundImgPath": "static/login/wechatLogin.png"
        },
        {
            "viewId": "otherLogin",
            "type": "TextView",
            "top": 518,
            "width": 150,
            "height": 50,
            "clickable": true,
            "text": "其他号码登录",
            "font": 12,
            "textColor": "#263858"
        },
        {
            "viewId": "pageBack",
            "type": "Button",
            "text": "",
            "left": 18,
            "top": 13,
            "right": 0,
            "bottom": 0,
            "width": 10,
            "height": 18,
            "clickable": true,
            "backgroundImgPath": "static/index/v3/icon_back.png"
        }
    ]
}
export const iosConfig = {
    "backgroundColor": "#FFFFFF", // 授权页面背景颜色设置
    "navBarHidden": true, // 导航栏隐藏
    //应用 Logo
    logoIconName: "static/login/logo_new.png",
    logoWidth: 88,  // 设置应用logo宽度，单位dp
    logoHeight: 88, // 设置应用logo高度，单位dp
    logoOffsetTopY: iosSheight + 113, // 设置logo顶部Y轴偏移，单位dp
    //手机掩码
    numberColor: "#333333", // 设置手机掩码颜色
    numberFont: 24, // 设置手机掩码字体大小，单位sp
    numberOffsetTopY: iosSheight + 355, // 设置手机掩码顶部Y轴偏移，单位dp
    //认证品牌
    brandFont: 12, // 设置认证品牌字体大小，单位sp
    brandColor: "#999999", // 设置认证品牌颜色
    brandOffsetTopY: iosSheight + 383, // 设置认证品牌顶部Y轴偏移，单位dp
    //登录按钮
    logBtnText: "一键登录", // 设置登录按钮文本
    logBtnTextFont: 16, // 设置登录按钮文本字体大小，单位sp
    logBtnTextColor: "#ffffff", // 设置登录按钮文本颜色
    // logBtnOffsetX:100,
    logBtnHeight: 0, // 设置登录按钮高度，单位dp
    logBtnOffsetTopY: iosSheight + 437, // 设置登录按钮顶部Y轴偏移，单位dp
    logBtnRadius: 1,
    logBtnUsableBGColor: "#ffffff",
    // logBtnEnableImg: "static/login/onClickLogin.png", // 按钮背景图片相对路径名字
    // logBtnHighlightedImg: "static/login/onClickLogin.png",
    //隐私协议
    privacyState: false,
    checkedImageName: "static/login/check.png",
    unCheckedImageName: "static/login/weixuan@2x.png",
    checkboxWH: 11, // 设置隐私栏复选框宽度，单位 dp
    privacyFont: 10,
    appPrivacyAlignment: 0,
    appPrivacyText: "登录即您同意自动注册,并同意《隐私协议》和《默认》", // 隐私的内容模板
    appFPrivacyText: "《隐私协议》",
    appFPrivacyTitleText: "隐私协议",
    appFPrivacyURL: "http://www.ka-world.com/share/h5/#/pages/xieyi/user_privacy",
    appPrivacyOriginBottomMargin: 60, // 隐私条款距离屏幕的距离
    privacyColor: "#999999",
    protocolColor: "#263858",
    isShowLoadingShow: false,
    privacyNavReturnImg: "static/index/v3/icon_back.png", // 用户协议界面，导航栏返回图标，默认用导航栏返回图标
    navReturnImgWidth:10,
    navReturnImgHeight:18,
    navReturnImgLeftMargin:18,
    navReturnImgBottomMargin:13,
    widgets: [
        {
            "type": "UIButton",
            "UIButtonType": 0,
            "image": "static/index/v3/icon_back.png",
            "title": "",
            "titleColor": "#000000",
            "titleFont": 12,
            "cornerRadius": 0,
            "action": "pageBack",
            "frame": { "mainScreenLeftDistance": 18, "mainScreenTopDistance": iosSheight + 13, "width": 10, "height": 18 },
            "backgroundImage": "static/index/v3/icon_back.png"
        },
        {
            "type": "UIButton",
            "UIButtonType": 0,
            "image": "static/login/onClickLogin.png",
            "action": "iosLoginAction",
            "frame": { "mainScreenTopDistance": iosSheight + 437, "width": 290, "height": 44 },
            "backgroundImage": "static/login/onClickLogin.png"
        },
        {
            "type": "UIButton",
            "UIButtonType": 0,
            "image": "static/login/otherLogin.png",
            "action": "otherLogin",
            "frame": { "mainScreenTopDistance": iosSheight + 550, "width": 290, "height": 24 },
            "backgroundImage": "static/login/otherLogin.png"
        },
        // {
        //     "type": "UILabel",
        //     // "image": "static/login/wechatLogin.png",
        //     "action": "otherLogin",
        //     "font": 12,
        //     "text": "其他号码登录",
        //     "textColor": "#263858",
        //     "textAlignment": 1,
        //     "frame": { "mainScreenTopDistance": iosSheight + 562,"width":100,"height":32 },
        // },
        {
            "type": "UIButton",
            "UIButtonType": 0,
            "image": "static/login/wechatLogin.png",
            "action": "wxLogin",
            "frame": { "mainScreenTopDistance": iosSheight + 497, "width": 290, "height": 44 },
            "backgroundImage": "static/login/wechatLogin.png"
        },
    ]
}