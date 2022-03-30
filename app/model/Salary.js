Ext.define('MyLab.model.Salary', {
    extend: 'Ext.data.TreeModel',

    requires: [
        'MyLab.reader.Salary'
    ],

    fields: [
        'state',
        'text',
        'salary'
    ],

    proxy: {
        type: 'ajax',
        url: 'data/tree/salary.json',
        reader: {
            type: 'salary'
        }
    }

});
