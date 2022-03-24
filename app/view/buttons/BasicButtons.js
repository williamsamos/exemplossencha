/**
 * Demonstrates a range of Button options the framework offers out of the box
 */
 Ext.define('MyLab.view.buttons.BasicButtons', {
    extend: 'Ext.Container',
    xtype: 'basicbuttons',
    controller: 'basicbuttons',

    requires: [
        'Ext.layout.HBox',
        'Ext.layout.VBox',
        'Ext.Button'
    ],

    scrollable: 'y',
    width: 530,
    autoSize: true,

    defaults: {
        margin: '10 20',
        autoSize: true,
        layout: {
            type: 'hbox'
        }
    },

    items: [{
        margin: '20 20 10',
        items: [{
            xtype: 'component',
            cls: 'button-group-label button-group-right',
            padding: '25 10 0 0',
            width: 75,
            html: 'Default'
        }, {
            xtype: 'container',
            cls: 'button-group',
            flex: 1,
            minHeight: 55,
            defaultType: 'button',
            defaults: {
                margin: '0 10'
            },
            layout: {
                type: 'hbox',
                align: 'middle',
                pack: 'space-around'
            },
            items: [{
                margin: '0 10 0 20',
                text: 'Normal'
            }, {
                text: 'Badge',
                badgeText: '2'
            }, {
                margin: '0 20 0 10',
                text: 'Disabled',
                disabled: true
            }]
        }]
    }, {
        items: [{
            xtype: 'component',
            cls: 'button-group-label button-group-right',
            padding: '25 10 0 0',
            width: 75,
            html: 'Alt'
        }, {
            xtype: 'container',
            cls: 'button-group alt',
            flex: 1,
            minHeight: 55,
            defaultType: 'button',
            defaults: {
                margin: '0 10',
                ui: 'alt'
            },
            layout: {
                type: 'hbox',
                align: 'middle',
                pack: 'space-around'
            },
            items: [{
                margin: '0 10 0 20',
                text: 'Normal'
            }, {
                text: 'Badge',
                badgeText: '2'
            }, {
                margin: '0 20 0 10',
                text: 'Disabled',
                disabled: true
            }]
        }]
    }, {
        items: [{
            xtype: 'component',
            cls: 'button-group-label button-group-right',
            padding: '25 10 0 0',
            width: 75,
            html: 'Raised'
        }, {
            xtype: 'container',
            cls: 'button-group',
            flex: 1,
            minHeight: 55,
            defaultType: 'button',
            defaults: {
                margin: '0 10',
                ui: 'raised'
            },
            layout: {
                type: 'hbox',
                align: 'middle',
                pack: 'space-around'
            },
            items: [{
                margin: '0 10 0 20',
                text: 'Normal'
            }, {
                text: 'Badge',
                badgeText: '2'
            }, {
                margin: '0 20 0 10',
                text: 'Disabled',
                disabled: true
            }]
        }]
    }, {
        items: [{
            xtype: 'component',
            cls: 'button-group-label button-group-right',
            padding: '25 10 0 0',
            width: 75,
            html: 'Menu'
        }, {
            xtype: 'container',
            cls: 'button-group',
            flex: 1,
            minHeight: 55,
            defaults: {
                margin: '0 10'
            },
            layout: {
                type: 'hbox',
                align: 'middle',
                pack: 'space-around'
            },
            items: [{
                xtype: 'button',
                margin: '0 10 0 20',
                text: 'Normal',
                menu: [{
                    text: 'Menu Item'
                }]
            }, {
                xtype: 'button',
                text: 'Badge',
                badgeText: '2',
                menu: [{
                    text: 'Menu Item'
                }]
            }, {
                xtype: 'button',
                margin: '0 20 0 10',
                text: 'Disabled',
                disabled: true,
                menu: [{
                    text: 'Menu Item'
                }]
            }]
        }]
    }, {
        margin: '10 20 20',
        items: [{
            xtype: 'component',
            cls: 'button-group-label button-group-right',
            padding: '25 10 0 0',
            width: 75,
            html: 'Icon'
        }, {
            xtype: 'container',
            cls: 'button-group',
            flex: 1,
            minHeight: 55,
            defaultType: 'button',
            defaults: {
                margin: '0 10'
            },
            layout: {
                type: 'hbox',
                align: 'middle',
                pack: 'space-around'
            },
            items: [{
                margin: '0 10 0 20',
                iconCls: 'x-fa fa-home',
                ui: 'round'
            }, {
                iconCls: 'x-fa fa-home',
                badgeText: '2',
                ui: 'round'
            }, {
                margin: '0 20 0 10',
                iconCls: 'x-fa fa-home',
                ui: 'round',
                disabled: true
            }]
        }]
    }]
});