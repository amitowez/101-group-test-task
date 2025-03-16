import { ref, watch } from "vue"
import { capitalize } from "@/helpers/functions"

export const useFormCreateEdit = (tableName, store, data, initTable) => {
    const isOpenModal = ref(false)
    const modalTitle = ref('')
    let modalPreData = {}

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

    watch(isOpenModal.value, (val)=>{
      if(!val){
        modalTitle.value = ''
        modalPreData = {}
      } 
    })

    return {
        createOrUpdate,
        openCreateUpdateModal,
        isOpenModal,
        modalTitle,
        modalPreData
    }
}