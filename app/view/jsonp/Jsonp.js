/**
 * Demonstrates how to issue JSON-P request to fetch weather data from a web API
 */
 Ext.define('MyLab.view.data.Jsonp', {
    extend: 'Ext.Panel',
    xtype: 'jsonp',
    controller: 'jsonp',

    minHeight: 300,
    scrollable: true,
    width: 400,
    autoSize: true,

    tbar: [{
        text: 'Carregar usando JSON-P',
        handler: 'onLoad'
    }],

    items: [{
        xtype: 'component',
        reference: 'results'
    }]
});