Ext.define('MyLab.view.databinding.DynamicBindingController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.binding-dynamic',

    mudouConteudo: true,
    contagemTitulo: 0,

    onChangeTitleClick: function() {
        this.getViewModel().set('titulo', 'Novo Titulo ' + ++this.contagemTitulo);
    },

    onChangeContentClick: function() {
        var conteudo;

        if (this.mudouConteudo) {
            conteudo = "Esse é um exemplo de texto longo. Ao clicar em trocar conteudo, ele vai mudar para esse texto, de forma dinamica, pois podemos definir no código quais será o conteudo usando data binding.";

            this.mudouConteudo = false;
        }
        else {
            conteudo = "Outro exemplo de texto médio, isso foi uma troca dinamica de conteudo usando data binding. Podemos definir via código qual o texto do conteudo.";

            this.mudouConteudo = true;
        }

        this.getViewModel().set('conteudo', conteudo);
    }
});