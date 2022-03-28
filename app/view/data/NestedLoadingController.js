Ext.define('MyLab.view.data.NestedLoadingController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.nestedloading',

    onLoad: function() {
        var dataview = this.lookup('dataview'),
            store = dataview.getStore();

        store.load();
    },

    onExplain: function() {
        Ext.Msg.alert(
            'Carregando dados aninhados',

            '<p>O pacote de dados pode carregar dados profundamente aninhados em uma única solicitação. Neste exemplo estamos carregando um '+
                'conjunto de dados contendo Usuários, seus Pedidos e os OrderItems de cada Pedido.</p>' +
            '<p>Em vez de puxar cada registro por vez, carregamos o conjunto de dados completo em uma única solicitação e permitimos os dados ' +
                'pacote para analisar automaticamente os dados aninhados.</p>' +
            '<p>Como um dos exemplos mais complexos, vale a pena dar uma olhada no codigo fonte para ver como isso é configurado.</p>'
        );
    }
});