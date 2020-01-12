/*
 * @Author: Superficial
 * @Date: 2019-12-18 17:44:47
 * @LastEditTime : 2020-01-03 15:51:26
 * @Description: 上传富文本编辑器中的图片
 */

import request from "@/utils/request";

/**
 * @description: 上传图片
 * @param {FormData} data 表单格式数据
 * @return {Object} result 返回的上传图片的状态
 */
export function uploadImg(data) {
  return request({
    url: "uploads",
    method: "post",
    data
  });
}

