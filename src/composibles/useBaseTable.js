import { reactive, ref } from 'vue'
import { capitalize } from '@/helpers/functions'
import { useRoute } from 'vue-router'
import { createEntityStore } from '@/store/entityStore'
import { usePagination } from './usePagination'
import { useFilterByType } from './useFilterByType'
import { useDateRange } from './useDateRange'
import { useFormCreateEdit } from './useFormCreateEdit'

export const useBaseTable = () => {
    const route = useRoute();
    const tableName = route.params.entityType
    const store = createEntityStore(tableName)()
    let data = reactive([]);
    const { dateRange } = useDateRange()
    const { filterType, options, filteredData } = useFilterByType(tableName, data, dateRange)
    const {
        createOrUpdate,
        openCreateUpdateModal,
        isOpenModal,
        modalTitle,
        modalPreData
    } = useFormCreateEdit(tableName, store, data, initTable)
    const showTable = ref(false)

    async function initTable() {
      showTable.value = false
      await store[`get${capitalize(tableName)}`]()
      data.length = 0
      data.push(...store[tableName])
      showTable.value = true
      return
    }

    const {
      currentPage,
      pageSize,
      paginatedData,
      handlePageChange
    } = usePagination(filteredData)
 
    const handleSortChange = ({ prop, order }) => {
        data.sort((a, b) => {
          if (prop === 'date') {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return order === 'ascending' ? dateA - dateB : dateB - dateA;
          }
          if (prop === 'amount') {
            return order === 'ascending' ? a.amount - b.amount : b.amount - a.amount;
          }
          return 0;
        });
    }
    
    const deleteData = async (id) => {
      await store[`delete${capitalize(tableName)}`](id)
      await initTable()
      isOpenModal.value = false

    }


    return {
        showTable,
        modalPreData,
        options,
        isOpenModal,
        modalTitle,
        dateRange,
        filterType,
        filteredData,
        paginatedData,
        handleSortChange,
        handlePageChange,
        openCreateUpdateModal,
        deleteData,
        createOrUpdate,
        initTable,
        tableName,
        currentPage,
        pageSize,
        data
    }
}