/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
    extend: 'MyLab.Application',

    name: 'MyLab',

    requires: [
        // This will automatically load all classes in the MyLab namespace
        // so that application classes do not need to require each other.
        'MyLab.*'
    ],

    // The name of the initial view to create.
    mainView: 'MyLab.view.main.Main'
});
