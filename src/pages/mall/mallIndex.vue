<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2022-12-16 17:50:05
 * @LastEditors: lsj a1353474135@163.com
 * @LastEditTime: 2022-12-20 09:50:00
 * @FilePath: \card-world\src\pages\mall\mallIndex.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <view class="content">
        <transitionNav @getNavHeight="getNavHeight" ref='transitionNav' :needRightTools="['客服']" :needIconShadow="true"
            title="卡币商城">
        </transitionNav>
        <view class="topBanner"></view>
        <u-swiper style="width: 750rpx" :list="list3" indicator indicatorMode="line" circular></u-swiper>
        <u-sticky v-if="navHeight" :customNavHeight="navHeight">
            <view class="uTabs">
                <u-tabs :list="list1"></u-tabs>
            </view>

        </u-sticky>

        <view class="pages"></view>
    </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from '@/base/BaseNode.vue';
@Component({})
export default class ClassName extends BaseNode {
    list3: any = [
        'https://ka-world.oss-cn-shanghai.aliyuncs.com/admin/debug/2022.12.16/luckdraw/0/167115924208198rhetzoo.jpg',
        'https://ka-world.oss-cn-shanghai.aliyuncs.com/admin/debug/2022.12.16/luckdraw/0/167115924208198rhetzoo.jpg',
        'https://ka-world.oss-cn-shanghai.aliyuncs.com/admin/debug/2022.12.16/luckdraw/0/167115924208198rhetzoo.jpg',
    ]
    app: any = app
    navHeight: number = 0
    myPoint: number = 0;
    list1: any = [
        {
            name: '全部'
        },
        {
            name: '限时兑换'
        }, {
            name: '卡盒卡包'
        },
        {
            name: '卡具'
        },
        {
            name: '其他'
        }
    ]
    onLoad(query: any) {
    }
    onPageScroll(data: any) {
        //@ts-ignore
        this.$refs.transitionNav && this.$refs.transitionNav.setPageScroll(data)
        // this.scrollTop = data.scrollTop
    }
    getNavHeight(event: any) {
        this.navHeight = event
    }
    //获取个人卡币
    reqMeCardBean(cb?: Function) {
        app.http.Get("dataApi/point/index", {}, (res: any) => {
            this.myPoint = res.point || 0
            cb && cb();
        });
    }
    //获取轮播图
    reqSwiperData() {
        app.http.Get(`dataApi`, {}, (res: any) => {

        })
    }
    reqNewData(cb?: any) {
        app.http.Get(`dataApi`, {}, (res: any) => {

        })
    }

}
</script>

<style lang="scss">
.topBanner {
    width: 750rpx;
    height: 400rpx;
    background-color: red;
}

.uTabs {
    width: 750rpx;
    background-color: #000;
}

.pages {
    height: 2000rpx;
}
</style>
