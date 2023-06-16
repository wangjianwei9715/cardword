<template>
    <div class="con">
        <template v-if="viewWidth">
            <movable-area class="area" :style="{ height: areaHeight }" @mouseenter="mouseenter" @mouseleave="mouseleave">
                <movable-view v-for="(item, index) in imageList" :key="item.id" class="view" direction="all" :y="item.y"
                    :x="item.x" :damping="40" :disabled="item.disable" @change="onChange($event, item)"
                    @touchstart="touchstart(item, $event)" @mousedown="touchstart(item)"
                    @touchend="touchend($event, item, index)" @mouseup="touchend($event, item)" :style="{
                            width: viewWidth + 'px',
                            height: viewWidth + 'px',
                            'z-index': item.zIndex,
                            opacity: item.opacity
                        }">
                    <div class="area-con" :style="{
                            width: childWidth,
                            height: childWidth,
                            borderRadius: borderRadius + 'rpx',
                            transform: 'scale(' + item.scale + ')'
                        }">
                        <image class="pre-image" :src="parsePic(decodeURIComponent(item.src))" mode="aspectFill"></image>

                    </div>
                </movable-view>
                <div class="add" v-if="imageList.length < number"
                    :style="{ top: add.y, left: add.x, width: viewWidth + 'px', height: viewWidth + 'px' }"
                    @click="addImages">
                    <div class="add-wrap"
                        :style="{ width: childWidth, height: childWidth, borderRadius: borderRadius + 'rpx' }">
                        <image style="width: 54rpx;height: 54rpx;"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA2CAYAAACMRWrdAAABIUlEQVRoQ+2a2w2DMAxFeQzWrsMUbadAsEw3S1CqVgppKwLX8BEOP4iHTXx8uUgWdVXoVhdaV0VhSmf7vr/H8V3XzY6V3P9iD+nYOI5P7/01LMI596AwoZV0TIBXIUWFXhKLFBWYSFGhhxQN6SFFQ5i4ogITKSr0cEVDekjRECauqMBEigq9U7piOk2yAti27SUe5ljlTfPEQ6KZecTvwl4P3ytvOv06R2HDMNzes7+6aRrvnHvtf50L13Lp50rx88zcvNlS3JpwKQ67XyK04nq2nFbk/LqVjin0TvmBNgQ2S4UUDcliHgpMpKjQwxUN6SFFQ5i4ogITKSr0cEVDekjRECauqMAsVoph+hVPtYr5+03p9tbYQ96xrYtT4ootbAJGVxxVTapVswAAAABJRU5ErkJggg==">
                        </image>
                    </div>
                </div>
            </movable-area>

        </template>
        <div class="deleteBlock flexCenter" :style="{ bottom: onMove ? `0rpx` : `-240rpx` }">
            拖动到此处删除
        </div>
    </div>
</template>
  
