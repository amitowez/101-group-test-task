import { defineStore } from 'pinia';
import { requests } from '@/helpers/request';
import { reactive } from 'vue';

export const useTransaction = defineStore('transactions', {
  state: () => ({
    transactions: [],
    REQUESTS: new requests('http://localhost:3000/transactions',  'transaction')
  }),
  actions: {
    async getTransactions(){
        this.transactions = reactive(await this.REQUESTS.GET('getAll'))
        return this.transactions
    },
    async getTransactionById(id){
        return await this.REQUESTS.GET('get', id)
    },
    createTransaction(data){
        this.REQUESTS.POST('post', data)
    },
    updateTransaction(data){
        this.REQUESTS.PUT('put', data)
    },
    deleteTransaction(id){
        this.REQUESTS.DELETE('delete', id)
    }
  },
});