Ext.define('MyLab.view.databinding.ComponentState', {
    extend: 'Ext.Container',
    xtype: 'binding-component-state',

    viewModel: true,

    padding: 20,
    width: 400,
    autoSize: true,

    items: [{
        xtype: 'checkboxfield',
        label: 'È admin',
        reference: 'isAdmin'
    }, {
        xtype: 'textfield',
        label: 'Chave do admin',
        enforceMaxLength: true,
        bind: {
            disabled: '{!isAdmin.checked}'
        }
    }, {
        xtype: 'togglefield',
        label: 'Prioridade',
        reference: 'priority'
    }, {
        xtype: 'textfield',
        label: 'Código de alta prioridade',
        hidden: true,
        bind: {
            hidden: '{!priority.value}'
        }
    }, {
        xtype: 'component',
        margin: '10 0 0',
        html: 'O campo chave do admin é disabilitado quando o admin não está marcado. ' +
            'E o campo alta prioridade fica oculto quando a prioridade está não está ativada.'
    }]
});