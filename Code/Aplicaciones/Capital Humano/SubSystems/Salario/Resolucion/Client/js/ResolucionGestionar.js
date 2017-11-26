function ResolucionGestionar()
{
    this._btn_add = null;
    this._btn_mod = null;
    this._btn_del = null;
    //this.panel=null;
    this.Render = function(Panel){
        this._btn_add = Ext.create('Ext.Button',{
            text: 'Inportar Datos',
            id: 'add_Resolucion_btn_id',
            tooltip : 'Adiciona una nueva Resolución',
            iconCls: 'add',
            handler: Ext.Function.bind(this.Owner.OnShowWindow, this.Owner, ['add'])

        });
         this._btn_dir = Ext.create('Ext.Button',{
                text: 'Ver Directorio',
                id: 'dir_Resolucion_btn_id',
                tooltip : 'Busca el Directorio',
                iconCls: 'search',
                handler: Ext.Function.bind(this.Owner.OnShowDirF, this.Owner, ['dir'])

            });
        this._btn_del = Ext.create('Ext.Button',{
            text: 'Eliminar',
            id: 'del_Resolucion_btn_id',
            tooltip : 'Elimina la Resolución seleccionada',
            iconCls: 'del_item',
            disabled: true,
            handler: Ext.Function.bind(this.Owner.deltect, this.Owner,['del'])
        });
        this._btn_mod = Ext.create('Ext.Button', {
            text: 'Modificar',
            id: 'mod_Resolucion_btn_id',
            tooltip : 'Modifica la Resolución seleccionada',
            iconCls: 'modify',
            disabled: true,
            handler: Ext.Function.bind(this.Owner.OnShowWindow2, this.Owner, ['upd'])
        });
        var tbar = Ext.getCmp('Resolucion_tbar_id');
        tbar.add(this._btn_add);
        tbar.add(' ');
        tbar.add('-');
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
App.RegisterFunction('Resolucion', new ResolucionGestionar());


Resolucion.prototype.OnShowWindow = function(_paccion){
    var _value_nom = null;
    var fileup = null;
    var descripcion=null;
    if(_paccion == 'add')
    {
        fileup = Ext.create('Ext.form.field.File', {
            name: 'fileup',
            id: 'fileup',
            fieldLabel: 'Historial(.xls o .xlsx)',
            labelWidth: 140,
            allowBlank: false,
            width : 450,
            buttonText: '...',
            padding : '0 0 10 0',
            emptyText : 'Documento (.xls)',
            listeners : {
                change : function(UFile, value, options)
                {
                    if(value == undefined) return;
                    var _dot_ptr = value.lastIndexOf('.');
                    var _ext = value.substr(_dot_ptr + 1);
                    _ext = _ext.toLowerCase();
                    if(_ext != 'xls' && _ext != 'xlsx') {
                       UFile.reset();
                        UFile.setValue(undefined);
                        UFile.setRawValue(undefined);
                        Ext.Msg.alert('ERROR', 'Tipo de fichero no compatible');
                    }
                }
            }
        });
        descripcion = Ext.create('Ext.form.field.HtmlEditor', {
            fieldLabel : 'Descripción',
            name : 'descripcion',
            id: 'descripcion',
            width : 210,
            labelWidth : 140,
            allowBlank : false,
            minLength : 3,
            maxLength : 255
        });
        this.panel = Ext.create('Ext.form.Panel', {
            bodyPadding: 5,
            width: 350,
            layout: 'anchor',
            id:'panelAdd',
            name:'panelAdd',
            defaults: {anchor: '100%',labelWidth: 140},
            defaultType: 'textfield',
            items:fileup
        });
        var _gst_win = new Ext.Window({
                title:'Importar',
                id: '_gst_Add_win_id',
                height: 125,
                width: 500,
                plain: true,
                layout: 'fit',
                modal: true,
                resizable: true,
                items: [this.panel],
                buttons: [{
                    text: 'Aceptar',cls:'btn btn-success',
                    handler : Ext.Function.bind(this.upfiles, this, [ this.panel.getForm(),'add', fileup]),
                    scope: this
                }, {
                    text: 'Cancelar',cls:'btn btn-primary',
                    handler: function(){
                        _gst_win.close();
                    }
                }],
                listeners: {
                    'show': function(This, eOpts) {
                        //Ext.getCmp('nombre_id').focus(true, true);
                        }
                }
            });
        _gst_win.show();
    }

    else
        Ext.Msg.alert('Atención', 'Acción no definida');
}
Resolucion.prototype.OnShowWindow2 = function(_paccion){
    var _value_nom_oll = null;
    var id_tpo,descripcion,anno=null;
    var _selectionModel = Ext.getCmp('Resolucion_grid_id').getSelectionModel();
    var _selected_rcd = _selectionModel.getLastSelected();
    _value_nom_oll=_selected_rcd.data.nombre;
    descripcion=_selected_rcd.data.descripcion;
    anno=_selected_rcd.data.anno;
    nombre_file=_selected_rcd.data.nombre_file;
    id_tpo=_selected_rcd.data.id;
    descripcion = Ext.create('Ext.form.field.HtmlEditor', {
        fieldLabel : 'Descripción ',
        name : 'descripcion_mod',
        id: 'descripcion_mod',
        width : 210,
        allowBlank : false,
        labelWidth : 140,
        minLength : 3,
        value:descripcion,
        maxLength : 255
    });
    if(_paccion == 'upd')
    {

        this.panelupd = Ext.create('Ext.form.Panel', {
            bodyPadding: 5,
            width: 300,
            layout: 'anchor',
            defaults: {
                anchor: '100%', labelWidth : 140
            },
            defaultType: 'textfield',
            items: [{
                fieldLabel: 'Nombre',
                name: 'nombre_Udt_id',
                id:'nombre_Udt_id',
                allowBlank: false,
                value:_value_nom_oll,
                maxLength: 255
              //  maskRe: /[a-zA-ZáéíóúñÁÉÍÓÚÑ,. ]/
            },{
                xtype: 'numberfield',
                anchor: '100%',
                name: 'anno',
                id:'anno',
                fieldLabel: 'Año',
                value:anno,
                maxValue: Ext.Date.format(new Date(),'Y'),
                minValue: 1970
            },{
                    anchor: '100%',
                    name: 'nombre_file',
                    id:'nombre_file',
                    fieldLabel: 'Año',
                    value:nombre_file,
                    hidden:true
                },{
                anchor: '100%',
                name: 'anno_old',
                id:'anno_old',
                fieldLabel: 'Año',
                value:anno,
                hidden:true
            },{
                anchor: '100%',
                name: 'id_tpo',
                id:'id_tpo',
                value:id_tpo,
                hidden:true
                },descripcion]
        });
        var _gst_win = new Ext.Window(
            {
                title:'Modificar la Resolución',
                id: '_gst_Udt_win_id',
                height: 360,
                width: 600,
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
                        _gst_win.close();
                    }
                }],
                listeners: {
                    'show': function(This, eOpts) {
                        Ext.getCmp('nombre_Udt_id').focus(true, true);
                        //this.__data_store.load();
                    }
                }
            });

        _gst_win.show();

    }
    else
        Ext.Msg.alert('Atención', 'Acción no definida');
}

