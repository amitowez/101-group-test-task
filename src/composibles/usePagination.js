import { ref, computed } from "vue"

export const usePagination = (data) => {
    const currentPage = ref(1)
    const pageSize = 10

    const paginatedData = computed(() => {
        const start = (currentPage.value - 1) * pageSize;
        const end = start + pageSize;
        return data.value.slice(start, end)
    })

    const handlePageChange = (page) => {
        currentPage.value = page
    }

    return {
        currentPage,
        pageSize,
        paginatedData,
        handlePageChange
    }
}