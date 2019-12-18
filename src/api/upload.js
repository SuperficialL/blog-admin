/*
 * @Author: Superficial
 * @Date: 2019-12-18 17:44:47
 * @LastEditTime : 2019-12-18 17:44:49
 * @Description: 上传富文本编辑器中的图片
 */

import request from "@/utils/request";

export function uploadImg(data) {
  return request({
    url: "uploads",
    method: "post",
    data
  });
}

