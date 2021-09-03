


//获取iOS设备上当前App是否有某项权限
//permissionID:
// location	位置
// push	推送（限iOS，注意Android上推送并不是一个权限）
// camera	摄像头
// photoLibrary	相册
// record	麦克风
// contact	通讯录
// calendar	日历
// memo	备忘录
export function judgeIosPermission(permissionID: string): boolean;

//获取Android设备上当前App是否有某项权限
//permissionID:
// android.permission.ACCESS_FINE_LOCATION	位置权限
// android.permission.ACCESS_COARSE_LOCATION	模糊位置权限(蓝牙\ble依赖)
// android.permission.CAMERA	摄像头权限
// android.permission.READ_EXTERNAL_STORAGE	外部存储(含相册)读取权限
// android.permission.WRITE_EXTERNAL_STORAGE	外部存储(含相册)写入权限
// android.permission.RECORD_AUDIO	麦克风权限
// android.permission.READ_CONTACTS	通讯录读取权限
// android.permission.WRITE_CONTACTS	通讯录写入权限
// android.permission.READ_CALENDAR	日历读取权限
// android.permission.WRITE_CALENDAR	日历写入权限
// android.permission.READ_SMS	短信读取权限
// android.permission.SEND_SMS	短信发送权限
// android.permission.RECEIVE_SMS	接收新短信权限
// android.permission.READ_PHONE_STATE	获取手机识别码等信息的权限
// android.permission.CALL_PHONE	拨打电话权限
// android.permission.READ_CALL_LOG	获取通话记录权限
export function requestAndroidPermission(permissionID: string): Promise<number>;//1:已获取授权/ 0:未获取授权/ -1:被永久拒绝授权

//获取当前手机是否开启或关闭了定位服务
export function checkSystemEnableLocation(): boolean;

//打开当前App的权限设置界面。可用于引导用户赋权
export function gotoAppPermissionSetting(): void;



