/**
 * This example shows using multiple sorters on a Store attached to a DataView.
 *
 * We're also using the reorderable toolbar plugin to make it easy to reorder the sorters
 * with drag and drop. To change the sort order, just drag and drop the "Type" or "Name"
 * field.
 */
 Ext.define('MyLab.view.dataview.MultiSortDataView', {
    extend: 'Ext.panel.Panel',
    xtype: 'dataview-multisort',
    controller: 'dataview-multisort',
    title: 'Multi-sort DataView',

    requires: [
        'Ext.dataview.DataView'
    ],

    height: 400,
    layout: 'fit',
    width: 450,

    tbar: {
        defaults: {
            listeners: {
                changeDirection: 'updateStoreSorters'
            }
        },

        items: [{
            xtype: 'component',
            html: 'Classificar nestes campos:'
        }, {
            xtype: 'dataview-multisort-sortbutton',
            text: 'Tipo',
            dataIndex: 'type'
        }, {
            xtype: 'dataview-multisort-sortbutton',
            text: 'Nome',
            dataIndex: 'name'
        }]
    },

    items: [{
        xtype: 'dataview',
        inline: true,
        ui: 'default',
        reference: 'dataview',
        itemTpl: '<div class="dataview-multisort-item">' +
                    '<img draggable="false" src="resources/images/touch-icons/{thumb}" />' +
                    '<h3>{name}</h3>' +
                '</div>',
        store: {
            autoLoad: true,
            sortOnLoad: true,
            fields: ['name', 'thumb', 'url', 'type'],
            proxy: {
                type: 'ajax',
                url: 'data/sencha-touch-examples.json'
            }
        }
    }]
});