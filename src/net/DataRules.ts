// 预测卡密 预测规则
export var guessRules = {
    title:'预测卡密：',
    content:`1.购买本商品时可预测卡密所归属的球队，获得卡密后，预测的球队与卡密匹配即可获得免单购买机会\r\n2.单笔订单可预测1支球队，每匹配成功一条卡密均可获得一次免单机会\r\n3.免单机会可在创建订单时使用，免单的订单仍可进行卡密预测\r\n4.卡密中包含多支球队时，预测的球队与卡密中任意一支球队匹配则算预测成功\r\n5.若商品拼团完成，您有免单次数未用完，可联系客服退款 (退款额度=剩余免单次数*商品单价)\r\n6.预测结果以实际卡密中的球队为准`
}
// 商品详情 帮助规则
export var goodsDetailRules = [
    {title:'Q1：关于退款',desc:'超过拼团认购时限，认购未满员，所有款项将在3小时内原路返还，除此种情况，暂不提供其他退款服务'},
    {title:'Q2：如何保证原箱原盒？',desc:'商品上架前，平台会审核商家提供的原箱/原盒视频以及图片。卡片生厂商在生产过程中，有几率出现装箱误差，商品详情描述仅供参考，最终拆卡结果以实物为准。产品宣传图均为发行商官方制作，最终拆卡结果以实物为准。请各位卡友悉知'},
    {title:'Q3：拼成后多久拆卡？',desc:'拼团成功后24小时内在小程序内直播拆卡，具体时间以商家通知为准。拆卡后3个工作日内完成拆卡报告。如遇特殊情况需延长拆卡时间，平台将在购买须知中说明'},
    {title:'Q4：中卡后多久发货？',desc:'通常情况下，拆卡报告生成后5个工作日内完成发货。如遇港拆、美拆等特殊情况需延长发货时间，平台将在购买须知中说明'}
]
// 商品详情 帮助规则
export var goodsDetailHelp = [
    {content:'1.“卡世界”提供平台/技术支持，入驻商家提供商品、直播拆卡、售后服务。'},
    {content:'2.根据厂商官方公布的Checklist,组队方式分为随机球员、随机球队、随机位置等，每种方式对应一定的【拼团份数】，每一份对应一个随机卡密。'},
    {content:'3.【随机方式】若为即买即随，用户付款完成后，将获得对应下单份数的随机卡密；若为组满队伍，用户付款完成且认购满员后，用户将获得对应下单份数的随机卡密。'},
    {content:'4.认购满员后，商家将在小程序直播公示拆卡过程，并在直播结束后上传拆卡结果，完成后续发货工作。中卡的用户，获得实体卡片；未中卡用户，则无实体卡片，希望各位卡迷理性消费。'},
    {content:'5超过拼团【认购时限】，认购未满员，所有款项通过系统原路返还，除此种情况之外，平台方不提供退款服务。'}
]

// 卡币商城 兑换规则
export var mallExchangeRule = [
    {content:'玩家可消耗相应数量的卡币兑换心仪的奖品，兑换奖品前需填写并确认默认邮寄地址。'},
    {content:'若兑换实物类奖品，请联系客服，核实邮寄地址后寄出（包邮）；若兑换优惠券类奖品，将在2小时内自动发放至我的-优惠券，有效期为60天，请注意查收。'},
    {content:'所有奖品兑换后可在奖品明细中查看详情，兑换成功后无法取消，奖品将不定期更新。'}
]

// 集sp卡密 活动规则
export var spCardRule = [
    {title:'',content:'活动时间7.22-8.22，参与7月22日后上架的部分21-22国宝和21-22PRIZM系列有概率获得SP卡密，可用于兑换礼品'},
    {title:'SP值获取：',tips:'SP值获取后为冻结状态，拼成后方可使用，未拼成将扣除相应SP值。',content:'单箱的每条SP卡密基础为10点sp值，更具产品规格与活动SP值会有增幅（详见商品说明中）。若您的SP卡密中卡，可额外获SP值（随机卡种3倍；随机球员2倍），可联系客服领取'},
    {title:'SP卡密：',content:'国宝SP卡密为logoman签字；prizmSP卡密为新秀正金折、新秀正黑折（若商品为球员list，此球员存在logoman签字/新秀正金折/新秀正黑折卡密则视为sp卡密）。国宝随机卡种共95条，随机球员共92条；prizm随机卡种共106条，随机球员共53条。'},
    {title:'赠送SP卡密：',content:'赠送SP卡密将扣除相应的SP值，被赠送用户获得相应的SP值（若赠送时SP值已使用导致SP不够扣除，则收取用户获得仅获得被赠送者赠送时所扣除的SP值）'},
    {title:'奖励发放：',content:'实物类奖品请联系客服发放，优惠券类奖品自动发放'},
    {title:'',content:'活动结束后，未使用的SP值将失效，请在活动结束前使用'},
]

// 神秘代码 活动规则
export var codePopup = [
    {content:'1、活动时间6.1-6.20。活动期间，玩家可在活动页输入代码进行破解，破解成功即可获得相应奖品'},
    {content:'2、玩家可参考代码提示来寻找正确代码'},
    {content:'3、优惠券类奖品自动发放，实物类奖品请联系客服领取'},
    {content:'4、本活动每位玩家每条代码可成功破解1次，禁止刷号、同个用户多账号参与等行为，一经发现将封号处理！'},
]

// 716卡展 活动规则
export var card716Rule = [
    '参与活动页面福利产品拼团，累计达到一定额度即可获得抽奖次数',
    '当天累计达88元+1次',
    '当天累计达188元+1次',
    '当天累计达388元+1次',
    '当天累计达588元+1次',
    '当天累计达888元+1次',
]
