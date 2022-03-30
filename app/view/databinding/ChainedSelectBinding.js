Ext.define('MyLab.view.databinding.ChainedSelectBinding', {
    extend: 'Ext.Container',
    xtype: 'binding-combo-chaining',

    viewModel: {
        type: 'binding-chainedselect'
    },

    padding: 20,
    referenceHolder: true,
    width: 400,
    autoSize: true,

    items: [{
        xtype: 'fieldset',
        items: [{
            xtype: 'selectfield',
            label: 'País',
            placeholder: 'Escolha um país',
            reference: 'countryField',
            valueField: 'name',
            displayField: 'name',
            bind: {
                store: '{countries}'
            }
        }, {
            xtype: 'selectfield',
            label: 'Estados',
            valueField: 'abbr',
            displayField: 'state',
            bind: {
                store: '{states}',
                placeholder: '{countryField.value === "USA" ? "Escolha o estado" : countryField.value === "Canada" ? "Escolha a provincia" : ""}'
            }
        }, {
            xtype: 'component',
            margin: '20 0 0',
            html: 'A store de estados contém todos os estados dos EUA e províncias do Canadá, mas filtra com base no ' +
            'id do registro selecionado no campo país. De modo que for EUA vai trazer nas opções apenas os estados que são dos EUA. E caso for selecionado Canada, apenas as provincias do Canada.'
        }]
    }]
});