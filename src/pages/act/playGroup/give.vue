<template>
    <view class='playContent'>
        <navigationShare navigatetoTitle="赠送球员" rightText='收赠记录' @onClickRightText="onClickRightText" />
        <view style="padding-top:88rpx">
            <statusbar />
        </view>
        <view class="giveItem" v-for="(item,index) in playerList" :key="index">
            <view class="giveItem-left">
                <view class="name">{{item.name}}</view>
                <view class="num">拥有:<text>{{item.num}}</text></view>
            </view>
            <view class="giveItem-right">
                <view class="num" style="font-size: 20.83rpx;width: inherit;text-align: center;">赠送数量</view>
                <view class="pedoBox">
                    <view class="peodoBox-action" @click="peodoAction('reduce',item,index)">
                        <view class="peodoBox-reduce"></view>
                    </view>
                    <input type="number" v-model="item.selectNum" @input="onInput($event,item,index)" ref="peoInput"
                        class="peodoBox-input" />
                    <view class="peodoBox-action peodoBox-action-left" @click="peodoAction('add',item,index)">
                        <image class="peodoBox-add" src="/static/act/playGroup/add.png" mode="scaleToFill" />
                    </view>
                </view>
            </view>
        </view>
        <view class="bottomSafe"></view>
        <empty v-if='!playerList.length' />
        <view class="giveBottom">
            <input type="number" v-model="receive_userId" class="giveBottom-input" placeholder="请输入赠送id" />
            <view class="giveBottom-msg">
                <view class="leftText">已选：{{selectAllNum}}</view>
                <view class="rightButton" @click="onClickSend">立即赠送</view>
            </view>
        </view>
    </view>
</template>

<script lang="ts">

    import { app } from "@/app";
    import { Component, Watch } from "vue-property-decorator";
    import BaseNode from "../../../base/BaseNode.vue";
    import { parsePic } from "@/tools/util";
    @Component({})
    export default class ClassName extends BaseNode {
        parsePic: any = parsePic
        playerList: any = []
        inputTimer: any = null
        allSelectNum: number = 0
        receive_userId:string=''
        private get selectAllNum() {
            const { playerList } = this
            if (!playerList.length) return 0
            const allSelectNum = playerList.reduce((prev: number, cur: any) => {
                return +prev + Number(cur.selectNum)
            }, 0)
            this.allSelectNum=allSelectNum
            return allSelectNum
        }
        onLoad(){
            this.reqNewData()
        }
        onClickRightText() {
            this.pageJump("/pages/act/playGroup/giveList")
        }
        peodoAction(type: string, item: any, index: number) {
            if (!item.selectNum || item.selectNum == '0') item.selectNum = 0
            const shouldVal = type == 'add' ? item.selectNum + 1 : item.selectNum - 1
            this.checkNum(shouldVal, item,index)
        }
        onInput(event: any, item: any,index:number) {
            const { value } = event.detail
            this.inputTimer && clearTimeout(this.inputTimer)
            if (value == '') {
                this.inputTimer = setTimeout(() => {
                    item.selectNum = "0"
                    this.$refs.peoInput[index].valueSync = "0"
                }, 100)
                return
            } else {
                this.inputTimer = setTimeout(() => {
                    this.checkNum(value, item,index)
                }, 100)
            }
        }
        checkNum(shouldVal: any, item: any,index:number) {
            shouldVal = Number(shouldVal)
            if (shouldVal <= 0) item.selectNum = 0
            if (shouldVal >= item.num) item.selectNum = item.num
            if (shouldVal < item.num && shouldVal > 0) item.selectNum = shouldVal
            this.$refs.peoInput[index].valueSync = item.selectNum
        }
        onClickSend(){
            if(!this.receive_userId){
                uni.showToast({
                    title: '请输入获赠人用户id',
                    icon: 'none'
                })
                return
            }
            if(!this.allSelectNum){
                uni.showToast({
                    title: '赠送数量不能为0',
                    icon: 'none'
                })
                return
            }
            let players=this.playerList.filter((item:any)=>{
                return item.selectNum>0
            })
            players=players.map((item:any)=>{
                return {
                    id:item.id,
                    num:item.selectNum
                }
            })
            app.http.Post('activity/playerGroup/send/player',{
                receive_userId:Number(this.receive_userId),
                players
            },(res:any)=>{
                console.log('赠送成功');
                
                uni.showToast({
                    title:'赠送成功',
                    icon:'success'
                })
                this.reqNewData()
                
                this.receive_userId=""
                setTimeout(()=>{
                    let pages = getCurrentPages();
				let prePage = pages[pages.length - (2)];
                prePage&&prePage.$vm.reqNewData(null,true)
                },1000)
            })
        }
        pageJump(url: string) {
            uni.navigateTo({
                url
            })
        }
        previewImage(list: any, index: number) {
            const urls = list.map((item: any) => this.parsePic(item.src));
            uni.previewImage({
                urls,
                current: index
            });
        }
        reqNewData(cb?: Function) {
            app.http.Get('activity/playerGroup/user/getPlayer', {}, (res: any) => {
                this.playerList = res.list.map((item:any)=>{
                    return {
                        ...item,
                        selectNum:0
                    }
                })
            })
        }
    }
