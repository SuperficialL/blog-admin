/*
 * @author: SuperficialL
 * @Date: 2019-08-24 12:35:32
 * @LastEditTime: 2019-08-31 14:37:36
 * @Description: 接口
 */

import qs from 'qs';
import request from '@/utils/request';


export function login(data) {
    // 通过用户名登录
    return request({
        url: `login`,
        method: 'post',
        data
    })
}

export function getUserInfo() {
    // 获取管理员信息
    return request({
        url: `profile`,
        method: 'get'
    })
}

export function getCategory(id) {
    // 请求单条分类数据
    return request({
        url: `categories/${id}`,
        method: 'get'
    })
}

export function getCategories(params) {
    // 请求所有分类数据
    return request({
        url: 'categories',
        method: 'get',
        params
    })
}

export function createCategory(data) {
    // 创建分类数据
    return request({
        url: 'categories',
        method: 'post',
        data
    })
}

export function updateCategory(id, data) {
    // 修改分类数据
    return request({
        url: `categories/${id}`,
        method: 'put',
        data
    })
}

export function deleteCategory(id) {
    // 删除单条分类数据
    return request({
        url: `categories/${id}`,
        method: 'delete'
    })
}

export function getTags(params) {
    // 请求标签数据
    return request({
        url: `tags`,
        method: 'get',
        params
    })
}

export function getTag(id) {
    // 请求标签详情数据
    return request({
        url: `tags/${id}`,
        method: 'get'
    })
}

export function createTag(data) {
    // 请求标签详情数据
    return request({
        url: `tags`,
        method: 'post',
        data
    })
}

export function updateTag(id, data) {
    // 更新标签数据
    return request({
        url: `tags/${id}`,
        method: 'patch',
        data
    })
}

export function deleteTag(id) {
    // 删除标签数据
    return request({
        url: `tags/${id}`,
        method: 'delete'
    })
}

export function getArticle(id) {
    // 请求单条分类数据
    return request({
        url: `articles/${id}`,
        method: 'get'
    })
}

export function getArticles(params) {
    // 请求所有文章数据
    return request({
        url: 'articles',
        method: 'get',
        params
    })
}

export function createArticle(data) {
    // 创建文章数据
    return request({
        url: 'articles',
        method: 'post',
        data
    })
}

export function updateArticle(id, data) {
    // 修改文章数据
    return request({
        url: `articles/${id}`,
        method: 'patch',
        data
    })
}

export function deleteArticle(id) {
    // 删除单条文章数据
    return request({
        url: `articles/${id}`,
        method: 'delete'
    })
}

export function uploadImage(formData) {
    // 上传文件
    return request({
        url: 'uploads',
        method: 'post',
        data: formData
    })
}


export function getBanner(id) {
    // 请求单条分类数据
    return request({
        url: `banners/${id}`,
        method: 'get'
    })
}

export function getBanners(params) {
    // 请求所有分类数据
    return request({
        url: 'banners',
        method: 'get',
        params
    })
}

export function createBanner(data) {
    // 创建分类数据
    return request({
        url: 'banners',
        method: 'post',
        data
    })
}

export function updateBanner(id, data) {
    // 修改分类数据
    return request({
        url: `banners/${id}`,
        method: 'put',
        data
    })
}

export function deleteBanner(id) {
    // 删除单条分类数据
    return request({
        url: `banners/${id}`,
        method: 'delete'
    })
}


export function getUser(id) {
    // 请求单条分类数据
    return request({
        url: `users/${id}`,
        method: 'get'
    })
}

export function getUserList(params) {
    // 请求所有分类数据
    return request({
        url: 'users',
        method: 'get',
        params
    })
}

export function createUser(data) {
    // 创建分类数据
    return request({
        url: 'users',
        method: 'post',
        data
    })
}

export function updateUser(id, data) {
    // 修改分类数据
    return request({
        url: `users/${id}`,
        method: 'patch',
        data
    })
}

export function updateProfile(params) {
    // 请求所有分类数据
    return request({
        url: 'users',
        method: 'get',
        params
    })
}

export function deleteUser(id) {
    // 删除单条分类数据
    return request({
        url: `users/${id}`,
        method: 'delete'
    })
}




// export {
//     loginByUsername, getUserInfo, getUserList, updateUser, createPost, updateProfile,
//     getPostList, createUser, updatePost, updatePostStatus, deletePost, fetchPost, userSearch, fetchTags,
//     getCategory
// }