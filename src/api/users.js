/*
 * @author: SuperficialL
 * @Date: 2019-08-24 12:35:32
 * @LastEditTime: 2020-03-25 19:01:06
 * @Description: 用户接口
 */

import request from "@/utils/request";

export function login(data) {
  // 通过用户名登录
  return request({
    url: "auth",
    method: "post",
    data,
  });
}

export function getUserInfo() {
  // 获取管理员信息
  return request({
    url: "profile",
    method: "get",
  });
}

export function getUser(id) {
  // 请求单条分类数据
  return request({
    url: `users/${id}`,
    method: "get",
  });
}

export function getUsers(params) {
  // 请求所有分类数据
  return request({
    url: "users",
    method: "get",
    params,
  });
}

export function createUser(data) {
  // 创建分类数据
  return request({
    url: "register",
    method: "post",
    data,
  });
}

export function updateUser(id, data) {
  // 修改分类数据
  return request({
    url: `users/${id}`,
    method: "patch",
    data,
  });
}

export function updateProfile(params) {
  // 请求所有分类数据
  return request({
    url: "users",
    method: "get",
    params,
  });
}

export function deleteUser(id) {
  // 删除单条分类数据
  return request({
    url: `users/${id}`,
    method: "delete",
  });
}
