Ext.define('Ext.form.field.ColorCombo', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.colorcombo',
    triggerAction: 'all',
    queryMode: 'local',
//    forceSelection: true,
    selectOnFocus: true,
    
    // private
    defaultCls: 'ext-color-default',

    // private
    initComponent: function(){
//    console.log('llegue');
        this.listConfig = Ext.apply(this.listConfig || {}, {
            getInnerTpl: this.getListItemTpl
        });
        this.callParent(arguments);
    },
    
    // private
    getListItemTpl: function(displayField) {
//        console.log(displayField);
        return '<div class="x-combo-list-item" style="width:16px;height:16px;background-color:#{color};-webkit-border-radius:15px;border-radius:15px;float:right">&nbsp;</div>{' + displayField + '}';
    }   
    
});