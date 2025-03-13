import { ElNotification } from 'element-plus'
const notifyLibrary = {
    getAll: {
      transactions: {
        success: 'Транзакции загружены',
        error: 'Ошибка при загрузке транзакций',
      },
      orders: {
        success: 'Заказы загружены',
        error: 'Ошибка при загрузке заказов',
      },
      users: {
        success: 'Пользователи загружены',
        error: 'Ошибка при загрузке пользователей',
      },
    },
    get: {
      transactions: {
        success: 'Транзакция загружена',
        error: 'Ошибка при загрузке транзакции',
      },
      orders: {
        success: 'Заказ загружен',
        error: 'Ошибка при загрузке заказа',
      },
      users: {
        success: 'Пользователь загружен',
        error: 'Ошибка при загрузке пользователя',
      },
    },
    post: {
      transactions: {
        success: 'Транзакция создана',
        error: 'Ошибка при создании транзакции',
      },
      orders: {
        success: 'Заказ создан',
        error: 'Ошибка при создании заказа',
      },
      users: {
        success: 'Пользователь создан',
        error: 'Ошибка при создании пользователя',
      },
    },
    put: {
      transactions: {
        success: 'Изменения транзакции сохранены',
        error: 'Ошибка при изменении транзакции',
      },
      orders: {
        success: 'Изменения заказа сохранены',
        error: 'Ошибка при изменении заказа',
      },
      users: {
        success: 'Изменения пользователя сохранены',
        error: 'Ошибка при изменении пользователя',
      },
    },
    delete: {
      transactions: {
        success: 'Транзакция удалена успешно',
        error: 'Ошибка при удалении транзакции',
      },
      orders: {
        success: 'Заказ удалён успешно',
        error: 'Ошибка при удалении заказа',
      },
      users: {
        success: 'Пользователь удалён успешно',
        error: 'Ошибка при удалении пользователя',
      },
    },
}

export function setNotifyStatus(notify, name, method, status){
    const type = status ? 'success' : 'error'
    const title = status ? 'Успешно' : 'Неудачно'
    const message = notifyLibrary[method][name][type]
    notify.close();
    ElNotification({
        title,
        message,
        type,
        duration: 2000, 
      });
}

