import { ref, computed } from 'vue'
import {selectOptions} from '@/constants/tablesData'

export const useFilterByType = (tableName, data, dateRange) => {
    const filterType = ref('')
    const optionType = selectOptions[tableName].type
    const options = selectOptions[tableName].options

    const filteredData = computed(() => {
        let result = [...data]
        if (filterType.value) {
          result = result.filter((item) => item[optionType] === filterType.value)
        }
        if (dateRange.value && dateRange.value.length === 2) {
          const [start, end] = dateRange.value;
          result = result.filter((item) => {
            const itemDate = new Date(item.date);
            return itemDate >= start && itemDate <= end
          })
        }
        return result
    })

    return {
        options,
        filterType,
        filteredData
    }
}