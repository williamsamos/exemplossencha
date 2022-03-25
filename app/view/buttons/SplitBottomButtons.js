/**
 * Demonstrates a range of split button options the framework offers out of the box
 */
 Ext.define('MyLab.view.buttons.SplitBottomButton', {
    extend: 'Ext.Container',
    xtype: 'splitbottombuttons',

    viewModel: {
        type: 'splitbottombuttons'
    },

    controller: "splitbottombuttons",

    requires: [
        'Ext.layout.HBox',
        'Ext.layout.VBox',
        'Ext.Button',
        'Ext.SplitButton'
    ],

    scrollable: 'y',
    width: 650,
    autoSize: true,

    defaults: {
        autoSize: true
    },

    items: [{
        cls: 'demo-solid-background',
        shadow: 'true',
        defaults: {
            flex: '1 1 auto', // this allows auto-height in vbox
            margin: '10 20 20 20',
            layout: {
                type: 'hbox'
            },
            autoSize: true
        },
        layout: {
            type: 'vbox'
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
                minHeight: 65,
                autoSize: true,
                defaults: {
                    xtype: 'splitbutton',
                    margin: '0 10',
                    arrowAlign: 'bottom',
                    menu: [{
                        text: 'Menu Item 1'
                    }, {
                        text: 'Menu Item 2'
                    }, {
                        text: 'Menu Item 3'
                    }],
                    bind: {
                        ui: '{style} {round ? "round" : ""}',
                        iconCls: '{icon}'
                    }
                },
                layout: {
                    type: 'hbox',
                    align: 'middle',
                    pack: 'space-around'
                },
                items: [{
                    margin: '0 10 0 20',
                    disabled: false,
                    bind: {
                        text: '{normalText}'
                    }
                }, {
                    margin: '0 10 0 20',
                    disabled: true,
                    bind: {
                        text: '{normalText}'
                    }
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
                minHeight: 65,
                autoSize: true,
                defaults: {
                    xtype: 'splitbutton',
                    margin: '0 10',
                    arrowAlign: 'bottom',
                    menu: [{
                        text: 'Menu Item 1'
                    }, {
                        text: 'Menu Item 2'
                    }, {
                        text: 'Menu Item 3'
                    }],
                    bind: {
                        ui: 'alt {style} {round ? "round" : ""}',
                        iconCls: '{icon}'
                    }
                },
                layout: {
                    type: 'hbox',
                    align: 'middle',
                    pack: 'space-around'
                },
                items: [{
                    margin: '0 10 0 20',
                    disabled: false,
                    bind: {
                        text: '{normalText}'
                    }
                }, {
                    margin: '0 10 0 20',
                    disabled: true,
                    bind: {
                        text: '{normalText}'
                    }
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
                minHeight: 65,
                autoSize: true,
                defaults: {
                    xtype: 'splitbutton',
                    margin: '0 10',
                    arrowAlign: 'bottom',
                    menu: [{
                        text: 'Menu Item 1'
                    }, {
                        text: 'Menu Item 2'
                    }, {
                        text: 'Menu Item 3'
                    }],
                    bind: {
                        ui: 'raised {style} {round ? "round" : ""}',
                        iconCls: '{icon}'
                    }
                },
                layout: {
                    type: 'hbox',
                    align: 'middle',
                    pack: 'space-around'
                },
                items: [{
                    margin: '0 10 0 20',
                    disabled: false,
                    bind: {
                        text: '{normalText}'
                    }
                }, {
                    margin: '0 10 0 20',
                    disabled: true,
                    bind: {
                        text: '{normalText}'
                    }
                }]
            }]
        }, {
            items: [{
                xtype: 'component',
                cls: 'button-group-label button-group-right',
                padding: '25 10 0 0',
                width: 75,
                html: 'Alt Raised',
                autoSize: true
            }, {
                xtype: 'container',
                cls: 'button-group alt',
                flex: 1,
                minHeight: 65,
                defaults: {
                    xtype: 'splitbutton',
                    margin: '0 10',
                    arrowAlign: 'bottom',
                    menu: [{
                        text: 'Menu Item 1'
                    }, {
                        text: 'Menu Item 2'
                    }, {
                        text: 'Menu Item 3'
                    }],
                    bind: {
                        ui: 'raised alt {style} {round ? "round" : ""}',
                        iconCls: '{icon}'
                    }
                },
                layout: {
                    type: 'hbox',
                    align: 'middle',
                    pack: 'space-around'
                },
                items: [{
                    margin: '0 10 0 20',
                    disabled: false,
                    bind: {
                        text: '{normalText}'
                    }
                }, {
                    margin: '0 10 0 20',
                    disabled: true,
                    bind: {
                        text: '{normalText}'
                    }
                }]
            }]
        }]
    }, {
        xtype: 'toolbar',
        docked: 'top',
        ui: 'transparent',
        padding: '5 8',
        layout: {
            type: 'hbox',
            align: 'stretch'
        },
        defaults: {
            margin: '0 10 0 0',
            shadow: 'true',
            ui: 'action'
        },
        items: [{
            text: 'Style',
            menu: {
                bind: {
                    groups: '{buttonStyle}'
                },
                defaults: {
                    xtype: 'menuradioitem',
                    group: 'value'
                },
                items: [{
                    text: 'None',
                    value: '',
                    checked: true
                },
                        {
                            text: 'Action',
                            value: 'action'
                        },
                        {
                            text: 'Decline',
                            value: 'decline'
                        },
                        {
                            text: 'Confirm',
                            value: 'confirm'
                        }
                ]
            }
        }, {
            text: 'Type',
            menu: {
                bind: {
                    groups: '{buttonType}'
                },
                defaults: {
                    xtype: 'menuradioitem',
                    group: 'value'
                },
                items: [{
                    text: 'Text',
                    value: 'text',
                    checked: true
                },
                        {
                            text: 'Icon',
                            value: 'icon'
                        },
                        {
                            text: 'Text & Icon',
                            value: 'text-icon'
                        }
                ]
            }
        }, {
            xtype: 'component',
            shadow: false,
            flex: 1
        }, {
            xtype: 'togglefield',
            bind: '{round}',
            boxLabel: 'Round',
            cls: 'demo-solid-background',
            margin: '0 20 0 0',
            padding: '0 10'
        }]
    }]
});