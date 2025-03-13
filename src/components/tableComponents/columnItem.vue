<script setup>
import {ElTableColumn } from 'element-plus'
import {defineProps} from 'vue';

const props = defineProps({
    item: {
        type: Object  
    }
})

console.log()

</script>

<template>
    <el-table-column :prop="props.item.prop" :label="props.item.label" :sortable="props.item.sortable" :width="props.item.width">
      <template v-if="props.item.template" #default="{ row }"  >
        {{ props.item.templateData(row) }}
        </template>
    </el-table-column>
</template>