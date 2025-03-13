<script setup>
import { defineProps } from 'vue';
import { ElSelect, ElOption } from 'element-plus';
import {selectOptions} from '@/constants/tablesData'

const props = defineProps({
  dataComposible: {
    type: Object
  },
})


</script>

<template>
    <el-select 
        v-model="dataComposible.filterType.value" 
        placeholder="Выберите тип" 
        clearable style="width: 200px;
        margin-right: 20px;">
      <el-option 
        v-for="option in selectOptions[dataComposible.tableName].type" 
        :label="option.label" 
        :value="option.value" />
    </el-select>
</template>