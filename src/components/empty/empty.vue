<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2023-06-29 18:34:18
 * @LastEditors: lsj a1353474135@163.com
 * @LastEditTime: 2023-06-30 18:42:46
 * @FilePath: \card-world\src\components\nEmpty\nEmpty.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
	<view class="content">
		<view class="empty">
			<image class="empty_img" src="@/static/index/empty@2x.png"></image>
		</view>
		<text class="empty-text">空空如也…</text>
	</view>
</template>
<script>
export default {
	name: '',
	components: {

	},
	mixins: [],
	props: {

	},
	data() {
		return {

		}
	},
	computed: {

	},
	watch: {

	},
	mounted() {

	},
	methods: {

	}
};
</script>
<style lang="scss" scoped>
.content {
	/*  */
	// #ifndef APP-NVUE
	width: 100%;
	box-sizing: border-box;
	pointer-events: none;
	// #endif
	// #ifdef APP-NVUE
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 750rpx;
	// #endif
}

.empty {
	width: 294rpx;
	height: 256rpx;
	// background: url(@/static/index/empty@2x.png) no-repeat center;
	// background-size: 100% 100%;
	// 
	// #ifndef APP-NVUE
	margin: 0 auto;
	// #endif
	margin-top: 240rpx;
	margin-bottom: 12rpx;

}

.empty_img {
	width: 294rpx;
	height: 256rpx;
}

.empty-text {
	/*  */
	// #ifndef APP-NVUE
	width: 100%;
	// #endif
	text-align: center;
	font-size: 26rpx;
	
	font-weight: 400;
	color: #BABDC7;
}
</style>