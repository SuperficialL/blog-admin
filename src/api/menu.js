/*
 * @Author: Superficial
 * @Date: 2020-03-27 17:08:08
 * @LastEditTime: 2020-03-27 17:09:17
 * @Description: 菜单接口
 */

import request from "@/utils/request";

export function getMenu(id) {
  // 请求单条菜单数据
  return request({
    url: `menus/${id}`,
    method: "get"
  });
}

export function getMenus(params) {
  // 请求所有菜单数据
  return request({
    url: "menus",
    method: "get",
    params
  });
}

export function createMenu(data) {
  // 创建菜单数据
  return request({
    url: "menus",
    method: "post",
    data
  });
}

export function updateMenu(id, data) {
  // 修改菜单数据
  return request({
    url: `menus/${id}`,
    method: "patch",
    data
  });
}

export function deleteMenu(id) {
  // 删除单条菜单数据
  return request({
    url: `menus/${id}`,
    method: "delete"
  });
}
