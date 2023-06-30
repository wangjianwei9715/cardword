<template>
    <view class="content">
        <view style="width:750rpx;margin-top: 10rpx;">
            <waterfalls :value="draftList" :showUser="false" type="draftList"></waterfalls>
        </view>
    </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from '@/base/BaseNode.vue';
import { getDraftList } from "./func"
import waterfalls from "./components/waterfalls.vue"
@Component({
    components: {
        waterfalls
    }
})
export default class ClassName extends BaseNode {
    draftList: any = []
    onLoad(query: any) {
        this.draftList = getDraftList("all")
        console.log(this.draftList);
        this.draftList = this.draftList.map((item: any) => {
            return {
                cover: item.data.cover || "",
                title: item.data.title
            }
        })
    }
    reqNewData(cb?: any) {
        app.http.Get(`dataApi`, {}, (res: any) => {

        })
    }

}
</script>

<style lang="scss">
page {
    background-color: #f2f2f2;
}
</style>
