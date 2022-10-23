import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'

function createAxios(axiosConfig: AxiosRequestConfig){
    const request = axios.create({
      baseURL: '/api',
      timeout: 10000
    })
  
    return request(axiosConfig)
  }
  
  export default createAxios