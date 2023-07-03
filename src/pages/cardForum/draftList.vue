<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2023-06-30 14:05:10
 * @LastEditors: lsj a1353474135@163.com
 * @LastEditTime: 2023-07-03 15:45:12
 * @FilePath: \card-world\src\pages\cardForum\draftList.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <view class="content">
        <view style="width:750rpx;margin-top: 10rpx;">
            <waterfalls v-if="refresh" v-model="draftList" :showUser="false" @refreshDraft="refreshDraft" type="draftList">
            </waterfalls>
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
    refresh: boolean = true
    onLoad(query: any) {
        this.reqNewData()
    }
    refreshDraft() {
        this.refresh = false
        this.reqNewData()
        uni.showLoading({
            title: ""
        })
        setTimeout(() => {
            this.refresh = true
            uni.hideLoading()
        }, 500)
    }
    reqNewData(cb?: any) {
        this.draftList = []
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
