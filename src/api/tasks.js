/*
 * @author: SuperficialL
 * @Date: 2019-08-24 12:35:32
 * @LastEditTime : 2020-01-04 15:23:31
 * @Description: 任务接口
 */
import request from "@/utils/request";

export function getTask(id) {
  // 请求单条分类数据
  return request({
    url: `tasks/${id}`,
    method: "get"
  });
}

export function getTasks(params) {
  // 请求所有分类数据
  return request({
    url: "tasks",
    method: "get",
    params
  });
}

export function createTask(data) {
  // 创建分类数据
  return request({
    url: "tasks",
    method: "post",
    data
  });
}

export function updateTask(id, data) {
  // 修改分类数据
  return request({
    url: `tasks/${id}`,
    method: "patch",
    data
  });
}

export function deleteTask(id) {
  // 删除单条分类数据
  return request({
    url: `tasks/${id}`,
    method: "delete"
  });
}
