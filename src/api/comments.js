/*
 * @Author: Superficial
 * @Date: 2019-11-10 14:54:26
 * @LastEditTime: 2019-11-10 14:55:45
 * @Description: 评论接口
 */
import request from "@/utils/request";

export function getComments(params) {
  // 请求标签数据
  return request({
    url: "comments",
    method: "get",
    params
  });
}

export function getComment(id) {
  // 请求标签详情数据
  return request({
    url: `comments/${id}`,
    method: "get"
  });
}

export function createComment(data) {
  // 请求标签详情数据
  return request({
    url: "comments",
    method: "post",
    data
  });
}

export function updateComment(id, data) {
  // 更新标签数据
  return request({
    url: `comments/${id}`,
    method: "patch",
    data
  });
}

export function deleteComment(id) {
  // 删除标签数据
  return request({
    url: `comments/${id}`,
    method: "delete"
  });
}
