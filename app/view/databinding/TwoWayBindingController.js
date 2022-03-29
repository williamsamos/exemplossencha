Ext.define('MyLab.view.databinding.TwoWayBindingController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.binding-two-way',

    onClearIconTap: function() {
        this.getViewModel().set('titulo', '');
    },

    makeRandomTitle: function() {
        var num = Ext.Number.randomInt(0, 1000);

        this.getViewModel().set('titulo', 'Titulo ' + num);
    }
});