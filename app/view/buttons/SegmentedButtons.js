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
                text: 'Option 1'
            }, {
                text: 'Option 2',
                pressed: true
            }, {
                text: 'Option 3'
            }]
        }
    ]
});