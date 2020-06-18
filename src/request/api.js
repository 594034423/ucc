import { get, post } from './http'

const BASE_URL = 'http://192.168.0.80/uomp/businessLabel/';
//请求接口
export const apiAddress = p => get(BASE_URL,p)
