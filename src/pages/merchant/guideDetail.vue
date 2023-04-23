<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2023-04-20 17:49:20
 * @LastEditors: lsj a1353474135@163.com
 * @LastEditTime: 2023-04-23 14:15:25
 * @FilePath: \card-world\src\pages\merchant\guideDetail.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <view class="content">
        <view class="ql-editor wrap">
            <view v-for="(content, index) in contentArr" :key="index">
                <rich-text class="desc" :nodes="content" @itemclick="articlePreviewImage" />
                <video class="desc-video" :direction="0" :poster="`${videoArr[index]}?x-oss-process=video/snapshot,t_0,f_jpg`" style="width: 100%;" v-if="videoArr[index] !== null" :src="videoArr[index]" controls></video>
            </view>
            <view class="time">最后更新日期：{{ $u.timeFormat(formData.updated_at, 'yyyy-mm-dd hh:MM') }}</view>
        </view>
        <view class="bottomSafeArea"></view>
    </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from '@/base/BaseNode.vue';
@Component({})
export default class ClassName extends BaseNode {
    id: number = 0
    formData: any = {
        content: ""
    }
    videoArr: any = []
    contentArr: any = []
    onLoad(query: any) {
        this.id = +query.id
        this.reqNewData()
    }
    articlePreviewImage(e: any) {
        const item = e.detail.node;
        if (item.name == 'img') {
            uni.previewImage({
                urls: [item.attrs.src]
            });
        }
    }
    init() {
        const arr = decodeURIComponent(this.formData.content).split('</iframe>');
        const reg = /<iframe([\s\S]*)/g;
        for (let i in arr) {
            const item = arr[i];
            const urlMatch = item.match(/<iframe[\s\S]*src=\"(.*?)\"/);
            if (urlMatch && urlMatch.length > 1) {
                this.videoArr[i] = urlMatch[1];
            } else {
                this.videoArr[i] = null;
            }
            this.contentArr.push(item.replace(reg, ''))
        }
    }
    reqNewData(cb?: any) {
        app.http.Get(`dataApi/merchant/guide/detail/${this.id}`, {}, (res: any) => {
            this.formData = res.data
            this.formData.content = decodeURIComponent(res.data.content)
            uni.setNavigationBarTitle({
                title: res.data.title
            });
            this.init()
        })
    }

}
</script>

<style lang="scss">
.wrap {
    width: 750rpx;
    box-sizing: border-box;
    padding: 20rpx 30rpx;

}

.desc {
    font-size: 28rpx;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #14151A;
    line-height: 50rpx;
    letter-spacing: 2rpx;
}

.wrap ::v-deep img {
    max-width: 100%;
}

.time {
    margin-top: 20rpx;
}
</style>
