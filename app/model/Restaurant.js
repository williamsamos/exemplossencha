Ext.define('MyLab.model.Restaurant', {
    extend: 'MyLab.model.Base',

    requires: [
        'Ext.data.summary.Average'
    ],

    fields: [
        'name',
        'cuisine',
        {
            name: 'rating',
            summary: 'average'
        }
    ]
});
