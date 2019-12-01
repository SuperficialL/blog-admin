<template>
  <div class="block">
    <el-timeline>
      <el-timeline-item
        v-for="(item, index) of timeLines"
        :key="index"
        :timestamp="item.timestamp"
        placement="top"
      >
        <el-card>
          <h4>{{ item.title }}</h4>
          <p>{{ item.content }}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
import { getTimeLines } from "@/api/timeline";
export default {
  data() {
    return {
      timeLines: [
        {
          timestamp: "2019/4/20",
          title: "Update Github template",
          content: "PanJiaChen committed 2019/4/20 20:46"
        }
      ]
    };
  },

  methods: {
    async fetch() {
      const res = await getTimeLines();
      if (res.code === 200) {
        this.timeLines = res.timelines;
      }
    }
  },

  created() {
    this.fetch();
  }
};
</script>
