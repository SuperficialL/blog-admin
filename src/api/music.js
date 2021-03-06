/*
 * @author: SuperficialL
 * @Date: 2019-08-24 12:35:32
 * @LastEditTime: 2019-10-09 22:21:55
 * @Description: 图床接口
 */

import request from "@/utils/request";

export function getMusices(params) {
  return request({
    url: "musices",
    method: "get",
    params
  });
}

export function getMusic(id) {
  return request({
    url: `musices/${id}`,
    method: "get"
  });
}


export function createMusic(data) {
  return request({
    url: "musices",
    method: "post",
    data
  });
}

export function updateMusic(id, data) {
  return request({
    url: `musices/${id}`,
    method: "put",
    data
  });
}

export function deleteMusic(id) {
  return request({
    url: `musices/${id}`,
    method: "delete"
  });
}
