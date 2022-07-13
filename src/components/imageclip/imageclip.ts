import { Prop, Component, Vue } from "vue-property-decorator";
const DesignWidth = 750;

const ABS = Math.abs
const calcLen = (v: any) => { // distance between two coordinate 
  return Math.sqrt(v.x * v.x + v.y * v.y)
}
const calcAngle = (a: any, b: any) => { // angle of the two vectors
  var l = calcLen(a) * calcLen(b); var cosValue; var angle
  if (l) {
    cosValue = (a.x * b.x + a.y * b.y) / l
    angle = Math.acos(Math.min(cosValue, 1))
    angle = a.x * b.y - b.x * a.y > 0 ? -angle : angle
    return angle * 180 / Math.PI
  }
  return 0
}
const generateCanvasId = () => { // generate a random string
  const seeds = 'abcdefghijklmnopqrstuvwxyz'
  const arr = seeds.split('').concat(seeds.toUpperCase().split('')).concat('0123456789'.split(''))
  let m = arr.length; let i
  while (m) {
    i = Math.floor(Math.random() * m--)
    const temp = arr[m]
    arr[m] = arr[i]
    arr[i] = temp
  }
  return arr.slice(0, 16).join('')
}


@Component({})
export default class imageclip extends Vue {
  @Prop({ default: '100%' })
  width!: string | number;
  @Prop({ default: '100%' })
  height!: string | number;
  @Prop({ default: 710 })
  cutWidth!: string | number;
  @Prop({ default: 300 })
  cutHeight!: string | number;
  @Prop({ default: 50 })
  minWidth!: number;
  @Prop({ default: 50 })
  minHeight!: number;
  @Prop({ default: '' })
  imagesrc!: string;

  center = true;

  disableScale = false; // disable to zoom
  disableRotate = false;
  disableTranslate = false;//禁用图片位置调整

  @Prop({ default: true })
  disableCtrl!: boolean; // 禁用调整剪切框的大小

  boundDetect = true; // 开启边界检测
  freeBoundDetect = false; // 当旋转时，开启边界检测
  keepRatio = true; // keep the ratio of the cutter
  disablePreview = false; // disable preview after cutting
  showCtrlBorder = false; // show cutter border
  resetCut = false; // reset cut while img change

  fit = true;
  imageCenter = true; // auto center/middle for image

  @Prop({ default: 10 })
  maxZoom!: number;// can not be Infinity in baidu-MiniProgram
  @Prop({ default: 1 })
  minZoom!: number; // minimum scaling factor
  @Prop({ default: 0 })
  angle!: number;  // 初始角度
  @Prop({ default: 1 })
  zoom!: number; // 初始比例因子

  offset = [0, 0]; // 相对于剪切框左边框的初始偏移量
  @Prop({ default: '#000' })
  backgroundColor!: string;
  @Prop({ default: '#fff' })
  canvasBackgroundColor!: string; //导出图像的背景色

  canvasZoom = 1;  // export multiples of the cutter size

  @Prop({ default: 'jpg' })
  fileType!: string;

  quality = 1;
  @Prop({ default: 'shadow' })
  maskType!: string; // type for mask
  @Prop({ default: false })
  circleView!: boolean // circle clip view


  transform = { angle: 0, translate: { x: 0, y: 0 }, zoom: 1 };
  corner = { left: 50, right: 50, bottom: 50, top: 50 };
  image = { originWidth: 0, originHeight: 0, width: 0, height: 0 };

  ctrlWidth = 0;
  ctrlHeight = 0;

  view = false;
  canvasId = generateCanvasId();
  ratio = 1;
  cutRatio = 1;
  windowHeight = 0;

  containerWidth = 0;
  containerHeight = 0;

  imageResource = '';
  pretouch: { [x: string]: any } = {};
  handles = {};
  preVector = { x: 0, y: 0 };
  distance = 30;
  touch: { [x: string]: any } = {};
  movetouch: { [x: string]: any } = {};
  cutMode = false;
  params: { [x: string]: any } = {
    zoom: 1,
    deltaX: 0,
    deltaY: 0,
    diffX: 0,
    diffY: 0,
    angle: 0
  };
  doubleTap = false;
  previewTimer = -1;
  startDistance = 0;
  cutDirection = '';

