<script setup>
import { ElPagination } from 'element-plus'
import { defineProps } from 'vue'

const props = defineProps({
  dataComposible: {
    type: Object
  }
})
</script>

<template>
    <div style="margin-top: 20px; text-align: center;">
      <el-pagination
        v-model:current-page="props.dataComposible.currentPage.value"
        :page-size="props.dataComposible.pageSize"
        :total="props.dataComposible.filteredData.value.length"
        layout="prev, pager, next"
        @current-change="props.dataComposible.handlePageChange"
      />
    </div>

</template>