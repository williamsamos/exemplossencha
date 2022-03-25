/**
 * Demonstrates how to use an Ext.Carousel in vertical and horizontal configurations
 */
 Ext.define('MyLab.view.carousel.VerticalCarousel', {
    extend: 'Ext.Carousel',
    xtype: 'verticalcarousel',

    direction: 'vertical',
    ui: 'light',

    itemLength: 450, 
    height : '100%',

    defaults: {
        layout: 'center'
    },

    controller: "verticalcarousel",

    items: [
        {
            html: '<p>Carousels podem ser em posição vertical <em>(deslize para baixo)</em></p>',
            style: 'background-color: #759E60'
        }, {
            html: 'E voce pode usar <code><em>ui:light</em></code>.',
            style: 'background-color: #5E99CC'

        }, //OUTROS CARDS


        {
            xtype: "panel",
            title: "Exemplo de card 3",

            items: [
                {
                    xtype: "textfield",
                    label: "Escreva aqui...",
                    reference: "txtFieldCarousel"
                },

                {
                    xtype: "button",
                    text: "Mostrar Msg",
                    handler: "onMostrarTextoCarousel"
                }
            ]
        }

    ]
});