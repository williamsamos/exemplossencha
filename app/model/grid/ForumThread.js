Ext.define('MyLab.model.grid.ForumThread', {
    extend: 'MyLab.model.Base',

    requires: [
        'Ext.data.proxy.JsonP'
    ],

    idProperty: 'threadid',

    fields: [
        'title', 'forumtitle', 'forumid', 'username',
        { name: 'replycount', type: 'int' },
        { name: 'lastpost', mapping: 'lastpost', type: 'date', dateFormat: 'timestamp' },
        'lastposter', 'excerpt', 'threadid'
    ],

    proxy: {
        // load using script tags for cross domain, if the data in on the same domain as
        // this page, an HttpProxy would be better
        type: 'jsonp',
        url: 'https://www.sencha.com/forum/topics-browse-remote.php',
        reader: {
            rootProperty: 'topics',
            totalProperty: 'totalCount'
        },
        // sends single sort as multi parameter
        simpleSortMode: true
    }
});
