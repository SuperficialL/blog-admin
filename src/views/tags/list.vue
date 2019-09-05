<template>
    <div class="app-container">
        <h1>标签列表</h1>
        <el-table v-loading="loading"
                     :data="list"
                    border fit highlight-current-row
                    style="width: 100%"
        >
            <el-table-column align="center"
                             label="序号"
                             type="index"
                             width='80'
            >
                <template slot-scope="scope">
                    <span>{{(listQuery.page - 1) * listQuery.per_page + scope.$index + 1}}</span>
                </template>
            </el-table-column>
            
            <el-table-column width="180px" align="center" label="标签名称">
                <template slot-scope="scope">
                    <span>{{ scope.row.name }}</span>
                </template>
            </el-table-column>

            <el-table-column width="180px" align="center" label="创建时间">
                <template slot-scope="scope">
                    <span>{{ scope.row.create_time | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
                </template>
            </el-table-column>

            <el-table-column label="操作"
                             align="center"
            >
                <template slot-scope="scope">
                    <el-button type="primary"
                               size="small"
                               @click="$router.push(`/tags/edit/${scope.row._id}`)"
                    >
                        编辑
                    </el-button>
                    <el-button type="danger" size="small" @click="remove(scope.$index,scope.row)">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import {getTags,deleteTag} from '@/api'
    
    export default {
        data() {
            return {
                list:[],
                loading: false,
                listQuery: {
                    page: 1,
                    per_page: 10
                }
            }
        },
        methods: {
            async fetch() {
                // 获取所有标签数据
                const res = await getTags()
                this.list = res
            },
            async remove(index, row) {
                this.$confirm(`是否确定要删除标签 ${row.name} 吗?`,'提示',{
                    confirmButtonText: '确认',
                    cancleButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    const res = await deleteTag(row._id)
                    if (res.code) {
                        this.$message({
                            type:'success',
                            message: '删除成功!'
                        })
                        this.list.splice(index, 1)
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
