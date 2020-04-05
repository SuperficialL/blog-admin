/*
 * @Author: Superficial
 * @Date: 2020-03-25 15:46:38
 * @LastEditTime: 2020-03-25 15:47:50
 * @Description: 角色接口
 */

import request from "@/utils/request";

export function getRoles(params) {
  // 请求角色数据
  return request({
    url: "roles",
    method: "get",
    params,
  });
}

export function getRole(id) {
  // 请求标签详情数据
  return request({
    url: `roles/${id}`,
    method: "get",
  });
}

export function createRole(data) {
  // 请求标签详情数据
  return request({
    url: "roles",
    method: "post",
    data,
  });
}

export function updateRole(id, data) {
  // 更新标签数据
  return request({
    url: `roles/${id}`,
    method: "patch",
    data,
  });
}

export function deleteRole(id) {
  // 删除标签数据
  return request({
    url: `roles/${id}`,
    method: "delete",
  });
}
