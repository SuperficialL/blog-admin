/*
 * @author: SuperficialL
 * @Date: 2019-08-24 12:35:32
 * @LastEditTime: 2019-10-12 23:20:05
 * @Description: 分类接口
 */
import request from "@/utils/request";

export function getCategory(id) {
    // 请求单条分类数据
    return request({
        url: `categories/${id}`,
        method: "get"
    });
}

export function getCategories(params) {
    // 请求所有分类数据
    return request({
        url: "categories",
        method: "get",
        params
    });
}

export function createCategory(data) {
    // 创建分类数据
    return request({
        url: "categories",
        method: "post",
        data
    });
}

export function updateCategory(id, data) {
    // 修改分类数据
    return request({
        url: `categories/${id}`,
        method: "patch",
        data
    });
}

export function deleteCategory(id) {
    // 删除单条分类数据
    return request({
        url: `categories/${id}`,
        method: "delete"
    });
}
