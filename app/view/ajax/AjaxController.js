Ext.define('MyLab.view.ajax.AjaxController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ajax',

    onLoad: function() {
        this.getView().setMasked({
            xtype: 'loadmask',
            message: 'Carregando...'
        });

        Ext.Ajax.request({
            url: 'data/test.json',
            scope: this,
            failure: this.failureCallback,
            success: this.successCallback
        });
    },

    onFormat: function(btn) {
        var data = this.lastResponse;

        if (data) {
            this.render(data, btn.isPressed());
        }
    },

    failureCallback: function() {
        Ext.Msg.alert('Erro de carregamento Ajax', 'Houve um erro durante o carregamento dos dados.');
    },

    successCallback: function(response) {
        var formatBtn = this.lookup('formatBtn'),
            data = this.lastResponse = response.responseText;

        this.render(data, formatBtn.isPressed());

        this.getView().unmask();
    },

    render: function(data, format) {
        var results = this.lookup('results');

        if (format) {
            results.setHtml('<pre>' + data + '</pre>');
        }
        else {
            results.setHtml(data);
        }
    }
});