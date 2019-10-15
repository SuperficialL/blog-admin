/*
 * @author: SuperficialL
 * @Date: 2019-08-24 12:35:32
 * @LastEditTime: 2019-10-15 22:23:17
 * @Description: 文章接口
 */
import request from "@/utils/request";

export function getArticle(id) {
    // 请求单条分类数据
    return request({
        url: `articles/${id}`,
        method: "get"
    });
}

export function getArticles(params) {
    // 请求所有文章数据
    return request({
        url: "articles",
        method: "get",
        params
    });
}

export function createArticle(data) {
    // 创建文章数据
    return request({
        url: "articles",
        method: "post",
        data
    });
}

export function updateArticle(id, data) {
    // 修改文章数据
    return request({
        url: `articles/${id}`,
        method: "patch",
        data
    });
}

export function deleteArticle(id) {
    // 删除单条文章数据
    return request({
        url: `articles/${id}`,
        method: "delete"
    });
}
