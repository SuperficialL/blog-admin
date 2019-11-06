/*
 * @author: SuperficialL
 * @Date: 2019-08-24 12:35:32
 * @LastEditTime: 2019-10-09 22:21:55
 * @Description: 接口
 */

import request from "@/utils/request";

export function uploadImage(formData) {
  // 上传文件
  return request({
    url: "uploads",
    method: "post",
    data: formData
  });
}

export function getBanner(id) {
  // 请求单条分类数据
  return request({
    url: `banners/${id}`,
    method: "get"
  });
}

export function getBanners(params) {
  // 请求所有分类数据
  return request({
    url: "banners",
    method: "get",
    params
  });
}

export function createBanner(data) {
  // 创建分类数据
  return request({
    url: "banners",
    method: "post",
    data
  });
}

export function updateBanner(id, data) {
  // 修改分类数据
  return request({
    url: `banners/${id}`,
    method: "put",
    data
  });
}

export function deleteBanner(id) {
  // 删除单条分类数据
  return request({
    url: `banners/${id}`,
    method: "delete"
  });
}
