/**
 * This example shows data binding using formatters in expressions.
 */
 Ext.define('MyLab.view.databinding.FormatterBinding', {
    extend: 'Ext.Container',
    xtype: 'binding-algebra-formatters-binding',

    viewModel: {
        type: 'default',
        data: {
            x: 10.52,
            y: 10.52
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
        xtype: 'spinnerfield',
        stepValue: 1,
        readOnly: false,
        label: 'y',
        bind: '{y}'
    }, {
        label: 'Unico',
        bind: '{ ( x > y ) ? ( x:number("0") ) : ( (y/2):number("0.00") ) }'
    }, {
        label: 'Encadeado',
        bind: '{ (x*y*100):fileSize:lowercase }'
    }, {
        label: 'Alinhado',
        bind: '{ (x*y):currency( "USD":lowercase, (x/y):round(0):lessThanElse(20, 2, 5) ) }'
    }]
});