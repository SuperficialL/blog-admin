/*
 * @author: SuperficialL
 * @Date: 2019-08-24 12:35:32
 * @LastEditTime: 2020-05-14 11:52:00
 * @Description: 图床接口
 */

import request from "@/utils/request";

export function getPictures(params) {
  return request({
    url: "pictures",
    method: "get",
    params
  });
}

export function getPicture(id) {
  return request({
    url: `pictures/${id}`,
    method: "get"
  });
}


export function createPicture(data) {
  return request({
    url: "pictures",
    method: "post",
    data
  });
}

export function updatePicture(id, data) {
  return request({
    url: `pictures/${id}`,
    method: "patch",
    data
  });
}

export function deletePicture(id) {
  return request({
    url: `pictures/${id}`,
    method: "delete"
  });
}
