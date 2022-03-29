Ext.define('MyLab.view.databinding.FormulaBinding', {
    extend: 'Ext.Container',
    xtype: 'binding-formulas',

    viewModel: {
        type: 'binding-formulas'
    },

    padding: 20,
    width: 400,
    autoSize: true,

    items: [{
        xtype: 'spinnerfield',
        label: 'Numero',
        stepValue: 1,
        bind: '{x}'
    }, {
        xtype: 'textfield',
        readOnly: true,
        label: 'Multiplicado por 2',
        bind: '{x} * 2 = {duasVezesX}'
    }, {
        xtype: 'textfield',
        readOnly: true,
        label: 'Multiplicado por  4',
        bind: '{x} * 4 = {aoQuadrado}'
    }, {
        xtype: 'component',
        margin: '10 0 0',
        instructions: 'Quando o campo é alterado, a formula calcula a multiplicação do valor dele: 2x e 4x vezes.'
    }]
});