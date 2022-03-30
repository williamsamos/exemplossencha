Ext.define('MyLab.model.tree.City', {
    extend: 'MyLab.model.tree.Base',
    entityName: 'City',
    idProperty: 'name',
    glyph: 'xf19c@\'Font Awesome 5 Free\'',
    fields: [{
        name: 'name',
        convert: undefined
    }, {
        name: 'iconCls',
        defaultValue: 'x-fa fa-university'
    }]
});
