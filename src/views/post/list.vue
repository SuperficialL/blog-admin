<template>
    <div class="app-container">
        <el-table v-loading="loading"
                  :data="list"
                  border fit highlight-current-row
                  style="width: 100%"
        >
            <el-table-column align="center" label="序号" width="60">
                <template slot-scope="scope">
                    <span>{{(listQuery.page - 1) * listQuery.per_page + scope.$index + 1}}</span>
                </template>
            </el-table-column>

            <el-table-column width="300px" align="center" label="标题">
                <template slot-scope="scope">
                    <span>{{ scope.row.title }}</span>
                </template>
            </el-table-column>

            <el-table-column width="180px" align="center" label="标签">
                <template slot-scope="scope">
                    <el-tag v-for="(tag,index) in scope.row.tags" :key="index">{{ tag.name }}</el-tag>
                </template>
            </el-table-column>

            <el-table-column width="100px" align="center" label="作者">
                <template slot-scope="scope">
                    <span>{{ scope.row.author.username }}</span>
                </template>
            </el-table-column>

            <el-table-column width="140px" align="center" label="日期">
                <template slot-scope="scope">
                    <span>{{ scope.row.createdAt | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
                </template>
            </el-table-column>

            <el-table-column class-name="status-col" label="状态" width="100px">
                <template slot-scope="scope">
                    <el-tooltip :content="scope.row.status|statusFilter"
                                placement="top"
                    >
                        <el-switch v-model="scope.row.status"
                                   active-value='p'
                                   inactive-value='d'
                                   active-color="#13ce66"
                                   inactive-color="#ff4949"
                                   @change="switchStatus(scope.row)"
                        >
                        </el-switch>
                    </el-tooltip>
                </template>
            </el-table-column>

            <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" 
                                size="small"
                                icon="el-icon-edit"
                                @click="$router.push(`/post/edit/${scope.row._id}`)"
                    >
                        编辑
                    </el-button>
                        
                    <el-button type="danger"
                                size="small"
                                icon="el-icon-delete"
                                class="del-btn"
                               @click="handleDel(scope.$index, scope.row)"
                    >
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <pagination v-show="total>0"
                    :total="total"
                    :page.sync="listQuery.page"
                    :limit.sync="listQuery.per_page"
                    @pagination="getList"/>
    </div>
</template>

<script>
    import {getArticles, updatePostStatus, deleteArticle} from '@/api'
    import Pagination from '@/components/Pagination'

    export default {
        name: 'PostList',
        components: {Pagination},
        filters: {
            statusFilter(status) {
                const statusMap = {
                    'd': '草稿',
                    'p': '发表'
                }
                return statusMap[status]
            }
        },
        data() {
            return {
                list: null,
                total: 0,
                loading: false,
                listQuery: {
                    page: 1,
                    per_page: 10
                }
            }
        },
        created() {
            this.getList()
        },
        methods: {
            getList() {
                this.loading = true
                getArticles(this.listQuery).then(res => {
                    console.log(res);
                    this.list = res.articles
                    this.total = res.total
                    this.loading = false
                })
            },
            switchStatus(row) {
                updatePostStatus(row.id, {'status': row.status}).then(response => {
                    if (response.data) {
                        this.$message.success('切换状态成功!');
                    } else {
                        this.$message.error('切换状态失败!');
                    }
                })
            },
            async handleDel(index, row) {
                this.$confirm(`此操作将永久删除 ${row.title} 这篇文章?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'danger'
                }).then(async () => {
                    this.loading = true;
                    const res = await deleteArticle(row._id)
                    if (res) {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.list.splice(index, 1)
                    }
                }).catch(() => {
                    this.$message({
                        type:'info',
                        message: '已取消删除!'
                    })
                });
            }
        }
    }
</script>

<style scoped>
    .del-btn {
        margin-left: 20px;
    }
</style>
