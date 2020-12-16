/**
 * 严肃声明：
 * 开源版本请务必保留此注释头信息，若删除我方将保留所有法律责任追究！
 * 本系统已申请软件著作权，受国家版权局知识产权以及国家计算机软件著作权保护！
 * 可正常分享和学习源码，不得用于违法犯罪活动，违者必究！
 * Copyright (c) 2020 陈尼克 all rights reserved.
 * 版权所有，侵权必究！
 */

import axios from '../utils/axios'

export function getHome() {
  return axios.get('/index-infos');
}
export function getTop(params) {
  return axios.get('/top/playlist/highquality',{params});
}
// 热门歌单
export function getTopPlaylist(params) {
  return axios.get('/playlist/hot',{params});
}
// //top/playlist/highquality 获取精品歌单
export function getTopHighquality(params) {
  return axios.get('/top/playlist/highquality',{params});
}
// 轮波数据
export function getBanner(params) {
  return axios.get('/banner',{params});
}

