import {computed, ref} from 'vue'

export const useBaseTable = (data, tableName) => {
    const filterType = ref(''); 
    const dateRange = ref([]);
    const currentPage = ref(1); 
    const pageSize = 10;

    const filteredData = computed(() => {
        let result = [...data];
        if (filterType.value) {
          result = result.filter((item) => item.type === filterType.value);
        }
        if (dateRange.value && dateRange.value.length === 2) {
          const [start, end] = dateRange.value;
          result = result.filter((item) => {
            const itemDate = new Date(item.date);
            return itemDate >= start && itemDate <= end;
          });
        }
        return result;
    });

    const paginatedData = computed(() => {
        const start = (currentPage.value - 1) * pageSize;
        const end = start + pageSize;
        return filteredData.value.slice(start, end);
    });
    
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
    };
    
    const handlePageChange = (page) => {
      currentPage.value = page;
    };

    return {
        filterType,
        filteredData,
        paginatedData,
        handleSortChange,
        handlePageChange,
        tableName,
        currentPage,
        pageSize
    }
}