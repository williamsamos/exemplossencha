Ext.define('MyLab.view.databinding.FormulaBindingViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.binding-formulas',

    formulas: {
        aoQuadrado: function(get) {
            return get('duasVezesX') * 2;
        },

        // This accomplishes the same thing as above but using object syntax.
        duasVezesX: {
            get: function(get) {
                return get('x') * 2;
            }
        }
    },

    data: {
        x: 1
    }
});