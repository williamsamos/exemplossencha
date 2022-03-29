/**
 * Demonstrates loading data over AJAX.
 */
 Ext.define('MyLab.view.ajax.Ajax', {
    extend: 'Ext.Panel',
    xtype: 'ajax',
    controller: 'ajax',

    scrollable: true,

    width: 600,
    height: 400,

    tbar: [{
        text: 'Carregar usando Ajax',
        handler: 'onLoad'
    }, {
        text: 'Formatar JSON',
        reference: 'formatBtn',
        enableToggle: true,
        handler: 'onFormat'
    }],

    items: [{
        xtype: 'component',
        reference: 'results'
    }]
});