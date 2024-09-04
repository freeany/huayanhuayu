import http from '../utils/http'

export const reqIndexData = () => {
  // 通过并发请求获取首页的数据，提升页面的渲染速度
  // 是使用封装的 all 方法发送请求
  return http.all(
    http.get('/index/findBanner'),
    http.get('/index/findCategory1'),
    http.get('/index/advertisement'),
    http.get('/index/findListGoods'),
    http.get('/index/findRecommendGoods')
  )
}
