import axios from 'axios'

const http = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 2000
})

// 请求拦截
http.interceptors.request.use(config => {
  /*   //加载动画
    startLoading()
    return config
  }, err => {
    return Promise.reject(err) */
  
    //console.log(config);
    const pattern = /login|register/
    if(!pattern.test(config.url)) {
      if(localStorage.token)
        config.headers.Authorization = localStorage.token
    }
    return config
  })

  export default http