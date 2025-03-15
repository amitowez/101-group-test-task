import { ElNotification } from 'element-plus';
import { setNotifyStatus } from './notify'
import axios from 'axios';

export class requests {

    url;
    name;
    
    constructor(path, name){
        this.url = path
        this.name = name
    }

    async GET(method, id){
        if(id){
            return this.request(axios.get(this.url+`/${id}`), method)
        } else {
            return this.request(axios.get(this.url), method)
        }
    }

    async POST(method, data){
        return this.request(axios.post(this.url, data), method)
    }

    async PUT(method, data){
        return this.request(axios.put(this.url+`/${data.id}`, data), method)
    }

    async DELETE(method, id){
        return this.request(axios.delete(this.url+`/${id}`), method)
    }
    
    async request(callback, method){
        let notificationInstance = ElNotification({
            title: 'Загрузка',
            message: 'Идёт обработка запроса...',
            duration: 0, 
            showClose: false,
        });

        try {

            const result = await callback

            setNotifyStatus(notificationInstance, this.name, method, true)

            return result.data

        } catch (e){

            const resultReject = await this.reject(callback)

            if(!resultReject){

                setNotifyStatus(notificationInstance, this.name, method, false)

            } else {

                return resultReject.data

            }

        }
    }

    async reject(callback){
        try {
            return await callback
        } catch {
            return false
        }
    }
} 