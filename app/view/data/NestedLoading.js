/*
 * This panel sets up a DataView, which defines an XTemplate used to render our data. We also set up
 * the toolbar with the "Load Nested Data" button here
 */
Ext.define('MyLab.view.data.NestedLoading', {
    extend: 'Ext.Panel',
    xtype: 'nestedloading',
    controller: 'nestedloading',

    height: 400,
    layout: 'fit',
    width: 400,

    tbar: [{
        text: 'Carregar dados alinhados',
        handler: 'onLoad'
    }, {
        text: 'Explicar',
        handler: 'onExplain'
    }],

    items: [{
        xtype: 'dataview',
        reference: 'dataview',
        emptyText: 'Nenhum dado carregado',
        padding: 10,
        /*
         * The XTemplate allows us to easily render the data from our User model, as well as
         * iterating over each User's Orders and OrderItems:
         */
        itemTpl: '<div class="user">' +
                '<h3>Pedidos de: {nome}</h3>' +
                '<tpl for="orders">' +
                    '<div class="order" style="padding: 0 0 10px 20px;">' +
                        'Pedido: {id} ({status})' +
                        '<ul>' +
                        '<tpl for="orderItems">' +
                            '<li>{quantidade} x {nome}</li>' +
                        '</tpl>' +
                        '</ul>' +
                    '</div>' +
                '</tpl>' +
            '</div>',

        store: {
            model: "Usuario",

            data: [
                {
                    "id": 1,
                    "nome": "Ed Spencer",
                    "orders": [
                        {
                            "id": 100,
                            "status": "enviado",
                            "orderItems": [
                                {
                                    "id": 453,
                                    "preco": 19.50,
                                    "quantidade": 3,
                                    "nome": "Algum produto"
                                }
                            ]
                        },
                        {
                            "id": 101,
                            "status": "aguardando",
                            "orderItems": [
                                {
                                    "id": 543,
                                    "preco": 54.99,
                                    "quantidade": 1,
                                    "nome": "Algum produto"
                                },
                                {
                                    "id": 544,
                                    "preco": 20,
                                    "quantidade": 2,
                                    "nome": "Outro produto"
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": 2,
                    "nome": "Jamie Avins",
                    "orders": [
                        {
                            "id": 200,
                            "status": "enviado",
                            "orderItems": [
                                {
                                    "id": 456,
                                    "preco": 19.50,
                                    "quantidade": 2,
                                    "nome": "Um produto"
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": 3,
                    "nome": "Aaron Conran",
                    "orders": [
                        {
                            "id": 300,
                            "status": "com atraso",
                            "orderItems": [
                                {
                                    "id": 743,
                                    "preco": 19.50,
                                    "quantidade": 2,
                                    "nome": "O produto"
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": 4,
                    "nome": "Robert Dougan",
                    "orders": [
                        {
                            "id": 400,
                            "status": "enviado",
                            "orderItems": [
                                {
                                    "id": 666,
                                    "preco": 19.50,
                                    "quantidade": 1,
                                    "nome": "Sem produto"
                                }
                            ]
                        }
                    ]
                }
            ],

            proxy: {
                type: "memory"
            }
        }
    }]
});