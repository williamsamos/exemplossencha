Ext.define('MyLab.view.buttons.BasicCarouselController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.carouselbasic',

    onMostrarTextoCarousel: function(btn){
        var me = this;
        var textField = me.lookupReference( "txtFieldCarousel" );
        var texto = textField.getValue();

        Ext.Msg.alert("Texto digitado no textfield do card", texto);
    }
});