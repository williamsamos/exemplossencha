Ext.define('MyLab.model.StaffMember', {
    extend: 'MyLab.model.Base',
    requires: [
        'MyLab.model.field.PhoneNumber',
        'Ext.data.proxy.Rest'
    ],

    fields: [{
        name: 'name'
    }, {
        name: 'email',
        validators: {
            type: 'email'
        }
    }, {
        name: 'title'
    }, {
        name: 'avatar',
        convert: function(value, record) {
            if (value && value.length) {
                return value;
            }
        }
    },
             {
                 name: 'imagePath',
                 convert: function(value, record) {
                     if (record.data.avatar && record.data.avatar.length) {
                         return Ext.getResourcePath('images/staff/' + record.data.avatar, 'shared');
                     }
                 }
             }],

    proxy: {
        type: 'ajax',
        reader: {
            type: 'json'
        },
        url: '/MyLab/StaffData'
    }
});
