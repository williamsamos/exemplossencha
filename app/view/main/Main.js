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
        'Ext.layout.Fit'
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
            iconCls: 'x-fa fa-home',
            layout: 'fit',
            // The following grid shares a store with the classic version's grid as well!
            items: [{
                xtype: 'animations'
            }]
        },{
            title: 'Botões',
            iconCls: 'x-fa fa-cube',

            items: [{
                xtype: 'basicbuttons'
            }]
        },{
            title: 'Carousel',
            iconCls: 'x-fa fa-users',

            items: [{
                xtype: 'carouselbasic'
            }]
        },{
            title: 'Configurações',
            iconCls: 'x-fa fa-cog',
            bind: {
                html: '{loremIpsum}'
            }
        }
    ]
});
