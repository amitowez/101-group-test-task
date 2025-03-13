import { ElNotification } from 'element-plus';
const notifyLibrary = {
    getAll: {
        transaction: {
            success: 'Транзакции загружены',
            error: 'Ошибка при загрузке транзакций',
        },
    },
    get: {
        transaction: {
            success: 'Транзакция загружена',
            error: 'Ошибка при загрузке транзакции',
        },
    },
    post: {
        transaction: {
            success: 'Транзакция создана',
            error: 'Ошибка при создании транзакции',
        },
    },
    put: {
        transaction: {
            success: 'Изменения транзакции сохранены',
            error: 'Ошибка при изменении транзакции',
        },
    },
    delete: {
        transaction: {
            success: 'Транзакция удалена успешно',
            error: 'Ошибка при удалении транзакции',
        },
    },
}

export function setNotifyStatus(notify, name, method, status){
    const type = status ? 'success' : 'error';
    const title = status ? 'Успешно' : 'Неудачно';
    const message = notifyLibrary[method][name][type]
    notify.close();
    ElNotification({
        title,
        message,
        type,
        duration: 2000, 
      });
}

