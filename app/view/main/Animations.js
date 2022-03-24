/*
 * Demonstrates all the animations
 */
Ext.define('MyLab.view.main.Animations', {
    extend: 'Ext.Container',
    xtype: 'animations',
    controller: 'animations',

    requires: [
        'MyLab.view.main.AnimationsController'
    ],

    height: 430,
    width: 300,

    layout: {
        type: 'card'
    },

    anims: [{
        group: 'Slide'
    }, {
        group: 'Cobrir'
    }, {
        group: 'Revelar'
    },
            'Fade',
            'Pop',
            'Flip'
    ],

    defaults: {
        defaultType: 'button',
        layout: 'vbox',
        padding: 20,
        scrollable: 'y'
    }
});
