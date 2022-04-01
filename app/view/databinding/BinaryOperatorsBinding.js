/**
 * This example shows data binding using binary operators in expressions.
 */
 Ext.define('MyLab.view.databinding.BinaryOperatorsBinding', {
    extend: 'Ext.Container',
    xtype: 'binding-algebra-binary-operators',

    viewModel: {
        type: 'default',
        data: {
            x: 10,
            y: 10
        }
    },

    padding: 20,
    scrollable: 'y',
    width: 400,
    autoSize: true,

    defaults: {
        flex: 1,
        autoSize: true,
        defaults: {
            xtype: 'textfield',
            readOnly: true
        }
    },

    layout: {
        type: 'hbox',
        align: 'start'
    },

    items: [{
        margin: '0 10 0 0',
        items: [{
            xtype: 'spinnerfield',
            stepValue: 1,
            readOnly: false,
            label: 'x',
            bind: '{x}'
        }, {
            label: 'x + y',
            bind: '{x + y}'
        }, {
            label: 'x * y',
            bind: '{x * y}'
        }, {
            label: 'x > y',
            bind: '{x > y}'
        }, {
            label: 'x >= y',
            bind: '{x >= y}'
        }, {
            label: 'x == y',
            bind: '{x == y}'
        }, {
            label: 'x === y',
            bind: '{x === y}'
        }, {
            label: 'x > y && y >= 10',
            bind: '{x > y && y >= 10}'
        }]
    }, {
        margin: '0 0 0 10',
        items: [{
            xtype: 'spinnerfield',
            stepValue: 1,
            readOnly: false,
            label: 'y',
            bind: '{y}'
        }, {
            label: 'x / y',
            bind: '{x / y}'
        }, {
            label: 'x < y',
            bind: '{x < y}'
        }, {
            label: 'x <= y',
            bind: '{x <= y}'
        }, {
            label: 'x != y',
            bind: '{x != y}'
        }, {
            label: 'x !== y',
            bind: '{x !== y}'
        }, {
            label: 'x > y || y >= 10',
            bind: '{x > y || y >= 10}'
        }]
    }]
});