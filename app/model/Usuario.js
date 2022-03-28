/*
Aqui é o model, a estrutura básica dos dados
*/
Ext.define('MyLab.model.Usuario', {
    extend: 'Ext.data.Model',
    fields: [
        'nome',
        'orders'
    ]
});