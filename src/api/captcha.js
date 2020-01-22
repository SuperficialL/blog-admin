/*
 * @Author: Superficial
 * @Date: 2020-01-22 10:02:50
 * @LastEditTime : 2020-01-22 10:03:29
 * @Description: 验证码接口
 */

import request from "@/utils/request";

export function getCaptcha() {
  // 请求单条分类数据
  return request({
    url: "captcha",
    method: "get"
  });
}
