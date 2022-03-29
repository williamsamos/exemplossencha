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
                    xtype: "bgpanel",
                    title: "Animações",
                    layout: 'center',

                    items: [
                        {
                            xtype: 'animations'
                        }
                    ]
                }
            
            ]
        },{

            title: 'Botões Basic',
            layout: 'fit',

            items: [
                {
                    xtype: "bgpanel",
                    title: "Botões basicos",

                    items: [
                        {
                            xtype: 'panel',
                            items: [
                                {
                                    xtype: "basicbuttons"
                                }
                            ]
                        }
                    ]
                
                }
            ]

        },{
            title: 'Botões Extra',
            layout: 'fit',

            items: [
                {
                    xtype: "bgpanel",
                    title: "Botões extras",

                    items: [
                        {
                            xtype: 'panel',
                            items: [
                                {
                                    xtype: "extrabuttons"
                                }
                            ]
                        }
                    ]
                
                }
            ]

        },{
            title: 'Botões Split',
            layout: 'fit',

            items: [
                {
                    xtype: "bgpanel",
                    title: "Botões split com opçoes em dropdown arrow",

                    items: [
                        {
                            xtype: 'panel',
                            items: [
                                {
                                    xtype: "splitbuttons"
                                }
                            ]
                        }
                    ]
                
                }
            ]

        },{
            title: 'Botões Split Bottom',
            layout: 'fit',

            items: [
                {
                    xtype: "bgpanel",
                    title: "Botões split com opçoes em dropdown arrow em baixo",

                    items: [
                        {
                            xtype: 'panel',
                            items: [
                                {
                                    xtype: "splitbottombuttons"
                                }
                            ]
                        }
                    ]
                
                }
            ]

        },{
            title: 'Botões Segmented Bottom',
            layout: 'fit',

            items: [
                {
                    xtype: "bgpanel",
                    title: "Botões segmentados(um container de botoes com as opções)",

                    items: [
                        {
                            xtype: 'panel',
                            items: [
                                {
                                    xtype: "segmentedbuttons"
                                }
                            ]
                        }
                    ]
                
                }
            ]

        }, {
            title: 'Carousel',
            xtype: "bgpanel",
            layout: "fit",

            items: [
                {
                    xtype: 'carouselbasic'
                }
            ]
        },{
            title: 'Carousel Vertical',
            xtype: "bgpanel",
            layout: "fit",

            items: [
                {
                    xtype: 'verticalcarousel'
                }
            ]


        },

        {
            title: 'Color picker',
            layout: 'fit',

            items: [
                {
                    xtype: "bgpanel",
                    title: "Selecionar cor",

                    items: [
                        {
                            xtype: 'panel',
                            items: [
                                {
                                    xtype: "color-selector"
                                }
                            ]
                        }
                    ]
                
                }
            ]

        },

        {
            title: 'Nested Loading',
            layout: 'fit',

            items: [
                {
                    xtype: "bgpanel",
                    title: "Carregamento alinhado",

                    items: [
                        {
                            xtype: 'panel',
                            items: [
                                {
                                    xtype: "nestedloading"
                                }
                            ]
                        }
                    ]
                
                }
            ]

        },

        {
            title: 'Json P',
            layout: 'fit',

            items: [
                {
                    xtype: "bgpanel",
                    title: "Carregar previsão do tempo",

                    items: [
                        {
                            xtype: 'panel',
                            items: [
                                {
                                    xtype: "jsonp"
                                }
                            ]
                        }
                    ]
                
                }
            ]

        },

        {
            title: 'Ajax',
            layout: 'fit',

            items: [
                {
                    xtype: "bgpanel",
                    title: "Carregar dados de um arquivo json",

                    items: [
                        {
                            xtype: 'panel',
                            items: [
                                {
                                    xtype: "ajax"
                                }
                            ]
                        }
                    ]
                
                }
            ]

        },


        {
            title: 'Hello World - data binding',
            layout: 'fit',

            items: [
                {
                    xtype: "bgpanel",
                    title: "Um simples exemplo de data binding",

                    items: [
                        {
                            xtype: 'panel',
                            items: [
                                {
                                    xtype: "binding-hello-world"
                                }
                            ]
                        }
                    ]
                
                }
            ]

        },


        {
            title: 'Dynamic - data binding',
            layout: 'fit',

            items: [
                {
                    xtype: "bgpanel",
                    title: "Um exemplo de data binding dinamico, onde os valores definidos mudam de acordo com a situação.",

                    items: [
                        {
                            xtype: 'panel',
                            items: [
                                {
                                    xtype: "binding-dynamic"
                                }
                            ]
                        }
                    ]
                
                }
            ]

        },

        {
            title: 'TwoWay - data binding',
            layout: 'fit',

            items: [
                {
                    xtype: "bgpanel",
                    title: "Um exemplo de data binding dos dois lados, onde o valor definido no textfield será inserido/refletido automaticamente no titulo.",

                    items: [
                        {
                            xtype: 'panel',
                            items: [
                                {
                                    xtype: "binding-two-way"
                                }
                            ]
                        }
                    ]
                
                }
            ]

        },


        {
            title: 'Formula - data binding',
            layout: 'fit',

            items: [
                {
                    xtype: "bgpanel",
                    title: "Data binding com formulas matematicas, onde o valor definido no textfield será inserido automaticamente nas formulas e nos seus respectivos resultados.",

                    items: [
                        {
                            xtype: 'panel',
                            items: [
                                {
                                    xtype: "binding-formulas"
                                }
                            ]
                        }
                    ]
                
                }
            ]

        }
        
    ]
});
