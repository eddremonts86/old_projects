function GalleryGestionar()
{
    this._btn_add = null;
    this._btn_mod = null;
    this._btn_del = null;
    this.Render = function(Panel){
        this.__data_store_type_ = App.BuildJsonStore('Gallery.Gallery.Cargartype',{
            fields: [
                {name: 'typo'},
                {name: 'id'}
            ],
            proxy: {
                type: 'ajax',
                reader: {type: 'json',root: 'rows',totalProperty: 'results'}
            },
            autoLoad: true
        });
        this._btn_add = Ext.create('Ext.Button',{
            text: 'Adicionar',
            id: 'add_Gallery_btn_id',
            tooltip : 'Adiciona un nuevo Año',
            iconCls: 'add',
            handler: Ext.Function.bind(this.Owner.winaddGallery, this.Owner,['add'])
        });
        this._btn_del = Ext.create('Ext.Button',{
            text: 'Eliminar ',
            id: 'del_Gallery_btn_id',
            tooltip : 'Elimina el Año seleccionado',
            iconCls: 'del_item',
            disabled: true,
            handler: Ext.Function.bind(this.Owner.deltectnc, this.Owner,['del'])
        });
        this._btn_mod = Ext.create('Ext.Button', {
            text: 'Modificar',
            id: 'mod_Gallery_btn_id',
            tooltip : 'Modifica el Año seleccionado',
            iconCls: 'modify',
            disabled: true,
            handler: Ext.Function.bind(this.Owner.winupdGallery, this.Owner, ['upd'])
        });
        this._btn_new = Ext.create('Ext.Button', {
            text: 'Guardar',
            id: 'new_Gallery_btn_id',
            tooltip : 'Modifica el Año seleccionado',
            iconCls: 'modify',
            disabled: false,
            handler: function(){
                var nombre=Ext.getCmp('nombre_id_type').getValue();
                var result = App.PerformSyncServerRequest('Gallery.Gallery.AddType',{nombre:nombre});
                App.InfoMessage('Información', 'Galeria adicionada correctamente');
                this.__data_store_type_.load();


            }
        });
        this._btn_type = Ext.create('Ext.form.ComboBox', {
            fieldLabel: 'Galerias',
            store: this.__data_store_type_,
            queryMode: 'local',
            displayField: 'typo',
            valueField: 'id'
        });
        var tbar = Ext.getCmp('Gallery_tbar_id');
        tbar.add(this._btn_add);
        tbar.add(' ');
        tbar.add('-');
        tbar.add(this._btn_mod);
        tbar.add(' ');
        tbar.add('-');
        tbar.add(this._btn_del);
        tbar.add(' ');
        tbar.add('->');
        tbar.add(this._btn_type);
        tbar.add({
            xtype: 'textfield',
            name: 'nombre_id_type',
            id: 'nombre_id_type',
            fieldLabel: 'Nueva Galeria',
            allowBlank: false
        });
        tbar.add(this._btn_new);
    }
    this.Enable = function(){
        this._btn_mod.enable();
        this._btn_del.enable();
    }
    this.Disable = function(){
        this._btn_mod.disable();
        this._btn_del.disable();
    }
}
App.RegisterFunction('GalleryGestionar', new GalleryGestionar());
this.panel=null;
this.panelupd=null;
Gallery.prototype.winaddGallery = function(_paccion){
    var _value_nom = null;
    if(_paccion == 'add')
    {
        this.__data_store_type_ = App.BuildJsonStore('Gallery.Gallery.Cargartype',{
        fields: [
            {name: 'typo'},
            {name: 'id'}
        ],
        proxy: {
            type: 'ajax',
            reader: {type: 'json',root: 'rows',totalProperty: 'results'}
        },
        autoLoad: true
    });
        this.galeria_type = Ext.create('Ext.form.ComboBox', {
            fieldLabel: 'Galerias',
            store: this.__data_store_type_,
            name:'galeria_type',
            id:'galeria_type',
            queryMode: 'local',
            displayField: 'typo',
            valueField: 'id'
        });
        this.panel = Ext.create('Ext.form.Panel', {
            bodyPadding: 5,
            layout: 'anchor',
            height: 'auto',
            width: 'auto',
            id:'panel',
            name:'panel',
            autoScroll:true,
            defaults: {anchor: '100%'},
            items:[
                this.galeria_type,
                   {
                    name: 'fileup_theme',
                    id: 'fileup_theme',
                    xtype:'filefield',
                    fieldLabel: '<div class="frame_image64">&nbsp;</div>',
                    allowBlank: false,
                    labelSeparator:'',
                    buttonText: '*.png',
                    emptyText : 'Imagen (.png,.jpg,.jpeg)'
                    /*,
                    listeners : {
                        change : function(UFile, value, options)
                        {
                            if(value == undefined) return;
                            var _dot_ptr = value.lastIndexOf('.');
                            var _ext = value.substr(_dot_ptr + 1);
                            _ext = _ext.toLowerCase();
                            if(_ext != 'png'||_ext != 'jpg'||_ext != 'jpeg')
                            {   UFile.reset();
                                UFile.setValue(undefined);
                                UFile.setRawValue(undefined);
                                Ext.Msg.alert('ERROR', 'Tipo de fichero no compatible');
                            }
                        }
                    }*/
                }]
        });
        var _gst_winadd = new Ext.Window({
                title:'Adicionar Template',
                id: '_gst_Add_win_id',
                name: '_gst_Add_win_id',
                plain: true,
                layout: 'fit',
                height: '400px',
                width: '450px',
                modal: true,
                autoScroll:false,
                resizable: false,
                items: [this.panel],
                buttons: [{
                    text: 'Aceptar',cls:'btn btn-success',
                    handler: Ext.Function.bind(this.Add, this, [_paccion]),
                    scope: this
                }, {
                    text: 'Cancelar',cls:'btn btn-primary',
                    handler: function(){
                        _gst_winadd.close();
                    }
                }],
                listeners: {
                    'show': function(This, eOpts) {
                        Ext.getCmp('nombre_id').focus(true, true);
                    }
                }
            });
        _gst_winadd.show();
    }

    else
        Ext.Msg.alert('Atención', 'Acción no definida');
}
Gallery.prototype.winupdGallery = function(_paccion){
    var _selectionModel = Ext.getCmp('Gallery_grid_id').getSelectionModel();
    var _selected_rcd = _selectionModel.getLastSelected();
    var  theme=_selected_rcd.data.theme;
    var  dir=_selected_rcd.data.dir;
    var  id=_selected_rcd.data.id;
    var  discr=_selected_rcd.data.discr;

    if(_paccion == 'upd')
     {

         this.panelupd = Ext.create('Ext.form.Panel', {
             id: 'panelupd',
             name: 'panelupd',
             bodyPadding: 5,
             width: 350,
             layout: 'anchor',
             autoScroll:true,
             defaults: {
                 anchor: '100%'
             },
             defaultType: 'numberfield',
             items:[
                 {
                 fieldLabel: 'Nombre',
                 xtype:'textfield',
                 name: 'nombre_id',
                 id: 'nombre_id',
                 value:theme
             },
                 {
                     fieldLabel: 'id',
                     xtype:'textfield',
                     name: 'id',
                     id: 'id',
                     hidden:true,
                     value:id
                 },
                 {
                 fieldLabel: 'Direccion',
                 xtype:'textfield',
                 name: 'dir',
                 id: 'dir',
                 value:dir
             },
                 {
                     name: 'fileup_theme',
                     id: 'fileup_theme',
                     xtype:'filefield',
                     fieldLabel: '<div class="frame_image64">&nbsp;</div>',
                     allowBlank: false,
                     labelSeparator:'',
                     buttonText: '*.png',
                     emptyText : 'Imagen (.png)',
                     listeners : {
                         change : function(UFile, value, options)
                         {
                             if(value == undefined) return;
                             var _dot_ptr = value.lastIndexOf('.');
                             var _ext = value.substr(_dot_ptr + 1);
                             _ext = _ext.toLowerCase();
                             if(_ext != 'png')
                             {   UFile.reset();
                                 UFile.setValue(undefined);
                                 UFile.setRawValue(undefined);
                                 Ext.Msg.alert('ERROR', 'Tipo de fichero no compatible');
                             }
                         }
                     }
                 },
                 {
                     fieldLabel: 'Descripción',
                     xtype:'textarea',
                     name: 'discr',
                     id: 'discr',
                     value:discr
                 }
             ]
         });
         var _gst_winupdann = new Ext.Window(
             {
                 title:'Modificar Template',
                 id: '_gst_Udt_win_id',
                 name: '_gst_Udt_win_id',
                 height: '350px',
                 width: '450px',
                 plain: true,
                 layout: 'fit',
                 modal: true,
                 resizable: false,
                 items: [this.panelupd],
                 buttons: [{
                     text: 'Aceptar',cls:'btn btn-success',
                     handler: Ext.Function.bind(this.Modid, this, [_paccion,_selectionModel,_selected_rcd]),
                     scope: this
                 }, {
                     text: 'Cancelar',cls:'btn btn-primary',
                     handler: function(){
                         _gst_winupdann.close();
                     }
                 }],
                 listeners: {
                     'show': function(This, eOpts) {
                         Ext.getCmp('nombre_id').focus(true, true);
                     },

                     scope : this
                 }
             });

         _gst_winupdann.show();

     }
     else
         Ext.Msg.alert('Atención', 'Acción no definida');
 }
