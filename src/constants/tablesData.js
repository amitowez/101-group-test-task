export const tablesTemplate = {
    transactions: [
        {
            prop: "id",
            label: "ID",
            proportion: "10", 
            sortable: false,
            template: false,
          },
          {
            fieldType: 'date',
            require: true,
            prop: "date",
            label: "Дата",
            proportion: "19", 
            sortable: true,
            template: false,
          },
          {
            fieldType: 'select',
            require: true,
            prop: "type",
            label: "Тип",
            proportion: "15", 
            sortable: false,
            template: true,
            templateData: (row) => (row.type === "income" ? "Доход" : "Расход"),
          },
          {
            fieldType: 'number',
            require: true,
            prop: "amount",
            label: "Сумма",
            proportion: "19", 
            sortable: true,
            template: false,
          },
          {
            fieldType: 'string',
            require: false,
            prop: "description",
            label: "Описание",
            proportion: "37", 
            sortable: false,
            template: false,
          },
    ],
    users: [
        {
          prop: 'id',
          label: 'ID',
          proportion: '15', 
          sortable: false,
          template: false,
        },
        {
          fieldType: 'string',
          require: true,
          prop: 'name',
          label: 'Имя',
          proportion: '25',
          sortable: true,
          template: false,
        },
        {
          fieldType: 'string',
          require: true,
          prop: 'email',
          label: 'Email',
          proportion: '35',
          sortable: true,
          template: false,
        },
        {
          fieldType: 'select',
          require: true,
          prop: 'role',
          label: 'Роль',
          proportion: '25', 
          sortable: false,
          template: true,
          templateData: (row) => row.role === 'admin' ? 'Администратор' : 'Пользователь',
        },
    ],
    orders: [
        {
          prop: 'id',
          label: 'ID',
          proportion: '10',
          sortable: false,
          template: false,
        },
        {
          fieldType: 'date',
          require: true,
          prop: 'date',
          label: 'Дата',
          proportion: '20', 
          sortable: true,
          template: false,
        },
        {
          fieldType: 'string',
          require: true,
          prop: 'customer',
          label: 'Клиент',
          proportion: '25', 
          sortable: true,
          template: false,
        },
        {
          fieldType: 'select',
          require: true,
          prop: 'status',
          label: 'Статус',
          proportion: '15', 
          sortable: false,
          template: true,
          templateData: (row) => {
            switch (row.status) {
              case 'completed': return 'Завершён';
              case 'pending': return 'В ожидании';
              default: return 'Неизвестно';
            }
          },
        },
        {
          fieldType: 'number',
          require: true,
          prop: 'total',
          label: 'Сумма',
          proportion: '20',
          sortable: true,
          template: false,
        },
        {
          fieldType: 'number',
          require: true,
          prop: 'items',
          label: 'Кол-во товаров',
          proportion: '10', 
          sortable: true,
          template: false,
        },
    ],
}

export const selectOptions = {
    transactions:{
        type: 'type',
        options: [
           { label:"Доход", value:"income" },
           { label:"Расход", value:"expense" }
        ]
    },
    users:{
        type: 'role',
        options: [
            { label:"Администратор", value:"admin" },
            { label:"Пользователь", value:"user" }
         ]
    },
    orders:{
        type: 'status',
        options: [
            { label:"Завершён", value:"completed" },
            { label:"В ожидании", value:"pending" }
        ]
    }
    
}