</script>

<style lang="scss">
    page {
        height: 100%;
        background-color: #f7f7f7;
    }

    @font-face {
        font-family: HYLiLiangHeiJ;
        src: url("https://ka-world.oss-cn-shanghai.aliyuncs.com/admin/debug/2022.08.12/seller/info/16602943088150ns2974oh.ttf");
    }

    @font-face {
        font-family: YouSheBiaoTiHei;
        src: url("/static/act/playGroup/YouSheBiaoTiHei-2.ttf");
    }
    .bottomSafe{
        height: 240rpx;
        background: #f7f7f7;
        padding-bottom: constant(safe-area-inset-bottom);
        padding-bottom: env(safe-area-inset-bottom);
        width: 750rpx;
    }
    .giveBottom {
        width: 750rpx;
        position: fixed;
        height: 230rpx;
        padding-bottom: constant(safe-area-inset-bottom);
        padding-bottom: env(safe-area-inset-bottom);
        background: #FFFFFF;
        bottom: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    
    .giveBottom-input {
        width: 676rpx;
        height: 63rpx;
        background: #EFEFEF;
        font-size: 25rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #88878C;
        padding: 0 29rpx;
        box-sizing: border-box;
        margin-top: 32rpx;
    }

    .giveBottom-msg {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 676rpx;
        margin-top: 30rpx;

        .leftText {
            font-size: 29rpx;
            font-family: PingFang SC;
            font-weight: 600;
            color: #333333;
            max-width: 180rpx;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .rightButton {
            width: 517rpx;
            height: 69rpx;
            background: #2E59B0;
            border-radius: 3rpx;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 29rpx;
            font-family: PingFang SC;
            font-weight: 400;
            color: #FFFFFF;
        }
    }

    .giveItem {
        width: 722rpx;
        height: 133rpx;
        background: #FFFFFF;
        border-radius: 5rpx;
        box-sizing: border-box;
        margin: 14rpx auto;
        padding: 0 24rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .name {
        font-size: 29rpx;
        font-family: PingFang SC;
        font-weight: 600;
        color: #333333;
    }

    .num {
        font-size: 25rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #88878C;
    }

    .pedoBox {
        width: 170rpx;
        height: 37rpx;
        /* border: 1rpx solid #cfcdcd; */
        margin: 0 auto;
        position: relative;
        margin-top: 20rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .peodoBox-input {
        width: 79rpx;
        height: 37rpx;
        background: #EFEFEF;
        border-color: red;
        text-align: center;
        font-size: 25rpx;
        font-family: PingFang SC;
        font-weight: 600;
        color: #333333;
    }

    .peodoBox-action {
        width: 37rpx;
        height: 37rpx;
        /* border-right: 2rpx solid #cfcdcd; */
        display: flex;
        align-items: center;
        justify-content: center;

        .peodoBox-reduce {
            width: 21rpx;
            height: 4rpx;
            background: #9B9B9B;
        }

        .peodoBox-add {
            width: 22rpx;
            height: 22rpx;
        }


    }

    .peodoBox-action-left {
        /* border-right: 0rpx solid #cfcdcd; */
        /* border-left: 2rpx solid #cfcdcd; */
    }
</style>