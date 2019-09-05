<template>
    <div class="app-container">
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.keyword" placeholder="请输入搜索关键字( 昵称 / 用户名 / 邮箱 )"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="searchUser">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <el-table v-loading="loading"
                  ref="multipleTable"
                  :data="list"
                  border fit highlight-current-row style="width: 100%"
        >
            <el-table-column align="center"
                             label="序号"
                             type="index"
                             width="80"
            >
                <template slot-scope="scope">
                    <span>{{(listQuery.page - 1) * listQuery.per_page + scope.$index + 1}}</span>
                </template>
            </el-table-column>

            <el-table-column width="140" align="center" label="昵称">
                <template slot-scope="scope">
                    <span>{{ scope.row.username }}</span>
                </template>
            </el-table-column>

            <el-table-column width="140" align="center" label="头像">
                <template slot-scope="scope">
                    <img :src="scope.row.avatar">
                </template>
            </el-table-column>

            

            <el-table-column width="180" align="center" label="邮箱">
                <template slot-scope="scope">
                    <span>{{ scope.row.email }}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="注册时间">
                <template slot-scope="scope">
                    <span>{{ scope.row.createdAt | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="登录时间">
                <template slot-scope="scope">
                    <span>{{ scope.row.updatedAt | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
                </template>
            </el-table-column>

            <el-table-column label="操作"
                             align="center"
                             width="230"
            >
                <template slot-scope="scope">
                    <el-button type="primary"
                               size="small"
                               icon="el-icon-edit"
                               @click="$router.push(`/user/edit/${scope.row._id}`)"
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
                    @pagination="getUserList"/>
    </div>
</template>

<script>
    import Pagination from '@/components/Pagination'
    import {getUserList, updateUser, deleteUser} from "@/api";

    export default {
        name: 'UserList',
        components: {Pagination},
        data() {
            return {
                filters: {
                    keyword: ''
                },
                listQuery: {
                    page: 1,
                    per_page: 10
                },
                list: null,
                total: 0,
                loading: false
            }
        },
        created() {
            this.getUserList()
        },
        methods: {
            getUserList() {
                // 获取用户列表数据
                this.loading = true;
                getUserList(this.listQuery).then(res => {
                    this.list = res.userlist;
                    this.total = res.total;
                    this.loading = false
                })
            },
            searchUser() {
                let params = {
                    keyword: this.filters.keyword
                };
            },
            //删除
            async handleDel(index, row) {
                this.$confirm(`确认删除用户 ${row.username} 吗?`, '提示', {
                    confirmButtonText: '确认',
                    cancleButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    this.loading = true;
                    const res = await deleteUser(row._id)
                    if (res.code) {
                        this.loading = false;
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
                });
            }
        }
    }
</script>
