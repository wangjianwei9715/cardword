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
        <u-popup :show="showValue" :round="10" mode="bottom" @close="showValue = false">
            <view>
                <text>人生若只如初见，何事秋风悲画扇</text>
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
    logisticsCode!: string;


    logisticsInfo: any = {
    }
    @Watch('visible')
    onVisibleChange(val: boolean, oldVal: boolean) {
        if (!val) this.logisticsInfo = {}
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
    getLogistics() {
        console.log(this.logisticsCode);
        
        if (!this.logisticsCode) return
        app.http.Get('me/orderInfo/wuliu/' + this.logisticsCode, {}, (res: any) => {
            this.logisticsInfo = {
                name: res.data.wuliuName,
                no: res.data.no,
                list: res.data.list
            }
        })
    }
}
</script>

<style>

</style>
