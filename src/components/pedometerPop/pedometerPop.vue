<template>
    <view>
        <view class="drawer-shadow" v-show="show" @click="onClickCloseDrawer"></view>
        <!-- :style="'height:'+height+heightType" -->
        <view class="drawer-content" :class="{'show-drawer':show}">
            <view class="drawer-title">兑换奖品</view>
            <view class="drawer-introduction">请输入兑换数量</view>
            <view class="pedoBox">
                <view class="peodoBox-action" @click="peodoAction('reduce')">
                    <view class="peodoBox-reduce"></view>
                </view>
                <input type="number" class="peodoBox-input" @input="onInput" ref='peodoBoxInput' :value="value">
                <view class="peodoBox-action peodoBox-action-left" @click="peodoAction('add')">
                    <image class="peodoBox-add" src="/static/act/playGroup/add.png" mode="scaleToFill" />
                </view>
                <view class="peodoBox-max" style="color:#1B5AB6" @click="nowValue=nowMaxValue">MAX</view>
            </view>
            <view class="drawer-bottom">
                <view class="peodoBox-button" @click="onClickCloseDrawer()">取消</view>
                <view class="peodoBox-button peodoBox-confirm" @click="$u.throttle(onConfirm,500)">确认</view>
            </view>
            <!-- <view class="drawer-header">
                {{title}}
                <view class="close-icon" @click="onClickCloseDrawer"></view>
            </view> -->
            <!-- <view class="drawer-center">
                <slot></slot>
            </view> -->
        </view>
    </view>

</template>

<script lang="ts">
    import { Component, Prop, Vue, PropSync } from "vue-property-decorator";
    import BaseComponent from "@/base/BaseComponent.vue";
    @Component({})
    export default class ClassName extends BaseComponent {
        // @Prop({ default: false })
        // showDrawer:boolean|undefined;
        @PropSync("show", {
            type: Boolean
        })
        showValue!: Boolean;
        @PropSync("value", {
            type: Number
        })
        nowValue!: any;
        @PropSync("maxValue", {
            type: Number
        })
        nowMaxValue!: number;
        @Prop({ default: "" })
        title!: string;
        @Prop({ default: "" })
        introduction!: string;
        @Prop({ default: 60 })
        height!: number;
        @Prop({
            default: "%"
        })
        heightType!: string;
        inputTimer:any=null
        created() {
            //在实例创建完成后被立即调用
        }
        mounted() {
            //挂载到实例上去之后调用
        }
        destroyed() { }
        peodoAction(type: string) {
            if (!this.nowValue || this.nowValue == '0') this.nowValue = 0
            const shouldVal = type == 'add' ? this.nowValue + 1 : this.nowValue - 1
            this.checkNum(shouldVal)
        }
        checkNum(shouldVal: any) {
            shouldVal = Number(shouldVal)
            if (shouldVal <= 0) this.nowValue = 0
            if (shouldVal >= this.nowMaxValue) this.nowValue = this.nowMaxValue
            if (shouldVal < this.nowMaxValue && shouldVal > 0) this.nowValue = shouldVal
			//@ts-ignore
            this.$refs.peodoBoxInput.valueSync = this.nowValue
        }
        onInput(event: any) {
            const { value } = event.detail
            this.inputTimer && clearTimeout(this.inputTimer)
            if (value == '') {
                this.inputTimer = setTimeout(() => {
                   this.nowValue = 0
				   //@ts-ignore
                     this.$refs.peodoBoxInput.valueSync = 0
                }, 100)
                return
            } else {
                this.inputTimer = setTimeout(() => {
                    this.checkNum(value)
                }, 100)
            }
        }
        onConfirm(){
            if(!this.nowValue){
                console.log(33333);
                
                uni.showToast({
                    title:'请核对数量',
                    icon:'none'
                })
                return
            }
            this.showValue=false
            this.$emit('confirm');
        }
        onClickCloseDrawer() {
            
            this.$emit("closeDrawer");
            this.showValue = false;
        }
    }
