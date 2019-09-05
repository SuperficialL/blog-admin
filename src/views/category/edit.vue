<template>
    <div>
        <h1>{{id? '编辑':'新建'}}分类</h1>
        <el-form label-width="80px" @submit.native.prevent="save">
            <el-form-item label="父级分类">
                <el-select v-model="model.parent._id">
                    <el-option 
                        v-for="item in parents" 
                        :key="item._id"
                        :label='item.name'
                        :value='item._id'
                        >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label='名称'>
                <el-input v-model="model.name"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit">
                    保存
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {getCategory,getCategories,updateCategory,createCategory} from '@/api'
    
    export default {
        props: {
            id: {}
        },
        data() {
            return {
                model: {
                    parent: {}
                },
                parents:[]
            }
        },
        methods: {
            async save() {
                let res;
                if (this.id) {
                    // id存在,修改分类
                    res= await updateCategory(this.id,this.model);
                } else {
                    // id不存在,创建分类
                    console.log(this.model);
                    res = await createCategory(this.model);
                }
                if (res.code) {
                    this.$router.push('/category/list?refresh=1');
                    this.$message({
                        type:'success',
                        message:'保存成功'
                    });
                }
            },
            async fetch() {
                // 获取当前分类
                const res = await getCategory(this.id);
                if (res.code) {
                    this.model = Object.assign({},this.model,res.results);
                }
            },
            async fetchParents() {
                // 获取父级分类选项
                const res = await getCategories();
                if (res.code) {
                    this.parents = res.results;
                }
            }
        },
        created() {
            this.id && this.fetch();
            this.fetchParents();
        }
    }
</script>
