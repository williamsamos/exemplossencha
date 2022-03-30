Ext.define('MyLab.model.tree.Territory', {
    extend: 'MyLab.model.tree.Base',
    entityName: 'Territory',
    idProperty: 'name',
    glyph: 'xf0ac@\'Font Awesome 5 Free\'',
    fields: [{
        name: 'name',
        convert: undefined
    }, {
        name: 'iconCls',
        defaultValue: 'x-fa fa-globe'
    }]
});
