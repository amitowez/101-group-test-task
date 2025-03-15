import { defineStore } from 'pinia'
import { requests } from '@/helpers/request'
import { reactive } from 'vue'
import { capitalize } from '@/helpers/functions'


export const createEntityStore = (entityType) => {
  const endpointMap = {
    transactions: 'http://localhost:3000/transactions',
    orders: 'http://localhost:3000/orders',
    users: 'http://localhost:3000/users',
  };

  const entityEndpoint = endpointMap[entityType]

  return defineStore(entityType, {
    state: () => ({
      [entityType]: [], 
      REQUESTS: new requests(entityEndpoint, entityType),
    }),
    actions: {
      async [`get${capitalize(entityType)}`]() {
        this[entityType] = []
        this[entityType] = reactive(await this.REQUESTS.GET('getAll'))
        return 
      },

      async [`get${capitalize(entityType)}ById`](id) {
        return await this.REQUESTS.GET('get', id)
      },

      async  [`create${capitalize(entityType)}`](data) {
        
        return this.REQUESTS.POST('post', data)
      },

      async  [`update${capitalize(entityType)}`](data) {
        return  this.REQUESTS.PUT('put', data)
      },

      async  [`delete${capitalize(entityType)}`](id) {
        return  this.REQUESTS.DELETE('delete', id)
      },
    },
  });
};



export const useTransactionStore = createEntityStore('transactions')
export const useOrderStore = createEntityStore('orders')
export const useUserStore = createEntityStore('users')


