/**
 * This example shows simple dynamic data binding. When the data in the underlying view
 * model is modified, the change is relayed back to the panel and the markup is updated.
 */
 Ext.define('MyLab.view.databinding.DynamicBinding', {
    extend: 'Ext.Panel',
    xtype: 'binding-dynamic',
    controller: 'binding-dynamic',

    viewModel: {
        data: {
            titulo: 'Algum titulo',
            conteudo: "Um simples texto de exemplo para ilustrar a troca de valores de forma dinamica, usando databinding."
        }
    },

    bodyPadding: 20,
    width: 400,
    autoSize: true,

    bind: {
        title: 'Informação - {titulo}',
        html: 'Conteudo: {conteudo}'
    },

    tbar: [{
        text: 'Trocar titulo',
        handler: 'onChangeTitleClick'
    }, {
        text: 'Trocar conteudo',
        handler: 'onChangeContentClick'
    }]
});