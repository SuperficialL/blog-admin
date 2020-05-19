/*
 * @author: SuperficialL
 * @Date: 2019-08-24 12:35:32
 * @LastEditTime: 2019-10-15 22:23:17
 * @Description: 七牛云接口
 */
import request from "@/utils/request";

export function getToken() {
  // 请求单条分类数据
  return request({
    url: "token",
    method: "get"
  });
}