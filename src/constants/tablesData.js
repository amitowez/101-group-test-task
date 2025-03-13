export const tablesTemplate = {
    transactions: [
        {
            prop: "id",
            label: "ID", 
            width: "80",
            sortable: false,
            template: false
        },
        {
            prop: "date",
            label: "Дата", 
            width: "150",
            sortable: true,
            template: false
        },
        {
            prop: "type",
            label: "Тип", 
            width: "120",
            sortable: false,
            template: true,
            templateData: (row) =>  row.type === "income" ? "Доход" : "Расход" 
        },
        {
            prop: "amount",
            label: "Сумма", 
            width: "150",
            sortable: true,
            template: false
        },
        {
            prop: "description",
            label: "Описание", 
            width: "300",
            sortable: false,
            template: false
        },
    ]
}

export const selectOptions = {
    transactions:{
        type: [
           { label:"Доход", value:"income" },
           { label:"Расход", value:"expense" }
        ]
    }
    
}
