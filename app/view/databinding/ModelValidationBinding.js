/**
 * This example shows simple data binding to models (Ext.data.Model). When the value is
 * changed by the user, the change is reflected to the model and is then validated. The
 * validation is reflected back to the form field to which the value is bound. The
 * validation is based on the length of the field. By looking at the model code, you can
 * see the validator that is attached to the field.
 */
 Ext.define('MyLab.view.databinding.ModelValidationBinding', {
    extend: 'Ext.Panel',
    xtype: 'binding-model-validation',
    title: 'Detalhes da empresa',

    viewModel: {
        links: {
            theCompany: {
                type: 'Company',
                id: 1
            }
        }
    },

    // modelValidation connects bound form fields to the associated model validators
    modelValidation: true,

    bodyPadding: 20,
    width: 400,
    autoSize: true,

    items: [{
        xtype: 'textfield',
        label: 'Nome',
        errorTarget: 'side',
        bind: '{theCompany.name}'  // three-way: read, write, validate
    }]
});