/**
 * Demonstrates how to use an Ext.Carousel in vertical and horizontal configurations
 */
 Ext.define('MyLab.view.carousel.BasicCarousel', {
    extend: 'Ext.Carousel',
    xtype: 'carouselbasic',
    direction: 'horizontal',
    itemLength: 450, 
    height : '100%',

    controller: "carouselbasic",

    defaults: {
        layout: 'center',
        styleHtmlContent: true
    },

    items: [
        
        {
            html: '<p>Deslize para a esquerda para exibir o proximo card&hellip;</p>',
            style: 'background-color: #759E60'
        }, {
            html: '<p>Voce tambem pode usar os indicadores</p>',
            style: 'background-color: #5E99CC'
        }, 

        //OUTROS CARDS
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