<script>
import { parsePic } from "@/tools/util";
import { app } from "@/app"
export default {
    emits: ["input", "update:modelValue"],
    props: {
        // 排序图片
        value: {
            type: Array,
            default: function () {
                return [];
            }
        },
        // 排序图片
        modelValue: {
            type: Array,
            default: function () {
                return [];
            }
        },
        // 从 list 元素对象中读取的键名
        keyName: {
            type: String,
            default: null
        },
        // 选择图片数量限制
        number: {
            type: Number,
            default: 6
        },
        // 图片父容器宽度（实际显示的图片宽度为 imageWidth / 1.1 ），单位 rpx
        // imageWidth > 0 则 cols 无效
        imageWidth: {
            type: Number,
            default: 0
        },
        // 图片列数
        cols: {
            type: Number,
            default: 3
        },
        // 图片圆角，单位 rpx
        borderRadius: {
            type: Number,
            default: 3
        },
        // 图片周围空白填充，单位 rpx
        padding: {
            type: Number,
            default: 10
        },
        // 拖动图片时放大倍数 [0, ∞)
        scale: {
            type: Number,
            default: 1.1
        },
        // 拖动图片时不透明度
        opacity: {
            type: Number,
            default: 0.7
        },
        // 自定义添加
        addImage: {
            type: Function,
            default: null
        },
        // 删除确认
        delImage: {
            type: Function,
            default: null
        }
    },
    data() {
        return {
            parsePic,
            imageList: [],
            width: 0,
            add: {
                x: 0,
                y: 0
            },
            colsValue: 0,
            viewWidth: 0,
            tempItem: null,
            timer: null,
            changeStatus: true,
            preStatus: true,
            first: true,
            onMove: false
        };
    },
    computed: {
        areaHeight() {
            let height = "";
            // return '355px'
            if (this.imageList.length < this.number) {
                height =
                    (
                        Math.ceil((this.imageList.length + 1) / this.colsValue) *
                        this.viewWidth
                    ).toFixed();
            } else {
                height =
                    (
                        Math.ceil(this.imageList.length / this.colsValue) * this.viewWidth
                    ).toFixed();
            }
            console.log("areaHeight", +height);
            console.log(app.platform.systemInfo.screenHeight);
            this.$emit("heightChange", +height)
            return app.platform.systemInfo.screenHeight + 'px';
        },
        childWidth() {
            return this.viewWidth - this.rpx2px(this.padding) * 2 + "px";
        }
    },
    watch: {
        value: {
            handler(n) {
                if (!this.first && this.changeStatus) {
                    let flag = false;
                    for (let i = 0; i < n.length; i++) {
                        if (flag) {
                            this.addProperties(this.getSrc(n[i]));
                            continue;
                        }
                        if (
                            this.imageList.length === i ||
                            this.imageList[i].src !== this.getSrc(n[i])
                        ) {
                            flag = true;
                            this.imageList.splice(i);
                            this.addProperties(this.getSrc(n[i]));
                        }
                    }
                }
            },
            deep: true
        },
        modelValue: {
            handler(n) {
                if (!this.first && this.changeStatus) {
                    let flag = false;
                    for (let i = 0; i < n.length; i++) {
                        if (flag) {
                            this.addProperties(this.getSrc(n[i]));
                            continue;
                        }
                        if (
                            this.imageList.length === i ||
                            this.imageList[i].src !== this.getSrc(n[i])
                        ) {
                            flag = true;
                            this.imageList.splice(i);
                            this.addProperties(this.getSrc(n[i]));
                        }
                    }
                }
            },
            deep: true
        }
    },
    created() {
        this.width = uni.getSystemInfoSync().windowWidth;
    },
    mounted() {
        const query = uni.createSelectorQuery().in(this);
        query.select(".con").boundingClientRect(data => {
            this.colsValue = this.cols;
            this.viewWidth = data.width / this.cols;
            if (this.imageWidth > 0) {
                this.viewWidth = this.rpx2px(this.imageWidth);
                this.colsValue = Math.floor(data.width / this.viewWidth);
            }
            let list = this.value;
            // #ifdef VUE3
            list = this.modelValue;
            // #endif
            for (let item of list) {
                this.addProperties(this.getSrc(item));
            }
            this.first = false;
        });
        query.exec();
    },
    methods: {
        getSrc(item) {
            if (this.keyName !== null) {
                return parsePic(decodeURIComponent(item[this.keyName]));
            }
            return parsePic(decodeURIComponent(item));
        },
        onChange(e, item) {
            if (!item) return;
            item.oldX = e.detail.x;
            item.oldY = e.detail.y;
            if (e.detail.source === "touch") {
                if (item.moveEnd) {
                    item.offset = Math.sqrt(
                        Math.pow(item.oldX - item.absX * this.viewWidth, 2) +
                        Math.pow(item.oldY - item.absY * this.viewWidth, 2)
                    );
                }
                let x = Math.floor((e.detail.x + this.viewWidth / 2) / this.viewWidth);
                if (x >= this.colsValue) return;
                let y = Math.floor((e.detail.y + this.viewWidth / 2) / this.viewWidth);
                let index = this.colsValue * y + x;
                if (item.index != index && index < this.imageList.length) {
                    this.changeStatus = false;
                    for (let obj of this.imageList) {
                        if (
                            item.index > index &&
                            obj.index >= index &&
                            obj.index < item.index
                        ) {
                            this.change(obj, 1);
                        } else if (
                            item.index < index &&
                            obj.index <= index &&
                            obj.index > item.index
                        ) {
                            this.change(obj, -1);
                        } else if (obj.id != item.id) {
                            obj.offset = 0;
                            obj.x = obj.oldX;
                            obj.y = obj.oldY;
                            setTimeout(() => {
                                this.$nextTick(() => {
                                    obj.x = obj.absX * this.viewWidth;
                                    obj.y = obj.absY * this.viewWidth;
                                });
                            }, 0);
                        }
                    }
                    item.index = index;
                    item.absX = x;
                    item.absY = y;
                    if (!item.moveEnd) {
                        setTimeout(() => {
                            this.$nextTick(() => {
                                item.x = item.absX * this.viewWidth;
                                item.y = item.absY * this.viewWidth;
                            });
                        }, 0);
                    }
                    // console.log('bbb', JSON.parse(JSON.stringify(item)));
                    this.sortList();
                }
            }
        },
        change(obj, i) {
            obj.index += i;
            obj.offset = 0;
            obj.x = obj.oldX;
            obj.y = obj.oldY;
            obj.absX = obj.index % this.colsValue;
            obj.absY = Math.floor(obj.index / this.colsValue);
            setTimeout(() => {
                this.$nextTick(() => {
                    obj.x = obj.absX * this.viewWidth;
                    obj.y = obj.absY * this.viewWidth;
                });
            }, 0);
        },
        touchstart(item, event) {
            if (event) {
                console.log(event.changedTouches[0].clientY);
            }
            this.imageList.forEach(v => {
                v.zIndex = v.index + 9;
            });
            item.zIndex = 99;
            item.moveEnd = true;
            this.tempItem = item;
            this.timer = setTimeout(() => {
                item.scale = this.scale;
                item.opacity = this.opacity;
                clearTimeout(this.timer);
                this.timer = null;
            }, 200);
            if (!this.onMove) this.onMove = true
        },
        touchend(event, item, index) {
            this.previewImage(item);
            item.scale = 1;
            item.opacity = 1;
            item.x = item.oldX;
            item.y = item.oldY;
            item.offset = 0;
            item.moveEnd = false;
            setTimeout(() => {
                this.$nextTick(() => {
                    item.x = item.absX * this.viewWidth;
                    item.y = item.absY * this.viewWidth;
                    this.tempItem = null;
                    this.changeStatus = true;
                });
                // console.log('ccc', JSON.parse(JSON.stringify(item)));
            }, 0);
            this.onMove = false
            // console.log(this.viewWidth);
            if (event.changedTouches[0].clientY > 700) {
                console.log("删除");
                this.delImages(item, index)
            }
            console.log(event.changedTouches[0]);
            // console.log(event.changedTouches[0].clientY,item);
        },
        previewImage(item) {
            if (
                this.timer &&
                this.preStatus &&
                this.changeStatus &&
                item.offset < 28.28
            ) {
                clearTimeout(this.timer);
                this.timer = null;
                const list = this.value || this.modelValue;
                let srcList = list.map(v => this.getSrc(v));
                uni.previewImage({
                    urls: srcList,
                    current: parsePic(decodeURIComponent(item)),
                    success: () => {
                        this.preStatus = false;
                        setTimeout(() => {
                            this.preStatus = true;
                        }, 600);
                    },
                    fail: e => {
                        // console.log(e);
                    }
                });
            } else if (this.timer) {
                clearTimeout(this.timer);
                this.timer = null;
            }
        },
        mouseenter() {
            //#ifdef H5
            this.imageList.forEach(v => {
                v.disable = false;
            });
            //#endif
        },
        mouseleave() {
            //#ifdef H5
            if (this.tempItem) {
                this.imageList.forEach(v => {
                    v.disable = true;
                    v.zIndex = v.index + 9;
                    v.offset = 0;
                    v.moveEnd = false;
                    if (v.id == this.tempItem.id) {
                        if (this.timer) {
                            clearTimeout(this.timer);
                            this.timer = null;
                        }
                        v.scale = 1;
                        v.opacity = 1;
                        v.x = v.oldX;
                        v.y = v.oldY;
                        this.$nextTick(() => {
                            v.x = v.absX * this.viewWidth;
                            v.y = v.absY * this.viewWidth;
                            this.tempItem = null;
                        });
                    }
                });
                this.changeStatus = true;
            }
            //#endif
        },
        addImages() {
            this.$emit("addImage");
            return;
            // if (typeof this.addImage === "function") {
            //   this.addImage.bind(this.$parent)();
            // } else {
            //   let checkNumber = this.number - this.imageList.length;
            //   uni.chooseImage({
            //     count: checkNumber,
            //     sourceType: ["album", "camera"],
            //     success: res => {
            //       let count =
            //         checkNumber <= res.tempFilePaths.length
            //           ? checkNumber
            //           : res.tempFilePaths.length;
            //       for (let i = 0; i < count; i++) {
            //         this.addProperties(res.tempFilePaths[i]);
            //       }
            //       this.sortList();
            //     }
            //   });
            // }
        },
        delImages(item, index) {
            if (typeof this.delImage === "function") {
                this.delImage.bind(this.$parent)(() => {
                    this.delImageHandle(item, index);
                });
            } else {
                this.delImageHandle(item, index);
            }
        },
        delImageHandle(item, index) {
            this.imageList.splice(index, 1);
            for (let obj of this.imageList) {
                if (obj.index > item.index) {
                    obj.index -= 1;
                    obj.x = obj.oldX;
                    obj.y = obj.oldY;
                    obj.absX = obj.index % this.colsValue;
                    obj.absY = Math.floor(obj.index / this.colsValue);
                    this.$nextTick(() => {
                        obj.x = obj.absX * this.viewWidth;
                        obj.y = obj.absY * this.viewWidth;
                    });
                }
            }
            this.add.x =
                (this.imageList.length % this.colsValue) * this.viewWidth + "px";
            this.add.y =
                Math.floor(this.imageList.length / this.colsValue) * this.viewWidth +
                "px";
            this.sortList();
        },
        delImageMp(item, index) {
            //#ifdef MP
            this.delImages(item, index);
            //#endif
        },
        sortList() {
            // #ifdef APP-PLUS
            if (uni.getSystemInfoSync().platform == 'ios') {
                app.platform.UIClickFeedBack(0)
            }
            // #endif
            const result = [];
            let source = this.value;
            // #ifdef VUE3
            source = this.modelValue;
            // #endif

            let list = this.imageList.slice();
            list.sort((a, b) => {
                return a.index - b.index;
            });
            for (let s of list) {
                let item = source.find(d => this.getSrc(d) == s.src);
                if (item) {
                    result.push(item);
                } else {
                    if (this.keyName !== null) {
                        result.push({
                            [this.keyName]: s.src
                        });
                    } else {
                        result.push(s.src);
                    }
                }
            }

            this.$emit("input", result);
            this.$emit("update:modelValue", result);
        },
        addProperties(item) {
            // console.log(item);
            let absX = this.imageList.length % this.colsValue;
            let absY = Math.floor(this.imageList.length / this.colsValue);
            let x = absX * this.viewWidth;
            let y = absY * this.viewWidth;
            this.imageList.push({
                src: item,
                x,
                y,
                oldX: x,
                oldY: y,
                absX,
                absY,
                scale: 1,
                zIndex: 9,
                opacity: 1,
                index: this.imageList.length,
                id: this.guid(16),
                disable: false,
                offset: 0,
                moveEnd: false
            });
            this.add.x =
                (this.imageList.length % this.colsValue) * this.viewWidth + "px";
            this.add.y =
                Math.floor(this.imageList.length / this.colsValue) * this.viewWidth +
                "px";
        },
        nothing() { },
        rpx2px(v) {
            return this.width * v / 750;
        },
        guid(len = 32) {
            const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(
                ""
            );
            const uuid = [];
            const radix = chars.length;
            for (let i = 0; i < len; i++)
                uuid[i] = chars[0 | (Math.random() * radix)];
            uuid.shift();
            return `u${uuid.join("")}`;
        }
    }
};
</script>
  
