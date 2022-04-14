<template>
	<view>
		<view class="actionItem" :class="{redAction:!follow}" @click.stop="handleAction">
			{{follow?'已关注':'关注'}}
		</view>
		<followModal v-if='modalShow' @cancel='modalShow=false' @confirm='followAction'></followModal>
	</view>
</template>

<script lang="ts">
	import {
		Component,
		Prop,
		Vue,
		Watch
	} from "vue-property-decorator";
	import {
		app
	} from "@/app";
	import BaseComponent from "@/base/BaseComponent.vue";
	@Component({})
	export default class ClassName extends BaseComponent {
		@Prop({
			default: false
		}) follow: boolean | undefined;
		@Prop({
			default: 0
		}) followID: any;
		modalShow = false;
		followCopy = false;
		handleAction() {
			if (!this.follow) this.followAction()
			if (this.follow) this.modalShow = true
		}
		followAction() {
			if (!this.followID) return
			app.http.Post('merchant/follow/' + this.followID, {}, (res: any) => {
				this.$emit('handleSuccess', res.data)
				this.modalShow = false
			})
		}
		created() { //在实例创建完成后被立即调用

		}
		mounted() { //挂载到实例上去之后调用
		}
		destroyed() {

		}
	}
</script>

<style lang="scss">
	.actionItem {
		width: 122rpx;
		height: 44rpx;
		font-size: 22rpx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: #88878c;
		line-height: 44rpx;
		text-align: center;
		letter-spacing: 1rpx;
		background-size: 100% 100%;
		background-image: url("../../static/userinfo/v2/whiteCard.png");
	}


	.redAction {
		background-image: url("../../static/userinfo/v2/redCard.png");
		color: #fff;
	}
</style>
