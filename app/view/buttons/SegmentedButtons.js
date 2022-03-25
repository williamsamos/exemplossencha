/**
 * Demonstrates of Segmented Button
 */
 Ext.define('MyLab.view.buttons.SegmentedButtons', {
    extend: 'Ext.Container',
    xtype: 'segmentedbuttons',

    requires: [
        'Ext.SegmentedButton'
    ],

    cls: 'demo-solid-background',
    height: 100,
    layout: 'center',
    width: 500,

    items: [
        {
            xtype: 'segmentedbutton',
            items: [{
                text: 'Opção 1'
            }, {
                text: 'Opção 2',
                pressed: true
            }, {
                text: 'Opção 3'
            }]
        }
    ]
});