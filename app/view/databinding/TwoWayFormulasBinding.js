Ext.define('MyLab.view.databinding.TwoWayFormulasBinding', {
    extend: 'Ext.Container',
    xtype: 'binding-two-way-formulas',

    viewModel: {
        type: 'binding-twowayformula'
    },

    defaultType: 'spinnerfield',
    padding: 10,
    width: 400,
    autoSize: true,

    items: [{
        label: 'Kelvin \u00b0',
        stepValue: 0.1,
        decimals: 1,
        bind: '{kelvin}'
    }, {
        label: 'Fahrenheit \u00b0',
        stepValue: 0.1,
        decimals: 1,
        bind: '{fahrenheit}'
    }, {
        label: 'Celcius \u00b0',
        stepValue: 0.1,
        decimals: 1,
        bind: '{celcius}'
    }, {
        xtype: 'component',
        margin: '10 0 0',
        html: 'O valor Celsius é calculado a partir de Kelvin. Quando o Celcius ' +
        'alterar o valor, o valor Kelvin é atualizado através da fórmula. ' +
        'O valor Fahrenheight é calculado a partir de Celsius. Quando o '+
        'O valor Fahrenheit muda, o valor Celsius é atualizado através da fórmula.'
    }]
});