/*
 * @author: SuperficialL
 * @Date: 2019-08-24 12:35:32
 * @LastEditTime: 2019-10-02 15:34:49
 * @Description: 标签接口
 */
import request from "@/utils/request";

export function getTags(params) {
    // 请求标签数据
    return request({
        url: "tags",
        method: "get",
        params,
    });
}

export function getTag(id) {
    // 请求标签详情数据
    return request({
        url: `tags/${id}`,
        method: "get",
    });
}

export function createTag(data) {
    // 请求标签详情数据
    return request({
        url: "tags",
        method: "post",
        data,
    });
}

export function updateTag(id, data) {
    // 更新标签数据
    return request({
        url: `tags/${id}`,
        method: "patch",
        data,
    });
}

export function deleteTag(id) {
    // 删除标签数据
    return request({
        url: `tags/${id}`,
        method: "delete",
    });
}