<style lang="scss" scoped>
.con {
    // padding: 30rpx;
    position: absolute;
    width: 750rpx;
    pointer-events: none;

    .area {
        width: 100%;

        .view {
            display: flex;
            justify-content: center;
            align-items: center;
            pointer-events: auto;
            .area-con {
                position: relative;
                overflow: hidden;
                border-radius: 20rpx;

                .pre-image {
                    width: 100%;
                    height: 100%;
                }

                .first-con {
                    width: 71rpx;
                    height: 28rpx;
                    background: #FA1545;
                    border-radius: 3rpx 0rpx 1rpx 0rpx;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 21rpx;
                    font-family: PingFang SC;
                    font-weight: 400;
                    color: #FFFFFF;
                    position: absolute;
                    top: 0rpx;
                    left: 0rpx;
                }

                .del-con {
                    position: absolute;
                    top: 0rpx;
                    right: 0rpx;
                    padding: 0 0 20rpx 20rpx;

                    .del-wrap {
                        width: 36rpx;
                        height: 36rpx;
                        background-color: rgba(0, 0, 0, 0.4);
                        border-radius: 0 0 0 10rpx;
                        display: flex;
                        justify-content: center;
                        align-items: center;

                        .del-image {
                            width: 20rpx;
                            height: 20rpx;
                        }
                    }
                }
            }
        }

        .add {
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;

            .add-wrap {
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: #eeeeee;
            }
        }
    }

    .deleteBlock {
        width: 750rpx;
        height: 200rpx;
        position: fixed;
        color: #fff;
        bottom: -240rpx;
        background-color: red;
        transition: bottom 0.3s linear;
    }
}
</style>
  