</script>

<style lang="scss">
    .drawer-shadow {
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        z-index: 999;
        background: rgba(0, 0, 0, 0.5);
    }

    .drawer-content {
        position: fixed;
        //   bottom: 0;
        //   left: 0;
        left: 0;
        right: 0;
        margin: auto;
        top: 30.8%;
        width: 609rpx;
        height: 369rpx;
        background: #ffffff;
        border-radius: 5rpx;
        // height:60%;
        // width: 100%;
        background: #fff;
        z-index: 1000;
        box-sizing: border-box;
        transition: all 0.2s;
        border-radius: 5rpx 5rpx 0px 0px;
        pointer-events: none;
        transform: scale(0);
        // padding-bottom:constant(safe-area-inset-bottom);
        // padding-bottom: env(safe-area-inset-bottom);
        // transform: translateY(100%);
    }

    .show-drawer {
        transform: scale(1);
        pointer-events: auto;
        // transform: translateY(0);
    }

    .drawer-title {
        font-size: 38rpx;
        font-family: PingFang SC;
        font-weight: 600;
        color: #333333;
        width: inherit;
        text-align: center;
        margin-top: 32rpx;
    }

    .drawer-introduction {
        width: inherit;
        text-align: center;
        font-size: 21rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #757575;
        margin-top: 6rpx;
    }

    .pedoBox {
        width: 351rpx;
        height: 85rpx;
        border: 1rpx solid #cfcdcd;
        margin: 0 auto;
        position: relative;
        margin-top: 20rpx;
        display: flex;
        align-items: center;
    }
    .peodoBox-input{
        flex: 1;
        border-color: red;
        height: inherit;
        text-align: center;
        font-size: 50rpx;
font-family: PingFang SC;
font-weight: 600;
color: #333333;
    }
    .peodoBox-action {
        width: 84rpx;
        height: 68rpx;
        border-right: 2rpx solid #cfcdcd;
        display: flex;
        align-items: center;
        justify-content: center;

        .peodoBox-reduce {
            width: 32rpx;
            height: 6rpx;
            background: #9B9B9B;
        }

        .peodoBox-add {
            width: 33rpx;
            height: 33rpx;
        }


    }
    .peodoBox-action-left{
        border-right: 0rpx solid #cfcdcd;
        border-left: 2rpx solid #cfcdcd;
    }
    .peodoBox-max {
        font-size: 29rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #1B5AB6;
        position: absolute;
        top: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        right: -90rpx;
        margin: auto;
    }

    .drawer-bottom {
        margin-top: 37rpx;
        display: flex;
        justify-content: space-evenly;
    }

    .peodoBox-button {
        width: 207rpx;
        height: 63rpx;
        border: 1rpx solid #757575;
        border-radius: 3rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 29rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #757575;
    }

    .peodoBox-confirm {
        background-color: #1B5AB6;
        border: 1rpx solid #1B5AB6;
        color: #fff;
    }

    .drawer-header {
        width: 100%;
        height: 100rpx;
        position: absolute;
        top: 0;
        left: 0;
        background: #fff;
        font-size: 38rpx;
        font-family: PingFang SC;
        font-weight: 600;
        color: #333333;
        z-index: 3;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5rpx 5rpx 0px 0px;
    }

    .black-line {
        width: 25%;
        height: 10rpx;
        background: #000;
        border-radius: 40rpx;
    }

    .drawer-center {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding: 100rpx 30rpx 30rpx 30rpx;
        overflow-y: auto;
    }

    .close-icon {
        width: 29rpx;
        height: 27rpx;
        background: url(../../static/goods/v2/icon_close.png) no-repeat center;
        background-size: 100% 100%;
        position: absolute;
        right: 23rpx;
        top: 23rpx;
    }
</style>