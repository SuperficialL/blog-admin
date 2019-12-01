/*
 * @author: SuperficialL
 * @Date: 2019-08-24 12:35:32
 * @LastEditTime: 2019-11-19 21:57:10
 * @Description: 时间线接口
 */

import request from "@/utils/request";

export function getTimeLines() {
  return request({
    url: "timelines",
    method: "get"
  });
}

export function getTimeLine(id) {
  return request({
    url: `timelines/${id}`,
    method: "get"
  });
}

export function createTimeLine(data) {
  return request({
    url: "timelines",
    method: "post",
    data
  });
}

export function updateTimeLine(id, data) {
  return request({
    url: `timelines/${id}`,
    method: "put",
    data
  });
}

export function deleteTimeLine(id) {
  return request({
    url: `timelines/${id}`,
    method: "delete"
  });
}
