/**
 * This example shows data binding using unary operators in expressions.
 */
 Ext.define('MyLab.view.databinding.UnaryOperatorBinding', {
    extend: 'Ext.Container',
    xtype: 'binding-algebra-unary-binding',

    viewModel: {
        type: 'default',
        data: {
            x: 1
        }
    },

    padding: 20,
    width: 400,
    autoSize: true,

    defaults: {
        xtype: 'textfield',
        readOnly: true
    },

    items: [{
        xtype: 'spinnerfield',
        stepValue: 1,
        readOnly: false,
        label: 'x',
        bind: '{x}'
    }, {
        label: '!x',
        bind: '{!x}'
    }, {
        label: '+x',
        bind: '{+x}'
    }, {
        label: '-x',
        bind: '{-x}'
    }, {
        label: 'Globais',
        // expressions should have at least one token to be evaluated
        bind: 'Versão do Ext JS: {@Ext.versions.ext.version}'
    }]
});