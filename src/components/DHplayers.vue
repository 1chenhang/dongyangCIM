<template>
    <div :id="props.uid" class="v_box"></div>
</template>
<script setup>
import {onMounted,nextTick,onBeforeUnmount} from "vue"
let videoPlayer;
const props = defineProps({
    // 唯一标识
    uid:{
        type:String,
        default:"video-play-box"
    },
    // 初始化参数
    initOption:{
        type:Object,
        default:()=>{
            return{
                host: "192.168.2.108", // icc 平台ip
                port: "80", // icc 平台端口 https 默认 443
                username: "admin", // icc 平台用户名
                password: "root1013", // icc 平台密码
            }
        }    
    },
    // 隐藏的Class
    shieldClass:{
        type:Array,
        default:()=>{
            return[]
        }    
    },
    uid:{
        type:String,
        default:"video-play-box"
    },
    // 0-实时预览 3-录像回放 7-录像回放(支持倒放)
    windowType:{
        type:String,
        default:"0"
    }
})
const emit = defineEmits(['createSuccess'])
// 初始化登录
const doInitVideo = () => {
  videoPlayer = new VideoPlayer({
    videoId: props.uid, // 唯一标识，必填，不能重复
    windowType: props.windowType, // 播放器类型，必传， 0 - 实时预览，3 - 录像回放，7- 录像回放（支持倒放）
    usePluginLogin: true, // 采用登录 (请默认传true，插件内部自动拉流)
    pluginLoginInfo: props.initOption,
    division: 1, // 默认展示的窗口数量， 必传
    draggable: false, // 窗口拖拽 【暂不支持】
    showBar: false, // 底部操作栏， 选传，【true - 显示, false - 隐藏】
    shieldClass:props.shieldClass, // 如果DOM元素被插件挡住了，把DOM元素的类名传入。
    coverShieldClass: [], // 如果插件要在dom内滚动，需要把DOM元素的类名传入，请查看案例-遮挡
    parentIframeShieldClass: [], // 有 iframe 时，top层 的 dom 元素被插件挡住了，把DOM元素的类名传入。
    // 下面均为回调函数，请按需使用，具体可在 API 内进行功能的体验和查看。

    // 创建播放器成功回调
    createSuccess: (versionInfo) => {
      // 该回调触发后，我们可以进行实时预览/录像回放等操作
      emit("createSuccess",versionInfo)
      console.log("创建成功11!!阿萨!");
      return
      type == 0 ? doPlay(channelId) : startPlayback(channelId);
      //[]: 隐藏顶部按钮 不传显示所有 回放不支持此功能
      videoPlayer.setTabControlBtn([]);
    },
    // 创建播放器失败回调
    createError: (err) => {
      // 有错误码，可打印查看错误信息
      console.log("创建失败 !!!", JSON.stringify(err));
    },
    // 插件公共回调
    dhPlayerMessage: (info, err) => { },
    // 实时预览成功回调
    realSuccess: (info) => { },
    // 实时预览失败回调
    realError: (info, err) => { },
    // 对讲成功回调
    talkSuccess: (info) => { },
    // 对讲失败回调
    talkError: (info, err) => { },
    // 录像播放成功回调
    playbackSuccess: (info) => { },
    // 录像播放失败回调
    playbackError: (info, err) => { },
    // 录像播放完成回调
    playbackFinish: (info) => { },
    // 抓图成功回调
    snapshotSuccess: ({ base64Url, path }, info) => {
      var byteCharacters = atob(
        base64Url.replace(/^data:image\/(png|jpeg|jpg);base64,/, "")
      );
      var byteNumbers = new Array(byteCharacters.length);
      for (var i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      var blob = new Blob([byteArray], {
        type: undefined,
      });
      var aLink = document.createElement("a");
      aLink.download = "图片名称.jpg"; //这里写保存时的图片名称
      aLink.href = URL.createObjectURL(blob);
      aLink.click();
    },
    // 本地录像下载成功回调
    videoDownloadSuccess: (path, info) => {
      alert("本地录像地址：" + path);
    },
    // 关闭视频窗口回调
    closeWindowSuccess: ({ isAll, snum, channelList }) => { },
    // 鼠标单击窗口回调
    clickWindow: (snum) => { },
    // 鼠标双击窗口回调
    dbClickWindow: (snum) => { },
    // 播放器窗口的数量回调
    changeDivision: (division) => { },
    // rtsp 流下载录像成功回调
    downloadRecordSuccess: (info) => { },
    // rtsp 流下载录像失败回调
    downloadRecordError: (info, err) => { },
  });
  console.log("大华实时摄像头",videoPlayer);
};
// 实时播放
const doPlay = (id = "*****") => {
  videoPlayer.startReal([
    {
      channelId: 1, // 通道id 【必传】
      channelName: "D1", // D1 (用于本地录像下载)
      snum: 0, // 即将要播放的窗口序号，从0开始 【必传】
      streamType: 1, // 1-主码流  2-辅码流 (可不传，默认主码流)
      deviceType: 5, // 设备类别 (用于对讲使用)
      cameraType: "1", // 摄像头类型 (用于云台)
      capability: "00000000000000000000000000000001", // 能力集 (用于云台)
    },
  ]);
};
// 回放预览
const startPlayback = (id ="*****") => {
  let startTime = props.dateValue[0];
  let endTime = props.dateValue[1];
  videoPlayer.startPlayback([
    {
      channelId: id, // 通道id
      channelName: "D1", // D1 (用于本地录像下载和错误提示)
      startTime: startTime, // 开始时间
      endTime: endTime, // 结束时间
      recordSource: 2, // 2-录像 3-中心
      streamType: 0, // 0-所有码流 1-主码流  2-辅码流
      snum: 0, //  播放的窗口序号 (从0开始计数，表示第一个窗口)
    },
  ]);
};
// 全屏
const setFullScreen = ()=>{
  videoPlayer.setFullScreen()
}
// 销毁
const doDestroy = () => {
  videoPlayer?.destroy().then((res) => {
    console.log("销毁成功");
  });
}
onMounted(() => {
  // doInitVideo()
})
onBeforeUnmount(() =>{
  doDestroy()
})
defineExpose({startPlayback,doPlay,setFullScreen,doInitVideo,doDestroy});
</script>
<style scoped lang="less">
.v_box{
    height: 100%;
    width: 100%;
}
</style>
