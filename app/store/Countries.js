Ext.define('MyLab.store.Countries', {
    extend: 'Ext.data.Store',

    alias: 'store.countries',

    model: 'MyLab.model.tree.Country',

    autoLoad: true,

    data: [
        {
            'name': 'Brasil',
        },

        {
            'name': 'EUA',
        },
        
        {
            'name': 'Canada',
        }
    ],

    proxy: {
        type: 'memory',
        reader: 'json'
    }
});