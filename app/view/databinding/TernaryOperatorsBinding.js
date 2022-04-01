/**
 * This example shows data binding using ternary operators in expressions.
 */
 Ext.define('MyLab.view.databinding.TernaryOperatorsBinding', {
    extend: 'Ext.Container',
    xtype: 'binding-algebra-ternary-operators',

    viewModel: {
        type: 'default',
        data: {
            x: 10,
            y: 11
        }
    },

    padding: 20,
    width: 400,
    autoSize: true,

    items: [{
        xtype: 'spinnerfield',
        stepValue: 1,
        label: 'x',
        bind: '{x}'
    }, {
        xtype: 'spinnerfield',
        stepValue: 1,
        label: 'y',
        bind: '{y}'
    }, {
        xtype: 'textfield',
        readOnly: true,
        label: 'Calculado',
        bind: '{x > y ? "x é maior" : (x == y ? "x é igual a y" : "y é maior")}'
    }]
});