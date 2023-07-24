<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2023-06-30 14:05:10
 * @LastEditors: lsj a1353474135@163.com
 * @LastEditTime: 2023-07-24 14:10:24
 * @FilePath: \jichao_app_2\src\pages\cardForum\draftList.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <view class="content">
        <waterfalls style="width: 750rpx;margin-top: 10rpx;" ref="waterfall" :value="list" :showUser="false"
            type="draftList">
        </waterfalls>
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
    list: any = []
    refresh: boolean = false
    userId = 0;
    draftType: "cardBook" | "dynamic" | "all" = "all";
    isFetchEnd: boolean = true
    queryParams: any = {
        fetchFrom: 1,
        fetchSize: 10
    }
    onLoad(query: any) {
        if (query.draftType) this.draftType = query.draftType;
        app.user.getUserInfo().then((userInfo: any) => {
            this.userId = userInfo.userId
            this.reqNewData()
            uni.$on("refreshDraft", this.refreshDraft)
        })
    }
    onShow() {
        if (this.refresh) {
            uni.showLoading({
                title: "",
                mask: true
            })
            this.queryParams.fetchFrom = 1
            this.$refs.waterfall.clear();
            this.list = []
            setTimeout(() => {
                this.reqNewData()
            }, 200)
            this.refresh = false
        }
    }
    beforeDestroy() {
        uni.$off("refreshDraft", this.refreshDraft)
    }
    onReachBottom() {
        if (this.isFetchEnd) return
        this.queryParams.fetchFrom += this.queryParams.fetchSize
        this.reqData()
    }
    refreshDraft(code?: string) {
        this.refresh = true
    }
    reqData() {
        app.http.Get(`dataApi/cardCircle/list/me/draft`, this.queryParams, (res: any) => {
            this.isFetchEnd = res.isFetchEnd
            let list = (res.list || []).filter((item: any) => {
                if (this.draftType == "dynamic") {
                    return item.tp != 3
                } else if (this.draftType == "cardBook") {
                    return item.tp === 3
                } else {
                    return item.tp
                }
            })
            let newList = list.filter((item: any) => {
                const findIndex: number = this.draftList.findIndex((local: any) => {
                    return local.draftId === item.code
                })
                return findIndex < 0
            })
            newList = newList.map((item: any) => {
                if (this.draftType == "dynamic") {
                    //卡圈
                    return {
                        cover: item.cover || "",
                        url: item.url,
                        title: item.title,
                        create_at: item.created_at,
                        code: item.code
                    }
                } else {
                    //卡册
                    return {
                        cover: item.cover || "",
                        url: item.url,
                        title: item.title,
                        create_at: item.created_at,
                        code: item.code
                    }
                }
            })
            if (this.queryParams.fetchFrom == 1) {
                this.list = [...this.draftList, ...newList].sort((x: any, y: any) => {
                    return y.create_at - x.create_at
                })
            } else {
                this.list.push(...newList)
            }
            this.$forceUpdate()
        })
        uni.hideLoading()
    }
    reqNewData(cb?: any) {
        this.draftList = []
        this.draftList = getDraftList(this.draftType, this.userId).map((item: any) => {
            return {
                cover: item.type == "cardBook" ? (item.data.albumCover || "") : (item.data.cover || ""),
                url: item.data.url,
                title: item.data.title,
                create_at: item.stamp,
                type: item.type,
                draftId: item.draftId
            }
        })
        this.reqData()
    }

}
</script>

<style lang="scss">
page {
    background-color: #f2f2f2;
}
</style>
