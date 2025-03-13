<script setup>
import columnItem from './columnItem.vue';
import {tablesTemplate} from '@/constants/tablesData'
import { ElTable } from 'element-plus'
import { defineProps } from 'vue';

const props = defineProps({
  dataComposible: {
    type: Object
  }
})

</script>

<template>

    <el-table
      :data="props.dataComposible.paginatedData.value"
      style="width: 100%"
      @sort-change="props.dataComposible.handleSortChange"
    >
      <columnItem v-for="(item, index) in tablesTemplate[props.dataComposible.tableName]"  :item="item" :key="index" />

    </el-table>

</template>