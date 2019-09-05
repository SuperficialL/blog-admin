<template>
    <div>
        <el-table :data="categories">
            <el-table-column align="center"
                             label="序号"
                             type="index"
                             width='80'
            >
                <template slot-scope="scope">
                    <span>{{(listQuery.page - 1) * listQuery.per_page + scope.$index + 1}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="name" label="分类名称"></el-table-column>
            <el-table-column prop='parent.name' label="父级分类"></el-table-column>
            <el-table-column label="操作"
                             align="center"
            >
                <template slot-scope="scope">
                    <el-button type="primary"
                               size="small"
                               @click="$router.push(`/category/edit/${scope.row._id}`)"
                    >
                        编辑
                    </el-button>
                    <el-button type="danger" size="small" @click="remove(scope.row)">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import {getCategories,deleteCategory} from '@/api'
    
    export default {
        data() {
            return {
                categories:[],
                listQuery: {
                    page: 1,
                    per_page: 10
                },
                loading: false
            }
        },
        methods: {
            async fetch() {
                // 获取所有分类数据
                const res = await getCategories();
                if (res.code) {
                    this.categories = res.results;
                }
            },
            async remove(row) {
                this.$confirm(`是否确定要删除分类?"${row.name}"`,'提示',{
                    confirmButtonText: '确认',
                    cancleButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    const res = await deleteCategory(row._id)
                    if (res.code) {
                        this.$message({
                            type:'success',
                            message: '删除成功!'
                        })
                        this.fetch()
                    }
                }).catch(() => {
                    this.$message({
                        type:'info',
                        message: '已取消删除!'
                    })
                })
            },
        },
        created() {
            this.fetch()
        }
    }
</script>
