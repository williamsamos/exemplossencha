Ext.define('MyLab.model.tree.Country', {
    extend: 'MyLab.model.tree.Base',
    entityName: 'Country',
    idProperty: 'name',
    glyph: 'xf024@\'Font Awesome 5 Free\'',
    fields: [{
        name: 'name',
        convert: undefined
    }, {
        name: 'iconCls',
        defaultValue: 'x-fa fa-flag'
    }]
});
