<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2022-12-21 18:00:50
 * @LastEditors: lsj a1353474135@163.com
 * @LastEditTime: 2022-12-21 18:25:58
 * @FilePath: \card-world\src\components\logisticsPop\logisticsPop.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <view>
        <u-popup :show="showValue" :round="5" mode="bottom" closeable @close="showValue = false">
            <view class="logPopContainer">
                <view class="logPopBody">
                    <view class="logPop_title flexCenter">物流信息</view>
                    <view class="logPop_code">
                        <view class="code">{{ logisticsInfo.name || '获取中' }} {{ logisticsInfo.no || '获取中' }}</view>
                        <view class="copy" @click="onClickCopy">复制</view>
                    </view>
                    <view class="logPop_content">
                        <u-steps direction="column" dot>
                            <u-steps-item :title="item.content" v-for="(item, index) in logisticsInfo.list"
                                :desc="item.time"></u-steps-item>
                        </u-steps>
                    </view>
                </view>
                <view class="bottomSafeArea"></view>
            </view>
        </u-popup>
    </view>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Watch } from "vue-property-decorator";
import BaseComponent from "@/base/BaseComponent.vue";
import { app } from "@/app";
@Component({})
export default class ClassName extends BaseComponent {
    @PropSync("visible", {
        type: Boolean
    }) showValue!: Boolean;

    @Prop({ default: "" })
    code!: string;
    logisticsInfo: any = {
        list: []
    }
    @Watch('visible')
    onVisibleChange(val: boolean, oldVal: boolean) {
        if (!val) this.logisticsInfo = {
            list: []
        }
        if (val) {
            this.getLogistics()
        }

    }
    created() {//在实例创建完成后被立即调用

    }
    mounted() {//挂载到实例上去之后调用
    }
    destroyed() {

    }
    onClickCopy() {
        if (!this.logisticsInfo.no) return
        uni.setClipboardData({
            data: this.logisticsInfo.no,
            showToast: false,
            success: () => {
                uni.showToast({
                    title: "已复制",
                    icon: 'none'
                })
            }
        });
    }
    getLogistics() {
        if (!this.code) return
        app.http.Get('me/orderInfo/wuliu/' + this.code, {}, (res: any) => {
            this.logisticsInfo = {
                name: res.data.wuliuName,
                no: res.data.no,
                list: res.data.list
            }
        })
    }
}
</script>

<style lang="scss">
.logPopContainer {
    border-radius: 5rpx 5rpx 0 0;
    background-color: #fff;
    width: 750rpx;
}

.logPopBody {
    height: 790rpx;
    width: inherit;
    display: flex;
    flex-direction: column;
}

.logPop_title {
    height: 100rpx;
    border-bottom: 1rpx solid rgba(174, 173, 173, .2);
    font-size: 33rpx;
    font-family: PingFang SC;
    font-weight: 600;
    color: #333333;
}

.logPop_code {
    height: 90rpx;
    width: inherit;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 0 50rpx;
    font-size: 25rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #333333;
    border-bottom: 1rpx solid #E6E6E6;

    .code {
        flex: 1;
    }
}

.logPop_content {
    flex: 1;
    overflow-y: auto;
    box-sizing: border-box;
    padding: 20rpx 30rpx 0rpx 30rpx;
}
</style>
