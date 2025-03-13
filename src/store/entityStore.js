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
        this[entityType] = reactive(await this.REQUESTS.GET('getAll'))
      },
      async [`get${capitalize(entityType)}ById`](id) {
        return await this.REQUESTS.GET('get', id)
      },
      [`create${capitalize(entityType)}`](data) {
        this.REQUESTS.POST('post', data)
      },
      [`update${capitalize(entityType)}`](data) {
        this.REQUESTS.PUT('put', data)
      },
      [`delete${capitalize(entityType)}`](id) {
        this.REQUESTS.DELETE('delete', id)
      },
    },
  });
};



export const useTransactionStore = createEntityStore('transactions')
export const useOrderStore = createEntityStore('orders')
export const useUserStore = createEntityStore('users')


