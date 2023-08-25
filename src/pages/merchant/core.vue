<template>
  <view class='content' style="width:750rpx; overflow-x: hidden">
    <view class="pageTopContainer">
      <view class="status" :style="{paddingTop:app.statusBarHeight*2+'rpx',backgroundColor:`rgba(255,255,255,${scrollTopPercent})`}">
      </view>
      <view class="pageTop" ref="pageTop" id="pageTop" :style="{backgroundColor:`rgba(255,255,255,${scrollTopPercent})`}">
        <view class="whiteBack flexCenter" @click="goBack">
          <image
          style="width:20rpx;height:36rpx"
            src="../../static/merchant/back.png"
            mode="scaleToFill"
          />
        </view>
        <!-- <u-icon name="arrow-left" :color="scrollTopPercent>0.6?'#202124':'#fff'" size="22" @click="goBack">
                </u-icon> -->
        <view class="pageTitle" :style="{opacity:scrollTopPercent}">商家中心</view>
        <view class="whiteBack flexCenter" @click="onClickShare">
          <image
          style="width:33rpx;height:33rpx" 
            src="../../static/merchant/share.png"
            mode="scaleToFill"
          />
        </view>
        <!-- <u-icon name="share-square" :color="scrollTopPercent>0.6?'#202124':'#fff'" size="28" @click="onClickShare"></u-icon> -->
      </view>
    </view>
    <image :src='parsePic(decodeURIComponent(merchantInfo.back_img))' @click="previewImage([decodeURIComponent(merchantInfo.back_img)],0,'')" mode='aspectFill' class="merchantBanner" />
    <view class="merchantInfoContainer">
      <view class="infoTop uni-flex">
        <image :src="parsePic(decodeURIComponent(merchantInfo.logo))" mode="aspectFill" class="info-avatar" />
        <view class="info-message">
          <view class="info-name">
            {{merchantInfo.name}}
            <merchantLevel :level="merchantInfo.level"/>
          </view>
          <view class="info-introduction">{{merchantInfo.region}} · {{merchantInfo.groupGoodNum}}拼成 · {{merchantInfo.fans}}粉丝
          </view>
        </view>
        <view class="rightEdit flexCenter" v-if="isMerchant" @click="pageJump('/pages/merchant/info')">编辑资料
        </view>
        <followButton :follow="merchantInfo.followed" :width="127" v-else @handleSuccess="($event)=>{merchantInfo.followed=$event.follow,merchantInfo.fans=$event.fans}" :height="52" :fontSize="29" :newMerchantPage="true" :followID="alias"></followButton>
        <!-- <view class="followBtton flexCenter" :class="{isFollo:merchantInfo.followed}" v-if="!isMerchant" @click="pageJump('/pages/merchant/info')">关注
                </view> -->
      </view>
      <view class="merchant-introduction">店铺简介：{{merchantInfo.brief_intr?merchantInfo.brief_intr:'欢迎来到我的店铺!'}}</view>
    </view>
    <view class="couponContainer uni-flex" v-if="!isMerchant&&couponBrief&&couponBrief.length">
      <view class="leftCoupon uni-flex">
        <view class="leftCoupon-item" style="margin-left: 14rpx;" v-for="(item,index) in couponBrief.length==1?[...couponBrief,...couponBrief]:couponBrief" :key="index" :style="{marginLeft:index==0?`14rpx`:`60rpx`}">
          <view class="price">
            <text style="font-size: 25rpx;">￥</text>
            <text style="font-weight: bold;">{{item.amount}}</text>
          </view>
          <view class="couponRight">
            <view class="manj">{{item.minUseAmount==0?"无门槛券":`满${item.minUseAmount}元可用`}}</view>
            <view class="type">{{item.tp==1?'指定商品':"指定店铺"}}</view>
          </view>
        </view>
      </view>
      <view class="rightReceive flexCenter" @click="onClickGetMore">
        领取<br>更多
      </view>
      <!-- <view class="coupon-receive" @click="pageJump('/pages/merchant/couponManage')">领取更多</view> -->
    </view>
    <view class="ruleContainer" v-if="isMerchant">
      <view class="ruleItem" v-for="(item,index) in merchantRule" :key="index" @click="onClickRule(item)">
        <view class="rule-left flexCenter">
          <image class="rule-icon" :src="item.icon" :style="{width:item.width+'rpx'}" mode="widthFix" />
        </view>
        <view class="rule-right">
          <view class="rule-name">{{item.name}}</view>
          <view class="rule-tips">{{item.tipsText}}</view>
        </view>
      </view>
    </view>
    <view class="moreContainer" :style="{marginTop:(isMerchant?27:68)+'rpx'}" @click="pageJump('/pages/merchant/niceTime?alias='+alias)">
      <view class="more-left">店铺精彩时刻</view>
      <view class="more-right">更多</view>
    </view>
    <view class="niceTimeContainer" v-if='niceTimeFinish'>
      <swiper indicator-dots autoplay circular :interval="5*1000" indicator-active-color="#333333" indicator-color="#CAC6C6" style="width:100%;height:100%" v-if="niceTimeList&&niceTimeList.length">
        <swiper-item class="niceTimeItem" v-for="(item,index) in niceTimeList" :key="index" style="display: flex;flex-wrap: nowrap;">
          <image v-for="(sItem,sNndex) in item" class="niceTimeImage" :style="{marginRight:sNndex==2?0:'24rpx'}" :key="'sImg'+sNndex" :src="filterImage(decodeURIComponent(sItem.pic),false)" @click="previewImage(filterImage(decodeURIComponent(sItem.pic),true),0,'')" mode="aspectFill" />
        </swiper-item>
      </swiper>
      <empty v-if="niceTimeList&&!niceTimeList.length" style="position: relative;bottom:240rpx" />
    </view>
    <view class="tagsContainer" id="tagsContainer">
      <view class="tag" :class="{selectTag:index==tag.index}" v-for="(item,index) in tag.list" @click="onTagClick(item,index)">
        {{item.label}}
        <text>{{goodsMsg[item.valueKey]}}</text>
      </view>
    </view>
    <!-- <u-sticky :offsetTop="MAX_HEIGHT*2" v-if="MAX_HEIGHT">
            
        </u-sticky> -->

    <view class="goodsList">
      <goodslist :goodsList="goodsList" v-if="goodsList&&goodsList.length" @send="onClickJumpDetails" :presell="false" />
    </view>
    <empty v-if='!goodsList.length' style="position: relative;bottom: 50rpx;" />
    <bottomDrawer title='领取优惠券' :height='571' heightType='rpx' :needSafeArea='true' :showDrawer.sync='receiveCouponShow'>
    </bottomDrawer>
    <couponGetDrawer :couponList="couponList" @lower="lowerCoupon" :showDrawer.sync='couponGetDrawerShow' />
    <share :operationShow.sync='operationShow' :shareData="shareData" />
  </view>
