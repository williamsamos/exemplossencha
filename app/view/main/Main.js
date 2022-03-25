/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting causes an instance of this class to be created and
 * added to the Viewport container.
 */
Ext.define('MyLab.view.main.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'app-main',

    requires: [
        'Ext.MessageBox',
        'Ext.layout.Fit',
        'Ext.layout.Center'
    ],

    controller: 'main',
    viewModel: 'main',

    defaults: {
        tab: {
            iconAlign: 'top'
        }
    },

    tabBarPosition: 'left',
    tabRotation: "top",

    items: [
        // TODO - Replace the content of this view to suit the needs of your application.
        {
            title: 'Animações',
            layout: 'fit',
            // The following grid shares a store with the classic version's grid as well!
            items: [
                {
                    xtype: "panel",
                    layout: "center",
                    title: "Animações",

                    items: [
                        {
                            xtype: 'animations'
                        }
                    ]
                }
            
            ]
        },{

            title: 'Botões Basic',

            items: [
                {
                    xtype: "panel",
                    layout: "center",
                    title: "Botões basicos",

                    items: [
                        {
                            xtype: 'basicbuttons'
                        }
                    ]
                
                }
            ]

        },{
            title: 'Botões Extra',

            items: [
                {
                    xtype: "panel",
                    layout: "center",
                    title: "Botões extras",

                    items: [
                        {
                            xtype: 'extrabuttons'
                        }
                    ]
                
                }
            ]

        },{
            title: 'Botões Split',

            items: [
                {
                    xtype: "panel",
                    layout: "center",
                    title: "Botões split com opçoes em dropdown arrow",

                    items: [
                        {
                            xtype: 'splitbuttons'
                        }
                    ]
                
                }
            ]

        },{
            title: 'Botões Split Bottom',

            items: [
                {
                    xtype: "panel",
                    layout: "center",
                    title: "Botões split com opçoes em dropdown arrow em baixo",

                    items: [
                        {
                            xtype: 'splitbottombuttons'
                        }
                    ]
                
                }
            ]

        },{
            title: 'Botões Segmented Bottom',

            items: [
                {
                    xtype: "panel",
                    layout: "center",
                    title: "Botões segmentados(um container de botoes com as opções)",

                    items: [
                        {
                            xtype: 'segmentedbuttons'
                        }
                    ]
                
                }
            ]

        }, {
            title: 'Carousel',

            items: [
                {
                    xtype: 'carouselbasic'
                }
            ]
        },{
            title: 'Carousel Vertical',

            items: [
                {
                    xtype: 'verticalcarousel'
                }
            ]
        }
    ]
});
