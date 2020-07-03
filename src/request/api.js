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

//获取渠道和技能组信息
const getSkillAndChannel = p => get('/mrc/mrcMonitorVideo/getSkillAndChannel', p)

//各状态柜员数
const getMonitorVideoAgents = p => get('/mrc/mrcMonitorVideoSkillAgent/getMonitorVideoAgents', p)

//技能组各状态柜员数
const getMonitorSkillAgentNum = p => get('/mrc/mrcMonitorVideoSkillAgent/getMonitorSkillAgentNum', p)

//总交易量和成功率
const getBussinessTotalTran = p => get('/mrc/mrcMonitorBussiness/getBussinessTotalTran', p)