</template>

<script lang="ts">
    interface MerchantInfo {
        name: string;
    }
    import { app } from "@/app";
    import { Component, Watch } from "vue-property-decorator";
    import BaseNode from "../../base/BaseNode.vue";
    import { parsePic } from "@/tools/util";
    @Component({})
    export default class ClassName extends BaseNode {
        parsePic: any = parsePic;
        app: any = app
        alias: string = '';
        isMerchant: boolean = false
        operationShow: boolean = false
        shareData: any = {
            shareUrl: `share/${app.localTest ? "testH5" : "h5"}/#/pages/merchant/index`,
            title: "商家名称",
            summary: "商家简介",
            thumb: "商家logo"
        };
        couponBrief: any = []
        ruleList: any = [{
            icon: '/static/merchant/live.png',
            name: '我的直播',
            tipsText: '待直播',
            url: '/pages/live/myLive',
            width: 52,
            valueKey: '',
            bit: 2,

        },
        {
            icon: '/static/merchant/card.png',
            name: '拆卡报告',
            tipsText: '待制作',
            width: 47,
            valueKey: '',
            bit: 8
        }, {
            icon: '/static/merchant/wul.png',
            name: '我的发货',
            tipsText: '待发货',
            width: 48,
            valueKey: '',
            bit: 16
        },
        {
            icon: '/static/merchant/coupon.png',
            name: '优惠券管理',
            tipsText: '查看与创建',
            width: 51,
            valueKey: '',
            url: '/pages/merchant/couponManage',
            bit: 1
        }, {
            icon: '/static/merchant/cuoka.png',
            name: '代搓卡',
            tipsText: '直播模式',
            width: 41,
            valueKey: '',
            url: "/pages/anchor/index",
            bit: 4
        }, {
            icon: '/static/merchant/cuoka.png',
            name: '在售管理',
            tipsText: '商品管理',
            width: 41,
            valueKey: '',
            url: "/pages/merchant/goods_sale",
            bit: 32
        }]
        goodsList: any = []
        goodsTotalPage: number = 0
        goodsMsg: any = {
            saleTotal: 0,
            groupTotal: 0,
            sumTotal: 0,
        }
        goodsQuery: any = {
            pageIndex: 1,
            pageSize: 10,
            tp: 100,//1 在售，2 已拼成, 100 全部

        }
        tag: any = {
            index: 0,
            list: [{
                label: '全部',
                valueKey: 'sumTotal',
                value: 100
            }, {
                label: '在售',
                valueKey: 'saleTotal',
                value: 1
            }, {
                label: '已拼成',
                valueKey: 'groupTotal',
                value: 2
            },
                // {
                //     label: '拆卡',
                //     valueKey: ''
                // }
            ]
        }
        merchantInfo: any = {
            name: ""
        };
        niceTimeList: any = []
        receiveCouponShow: boolean = false
        couponQuery: any = {
            fetchFrom: 1,
            fetchSize: 10
        }
        couponGetDrawerShow: boolean = false
        couponList: any = []
        couponIsFetchEnd: boolean = true
        scrollTop: number = 0
        MAX_HEIGHT: number = 0;
        niceTimeFinish:boolean=false
        private get scrollTopPercent() {
            return this.scrollTop / (this.MAX_HEIGHT * 2)
        }
        private get merchantRule() {
            if (!this.merchantInfo.bit) return []
            return this.ruleList.filter((item: any) => {
                const bitNum = this.merchantInfo.bit & item.bit
                const val = item.bit ? item.bit : 0
                return bitNum == val
            })
        }
        onLoad(query: any) {
            this.$nextTick(() => {
                const query: any = uni.createSelectorQuery().in(this)
                query
                    .select('#pageTop')
                    .boundingClientRect((data: any) => {
                        this.MAX_HEIGHT = data.height
                        // console.log(this.MAX_HEIGHT);
                    })
                    .exec();
            })
            if (query.alias) this.alias = query.alias
            if (query.isMerchant) this.isMerchant = true
            if (this.isMerchant) this.reqMyMerchantData()
            if (!this.isMerchant){
                this.reqCouponBrief()
                this.reqMerchantData()
            } 
            this.reqNiceTime()
            if (query.tp && +query.tp>0){
              const index=this.tag.list.findIndex((item:any)=>{
                return item.value==+query.tp
              })
              if (index>=0) this.onTagClick(this.tag.list[index],index,true)
            }else{
              this.reqGoodsData()
            }
            this.onEventUI('refreshMerchantInfo', (res: any) => {
                // console.log("refreshMerchantInfo", res);
                this.merchantInfo = res
            });

        }

        onShow() {

        }
        onReachBottom() {
            if (this.goodsQuery.pageIndex < this.goodsTotalPage) {
                this.goodsQuery.pageIndex += 1
                this.reqGoodsData()
            }
        }
        onPullDownRefresh() {
            this.goodsQuery.pageIndex += 1
            this.reqGoodsData(() => {
                uni.stopPullDownRefresh()
            })
        }
        onPageScroll(data: any) {
            this.scrollTop = data.scrollTop
        }
        
        previewImage(list: any, index: number, key: string = "src") {
            const urls = list.map((item: any) => this.parsePic(key ? item[key] : item));
            uni.previewImage({
                urls,
                current: index
            });
        }
        goBack() {
            app.platform.pageBack(1)
        }
        scrollToTp() {
          this.$nextTick(()=>{
            uni
              .createSelectorQuery()
              .select("#tagsContainer")
              .boundingClientRect((res) => {
                  if (res && res.top) {
                      uni.pageScrollTo({
                          duration: 150,
                          scrollTop: res.top - app.statusBarHeight-30
                      })
                  }
              }).exec();
          })
        }
        onClickShare() {
            this.shareData.shareUrl += `?alias=${this.alias}`
            this.shareData.title = this.merchantInfo.name
            this.shareData.summary = this.merchantInfo.brief_intr
            this.shareData.thumb = this.parsePic(decodeURIComponent(this.merchantInfo.logo))
            this.operationShow = true
        }
        onClickRule(item: any) {
            if (!item.url) {
                uni.showToast({
                    title: '维护中',
                    icon: 'none'
                })
                return
            }
            
            this.pageJump(item.url)
        }
        onTagClick(item: any, index: number,scroll?:boolean) {
            if (this.tag.index === index&&!scroll) return
            this.tag.index = index
            this.goodsQuery.pageIndex = 1
            this.goodsQuery.tp = item.value
            this.reqGoodsData(scroll?this.scrollToTp:null)
        }
        pageJump(url: string, type?: any) {
            if (url == '/pages/merchant/couponManage') {
                uni.navigateTo({
                    url: `/pages/merchant/couponManage?logo=${this.merchantInfo.logo}`
                })
                return
            }
            const jumpType = type ?? "navigateTo"
            //@ts-ignore
            uni[jumpType]({
                url
            })
        }
        filterImage(picstring: any,privatAll?:boolean) {
            if (!picstring) return ""
            let pics = picstring.split(',')
            if(privatAll){
                return pics.map((item:any)=>{
                    return decodeURIComponent(item)
                })
            }
            if (pics && pics.length == 1) return this.parsePic(picstring)
            if (pics && pics.length > 1) return this.parsePic(pics[0])
        }
        assignNiceTimeList(list: any) {
            if(!list.length){
                this.niceTimeFinish=true
                return
            } 
            this.niceTimeList = []
            const copies = Math.ceil(list.length / 3)
            let end=0
            for (let i = 0; i < copies; i++) {
                const start =end
                end=start + 3
                let arr = list.slice(start, end)
                this.niceTimeList.push(arr)
            }
            this.niceTimeFinish=true
        }
        // 跳转商品详情
        onClickJumpDetails(goodCode: any) {
            app.navigateTo.goGoodsDetails(goodCode)
        }
        reqMyMerchantData() {
            app.http.Get("dataApi/me/shop/home", {}, (res: any) => {
                this.merchantInfo = res.data

            })
        }
        reqMerchantData() {
            app.http.Get(`dataApi/merchant/newII/detail/` + this.alias, {}, (res: any) => {
                this.merchantInfo = res.data
            })
        }
        lowerCoupon() {
            if (!this.couponIsFetchEnd) {
                this.couponQuery.fetchFrom += this.couponQuery.fetchSize
                this.reqMerchantCoupon()
                return
            }
        }
        onClickGetMore() {
            this.couponQuery.fetchFrom = 1
            this.reqMerchantCoupon()
        }
        //获取商家店铺可领取的优惠券
        reqMerchantCoupon(cb?: any) {
            app.http.Get(`dataApi/merchant/online/coupon/` + this.alias, this.couponQuery, (res: any) => {
                this.couponIsFetchEnd = res.isFetchEnd
                const list = res.list || []
                this.couponQuery.fetchFrom == 1 ? this.couponList = list : this.couponList.push(...list)
                this.couponGetDrawerShow = true
                cb && cb()
            })
        }
        reqCouponBrief(){
            app.http.Get(`dataApi/merchant/coupon/brief/${this.alias}`,{},(res:any)=>{
                this.couponBrief=res.couponBrief || []
            })
        }
        reqNiceTime(){
            app.http.Get(`dataApi/merchant/rarity/card/brief/${this.alias}`,{},(res:any)=>{
                this.assignNiceTimeList(res.rarity_card|| [])
            },(err:any)=>{
                this.niceTimeFinish=true
            })
        }
        reqGoodsData(cb?: any) {
            app.http.Get('dataApi/merchant/1/goodlist/' + this.alias, this.goodsQuery, (res: any) => {
                const list: any = res.list || []
                this.goodsQuery.pageIndex == 1 ? this.goodsList = list : this.goodsList.push(...list)
                this.goodsTotalPage = res.totalPage
                this.goodsMsg = res
                delete this.goodsMsg.list
                if (cb){
                  setTimeout(()=>{
                    cb && cb()
                  },200)
                }
            })
        }

    }
