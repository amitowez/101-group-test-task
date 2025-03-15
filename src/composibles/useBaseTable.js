import {computed, reactive, ref, watch} from 'vue'
import {selectOptions} from '@/constants/tablesData'
import { capitalize } from '@/helpers/functions'
import { useRoute } from 'vue-router'
import { createEntityStore } from '@/store/entityStore'

export const useBaseTable = () => {

    const route = useRoute();
    const tableName = route.params.entityType
    const store = createEntityStore(tableName)()
    let data = reactive([]);
    const filterType = ref('')
    const dateRange = ref([])
    const currentPage = ref(1)
    const pageSize = 10;
    const optionType = selectOptions[tableName].type
    const options = selectOptions[tableName].options
    const isOpenModal = ref(false)
    const modalTitle = ref('')
    let modalPreData = {}
    const showTable = ref(false)

    async function initTable() {
      showTable.value = false
      await store[`get${capitalize(tableName)}`]()
      data.length = 0
      data.push(...store[tableName])
      showTable.value = true
      return
    }

    const filteredData = computed(() => {
        let result = [...data];
        if (filterType.value) {
          result = result.filter((item) => item[optionType] === filterType.value);
        }
        if (dateRange.value && dateRange.value.length === 2) {
          const [start, end] = dateRange.value;
          result = result.filter((item) => {
            const itemDate = new Date(item.date);
            return itemDate >= start && itemDate <= end;
          });
        }
        return result;
    })

    const paginatedData = computed(() => {
        const start = (currentPage.value - 1) * pageSize;
        const end = start + pageSize;
        return filteredData.value.slice(start, end);
    })
    
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
    
    const handlePageChange = (page) => {
      currentPage.value = page;
    }

    watch(isOpenModal.value, (val)=>{
      if(!val){
        modalTitle.value = ''
        modalPreData = {}
      } 
    })

    const openCreateUpdateModal = (obj) => {
      isOpenModal.value = true
      if(obj){
        modalPreData =  Object.assign(modalPreData, obj)
        modalTitle.value = 'Изменить'
      } else {
        modalTitle.value = 'Создать'
      }
    }

    const createOrUpdate = async (obj) => {
      if(obj.id){
        await store[`update${capitalize(tableName)}`](obj)
      } else {
        obj.id = data[data.length-1].id + 1
        await store[`create${capitalize(tableName)}`](obj)
      }
      await initTable()
      isOpenModal.value = false
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