Ext.define('MyLab.view.dataview.HorizontalDataView', {
    extend: 'Ext.Container',
    xtype: 'dataview-horizontal',

    requires: [
        'MyLab.model.Speaker',
        'Ext.dataview.plugin.ItemTip'
    ],

    layout: 'fit',
    width: 430,
    autoSize: true,

    items: [{
        xtype: 'dataview',
        cls: 'dataview-horizontal',
        inline: {
            wrap: false
        },
        itemTpl: '<div class="img" style="background-image: url({photo});"></div>' +
                 '<div class="name">{first_name}<br/>{last_name}</div>',
        
        store: {
            type: "Speakers",
            autoLoad: true
        },

        /*
        ESTA DANDO UM ERRO NO PLUGIN dataviewtip
        Uncaught Error: DOM element with id dataviewtip in Element cache is not the same as element in the DOM. Make sure to clean up Element instances using destroy()
        plugins: {
            dataviewtip: {
                align: 'tl-bl',
                maxHeight: 200,
                width: 300,
                scrollable: 'y',
                delegate: '.img',
                allowOver: true,
                anchor: true,
                bind: '{record}',
                cls: 'dataview-horizontal',
                tpl: '<strong>Afiliação</strong><div class="info">{affiliation}</div>' +
                    '<strong>Posição</strong><div class="info">{position}</div>' +
                    '<strong>Biografia</strong><div class="info">{bio:substr(0, 100)}</div>'
            }
        }
        */
    }]
});