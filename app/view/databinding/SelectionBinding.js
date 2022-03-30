Ext.define('MyLab.view.databinding.SelectionBinding', {
    extend: 'Ext.Container',
    xtype: 'binding-selection',

    viewModel: {
        type: 'binding-selection'
    },

    referenceHolder: true,
    width: 500,
    autoSize: true,

    layout: {
        type: 'hbox',
        align: 'stretch'
    },

    items: [{
        xtype: 'list',
        flex: 0.7,
        autoSize: true,
        itemTpl: '{firstName} {lastName}',
        bind: '{people}',
        reference: 'peopleList'
    }, {
        xtype: 'formpanel',
        bodyPadding: 10,
        flex: 1,
        autoSize: true,
        items: [{
            xtype: 'textfield',
            label: 'Nome',
            bind: '{peopleList.selection.firstName}'
        }, {
            xtype: 'textfield',
            label: 'Sobrenome',
            bind: '{peopleList.selection.lastName}'
        }, {
            xtype: 'component',
            margin: '10 0 0',
            html: 'O formulário está vinculado à seleção na lista. Quando o formulário é alterado ' +
            'os campos mudam, os models na lista são atualizados automaticamente ' +
            'quando digitamos algo nos campos nome e sobrenome.'
        }]
    }]
});