<script setup>
import { onMounted, ref } from 'vue'
import { createEntityStore } from '@/store/entityStore'
import baseTable from '@/components/tableComponents/baseTable.vue'
import { useBaseTable } from '@/composibles/useBaseTable'
import  pagination  from '@/components/tableComponents/pagination.vue'
import  filterByDateRange  from '@/components/tableComponents/filterByDateRange.vue'
import  filterByType  from '@/components/tableComponents/filterByType.vue'
import { useRoute } from 'vue-router'
import {capitalize} from '@/helpers/functions'

const route = useRoute();
const entityType = route.params.entityType
const store = createEntityStore(entityType)()
let useTable;
const showTable = ref(false)

onMounted(async () => {
  const fetchMethod = `get${capitalize(entityType)}`
  await store[fetchMethod]()
  useTable = useBaseTable(store[entityType], entityType)
  showTable.value = true
});


</script>

<template>
  <div v-if="showTable" >
    <div style="margin-bottom: 20px;">
      <filterByType  :dataComposible="useTable" />
      <filterByDateRange :dataComposible="useTable" />
    </div>
    <baseTable :dataComposible="useTable" />
    <pagination :dataComposible="useTable" />
  </div>
</template>