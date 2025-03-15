<script setup>
import baseTable from '@/components/tableComponents/baseTable.vue'
import { useBaseTable } from '@/composibles/useBaseTable'
import  pagination  from '@/components/tableComponents/pagination.vue'
import  filterByDateRange  from '@/components/tableComponents/filterByDateRange.vue'
import  filterByType  from '@/components/tableComponents/filterByType.vue'
import baseButton from '@/components/baseButton.vue'
import baseModalContainer from '@/components/baseModalContainer.vue'
import formCreateEdit from '@/components/formComponents/formCreateEdit.vue'
import { tablesTemplate } from '@/constants/tablesData'
import { onMounted } from 'vue'

let useTable = useBaseTable()


onMounted(async ()=>{
  await useTable.initTable()
})

</script>

<template>
  <div v-if="useTable.showTable.value" >
    <div style="margin-bottom: 20px;">
      <filterByType  :dataComposible="useTable" />
      <filterByDateRange :dataComposible="useTable" />
      <baseButton
        style="margin-left: 20px;"
        :text="'Добавить'"
        @action="useTable.openCreateUpdateModal()" />
    </div>
    <baseTable  :dataComposible="useTable" />
    <pagination :dataComposible="useTable" />
    <Teleport 
      v-if="useTable.isOpenModal.value" 
      to="body">
      <baseModalContainer
        v-model="useTable.isOpenModal.value"
        :title="useTable.modalTitle.value">
        <formCreateEdit 
          :options="useTable.options"
          :fields="tablesTemplate[useTable.tableName]" 
          :initialData="useTable.modalPreData" 
          @submit="useTable.createOrUpdate"  />
      </baseModalContainer>
    </Teleport>
  </div>

</template>