  mounted() {
    console.log('mounted');
    let systemInfo = uni.getSystemInfoSync();
    this.ratio = systemInfo.windowWidth / DesignWidth;
    this.windowHeight = systemInfo.windowHeight;
    this.resetData();
    this.initCanvas();
  }

  get transformMeta() {
    const transform = this.transform;
    return `translate3d(${transform.translate.x}px, ${transform.translate.y}px, 0) rotate(${transform.angle}deg) scale(${transform.zoom})`
  }
  get ctrlStyle() {
    const corner = this.corner;
    let cssStr = `left: ${corner.left}px;top: ${corner.top}px;right: ${corner.right}px;bottom: ${corner.bottom}px;`
    if (this.maskType !== 'outline') {
      cssStr += `box-shadow: 0 0 0 50000rpx rgba(0,0,0, ${this.view ? 0.8 : 0.4})`
    } else {
      cssStr += `outline: rgba(0,0,0, ${this.view ? 0.8 : 0.4}) solid 5000px`
    }
    return cssStr
  }

  toPx(numStr: string | number) {
    let str = '' + numStr;
    if (str.indexOf('%') !== -1) {
      return Math.floor(Number(str.replace('%', '')) / 100 * this.containerWidth)
    }
    if (str.indexOf('rpx') !== -1) {
      return Math.floor(Number(str.replace('rpx', '')) * this.ratio)
    }
    return Math.floor(Number(str.replace('px', '')))
  }
  initCanvas() {
    let context = uni.createSelectorQuery();
    // #ifdef MP-WEIXIN
    context = context.in(this);
    // #endif

    uni.createSelectorQuery().in(this).select('.nice-cropper').boundingClientRect(() => { }).exec((res) => {
      const rect = res[0]
      if (rect) {
        this.containerWidth = res[0].width
        this.containerHeight = res[0].height
        this.initCut();
      } else {
        console.log('无法获取到视图大小！');
        uni.showToast({
          title: '无法获取到视图大小！',
          icon: 'none',
          duration: 2000
        });
      }
    })
  }
  resetCutReact() {// init size and position of the cutter
    let cutWidthNum = this.toPx(this.cutWidth);
    let cutHeightNum = this.cutHeight ? this.toPx(this.cutHeight) : this.toPx(this.cutWidth);// cutHeight为0时，为正方形
    this.cutRatio = cutHeightNum / cutWidthNum;
    //获取不超过屏幕边界的最大剪切框
    if (cutWidthNum / this.containerWidth > cutHeightNum / this.containerHeight) {
      this.ctrlWidth = Math.min(cutWidthNum, this.containerWidth);
      this.ctrlHeight = this.ctrlWidth * this.cutRatio;
    } else {
      this.ctrlHeight = Math.min(cutHeightNum, this.containerHeight);
      this.ctrlWidth = this.ctrlHeight / this.cutRatio;
    }
    const cornerStartX = this.center ? Math.floor((this.containerWidth - this.ctrlWidth) / 2) : 0;
    const cornerStartY = this.center ? Math.floor((this.containerHeight - this.ctrlHeight) / 2) : 0;

    this.corner = {
      left: cornerStartX,
      right: this.containerWidth - this.ctrlWidth - cornerStartX,
      top: cornerStartY,
      bottom: this.containerHeight - this.ctrlHeight - cornerStartY
    }
  }

  initCut() {
    this.resetCutReact();
    this.initImage();
  }

