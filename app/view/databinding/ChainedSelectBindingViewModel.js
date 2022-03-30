Ext.define('MyLab.view.databinding.ChainedSelectBindingViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.binding-chainedselect',

    stores: {
        countries: {
            type: 'countries',
            autoLoad: true
        },
        states: {
            type: 'country-states',
            autoLoad: true,
            filters: [{
                property: 'country',
                value: '{countryField.selection.name}'
            }],
            sorters: [{
                property: 'state'
            }]
        }
    }
});