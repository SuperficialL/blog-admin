/*
 * @Author: Superficial
 * @Date: 2019-11-14 22:44:56
 * @LastEditTime: 2019-11-14 22:56:40
 * @Description: 站点信息接口
 */

import request from "@/utils/request";

export function getSiteInfo() {
  return request({
    url: "statistic",
    method: "get"
  });
}