  getImageInfo(imageSrc: string): any {
    return new Promise((resolve, reject) => {
      uni.getImageInfo({
        src: imageSrc,
        success: (res) => {
          resolve(res)
        },
        fail: (err) => {
          resolve(err)
        }
      })
    });
  }
  async initImage() {
    if (!this.imagesrc) {
      uni.showToast({
        title: '图片获取失败！',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    const res = await this.getImageInfo(this.imagesrc);
    let err = typeof (res) != 'object' || !res.width;
    if (err) {
      this.$emit("error", res)
    } else {
      this.$emit('load', res)
    }

    let hwRatio = res.height / res.width;
    // init image size
    this.image.originWidth = err ? this.containerWidth : res.width;
    this.image.originHeight = err ? hwRatio * this.containerWidth : res.height;
    this.image.width = this.fit ? this.containerWidth : this.image.originWidth;
    this.image.height = err ? hwRatio * this.containerWidth : hwRatio * this.image.width;
    this.imageResource = res.path;

    const offset = [0, 0]
    if (this.imageCenter) {
      offset[0] = (this.ctrlWidth - this.image.width) / 2
      offset[1] = (this.ctrlHeight - this.image.height) / 2
    }
    offset[0] += this.offset[0] || 0
    offset[1] += this.offset[1] || 0

    this.setTranslate(offset)
    this.setZoom(this.zoom)
    this.transform.angle = this.freeBoundDetect || !this.disableRotate ? this.angle : 0

    this.setBoundary(); // boundary detect
    this.preview(); // preview

    setTimeout(()=>{
      this.draw();
    },100);
    
  }
  resetData() {
    this.pretouch = {}
    this.handles = {}
    this.preVector = {
      x: 0,
      y: 0
    }
    this.distance = 30
    this.touch = {}
    this.movetouch = {}
    this.cutMode = false
    this.params = {
      zoom: 1,
      deltaX: 0,
      deltaY: 0,
      diffX: 0,
      diffY: 0,
      angle: 0
    }
	this.$emit('cropped', '', {})
  }
  touchstart(e: any) {
    if (!this.imagesrc) { e.preventDefault(); return; }
    const point = e.touches ? e.touches[0] : e
    const touch = this.touch
    const now = Date.now()
    touch.startX = point.pageX
    touch.startY = point.pageY
    touch.startTime = now
    this.doubleTap = false
    this.view = false
    clearTimeout(this.previewTimer)
    if (e.touches.length > 1) {
      var point2 = e.touches[1]
      this.preVector = {
        x: point2.pageX - this.touch.startX,
        y: point2.pageY - this.touch.startY
      }
      this.startDistance = calcLen(this.preVector)
    } else {
      let pretouch = this.pretouch
      this.doubleTap = this.pretouch.time && now - this.pretouch.time < 300 && ABS(touch.startX - pretouch.startX) < 30 && ABS(touch.startY - pretouch.startY) < 30 && ABS(touch.startTime - pretouch.time) < 300
      pretouch = { // reserve the last touch
        startX: this.touch.startX,
        startY: this.touch.startY,
        time: this.touch.startTime
      }
    }
  }
  touchmove(e: any) {
    if (!this.imagesrc) {
      uni.showToast({
        title: '图片获取失败！',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    const point = e.touches ? e.touches[0] : e
    if (e.touches.length > 1) { // multi touch
      const point2 = e.touches[1]
      const v = {
        x: point2.pageX - point.pageX,
        y: point2.pageY - point.pageY
      }

      if (this.preVector.x !== null) {
        if (this.startDistance) { // zoom
          const len = calcLen(v)
          this.params.zoom = calcLen(v) / this.startDistance
          this.startDistance = len
          this.cutMode && !this.disableCtrl ? this.setCut() : !this.disableScale && this.pinch()
        }
        // rotate
        this.params.angle = calcAngle(v, this.preVector)
        this.cutMode && !this.disableCtrl ? this.setCut() : !this.disableRotate && this.rotate()
      }
      this.preVector.x = v.x
      this.preVector.y = v.y
    } else { // translate
      const diffX = point.pageX - this.touch.startX
      const diffY = point.pageY - this.touch.startY
      this.params.diffY = diffY
      this.params.diffX = diffX
      if (this.movetouch.x) {
        this.params.deltaX = point.pageX - this.movetouch.x
        this.params.deltaY = point.pageY - this.movetouch.y
      } else {
        this.params.deltaX = this.params.deltaY = 0
      }
      if (ABS(diffX) > 30 || ABS(diffY) > 30) {
        this.doubleTap = false
      }
      this.cutMode && !this.disableCtrl ? this.setCut() : !this.disableTranslate && this.translate();
      this.movetouch.x = point.pageX
      this.movetouch.y = point.pageY
    }
    !this.cutMode && this.setBoundary()
    if (e.touches.length > 1) {
      e.preventDefault()
    }
  }
  touchend() {
    this.doubleTap && this.$emit('doubleTap')
    this.cutMode && this.setBoundary()
    this.resetData()
    !this.disablePreview && this.preview()
    this.draw()
  }
  translate() {
    const transform = this.transform.translate;
    const meta = this.params;
    //transform.x += meta.deltaX;//本来是控制图片位置，现已弃用
    //transform.y += meta.deltaY;

    this.corner.left += meta.deltaX;
    this.corner.top += meta.deltaY;

    const imgStartX = transform.x;
    const imgStartY = transform.y;
    //控制剪切框在图片内
    if (this.corner.top < imgStartY) {
      this.corner.top = imgStartY;
    } else if (this.corner.top + this.ctrlHeight > imgStartY + this.image.height) {
      this.corner.top = imgStartY + this.image.height - this.ctrlHeight;
    }
    if (this.corner.left < imgStartX) {
      this.corner.left = imgStartX;
    } else if (this.corner.left + this.ctrlWidth > imgStartX + this.image.width) {
      this.corner.left = imgStartX + this.image.width - this.ctrlWidth;
    }
    this.updateCorner();
  }
  updateCorner(){
    this.corner.right = this.containerWidth - (this.corner.left+this.ctrlWidth);
    this.corner.bottom = this.containerHeight - (this.corner.top+this.ctrlHeight);
  }
  pinch() {
    this.transform.zoom *= this.params.zoom;
  }
  rotate() {
    this.transform.angle += this.params.angle;
  }
  setZoom(scale: any) {
    scale = Math.min(Math.max(Number(scale) || 1, this.minZoom), this.maxZoom)
    this.transform.zoom = scale
  }
  setTranslate(offset: any) {
    if (Array.isArray(offset)) {
      const x = Number(offset[0])
      const y = Number(offset[1])
      this.transform.translate.x = isNaN(x) ? this.transform.translate.x : this.corner.left + x
      this.transform.translate.y = isNaN(y) ? this.transform.translate.y : this.corner.top + y
    }
  }
  setRotate(angle: any) {
    this.transform.angle = Number(angle) || 0
  }
  setTransform(x: number, y: number, angle: number, scale: number) {
    this.setTranslate([x, y])
    this.setZoom(scale)
    this.setRotate(angle)
  }
  setCutMode(type: string) {
    if (!this.imagesrc) {
      uni.showToast({
        title: '图片获取失败！',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    this.cutMode = true;
    this.cutDirection = type;
  }
  setCut() {
    const corner = this.corner;
    const meta = this.params;
    this.setMeta(this.cutDirection, meta); // correct cutter position
    if (this.keepRatio) {
      if (this.cutDirection === 'lt' || this.cutDirection === 'rb') {
        meta.deltaY = meta.deltaX * this.cutRatio;
      } else {
        meta.deltaX = meta.deltaY / this.cutRatio;
      }
    }
    let value_1, value_2;
    switch (this.cutDirection) {
      case 'lt':
        value_1 = corner.top + meta.deltaY;
        value_2 = corner.left + meta.deltaX;
        if (value_1 > 0 && value_2 > 0) {//修正剪切框大小，不能超出屏幕
          corner.top = value_1;
          corner.left = value_2;
        }
        break
      case 'rt':
        value_1 = corner.top + meta.deltaY;
        value_2 = corner.right - (this.keepRatio ? -meta.deltaX : meta.deltaX);
        if (value_1 > 0 && value_2 > 0) {//修正剪切框大小，不能超出屏幕
          corner.top = value_1;
          corner.right = value_2;
        }
        break
      case 'rb':
        value_1 = corner.right - meta.deltaX;
        value_2 = corner.bottom - meta.deltaY;
        if (value_1 > 0 && value_2 > 0) {//修正剪切框大小，不能超出屏幕
          corner.right = value_1;
          corner.bottom = value_2;
        }
        break
      case 'lb':
        value_1 = corner.bottom - meta.deltaY;
        value_2 = corner.left + (this.keepRatio ? -meta.deltaX : meta.deltaX);
        if (value_1 > 0 && value_2 > 0) {//修正剪切框大小，不能超出屏幕
          corner.bottom = value_1;
          corner.left = value_2;
        }
        break
    }

    this.ctrlWidth = this.containerWidth - corner.left - corner.right;
    this.ctrlHeight = this.containerHeight - corner.top - corner.bottom;
  }
  setMeta(direction: string, meta: any) {
    const { ctrlWidth, ctrlHeight, minWidth, minHeight } = this
    switch (direction) {
      case 'lt':
        if (meta.deltaX > 0 || meta.deltaY > 0) {
          meta.deltaX = Math.min(meta.deltaX, ctrlWidth - minWidth)
          meta.deltaY = Math.min(meta.deltaY, ctrlHeight - minHeight)
        }
        break
      case 'rt':
        if (meta.deltaX < 0 || meta.deltaY > 0) {
          meta.deltaX = Math.max(meta.deltaX, minWidth - ctrlWidth)
          meta.deltaY = Math.min(meta.deltaY, ctrlHeight - minHeight)
        }
        break
      case 'rb':
        if (meta.deltaX < 0 || meta.deltaY < 0) {
          meta.deltaX = Math.max(meta.deltaX, minWidth - ctrlWidth)
          meta.deltaY = Math.max(meta.deltaY, minHeight - ctrlHeight)
        }
        break
      case 'lb':
        if (meta.deltaX > 0 || meta.deltaY < 0) {
          meta.deltaX = Math.min(meta.deltaX, ctrlWidth - minWidth)
          meta.deltaY = Math.max(meta.deltaY, minHeight - ctrlHeight)
        }
        break
    }

  }
  setBoundary() {
    let zoom = this.transform.zoom
    zoom = zoom < this.minZoom ? this.minZoom : (zoom > this.maxZoom ? this.maxZoom : zoom)
    this.transform.zoom = zoom
    if (!this.boundDetect || !this.disableRotate && !this.freeBoundDetect) return true;
    const translate = this.transform.translate
    const corner = this.corner
    const minX = corner.left - this.image.width + this.ctrlWidth - this.image.width * (zoom - 1) / 2
    const maxX = corner.left + this.image.width * (zoom - 1) / 2
    const minY = corner.top - this.image.height + this.ctrlHeight - this.image.height * (zoom - 1) / 2
    const maxY = corner.top + this.image.height * (zoom - 1) / 2
    translate.x = Math.floor(translate.x < minX ? minX : (translate.x > maxX ? maxX : translate.x))
    translate.y = Math.floor(translate.y < minY ? minY : (translate.y > maxY ? maxY : translate.y))
  }
  preview() {
    clearTimeout(this.previewTimer)
    this.previewTimer = setTimeout(() => {
      this.view = true
    }, 500)
  }
  draw() {
    if (this.image.width == 0 || this.image.height == 0) {
      uni.showToast({
        title: '图片宽高不能为0！',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    let context: UniApp.CanvasContext;
    // #ifdef MP-ALIPAY
    context = uni.createCanvasContext(this.canvasId)
    // #endif
    // #ifndef MP-ALIPAY
    context = uni.createCanvasContext(this.canvasId, this)
    // #endif
    const transform = this.transform
    const corner = this.corner
    const canvasZoom = this.canvasZoom
    const img = this.image;
    context.save()
    context.setFillStyle(this.canvasBackgroundColor)
    this.$emit('beforeDraw', context, transform) // beforeDraw hook

    const zoom = transform.zoom
    context.fillRect(0, 0, this.ctrlWidth * canvasZoom, this.ctrlHeight * canvasZoom) // clear canvas
    context.translate((transform.translate.x - corner.left + img.width / 2) * canvasZoom, (transform.translate.y - corner.top + img.height / 2) * canvasZoom) // translate the canvas's orgin to the image center
    context.rotate(transform.angle * Math.PI / 180)
    context.translate(-img.width * zoom * 0.5 * canvasZoom, -img.height * zoom * 0.5 * canvasZoom)
    context.drawImage(this.imageResource, 0, 0, img.width * zoom * canvasZoom, img.height * zoom * canvasZoom)
    context.restore()
    this.$emit('afterDraw', context, {
      width: this.ctrlWidth * canvasZoom,
      height: this.ctrlHeight * canvasZoom
    }) // afterDraw hook

    context.draw(false, () => {
      setTimeout(() => {
        uni.canvasToTempFilePath({
          canvasId: this.canvasId,
          quality: this.quality || 1,
          fileType: this.fileType,
          success: (res) => {
            console.log('######res.tempFilePath==', res.tempFilePath);

            this.$emit('cropped', res.tempFilePath, {
              originWidth: this.image.originWidth,
              originHeight: this.image.originHeight,
              width: this.ctrlWidth * canvasZoom,
              height: this.ctrlHeight * canvasZoom,
              scale: zoom,
              translate: {
                x: transform.translate.x,
                y: transform.translate.y
              },
              rotate: transform.angle
            }) // draw callback

          },
          fail: (res) => {
            console.log('######canvasToTempFilePath.fail#######:', res);
          }
        }, this)
      }, 100);
    })
  }
}