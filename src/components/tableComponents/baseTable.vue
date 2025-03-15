<script setup>
import columnItem from './columnItem.vue';
import {tablesTemplate} from '@/constants/tablesData'
import { ElTable } from 'element-plus'
import baseModalContainer from '@/components/baseModalContainer.vue'
import baseButton from '@/components/baseButton.vue'
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

const openDeleteModal = ref(false)
const deleteId = ref(null)

</script>

<template>
  <div ref="tableContainer" style="width: 100%">
    <el-table
      :data="props.dataComposible.paginatedData.value"
      style="width: 100%"
      @sort-change="props.dataComposible.handleSortChange"
      @row-click="(row)=>props.dataComposible.openCreateUpdateModal( row)">
      <columnItem 
        v-for="(item, index) in computedColumns"  
        :item="item" 
        :key="index" />
      <el-table-column width="50" align="center">
        <template #default="{ row }">
          <div
            class="del-icon"
            @click.stop="deleteId = row.id; openDeleteModal = true">
            Х
          </div>
        </template>
      </el-table-column>
    </el-table>
    <Teleport to="body" v-if="openDeleteModal" >
      <baseModalContainer
        v-model="openDeleteModal"
        title="Вы уверены что хотите удалить?">
        <div style="display: flex; justify-content: space-around;"> 
          <baseButton text="Да" @action="props.dataComposible.deleteData(deleteId); openDeleteModal = false" />
          <baseButton text="Нет" @action="openDeleteModal = false" />
        </div>
      </baseModalContainer>
    </Teleport>
  </div>
</template>

<style>
.del-icon {
  border: 2px solid red;
  background-color: red;
  border-radius: 99999px;
  display: flex; 
  align-items: center; 
  justify-content: center; 
  width: 20px; 
  height: 20px;
  cursor: pointer;
  color: white;
}
</style>