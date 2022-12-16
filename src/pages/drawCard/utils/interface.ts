export namespace DarwCard{
    /** 初始化加载数据
     * @initInterval 开屏动画计时方法
     * @start 搓卡开始
     * @startTime 开屏动画倒计时
     * @noMoreData 是否没有更多卡密
     * @goodOrder 商品订单号
     * @pageIndex 卡密分页index
     * @pageSize 卡密分页size
     */
    export interface Init{
        initInterval:any,
        start:boolean,
        startTime:number,
        noMoreData:boolean,
        goodOrder:string,
        pageIndex:number,
        pageSize:number
    }

    /** 卡密数据
     * @color 卡密等级颜色
     * @name 卡密名称
     * @nameNoEnglish 卡密无英文
     * @number 卡密编号排序
     * @pic 卡密图片
     * @player 卡密球员名称
     * @rc 卡密是否RC
     */
    export interface Code{
        color:string;
        name:string;
        nameNoEnglish:string;
        number:number;
        pic:string;
        player:string;
        rc:boolean;
        [x:string]:any
    }
}