Gallery.prototype.Add = function(_paccion){
    if (Ext.getCmp('panel').getForm().isValid())
    {
        var index='foto';
        var form = Ext.getCmp('panel');
        form.getForm().submit({
            url: 'App/Server/fn_call.php',
            method:'POST',
            waitMsg:'Esperando respueta...',
            params:{fn:'Gallery.Gallery.Gallery.foto'},
            success: function(fp, o) {
                this.__data_store.load();
                App.HideMsgBox();
                Ext.getCmp('_modify_user_pass_win_id').close();
                App.InfoMessage('Información', 'Modificación  satisfactoria');
            },
            failure:function(form,a){
                App.HideMsgBox();
                App.InfoMessage('Error', 'Hubo problemas al modificar las foto.');
            },
            scope:this
        });
    }
}
Gallery.prototype.Modid = function(_paccion,_selectionModel,_selected_rcd){

    if (Ext.getCmp('panelupd').getForm().isValid())
    {
        var index='foto';
        var form = Ext.getCmp('panelupd');
        form.getForm().submit({
            url: 'App/Server/fn_call.php',
            method:'POST',
            waitMsg:'Esperando respueta...',
            params:{fn:'Gallery.Gallery.Gallery.Modid'},
            success: function(fp, o) {
                this.__data_store.load();
                App.HideMsgBox();
                Ext.getCmp('_modify_user_pass_win_id').close();
                App.InfoMessage('Información', 'Modificación  satisfactoria');
            },
            failure:function(form,a){
                App.HideMsgBox();
                App.InfoMessage('Error', 'Hubo problemas al modificar las foto.');
            },
            scope:this
        });
    }
 }
Gallery.prototype.deltectnc=function(_paccion){
    var me = this;
    var fnCallBack = function() {
        var _selected_rcd = Ext.getCmp('Gallery_grid_id').getSelectionModel().getLastSelected();
        var id = _selected_rcd.data.id;
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        _result = App.PerformSyncServerRequest('Gallery.Gallery.Eliminar', {id: id});
        App.HideMsgBox();

        if(_result)
        {
            me.__data_store.load();
            App.InfoMessage('Información', 'Template eliminado correctamente');
        }
    }

    App.ConfirmMessage(fnCallBack, '¿Está seguro que desea eliminar este Template?');

}
