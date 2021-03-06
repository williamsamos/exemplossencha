Ext.define('MyLab.model.Order', {
    extend: 'MyLab.model.Base',

    requires: [
        'Ext.data.proxy.Rest'
    ],

    fields: [
        // Declare an association with Company.
        // Each Company record will be decorated with
        // an "orders" method which yields a store
        // containing associated orders.
        {
            name: 'companyId',
            reference: {
                parent: 'Company',
                inverse: {
                    autoLoad: false
                }
            }
        },
        { name: 'productCode' },
        { name: 'quantity', type: 'number' },
        { name: 'date', type: 'date', dateFormat: 'Y-m-d' },
        { name: 'shipped', type: 'boolean' }
    ],

    proxy: {
        type: 'rest',
        url: '/MyLab/Order'
    }
});
