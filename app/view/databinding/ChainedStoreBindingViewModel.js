Ext.define('MyLab.view.databinding.ChainedStoreBindingViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.binding-chainedstore',

    stores: {
        everyone: {
            model: 'MyLab.model.Person',
            data: MyLab.model.Person.generateData(15, 10)
        },
        ageFiltered: {
            source: '{everyone}',
            filters: [{
                property: 'age',
                value: '{minimumAge}',
                operator: '>='
            }],
            sorters: [{
                property: 'age',
                direction: 'ASC'
            }]
        }
    },
    data: {
        minimumAge: 18
    }
});