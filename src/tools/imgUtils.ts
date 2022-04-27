/*** 绘制圆角矩形
* x 起始点x坐标
* y 起始点y坐标
* w 矩形宽
* h 矩形高
* r 圆角半径
* ctx 画板上下文*/
export function darwRoundRect(x: number, y: number, w: number, h: number, r: number, ctx: UniApp.CanvasContext, color: string) {
    ctx.save();
    ctx.beginPath();

    // 左上弧线
    ctx.arc(x + r, y + r, r, 1 * Math.PI, 1.5 * Math.PI);
    // 左直线
    ctx.moveTo(x, y + r);
    ctx.lineTo(x, y + h - r);
    // 左下弧线
    ctx.arc(x + r, y + h - r, r, 0.5 * Math.PI, 1 * Math.PI);
    // 下直线
    ctx.lineTo(x + r, y + h);
    ctx.lineTo(x + w - r, y + h);
    // 右下弧线
    ctx.arc(x + w - r, y + h - r, r, 0 * Math.PI, 0.5 * Math.PI);
    // 右直线
    ctx.lineTo(x + w, y + h - r);
    ctx.lineTo(x + w, y + r);
    // 右上弧线
    ctx.arc(x + w - r, y + r, r, 1.5 * Math.PI, 2 * Math.PI);
    // 上直线
    ctx.lineTo(x + w - r, y);
    ctx.lineTo(x + r, y);

    ctx.setFillStyle(color);
    ctx.fill();
}
// 圆角图片
export function roundRect(ctx: UniApp.CanvasContext, img: string, x: number, y: number, w: number, h: number, r: number) {
    //img为绘制图片的本地路径
    if (w < 2 * r) {
        r = w / 2;
    }
    if (h < 2 * r) {
        r = h / 2;
    }
    ctx.save(); //保存前面绘制的内容
    ctx.beginPath();
    ctx.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5);
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.lineTo(x + w, y + r);
    ctx.arc(x + w - r, y + r, r, Math.PI * 1.5, Math.PI * 2);
    ctx.lineTo(x + w, y + h - r);
    ctx.lineTo(x + w - r, y + h);
    ctx.arc(x + w - r, y + h - r, r, 0, Math.PI * 0.5);
    ctx.lineTo(x + r, y + h);
    ctx.lineTo(x, y + h - r);
    ctx.arc(x + r, y + h - r, r, Math.PI * 0.5, Math.PI);
    ctx.lineTo(x, y + r);
    ctx.lineTo(x + r, y);
    ctx.clip(); //裁剪上述区域
    ctx.drawImage(img, x, y, w, h, r); //把图片加到上述裁剪后的区域
    ctx.restore();
    // ctx.fill();
    ctx.closePath();
}
// 自动换两行
export function getTwoLineStr (ctx:UniApp.CanvasContext, str:string, line:number) {
    var lineWidth = 0
    var s = ''
    // 超出两行切到两行内
    for (let j = 0; j < str.length; j++) {
        lineWidth += ctx.measureText(str[j]).width
        if (lineWidth > line * 2 - 50) {
            s = str.substring(0, j)
            break
        }
    }
    if (lineWidth < line) {
        return [str]
    }
    if (s === '') {
        return cutTwo(str, ctx, line)
    }
    if (s !== '') {
        return cutTwo(s, ctx, line, 'out')
    }
}
export function cutTwo (str:string, ctx:UniApp.CanvasContext, line:number, flag?:string) {
    let onelineWidth = 0
    for (let i = 0; i < str.length; i++) {
        onelineWidth += ctx.measureText(str[i]).width
        if (onelineWidth > line) {
            return [
                str.substring(0, i),
                flag === 'out' ? str.substring(i, str.length) + '...' : str.substring(i, str.length)
            ]
        }
    }
}
//canvas文字超出一行省略
export function fittingString(_ctx: UniApp.CanvasContext, str: string, maxWidth: number):string {
    let strWidth = _ctx.measureText(str).width;
    const ellipsis = "…";
    const ellipsisWidth = _ctx.measureText(ellipsis).width;
    if (strWidth <= maxWidth || maxWidth <= ellipsisWidth) {
        return str;
    } else {
        var len = str.length;
        while (strWidth >= maxWidth - ellipsisWidth && len-- > 0) {
            str = str.slice(0, len);
            strWidth = _ctx.measureText(str).width;
        }
        return str + ellipsis;
    }
}