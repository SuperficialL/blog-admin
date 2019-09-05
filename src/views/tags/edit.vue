<template>
    <div class="createPost-container">
        <el-form :model="model" class="form-container" @submit.native.prevent="save">
            <sticky class-name='sub-navbar draft'>
                <el-checkbox v-model="model.active">Active</el-checkbox>
                <el-button v-loading="loading" style="margin-left: 10px;" type="success" native-type="submit"> {{ id ? '更新' : '新增' }}
                </el-button>
            </sticky>
            <div class="createPost-main-container">
                <el-row>
                    <el-col :span="24">
                        <el-form-item prop="name">
                            <MDinput v-model="model.name" :maxlength="100" name="name" required>
                                标签名
                            </MDinput>
                        </el-form-item>
                    </el-col>
                </el-row>
                
                <el-form-item>
                    <el-button type="primary" native-type="submit">
                        保存
                    </el-button>
                </el-form-item>
            </div>
        </el-form>
    </div>
</template>

<script>
    import MDinput from '@/components/MDinput'
    import Sticky from '@/components/Sticky'
    import {getTag,updateTag,createTag} from '@/api'
    
    export default {
        name: 'EditTag',
        props: {
            id: {}
        },
        components: { MDinput, Sticky },
        data() {
            return {
                loading: false,
                model: {
                    parent: {}
                },
                parents:[]
            }
        },
        methods: {
            async save() {
                let res
                if (this.id) {
                    // id存在,修改分类
                    res= await updateTag(this.id,this.model)
                } else {
                    // id不存在,创建分类
                    res = await createTag(this.model)
                }
                if (res.code) {
                    this.$router.push('/tags/list?refresh=1')
                    this.$message({
                        type:'success',
                        message:'保存成功'
                    })
                }
            },
            async fetch() {
                // 获取当前标签
                const res = await getTag(this.id)
                this.model = res
            }
        },
        created() {
            this.id && this.fetch()
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/mixin.scss";
    .createPost-container {
    position: relative;
    .createPost-main-container {
        padding: 40px 45px 20px 50px;
    }
    }
</style>

