Ext.define('MyLab.view.dataview.BasicDataView', {
    extend: 'Ext.Container',
    xtype: 'dataview-basic',

    requires: [
        'MyLab.model.Speaker',
        'Ext.dataview.plugin.ItemTip',
        'Ext.plugin.Responsive'
    ],

    height: 400,
    layout: 'fit',
    width: 400,

    items: [{
        xtype: 'dataview',
        cls: 'dataview-basic',
        itemTpl: '<div class="img" style="background-image: url({photo});"></div>' +
            '<div class="content">' +
                '<div class="name">{first_name} {last_name}</div>' +
                '<div class="affiliation">{affiliation}</div>' +
            '</div>',
        
        store: {
            type: "Speakers",
            autoLoad: true
        },
        
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
                cls: 'dataview-basic',
                tpl: '<strong>Afiliação</strong><div class="info">{affiliation}</div>' +
                    '<strong>Posição</strong><div class="info">{position}</div>' +
                    '<strong>Biografia</strong><div class="info">{bio:substr(0, 100)}</div>'
            }
        }
    }]
});