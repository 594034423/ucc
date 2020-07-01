// import { get, post } from './http'

// const BASE_URL = 'http://192.168.0.80/uomp/businessLabel/';

//请求接口

// const apiAddress = p => get('/api/vueapi/public/index',p)

//近15天呼入量和满意度
const getVideoCallHistory = p => get('/mrc/mrcMonitorVideo/getVideoCallHistory',p)

//今日呼入量和满意度
const getVideoCallToday = p => get('/mrc/mrcMonitorVideo/getVideoCallToday', p)

//今日呼入量和满意度 -日期
const getVideoCallByDateType = p => get('/mrc/mrcMonitorVideo/getVideoCallByDateType', p)