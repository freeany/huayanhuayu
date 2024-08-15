import { reqLogin, reqUserInfo } from '@/api/user'
import { toast } from '@/utils/extendApi'
import { userStore } from '@/stores/user'
import { setStorage } from '@/utils/storage'
import { ComponentWithStore } from 'mobx-miniprogram-bindings'

ComponentWithStore({
  storeBindings: {
    store: userStore,
    fields: ['token', 'userInfo'],
    actions: ['setToken', 'setUserInfo']
  },
  methods: {
    // 点击登录
    login () {
      // 调用 wx.login 获取用户信息
      wx.login({
        success: async ({ code }) => {
          if (code) {
            // 调用接口 API，传入 code 进行登录
            const { data } = await reqLogin(code)

            // 登录成功以后将 token 存储到本地
            setStorage('token', data.token)

            // 将数据存储到 store 对象中
            this.setToken(data.token)
            this.getUserInfo()

            // 返回之前的页面
            wx.navigateBack()
          } else {
            // 登录失败后给用户进行提示
            toast({ title: '授权失败，请稍后再试~~~' })
          }
        }
      })
    },
    async getUserInfo () {
      const { data } = await reqUserInfo()
      // 将用户信息存储到本地
      setStorage('userInfo', data)
      // 将用户信息存储到 Store
      this.setUserInfo(data)
    }
  }
})
