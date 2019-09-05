<template>
    <div class="createPost-container">
        <el-form ref="postForm" :model="model" class="form-container" @submit.native.prevent="save">
            <sticky class-name='sub-navbar draft'>
                <Dropdown v-model="model.is_page" enabled-text="Page页面" disabled-text="Post页面"/>
                <Dropdown v-model="model.can_comment" enabled-text="评论打开" disabled-text="评论关闭"/>
                <Dropdown v-model="model.status" enabled-text="发布" disabled-text="草稿" enabledLabel="p"
                          disabledLabel="d"/>
                <el-button v-loading="loading" style="margin-left: 10px;" type="success" native-type="submit">
                     {{ id ? '更新' : '发布' }}
                </el-button>
            </sticky>

            <div class="createPost-main-container">
                <el-row>
                    <el-col :span="24">
                        <el-form-item style="margin-bottom: 20px;" prop="title">
                            <MDinput v-model="model.title" :maxlength="100" name="title" required>
                                标题
                            </MDinput>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="24">
                        <el-form-item style="margin-bottom: 20px;" prop="title">
                            <MDinput v-model="model.summary" name="summary" required>
                                摘要
                            </MDinput>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label-width="80px"
                                      label="发表时间:"
                                      class="postInfo-container-item"
                        >
                            <el-date-picker
                                    v-model="model.createdAt"
                                    type="datetime"
                                    placeholder="选择日期时间"
                                    :picker-options="pickerOptions">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label-width="80px"
                                      label="创建时间:"
                                      class="postInfo-container-item"
                        >
                            <el-date-picker
                                    v-model="model.updatedAt"
                                    type="datetime"
                                    placeholder="选择日期时间"
                                    :picker-options="pickerOptions">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label-width="80px"
                                      label="作者:"
                                      class="postInfo-container-item"
                        >
                            <el-select v-model="model.author"
                                        value-key="username"
                                        placeholder="搜索用户"
                            >
                                <el-option
                                        v-for="(item,index) in userListOptions"
                                        :key="index"
                                        :label="item.username"
                                        :value="item"
                                />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label-width="80px"
                                      label="标签:"
                                      class="postInfo-container-item"
                        >
                            <el-select v-model="model.tags"
                                       value-key="name"
                                       multiple
                                       filterable
                                       allow-create
                                       default-first-option
                                       placeholder="搜索标签"
                            >
                                <el-option v-for="(item,index) in tagListOptions"
                                           :key="index"
                                           :label="item.name"
                                           :value="item"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label-width="80px"
                                      label="分类:"
                                      class="postInfo-container-item"
                        >
                            <el-select v-model="model.category"
                                        value-key="name"
                                        filterable
                                        allow-create
                                        default-first-option
                                        placeholder="搜索分类"
                            >
                                <el-option v-for="(item,index) in catListOptions"
                                           :key="index"
                                           :label="item.name"
                                           :value="item"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label-width="80px" label="缩略图:">
                            <el-upload
                                class="avatar-uploader"
                                :headers="getAuthHeaders()"
                                :action="uploadUrl"
                                :show-file-list="false"
                                :on-success="UploadSuccess"
                                >
                                <img v-if="model.img" :src="model.img" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                    </el-col>
                    <!-- <markdown-editor v-model="model.body"></markdown-editor> -->
                </el-row>
                <el-row>
                    <mavon-editor v-model="model.body"/>
                </el-row>
            </div>
        </el-form>

    </div>
</template>

<script>
    import MarkdownEditor from '@/components/MarkdownEditor'
    import MDinput from '@/components/MDinput'
    import Sticky from '@/components/Sticky'
    import Dropdown from './components/Dropdown'
    import {getArticle, updateArticle, createArticle, getTags ,getCategories,getUserList} from '@/api'

    export default {
        name: 'PostDetail',
        components: {MarkdownEditor, MDinput, Sticky, Dropdown},
        props: ['id'],
        data() {
            return {
                model: {},
                loading: false,
                pickerOptions: {
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }]
                },
                userListOptions: [],
                tagListOptions: [],
                catListOptions:[],
            }
        },
        created() {
            this.id && this.fetchArticle()
            this.fetchCategories()
            this.fetchAuthors()
            this.fetchTags()
            this.message()
        },
        methods: {
            message() {
            },
            async fetchArticle() {
                // 获取当前文章
                const res = await getArticle(this.id)
                this.model = res
            },
            async fetchCategories() {
                // 获取分类
                const res = await getCategories()
                this.catListOptions = res
            },
            async fetchAuthors() {
                // 获取作者
                const res = await getUserList()
                this.userListOptions = res.userlist
            },
            async fetchTags() {
                // 获取标签
                const res = await getTags()
                this.tagListOptions = res
            },
            async save() {
                this.loading = true
                let res;
                if(this.id) {
                    // id 存在,修改数据
                    res = await updateArticle(this.id,this.model)
                } else {
                    // id不存在,创建数据
                    res = await createArticle(this.model)
                }
                if (res.code) {
                    this.loading = false
                    this.$router.push('/post/list?refresh=1')
                    this.$message({
                        type: 'success',
                        message: '保存成功~'
                    })
                } else {
                    console.log(res);
                }
            },
            UploadSuccess(res) {
                console.log(res);
                this.$set(this.model, 'img', res.url)
                // this.model.img = res
            },
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    @import "~@/styles/mixin.scss";

    .createPost-container {
        position: relative;
        .createPost-main-container {
            padding: 40px 45px 20px 50px;
        }
    }
</style>
