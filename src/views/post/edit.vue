<template>
  <div>
    <div>
      <h1>{{id? '编辑':'新建'}}文章</h1>
      <el-form :model="model" label-width="100px" @submit.native.prevent="save">
        <el-row>
          <el-form-item label="标题">
            <el-input v-model="model.title"></el-input>
          </el-form-item>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="创建时间">
              <el-date-picker v-model="model.created_time" type="datetime" placeholder="选择日期时间"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="最近修改时间">
              <el-date-picker
                v-model="model.updated_time"
                type="datetime"
                placeholder="选择日期时间"
                align="left"
                :picker-options="pickerOptions"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col>
            <el-form-item label-width="80px" label="作者:" class="postInfo-container-item">
              <el-select v-model="model.author" value-key="username" placeholder="搜索用户">
                <el-option
                  v-for="(item,index) in userListOptions"
                  :key="index"
                  :label="item.username"
                  :value="item"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col>
            <el-form-item label-width="80px" label="标签:" class="postInfo-container-item">
              <el-select
                v-model="model.tags"
                value-key="title"
                multiple
                filterable
                allow-create
                default-first-option
                placeholder="搜索标签"
              >
                <el-option
                  v-for="(item,index) in tagListOptions"
                  :key="index"
                  :label="item.title"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label-width="80px" label="分类:" class="postInfo-container-item">
              <el-select
                v-model="model.category"
                value-key="name"
                filterable
                allow-create
                default-first-option
                placeholder="搜索分类"
              >
                <el-option
                  v-for="(item,index) in catListOptions"
                  :key="index"
                  :label="item.name"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label-width="80px" label="缩略图:">
              <el-upload
                class="avatar-uploader"
                :headers="getAuthHeaders()"
                :action="uploadUrl"
                :show-file-list="false"
                :on-success="UploadSuccess"
              >
                <img v-if="model.thumbnail" :src="model.thumbnail" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <mavon-editor v-model="model.content" />
        </el-row>
        <el-row>
          <el-col>
            <el-form-item>
              <el-button type="primary" native-type="submit">保存</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
  import { getArticle, updateArticle, createArticle } from "@/api/articles";
  import { getCategories } from "@/api/category";
  import { getTags } from "@/api/tags";
  import { getUserList } from "@/api/users";
  export default {
    name: "PostDetail",
    props: ["id"],
    data() {
      return {
        model: {},
        loading: false,
        pickerOptions: {
          shortcuts: [
            {
              text: "今天",
              onClick(picker) {
                picker.$emit("pick", new Date());
              }
            },
            {
              text: "昨天",
              onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24);
                picker.$emit("pick", date);
              }
            },
            {
              text: "一周前",
              onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit("pick", date);
              }
            }
          ]
        },
        userListOptions: [],
        tagListOptions: [],
        catListOptions: []
      };
    },
    created() {
      this.id && this.fetchArticle();
      this.fetchCategories();
      this.fetchAuthors();
      this.fetchTags();
    },
    methods: {
      async fetchArticle() {
        // 获取当前文章
        const res = await getArticle(this.id);
        if (res.code === 200) {
          this.model = res.data;
        }
      },
      async fetchCategories() {
        // 获取分类
        const res = await getCategories();
        if (res.code === 200) {
          this.catListOptions = res.data.categories;
        }
      },
      async fetchAuthors() {
        // 获取作者
        const res = await getUserList();
        if (res.code === 200) {
          this.userListOptions = res.data.users;
        }
      },
      async fetchTags() {
        // 获取标签
        const res = await getTags();
        if (res.code === 200) {
          this.tagListOptions = res.data.tags;
        }
      },
      async save() {
        this.loading = true;
        let res;
        if (this.id) {
          // id 存在,修改数据
          res = await updateArticle(this.id, this.model);
        } else {
          // id不存在,创建数据
          res = await createArticle(this.model);
        }
        if (res.code === 200) {
          this.loading = false;
          this.$router.push("/post/list?refresh=1");
          this.$message({
            type: "success",
            message: "保存成功~"
          });
        }
      },
      UploadSuccess(res) {
        this.$set(this.model, "img", res.url);
        // this.model.img = res
      }
    }
  };
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