Resolucion.prototype.Modid = function(_paccion,_selectionModel,_selected_rcd){
    App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento','Procesando...'));
    var _result = App.PerformSyncServerRequest('Resolucion.Resolucion.Modid',this.panelupd.getForm().getValues());
    App.HideMsgBox();

    if(_result)
    {
        _selectionModel.deselect(_selected_rcd);
        App.InfoMessage('Información', 'Resolución modificada satisfactoriamente...');
        Ext.getCmp('_gst_Udt_win_id').close();
    }



    this.__data_store.load({params:{start:0,limit:25}});
}
Resolucion.prototype.upfiles = function(_p_form, _p_accion, fileup) {
    if ( this.panel.getForm().isValid()) {
        function fnCallBack(){
                    Ext.getCmp('panelAdd').getForm().reset();
                    this.__data_store.load();
                    App.HideMsgBox();
                    if (_p_accion == 'upd') {
                        Ext.getCmp('_gst_Udt_win_id').close();
                        App.InfoMessage('Información', 'Resolucion modificado satisfactoriamente...');
                    }
                    else
                        App.InfoMessage('Información', 'Resolución  adicionada satisfactoriamente...');
                }
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento','Procesando...'));
        if (_p_accion == 'add'){
            App.UploadFile('Resolucion.Resolucion.Adicionar',this.panel.getForm(), Ext.bind(fnCallBack,this));
        }
        else{
            App.UploadFile('Resolucion.Resolucion.Update', this.panel.getForm(), Ext.bind(fnCallBack,this));
        }

    }
    else{
        Ext.Msg.alert("Error", "Datos incorrectos");
    }

}
Resolucion.prototype.deltect = function(_paccion){

    var me = this;
    var fnCallBack = function() {
        var _selected_rcd = Ext.getCmp('Resolucion_grid_id').getSelectionModel().getLastSelected();
        var id = _selected_rcd.data.id;
        var dir = _selected_rcd.data.dir;
        var nombre_file = _selected_rcd.data.nombre_file;
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        _result = App.PerformSyncServerRequest('Resolucion.Resolucion.Eliminar', {dir: dir,id: id,nombre_file:nombre_file});
        App.HideMsgBox();

        if(_result)
        {
            me.__data_store.load();
            App.InfoMessage('Información', 'Resolución eliminada correctamente');
        }
    }

    App.ConfirmMessage(fnCallBack, '¿Está seguro que desea eliminar esta Resolución?');

}
