<script setup>
import { onMounted, ref } from 'vue';
import { useTransaction } from '@/store/transaction';
import baseTable from '@/components/tableComponents/baseTable.vue';
import { useBaseTable } from '@/composibles/useBaseTable';
import  pagination  from '@/components/tableComponents/pagination.vue'
import  filterByDateRange  from '@/components/tableComponents/filterByDateRange.vue'
import  filterByType  from '@/components/tableComponents/filterByType.vue'

const transactionStore = useTransaction()
let useTable;
const showTable = ref(false)
onMounted(async ()=>{
  await transactionStore.getTransactions()
  useTable = useBaseTable(transactionStore.transactions, 'transactions')
  showTable.value = true
})


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