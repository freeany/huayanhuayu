// 执行 extendApi.js 文件，将方法挂载到 wx 全局对象身上
import "./utils/extendApi";

App({
  async onLaunch() {
    // 第二种调用方式：更改默认配置
    // const res = await wx.modal({
    //   content: "鉴权失败，请重新登录",
    //   showCancel: false,
    // });
    // console.log(res);
  },
});
