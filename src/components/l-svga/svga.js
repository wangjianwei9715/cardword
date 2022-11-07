export class Player {
	constructor(component) {
		this.component = component
	}
	set loops(v) {
		this.component.rLoops = v
	}
	set clearsAfterStop(v) {
		this.component.rClearsAfterStop = v
	}
	set fillMode(v) {
		this.component.rFillMode = v
	}
	setText(text, key) {
		this.component.rSetText = [text, key]
		this.reset('rSetText')
	}
	clear(){
		this.component.rClear = true
		this.reset('rClear')
	}
	pauseAnimation() {
		this.component.rPauseAnimation = true
		this.reset('rPauseAnimation')
	}
	reset(name){
		setTimeout(() => {
			this.component[name] = false
		},30)
	}
	setVideoItem(videoItem) {
		const _this = this.component
		_this.rVideoItem = videoItem
		_this.rOnFinished = false
		return new Promise(resolve => {
			const shopWatch = _this.$watch('rSetVideoItem', (v) => {
				if(v) {
					resolve(true)
					this.reset('rSetVideoItem')
					shopWatch()
				}
			})
		})
	}
	startAnimation(reverse) {
		this.component.rStartAnimation = {reverse}
		this.reset('rStartAnimation')
	}
	stopAnimation(clear) {
		this.component.rStopAnimation = {
			clear
		}
		this.reset('rStopAnimation')
	}
	startAnimationWithRange(range, reverse) {
		this.component.rStartAnimationWithRange = {range, reverse}
		this.reset('rStartAnimation')
	}
	onFinished(cb){
		const shopWatch = this.component.$watch('rOnFinished', v => {
			if(v) {
				cb()
				shopWatch()
			}
		})
	}
	onFrame(cb) {
		const shopWatch = this.component.$watch('rOnFrame', v => {
			cb(v)
			shopWatch()
		})
	}
	onPercentage(cb) {
		const shopWatch = this.component.$watch('rOnPercentage', v => {
			cb(v)
			shopWatch()
		})
	}
	stepToFrame(frame, andPlay = false) {
		console.log('未实现')
	}
	stepToPercentage(percentage, andPlay = false) {
		console.log('未实现')
	}
	setContentMode(contentMode) {
		this.component.rSetContentMode = contentMode
		this.reset('rSetContentMode')
	}
	setImage(src, key) {
		this.component.rSetImage = [src, key]
		// this.reset('rSetImage')
	}
}

export class Parser {
	constructor(canvasId, component) {
		this.component = component
	}
}