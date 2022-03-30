Ext.define('MyLab.store.CountryStates', {
    extend: 'Ext.data.Store',

    alias: 'store.country-states',

    model: 'MyLab.model.State',

    pageSize: 0,

    autoLoad: true,

    data: [
        { abbr: "SP", state: "São Paulo", description: "Estado de São Paulo", country: "Brasil" },
        { abbr: "MG", state: "Minas Gerais", description: "Estado de Minas Gerais", country: "Brasil" },
        { abbr: "CA", state: "California", description: "Estado da California", country: "EUA" },
        { abbr: "QC", state: "Quebec", description: "Provincia de Quebec", country: "Canada" }
    ],

    proxy: {
        type: 'memory',
        reader: 'json'
    }
});