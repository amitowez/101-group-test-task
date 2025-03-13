<script setup>
import columnItem from './columnItem.vue';
import {tablesTemplate} from '@/constants/tablesData'
import { ElTable } from 'element-plus'
import { defineProps, onMounted, onUnmounted, ref, computed } from 'vue'

const props = defineProps({
  dataComposible: {
    type: Object
  }
})
const baseColumns = tablesTemplate[props.dataComposible.tableName]
const totalProportion = baseColumns.reduce((sum, col) => sum + col.proportion, 0)
const tableContainer = ref(null)
const containerWidth = ref(0)

const computedColumns = computed(() => {
  return baseColumns.map((column) => ({
    ...column,
    width: Math.floor((column.proportion / totalProportion) * containerWidth.value),
  }));
});

const updateContainerWidth = () => {
  if (tableContainer.value) {
    containerWidth.value = tableContainer.value.offsetWidth;
  }
};

onMounted(() => {
  updateContainerWidth();
  window.addEventListener('resize', updateContainerWidth)
});

onUnmounted(() => {
  window.removeEventListener('resize', updateContainerWidth)
});


</script>

<template>
  <div ref="tableContainer" style="width: 100%">
    <el-table
      :data="props.dataComposible.paginatedData.value"
      style="width: 100%"
      @sort-change="props.dataComposible.handleSortChange">
      <columnItem 
        v-for="(item, index) in computedColumns"  
        :item="item" 
        :key="index" />
    </el-table>
  </div>
</template>