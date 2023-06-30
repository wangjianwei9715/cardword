<template>
    <view class="content">
        <view style="width:750rpx;margin-top: 10rpx;">
            <waterfalls v-model="draftList" :showUser="false" @refreshDraft="refreshDraft" type="draftList"></waterfalls>
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
        this.reqNewData()
    }
    refreshDraft() {
        this.reqNewData()
    }
    reqNewData(cb?: any) {
        this.draftList = []
        // this.draftList = getDraftList("all")
        // console.log(this.draftList);
        this.draftList = getDraftList("all").map((item: any) => {
            return {
                cover: item.data.cover || "",
                url: item.data.url,
                title: item.data.title,
                create_at: item.stamp,
                type: item.type,
                draftId: item.draftId
            }
        })
    }

}
</script>

<style lang="scss">
page {
    background-color: #f2f2f2;
}
</style>
