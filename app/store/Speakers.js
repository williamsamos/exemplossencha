Ext.define('MyLab.store.Speakers', {
    extend: 'Ext.data.Store',

    alias: 'store.Speakers',

    model: 'MyLab.model.Speaker',

    autoLoad: true,

    data: [
        {
            'id': 1,
            'first_name': 'William',
            'last_name': 'teste',
            'sessionIds': 1,
            'bio': 'Teste de biografia',
            'position': 1,
            'photo': "a foto",
            'affiliation': 'Samos',
            'url': 'localhost',
            'twitter': 'Nao tem twitter'
        },

        {
            'id': 2,
            'first_name': 'Will',
            'last_name': 'sobrenome',
            'sessionIds': 1,
            'bio': 'Teste de biografia',
            'position': 1,
            'photo': "a foto",
            'affiliation': 'Samos',
            'url': 'localhost',
            'twitter': 'Nao tem twitter'
        },

        {
            'id': 3,
            'first_name': 'Teste',
            'last_name': 'sobrenome',
            'sessionIds': 1,
            'bio': 'Teste de biografia',
            'position': 1,
            'photo': "a foto",
            'affiliation': 'Samos',
            'url': 'localhost',
            'twitter': 'Nao tem twitter'
        },
    ],

    proxy: {
        type: 'memory',
        reader: 'json'
    }
});