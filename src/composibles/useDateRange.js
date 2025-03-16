import {ref} from 'vue'

export const useDateRange = () => {
    const dateRange = ref([])

    return {
        dateRange
    }
}