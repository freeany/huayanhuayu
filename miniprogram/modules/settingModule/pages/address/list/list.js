import { reqAddressList, reqDelAddress } from '@/modules/settingModule/api/address'
import { modal, toast } from '@/utils/extendApi'
import { swipeCellBehavior } from '@/behaviors/swipeCell'

// 获取应用实例
const app = getApp()
Page({
  behaviors: [swipeCellBehavior],
  data: {
    addressList: []
  },
  onLoad (options) {
    this.flag = options.flag
    // this.getAddressList()
  },
  onShow () {
    this.getAddressList()
  },
  async getAddressList () {
    const { data: addressList } = await reqAddressList().catch(err => console.log(err))
    this.setData({ addressList })
  },
  async delAddress (event) {
    const { id } = event.currentTarget.dataset
    const modalRes = await modal({
      content: '您确认删除该收货地址吗 ?'
    })
    if (modalRes) {
      await reqDelAddress(id)
      toast({ title: '收货地址删除成功' })
      this.getAddressList()
    }
  },
  // 如果是结算页面进来的，点击收货地址，切换成当前点击的收货页面，然后返回
  changeAddress (event) {
    if (this.flag !== '1') return
    const addressId = event.currentTarget.dataset.id
    const selectAddress = this.data.addressList.find((item) => item.id === addressId)
    if (selectAddress) {
      app.globalData.address = selectAddress
      wx.navigateBack()
    }
  },
  toEdit (event) {
    const { id } = event.currentTarget.dataset
    wx.navigateTo({
      url: `/modules/settingModule/pages/address/add/add?id=${id}`
    })
  },
})