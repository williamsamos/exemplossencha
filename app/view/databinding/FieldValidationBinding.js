/**
 * This example shows simple data binding to models (Ext.data.Model). When the value is
 * changed by the user, the change is reflected to the model and is then validated by a
 * custom field type. The validation is reflected back to the form field to which the
 * value is bound.
 */
 Ext.define('MyLab.view.databinding.FieldValidationBinding', {
    extend: 'Ext.Panel',
    xtype: 'binding-field-validation',
    title: 'Detalhes do cliente',

    viewModel: {
        links: {
            theCustomer: {
                type: 'Company',
                id: 1
            }
        }
    },

    // This connects bound form fields to the associated model validators:
    modelValidation: true,

    bodyPadding: 10,
    width: 400,
    autoSize: true,

    items: [{
        xtype: 'textfield',
        label: 'Telefone',
        errorTarget: 'side',
        bind: '{theCustomer.phone}'  // validation is from custom model field
    }]
});