/**
 * This example shows how to use basic data binding. The panel title, the content and the
 * button text are all pulled from the view model.
 */
 Ext.define('MyLab.view.databinding.HelloWorldBinding', {
    extend: 'Ext.Panel',
    xtype: 'binding-hello-world',

    viewModel: {
        data: {
            titulo: 'Um Titulo',
            html: "Ola. Esse é um exemplo de data bind muito simples. Todo data bind precisa de um view model, e nesse exemplo, ele está definido de forma fixa dentro da propia view.",
            textoBotao: 'Um botão'
        }
    },

    bodyPadding: 20,
    width: 400,
    autoSize: true,

    bind: {
        title: '{titulo}',
        html: '{html}'
    },

    tbar: [{
        bind: '{textoBotao}'
    }]
});