export const ZG_PROFILE = {
    appID: 839105423,
    appSign: "7266392b844ecfc13069c0ca68f22b621dbeb4de34b050b32fae98b22c34d502",
    scenario: 2
}
export const textTipsMap = {
    "0": "拆卡倒计时",
    "1": "等待主播开播",
    "2": "主播暂时离开",
    "3": "直播结束,回放生成中",
    "-1": "直播过期",
    "-2": "直播已取消"
};
export const registerList = [
    "BackLoginBroadCastRoom1001",
    // 'BackLike',
    "BroadCastLike",
    "BroadCastBilibili_Send",
    "BackSendChatMessage",
    "BroadCastChatMessage",
    "BackSendHongbao",
    "BroadCastHongbao",
    "BroadCastHongbaoUpdated",
    "BackGrabHongbao",
    "BackSendGift",
    "BackSendMerchantCoupon",
    "BroadCastMerchantCoupon",
    "SendMyPoint",
    "BackGetMerchantCoupon",
    "BroadCastLianmaiAllowed",
    "SendLianmaiApply",
    "BackApplyLianmai",
    "BroadCastLianmaiOn",
    "BroadCastLianmaiOff",
    "BackActorLianmaiData",
    "BackActorAgreeLianmaiApply",
    "BackTerminateLianmai",
    "BackGmChatBid",
    "BackGmKickOutRoom",
    "KickOut",
    "SendGiftUpdated",
    "SendRoomData",
    "BackHeartBeat",
];
export const shareData = {
    shareUrl: "",
    title: "",
    summary: "",
    thumb: ""
};
export const engineListen = [
    { name: "roomStreamUpdate", cnName: "房间内流变化" },
    { name: "apiCalledResult", cnName: "接口回调" },
    { name: "roomStreamExtraInfoUpdate", cnName: "房间内流附加信息" },
    { name: "publisherQualityUpdate", cnName: "推流质量回调" },
    { name: "roomStateUpdate", cnName: '房间状态变化通知' }
    // {name:"playerQualityUpdate",cnName:'拉流质量'}
];