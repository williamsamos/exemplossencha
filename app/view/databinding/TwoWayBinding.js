Ext.define('MyLab.view.databinding.TwoWayBinding', {
    extend: 'Ext.Container',
    xtype: 'binding-two-way',
    controller: 'binding-two-way',

    viewModel: {
        data: {
            titulo: 'Titulo Padrão'
        }
    },

    padding: 10,
    width: 400,
    autoSize: true,

    items: [{
        xtype: 'titlebar',
        docked: 'top',
        bind: '{titulo}',
        items: [{
            align: 'right',
            text: 'Titulo aleatório',
            handler: 'makeRandomTitle'
        }]
    }, {
        xtype: 'textfield',
        label: 'Titulo',
        bind: '{titulo}'
    }, {
        xtype: 'component',
        margin: '10 0 0',
        html: 'Altere o campo de texto, e isso alterará automaticamente o texto da barra de título usando a ligação do data binding. ' +
        'O botão de título aleatório define o título no ViewModel, que é propagado para ' +
        'tanto o campo quanto o texto da barra de título, ou seja, o que você alterar em um, ele alterá tambem no outro.'
    }]
});