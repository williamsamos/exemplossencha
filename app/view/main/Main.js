/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting causes an instance of this class to be created and
 * added to the Viewport container.
 */
Ext.define('MyLab.view.main.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'app-main',
    cls: "MainPanel",

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
    
    scrollable: true,

    tabBar: {
        scrollable: 'y',

        //Tamanho dos itens
        defaults: {
            height: 200,
            minHeight: 30
        },

        width: 200
    },

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

        },


        {
            title: 'Association - data binding',
            layout: 'fit',

            items: [
                {
                    xtype: "bgpanel",
                    title: "Data binding usando associações de dados.",

                    items: [
                        {
                            xtype: 'panel',
                            items: [
                                {
                                    xtype: "binding-associations"
                                }
                            ]
                        }
                    ]
                
                }
            ]

        },


        {
            title: 'Component State - data binding',
            layout: 'fit',

            items: [
                {
                    xtype: "bgpanel",
                    title: "Data binding onde as propiedades de um componente variam de acordo com o estado dos outros componentes.",

                    items: [
                        {
                            xtype: 'panel',
                            items: [
                                {
                                    xtype: "binding-component-state"
                                }
                            ]
                        }
                    ]
                
                }
            ]

        },


        {
            title: 'Chained Store - data binding',
            layout: 'fit',

            items: [
                {
                    xtype: "bgpanel",
                    title: "Data binding usando cadeia de dados filtrados, dos registros, quais as pessoas que atedem a condicão na faixa de idade.",

                    items: [
                        {
                            xtype: 'panel',
                            items: [
                                {
                                    xtype: "binding-chained-stores"
                                }
                            ]
                        }
                    ]
                
                }
            ]

        },


        {
            title: 'Chained Select - data binding',
            layout: 'fit',

            items: [
                {
                    xtype: "bgpanel",
                    title: "Data binding usando cadeia de dados filtradas de acordo com outros dados selecionados.",

                    items: [
                        {
                            xtype: 'panel',
                            items: [
                                {
                                    xtype: "binding-combo-chaining"
                                }
                            ]
                        }
                    ]
                
                }
            ]

        },

        {
            title: 'Selection - data binding',
            layout: 'fit',

            items: [
                {
                    xtype: "bgpanel",
                    title: "Data binding que permite editar os dados do model selecionado escrevendo nos fields",

                    items: [
                        {
                            xtype: 'panel',
                            items: [
                                {
                                    xtype: "binding-selection"
                                }
                            ]
                        }
                    ]
                
                }
            ]

        },


        {
            title: 'SliderForm - data binding',
            layout: 'fit',

            items: [
                {
                    xtype: "bgpanel",
                    title: "Data binding que permite definir a cor de fundo, dinamicamente, enquando usamos o formulário deslizante para definir o valor numa escala RGB de 0 a 255.",

                    items: [
                        {
                            xtype: 'panel',
                            items: [
                                {
                                    xtype: "binding-form"
                                }
                            ]
                        }
                    ]
                
                }
            ]

        },


        {
            title: 'ModelValidation - data binding',
            layout: 'fit',

            items: [
                {
                    xtype: "bgpanel",
                    title: "Data binding que permite fazer valicação dos dados digitados, com os validators do model.",

                    items: [
                        {
                            xtype: 'panel',
                            items: [
                                {
                                    xtype: "binding-model-validation"
                                }
                            ]
                        }
                    ]
                
                }
            ]

        },

        {
            title: 'FieldValidation - data binding',
            layout: 'fit',

            items: [
                {
                    xtype: "bgpanel",
                    title: "Data binding que permite fazer valicação dos fields do formulario",

                    items: [
                        {
                            xtype: 'panel',
                            items: [
                                {
                                    xtype: "binding-field-validation"
                                }
                            ]
                        }
                    ]
                
                }
            ]

        },

        {
            title: 'TwoWay Formulas - data binding',
            layout: 'fit',

            items: [
                {
                    xtype: "bgpanel",
                    title: "Data binding que permite aplicar formulas matematicas nos fields, assim que algum field é alterado, essa alteração reflete em todos os outros. De Kelvin ele converte para outros tipos.",

                    items: [
                        {
                            xtype: 'panel',
                            items: [
                                {
                                    xtype: "binding-two-way-formulas"
                                }
                            ]
                        }
                    ]
                
                }
            ]

        },


        {
            title: 'Binary Operators - data binding',
            layout: 'fit',

            items: [
                {
                    xtype: "bgpanel",
                    title: "Data binding que permite realizar varias verificações booleanas com base nos valores dos fields, e exibir dinamicamente o resultado.",

                    items: [
                        {
                            xtype: 'panel',
                            items: [
                                {
                                    xtype: "binding-algebra-binary-operators"
                                }
                            ]
                        }
                    ]
                
                }
            ]

        },

        {
            title: 'Ternary Operators - data binding',
            layout: 'fit',

            items: [
                {
                    xtype: "bgpanel",
                    title: "Data binding que permite usar condições com operador ternario",

                    items: [
                        {
                            xtype: 'panel',
                            items: [
                                {
                                    xtype: "binding-algebra-ternary-operators"
                                }
                            ]
                        }
                    ]
                
                }
            ]

        },

        {
            title: 'Formatter Binding - data binding',
            layout: 'fit',

            items: [
                {
                    xtype: "bgpanel",
                    title: "Data binding que permite formatar dinamicamente os valores dos fields",

                    items: [
                        {
                            xtype: 'panel',
                            items: [
                                {
                                    xtype: "binding-algebra-formatters-binding"
                                }
                            ]
                        }
                    ]
                
                }
            ]

        },

        {
            title: 'Unary - data binding',
            layout: 'fit',

            items: [
                {
                    xtype: "bgpanel",
                    title: "Data binding com operador unario, trabalha apenas com um unico valor, neste caso, o X",

                    items: [
                        {
                            xtype: 'panel',
                            items: [
                                {
                                    xtype: "binding-algebra-unary-binding"
                                }
                            ]
                        }
                    ]
                
                }
            ]

        },


        {
            title: 'Basic Data View',
            layout: 'fit',

            items: [
                {
                    xtype: "bgpanel",
                    title: "Data View basico",

                    items: [
                        {
                            xtype: 'panel',
                            items: [
                                {
                                    xtype: "dataview-basic"
                                }
                            ]
                        }
                    ]
                
                }
            ]

        },

        {
            title: 'Multi Sort Data View',
            layout: 'fit',

            items: [
                {
                    xtype: "bgpanel",
                    title: "Data View multi sort",

                    items: [
                        {
                            xtype: 'panel',
                            items: [
                                {
                                    xtype: "dataview-multisort"
                                }
                            ]
                        }
                    ]
                
                }
            ]

        }
        
    ]
});