</script>

<style lang="scss">
page {
  font-family: PingFang SC;
}

@font-face {
  font-family: BDZongYi-A001;
  src: url("https://ka-world.oss-cn-shanghai.aliyuncs.com/admin/debug/2022.08.26/seller/info/1661506714192c1fus35zzh.ttf");
}

.pageTopContainer {
  position: fixed;
  top: 0;
  z-index: 200;

  .pageTop {
    background-color: rgba(255, 255, 255, 0);
    box-sizing: border-box;
    display: flex;
    align-items: center;
    padding: 0 36rpx;
    justify-content: space-between;
    width: 750rpx;
    height: 88rpx;
    /* transition: all 0.2s linear; */
  }

  .btn-back {
    background: rgba(0, 0, 0, 0);
    font-family: uniicons;
    font-size: 46rpx;
    font-weight: normal;
    font-style: normal;
    color: #3c3c3c;
  }
  .whiteBack {
    width: 55rpx;
    height: 55rpx;
    background: rgba(255, 255, 255, 0.78);
    border-radius: 50%;
    image{
      position:relative;
      // right:1rpx;
    }
  }
  .pageTitle {
    font-size: 32rpx;
    color: #3c3c3c;
    position: absolute;
    font-family: HYQiHei;
    font-weight: bold;
    left: 0;
    right: 0;
    margin: auto;
    text-align: center;
    pointer-events: none;
  }

  .rightIcon {
    width: 40rpx;
    height: 40rpx;
    opacity: 0;
  }
}

