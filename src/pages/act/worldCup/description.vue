<template>
    <view class="content">
    </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from '@/base/BaseNode.vue';
@Component({})
export default class ClassName extends BaseNode {
    onLoad(query: any) {
    }
    reqNewData(cb?: any) {
        app.http.Get(`dataApi`, {}, (res: any) => {

        })
    }

}
</script>

<style lang="scss">

</style>
