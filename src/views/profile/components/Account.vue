<template>
    <el-form>
        <el-form-item label="昵称">
            <el-input v-model.trim="account.name"/>
        </el-form-item>
        <el-form-item label="邮箱">
            <el-input v-model.trim="account.email"/>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submit">更新</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import {updateProfile} from '@/api'

    export default {
        props: {
            account: {
                type: Object,
                default: () => {
                    return {
                        name: '',
                        email: ''
                    }
                }
            }
        },
        methods: {
            submit() {
                let data = {
                    username: this.account.name,
                    email: this.account.email
                };
                updateProfile(data).then(res=> {
                    console.log(res);
                });
                this.$message({
                    message: '用户信息更新成功!',
                    type: 'success',
                    duration: 5 * 1000
                })
            }
        }
    }
</script>
