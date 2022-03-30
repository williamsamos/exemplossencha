Ext.define('MyLab.view.databinding.ChainedStoreBinding', {
    extend: 'Ext.Container',
    xtype: 'binding-chained-stores',

    viewModel: {
        type: 'binding-chainedstore'
    },

    height: 600,
    referenceHolder: true,
    width: 500,

    layout: {
        type: 'vbox'
    },

    items: [{
        xtype: 'grid',
        flex: 3,
        title: 'Todas as pessoas',
        bind: '{everyone}',
        columns: [{
            text: 'Nome',
            width: 200,
            dataIndex: 'firstName'
        }, {
            text: 'Sobrenome',
            width: 200,
            dataIndex: 'lastName'
        }, {
            text: 'Idade',
            width: 100,
            dataIndex: 'age'
        }]
    }, {
        xtype: 'grid',
        flex: 4,
        bind: {
            store: '{ageFiltered}',
            title: 'Pessoas de {minimumAge} anos ou mais'
        },
        items: [{
            xtype: 'singlesliderfield',
            docked: 'top',
            label: 'Idade minima',
            bind: '{minimumAge}',
            margin: '0 10',
            liveUpdate: true
        }],
        columns: [{
            text: 'Nome',
            width: 200,
            dataIndex: 'firstName'
        }, {
            text: 'Sobrenome',
            width: 200,
            dataIndex: 'lastName'
        }, {
            text: 'Idade',
            width: 100,
            dataIndex: 'age'
        }]
    }]
});