.merchantBanner {
  display: block;
  width: 750rpx;
  z-index: 1;
  height: 380rpx;
}

.merchantInfoContainer {
  width: 716rpx;
  /* height: 215rpx; */
  background: #ffffff;
  box-shadow: 0rpx 1rpx 12rpx 0rpx #a8aaa9;
  border-radius: 5rpx;
  background-color: #fff;
  box-sizing: border-box;
  padding: 28rpx 30rpx 30rpx 30rpx;
  margin-top: -58rpx;
  z-index: 2;
}

.couponContainer {
  width: 706rpx;
  height: 148rpx;
  background-size: 100% 100%;
  background-image: url("../../static/merchant/couponContainer.png");
  margin-top: 33rpx;
  align-items: center;
  box-sizing: border-box;
  padding: 0 34rpx 0 20rpx;
  justify-content: space-between;

  .a {
  }

  .leftCoupon {
    width: 480rpx;
    /* background-color: rgba(0, 0, 0, .6); */
    height: 148rpx;
    align-items: center;
  }

  .leftCoupon-item {
    width: 490rpx;
    /* background-color: red; */
    display: flex;
    align-items: center;
    overflow: hidden;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .price {
    font-size: 38rpx;

    color: #fa1545;
    margin-right: 14rpx;
  }

  .couponRight {
    flex: 1;
    width: 0;

    .manj {
      /* max-width: 100%; */
      /* width: 100%; */
      font-size: 21rpx;
      font-weight: bold;
      color: #333333;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .type {
      font-size: 20rpx;
      font-weight: 400;
      color: #333333;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .rightReceive {
    width: 125rpx;
    font-size: 29rpx;
    font-weight: bold;
    color: #f6f7fb;
    height: 125rpx;
    background-size: 100% 100%;
    letter-spacing: 2rpx;
    background-image: url("../../static/merchant/receiveButton.png");
  }
}

.infoTop {
  .info-avatar {
    width: 111rpx;
    height: 111rpx;
    margin-right: 19rpx;
    border-radius: 5rpx;
  }

  .info-message {
    flex: 1;
    margin-top: 10rpx;
  }

  .info-name {
    font-size: 29rpx;
    font-weight: bold;
    color: #333333;
    display: flex;
		align-items: center;
    flex-wrap: wrap;
  }

  .info-introduction {
    font-size: 23rpx;
    font-weight: 400;
    color: #c0c0c0;
    margin-top: 10rpx;
  }

  .rightEdit {
    width: 147rpx;
    height: 52rpx;
    background: #f2f2f2;
    border-radius: 3rpx;
    font-size: 29rpx;
    font-weight: 500;
    color: #7c7c7c;
  }

  .followBtton {
    width: 127rpx;
    height: 52rpx;
    background: #fa1545;
    border-radius: 3rpx;
    font-size: 29rpx;
    font-family: PingFang SC;
    font-weight: 500;
    color: #f6f7fb;
  }

  .isFollo {
    background: #f2f2f2;
    color: #7c7c7c;
  }
}

.merchant-introduction {
  font-size: 25rpx;
  font-weight: 400;
  color: #7c7c7c;
  margin-top: 17rpx;
  letter-spacing: 0rpx;
  /* line-height: 24rpx; */
}

.ruleContainer {
  width: 750rpx;
  box-sizing: border-box;
  display: flex;
  padding: 0 28rpx;
  flex-wrap: wrap;
  margin-top: 39rpx;
  .ruleItem {
    width: 33.33%;
    height: 70rpx;
    margin-bottom: 35rpx;
    display: flex;
    align-items: center;
    pointer-events: auto;
  }

  .rule-left {
    width: 73rpx;
    height: 73rpx;
    background: rgba(230, 228, 227, 0.6);
    border-radius: 3rpx;
    margin-right: 14rpx;
  }

  .rule-icon {
    /* width: 36rpx; */
  }

  .rule-name {
    font-size: 27rpx;
    font-weight: 500;
    color: #333333;
  }

  .rule-tips {
    font-size: 23rpx;
    font-weight: 400;
    color: #7c7c7c;
  }
}

.moreContainer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 750rpx;
  box-sizing: border-box;
  padding: 0 29rpx;
  .more-left {
    font-size: 33rpx;
    font-weight: normal;
    font-style: italic;
    font-family: BDZongYi-A001;
    color: #333333;
  }

  .more-right {
    position: relative;
    font-size: 25rpx;
    font-family: PingFang SC;
    font-weight: 400;
    padding-right: 28rpx;
    color: #7b7a7a;
  }

  .more-right::after {
    content: "";
    display: block;
    width: 13rpx;
    height: 21rpx;
    background-size: 100% 100%;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    background-image: url("../../static/merchant/rightIcon.png");
  }
}

.niceTimeContainer {
  width: 695rpx;
  height: 350rpx;
  background-size: 100% 100%;
  background-image: url("../../static/merchant/niceTimeContainer.png");
  margin-top: 19rpx;
  box-sizing: border-box;
  padding: 22rpx 24rpx 0 24rpx;

  .niceTimeItem {
    width: 100%;
    display: flex;
    /* flex-wrap: nowrap; */
  }

  .niceTimeImage {
    width: 204rpx;
    height: 265rpx;
    overflow: hidden;
    display: block;
    border-radius: 5rpx;
    /* background: #E6DDDD; */
  }
}

.niceTimeContainer ::v-deep .uni-swiper-dots {
  bottom: 24rpx;
}

.niceTimeContainer ::v-deep .uni-swiper-dot {
  width: 11rpx;
  height: 11rpx;
}

.tagsContainer {
  padding: 0 28rpx;
  display: flex;
  /* justify-content: center; */
  justify-content: space-evenly;
  /* justify-content: space-between; */
  width: 750rpx;
  /* box-sizing: border-box; */
  padding-top: 53rpx;
  padding-bottom: 18rpx;
  background-color: #fff;
  /* height: 110rpx; */
  align-items: center;
  /* margin-top: 61rpx;
        margin-bottom: 50rpx; */

  .tag {
    font-size: 27rpx;
    font-weight: 400;
    color: #959699;

    /* margin-right:82rpx; */
    text {
      margin-left: 6rpx;
    }
  }

  .selectTag {
    font-size: 31rpx;
    font-weight: bold;
    color: #333333;
  }
}

.goodsList {
  box-sizing: border-box;
  width: 750rpx;
  background-color: #f5f7fb;
  padding-top: 20rpx;
  /* height: 2000rpx; */
}
</style>