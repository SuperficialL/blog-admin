/*
 * @Author: Superficial
 * @Date: 2020-03-25 17:57:21
 * @LastEditTime: 2020-03-25 17:58:08
 * @Description: 权限接口
 */

import request from "@/utils/request";

export function getPermission(id) {
  // 请求单条分类数据
  return request({
    url: `permissions/${id}`,
    method: "get"
  });
}

export function getPermissions(params) {
  // 请求所有分类数据
  return request({
    url: "permissions",
    method: "get",
    params
  });
}

export function createPermission(data) {
  // 创建分类数据
  return request({
    url: "permissions",
    method: "post",
    data
  });
}

export function updatePermission(id, data) {
  // 修改分类数据
  return request({
    url: `permissions/${id}`,
    method: "patch",
    data
  });
}

export function deletePermission(id) {
  // 删除单条分类数据
  return request({
    url: `permissions/${id}`,
    method: "delete"
  });
}
