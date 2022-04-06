/**
 * This example shows how to setup a simple drag for an element.
 * 
 * CORRIGIR AINDA: Só arrasta pra cima e pra baixo, nao deixa arrastar livremente como no kitchen and sink
 * TALVEZ POR CAUSA DO ESPAÇO, ELE JA OCUPOU TODO
 */
 Ext.define('MyLab.view.dragdrop.SimpleDragDrop', {
    extend: 'Ext.Component',
    xtype: 'drag-simple',
    controller: 'drag-simple',

    height: 400,
    padding: 5,
    width: 500,

    //EU TENTEI ESTILIZAR O ELEMENTO DE MANEIRA PROVISORIA
    html: '<div style="background-color: red" class="simple-source">Drag Me!</div>'
});