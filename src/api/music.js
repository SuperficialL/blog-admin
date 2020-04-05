/*
 * @Author: Superficial
 * @Date: 2020-02-28 18:52:59
 * @LastEditTime: 2020-02-28 18:54:01
 * @Description: 音乐接口
 */

import request from "@/utils/request";

export function getMusics(params) {
  // 请求标签数据
  return request({
    url: "musics",
    method: "get",
    params,
  });
}

export function getMusic(id) {
  // 请求标签详情数据
  return request({
    url: `musics/${id}`,
    method: "get",
  });
}

export function createMusic(data) {
  // 请求标签详情数据
  return request({
    url: "musics",
    method: "post",
    data,
  });
}

export function updateMusic(id, data) {
  // 更新标签数据
  return request({
    url: `musics/${id}`,
    method: "patch",
    data,
  });
}

export function deleteMusic(id) {
  // 删除标签数据
  return request({
    url: `musics/${id}`,
    method: "delete",
  });
}
