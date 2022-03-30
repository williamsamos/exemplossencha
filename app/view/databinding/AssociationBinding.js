Ext.define('MyLab.view.databinding.AssociationBinding', {
    extend: 'Ext.Container',
    xtype: 'binding-associations',

    viewModel: {
        type: 'binding-association'
    },

    height: 400,
    referenceHolder: true,
    width: 400,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    items: [{
        xtype: 'list',
        flex: 2,
        title: 'Pessoa',
        itemTpl: '{firstName} {lastName}',
        reference: 'peopleList',
        bind: '{people}'
    }, {
        xtype: 'list',
        flex: 3,
        itemTpl: 'Criado em: {created:date("Y-m-d")}, Key: {accountKey}',
        items: [{
            xtype: 'titlebar',
            docked: 'top',
            title: 'Contas',
            bind: 'Contas de {person.firstName} {person.lastName}'
        }],
        bind: '{person.accounts}'
    }]
});