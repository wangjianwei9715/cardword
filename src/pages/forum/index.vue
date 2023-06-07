<!--
 * @FilePath: \jichao_app_2\src\pages\forum\index.vue
 * @Author: wjw
 * @Date: 2023-05-26 16:52:56
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-06-06 13:55:51
 * Copyright: 2023 .
 * @Descripttion: 
-->
<template>
	<view class="content">
<!--         
        <video :src="src" @loadedmetadata="onLoadedmetadata"></video>
		<image v-for="item in frames" :key="item" :src="item"></image> -->
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '@/base/BaseNode.vue';
	@Component({
    })
	export default class ClassName extends BaseNode {
		frames:any = [];
		// src= 'http://cdn.ka-world.com/admin/debug/2022.10.12/thirdParty/broadcast/liveVideo/1665560690346y0moh0s1pn.mp4'
        onLoad(query:any) {
		}
		// onLoadedmetadata(event:any) {
		// 	const duration = Math.floor(event.target.duration*1000/4)
		// 	let currentTime = 0;
		// 	for (let i = 0; i < 5; i++) {
		// 		this.frames.push(`${this.src}?x-oss-process=video/snapshot,t_${currentTime},f_jpg`)
		// 		currentTime += duration
		// 	}
		// }
		// plus.gallery.pick((event:any)=>{
		// 	const files = event.files;
		// 	console.log(files);
			
		// }, ()=>{
			
		// }, {filter:'none',maximum:9,multiple:true})
		// return;
	}
</script>

<style lang="scss">
    page{
        background:#fff
    }
	.content{
		width: 100%;
		box-sizing:border-box;
        background:#fff
	}
	
</style>
