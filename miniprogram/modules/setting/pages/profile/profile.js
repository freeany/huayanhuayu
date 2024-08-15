import { reqUpdateUserInfo, reqUploadFile } from '@/api/user'
import { setStorage } from '@/utils/storage'
import { toast } from '@/utils/extendApi'
import { userBehavior } from './behavior'

Page({
  behaviors: [userBehavior],
  data: {
    isShowPopup: false,
  },
  /** 更新用户信息 */
  async updateUserInfo () {
    const result = await reqUpdateUserInfo(this.data.userInfo)
    if (result.code === 200) {
      setStorage('userInfo', this.data.userInfo)
      this.setUserInfo(this.data.userInfo)
      toast({ title: '用户信息更新成功' })
      setTimeout(() => {
        this.backMy()
      }, 1500)
    }
  },
  async chooseAvatar (event) {
    const { avatarUrl } = event.detail
    const result = await reqUploadFile(avatarUrl, 'file')
    this.setData({ 'userInfo.headimgurl': result.data })
  },
  onUpdateNickName () {
    this.setData({
      isShowPopup: true,
      'userInfo.nickname': this.data.userInfo.nickname,
    })
  },
  cancelForm () {
    this.setData({ isShowPopup: false })
  },
  getNickName (event) {
    const { nickname } = event.detail.value
    this.setData({
      'userInfo.nickname': nickname,
      isShowPopup: false,
    })
  },

  // 回到我的页面
  backMy () {
    wx.switchTab({
      url: `/pages/my/my`
    })
  }
})