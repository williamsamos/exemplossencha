Ext.define("MyLab.view.dataview.InlineDataView", {
    extend: "Ext.Container",
    xtype: "dataview-inline",

    requires: [
        'MyLab.model.Speaker',
        'Ext.dataview.plugin.ItemTip'
    ],

    height: 400,
    layout: "fit",
    width: 400,

    items: [{
        xtype: 'dataview',
        inline: true,
        cls: 'dataview-inline',
        itemTpl: '<div class="img" style="background-image: url({photo});"></div>',
        
        //CORRIGIR AINDA: STORE NAO CARREGA OS DADOS, NAO EXIBE NADA
        store: {
            id: "store-speakers-dataviewinline",
            type: "Speakers",
            autoLoad: true
        },

        plugins: {
            dataviewtip: {
                id: "dataviewtip-inline",
                align: 'tl-bl',
                maxHeight: 200,
                width: 300,
                scrollable: 'y',
                delegate: '.img',
                allowOver: true,
                anchor: true,
                bind: '{record}',
                cls: 'dataview-inline',
                tpl: '<strong>Afiliação</strong><div class="info">{affiliation}</div>' +
                    '<strong>Posição</strong><div class="info">{position}</div>' +
                    '<strong>Biografia</strong><div class="info">{bio:substr(0, 100)}</div>'
            }
        }
    }]
});