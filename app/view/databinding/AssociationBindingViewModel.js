Ext.define('MyLab.view.databinding.AssociationBindingViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.binding-association',

    formulas: {
        person: function(get) {
            return get('peopleList.selection');
        }
    },
    stores: {
        people: {
            //O model foi criando dentro de MyLab.models
            model: 'Person',
            autoLoad: true,
            proxy: {
                type: 'memory',
                data: MyLab.model.Person.generateData({
                    includeAccounts: true,
                    total: 5
                })
            }
        }
    }
});