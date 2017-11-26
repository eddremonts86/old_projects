namespace SIGCampismo
{
    partial class frmInst
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.components = new System.ComponentModel.Container();
            this.radTipo = new Telerik.WinControls.UI.RadDropDownList();
            this.tipoinstalacionBindingSource = new System.Windows.Forms.BindingSource(this.components);
            this.tipoInstDataSet = new SIGCampismo.TipoInstDataSet();
            this.ddMun = new Telerik.WinControls.UI.RadDropDownList();
            this.municipiosBindingSource = new System.Windows.Forms.BindingSource(this.components);
            this.municipiosDataSet = new SIGCampismo.MunicipiosDataSet();
            this.ddProv = new Telerik.WinControls.UI.RadDropDownList();
            this.provinciasBindingSource = new System.Windows.Forms.BindingSource(this.components);
            this.provDataSet = new SIGCampismo.ProvDataSet();
            this.radPanel1 = new Telerik.WinControls.UI.RadPanel();
            this.radButton1 = new Telerik.WinControls.UI.RadButton();
            this.lbprueba = new Telerik.WinControls.UI.RadLabel();
            this.rdInstalaciones = new Telerik.WinControls.UI.RadGridView();
            this.provinciasTableAdapter = new SIGCampismo.ProvDataSetTableAdapters.ProvinciasTableAdapter();
            this.municipiosTableAdapter = new SIGCampismo.MunicipiosDataSetTableAdapters.municipiosTableAdapter();
            this.tipo_instalacionTableAdapter = new SIGCampismo.TipoInstDataSetTableAdapters.tipo_instalacionTableAdapter();
            this.label1 = new System.Windows.Forms.Label();
            this.label2 = new System.Windows.Forms.Label();
            this.label3 = new System.Windows.Forms.Label();
            ((System.ComponentModel.ISupportInitialize)(this.radTipo)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.tipoinstalacionBindingSource)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.tipoInstDataSet)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.ddMun)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.municipiosBindingSource)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.municipiosDataSet)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.ddProv)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.provinciasBindingSource)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.provDataSet)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.radPanel1)).BeginInit();
            this.radPanel1.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.radButton1)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.lbprueba)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.rdInstalaciones)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.rdInstalaciones.MasterTemplate)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this)).BeginInit();
            this.SuspendLayout();
            // 
            // radTipo
            // 
            this.radTipo.AutoCompleteDisplayMember = "nombre_instalacion";
            this.radTipo.AutoCompleteValueMember = "Id_tipo_instalacion";
            this.radTipo.AutoSize = false;
            this.radTipo.DataSource = this.tipoinstalacionBindingSource;
            this.radTipo.DisplayMember = "nombre_instalacion";
            this.radTipo.DropDownStyle = Telerik.WinControls.RadDropDownStyle.DropDownList;
            this.radTipo.Location = new System.Drawing.Point(305, 24);
            this.radTipo.Name = "radTipo";
            this.radTipo.NullText = "--Seleccione--";
            this.radTipo.ShowImageInEditorArea = true;
            this.radTipo.Size = new System.Drawing.Size(144, 24);
            this.radTipo.TabIndex = 6;
            this.radTipo.Text = "--Seleccione--";
            this.radTipo.ValueMember = "Id_tipo_instalacion";
            this.radTipo.SelectedValueChanged += new System.EventHandler(this.radDropDownList3_SelectedValueChanged);
            // 
            // tipoinstalacionBindingSource
            // 
            this.tipoinstalacionBindingSource.DataMember = "tipo_instalacion";
            this.tipoinstalacionBindingSource.DataSource = this.tipoInstDataSet;
            // 
            // tipoInstDataSet
            // 
            this.tipoInstDataSet.DataSetName = "TipoInstDataSet";
            this.tipoInstDataSet.SchemaSerializationMode = System.Data.SchemaSerializationMode.IncludeSchema;
            // 
            // ddMun
            // 
            this.ddMun.AutoCompleteDisplayMember = "Nombre_Municipio";
            this.ddMun.AutoCompleteValueMember = "idmunicipio";
            this.ddMun.DataSource = this.municipiosBindingSource;
            this.ddMun.DisplayMember = "Nombre_Municipio";
            this.ddMun.DropDownStyle = Telerik.WinControls.RadDropDownStyle.DropDownList;
            this.ddMun.Location = new System.Drawing.Point(159, 24);
            this.ddMun.Name = "ddMun";
            this.ddMun.NullText = "--Seleccione--";
            this.ddMun.ShowImageInEditorArea = true;
            this.ddMun.Size = new System.Drawing.Size(140, 20);
            this.ddMun.TabIndex = 5;
            this.ddMun.Text = "-- Seleccione --";
            this.ddMun.ValueMember = "idmunicipio";
            this.ddMun.SelectedValueChanged += new System.EventHandler(this.ddMun_SelectedValueChanged);
            // 
            // municipiosBindingSource
            // 
            this.municipiosBindingSource.DataMember = "municipios";
            this.municipiosBindingSource.DataSource = this.municipiosDataSet;
            // 
            // municipiosDataSet
            // 
            this.municipiosDataSet.DataSetName = "MunicipiosDataSet";
            this.municipiosDataSet.SchemaSerializationMode = System.Data.SchemaSerializationMode.IncludeSchema;
            // 
            // ddProv
            // 
            this.ddProv.AutoCompleteDisplayMember = "Nombre_Provincia";
            this.ddProv.AutoCompleteValueMember = "idprovincia";
            this.ddProv.DataSource = this.provinciasBindingSource;
            this.ddProv.DisplayMember = "Nombre_Provincia";
            this.ddProv.DropDownStyle = Telerik.WinControls.RadDropDownStyle.DropDownList;
            this.ddProv.Location = new System.Drawing.Point(12, 24);
            this.ddProv.Name = "ddProv";
            this.ddProv.NullText = "--Seleccione--";
            this.ddProv.ShowImageInEditorArea = true;
            this.ddProv.Size = new System.Drawing.Size(140, 20);
            this.ddProv.TabIndex = 4;
            this.ddProv.ValueMember = "idprovincia";
            this.ddProv.SelectedValueChanged += new System.EventHandler(this.ddProv_SelectedValueChanged);
            // 
            // provinciasBindingSource
            // 
            this.provinciasBindingSource.DataMember = "Provincias";
            this.provinciasBindingSource.DataSource = this.provDataSet;
            // 
            // provDataSet
            // 
            this.provDataSet.DataSetName = "ProvDataSet";
            this.provDataSet.SchemaSerializationMode = System.Data.SchemaSerializationMode.IncludeSchema;
            // 
            // radPanel1
            // 
            this.radPanel1.Controls.Add(this.label3);
            this.radPanel1.Controls.Add(this.label2);
            this.radPanel1.Controls.Add(this.label1);
            this.radPanel1.Controls.Add(this.radButton1);
            this.radPanel1.Controls.Add(this.lbprueba);
            this.radPanel1.Controls.Add(this.radTipo);
            this.radPanel1.Controls.Add(this.ddMun);
            this.radPanel1.Controls.Add(this.ddProv);
            this.radPanel1.Dock = System.Windows.Forms.DockStyle.Top;
            this.radPanel1.Location = new System.Drawing.Point(0, 0);
            this.radPanel1.Name = "radPanel1";
            this.radPanel1.Size = new System.Drawing.Size(698, 50);
            this.radPanel1.TabIndex = 1;
            // 
            // radButton1
            // 
            this.radButton1.Location = new System.Drawing.Point(469, 20);
            this.radButton1.Name = "radButton1";
            this.radButton1.Size = new System.Drawing.Size(130, 24);
            this.radButton1.TabIndex = 8;
            this.radButton1.Text = "Imprimir";
            this.radButton1.Click += new System.EventHandler(this.radButton1_Click);
            // 
            // lbprueba
            // 
            this.lbprueba.Location = new System.Drawing.Point(159, 52);
            this.lbprueba.Name = "lbprueba";
            this.lbprueba.Size = new System.Drawing.Size(2, 2);
            this.lbprueba.TabIndex = 7;
            // 
            // rdInstalaciones
            // 
            this.rdInstalaciones.Dock = System.Windows.Forms.DockStyle.Fill;
            this.rdInstalaciones.Location = new System.Drawing.Point(0, 50);
            // 
            // rdInstalaciones
            // 
            this.rdInstalaciones.MasterTemplate.AutoSizeColumnsMode = Telerik.WinControls.UI.GridViewAutoSizeColumnsMode.Fill;
            this.rdInstalaciones.MasterTemplate.EnableGrouping = false;
            this.rdInstalaciones.Name = "rdInstalaciones";
            this.rdInstalaciones.Size = new System.Drawing.Size(698, 412);
            this.rdInstalaciones.TabIndex = 2;
            this.rdInstalaciones.Text = "radGridView1";
            // 
            // provinciasTableAdapter
            // 
            this.provinciasTableAdapter.ClearBeforeFill = true;
            // 
            // municipiosTableAdapter
            // 
            this.municipiosTableAdapter.ClearBeforeFill = true;
            // 
            // tipo_instalacionTableAdapter
            // 
            this.tipo_instalacionTableAdapter.ClearBeforeFill = true;
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(12, 9);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(56, 13);
            this.label1.TabIndex = 9;
            this.label1.Text = "Provincia:";
            this.label1.Click += new System.EventHandler(this.label1_Click);
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(156, 8);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(62, 13);
            this.label2.TabIndex = 10;
            this.label2.Text = "Municipio:";
            this.label2.Click += new System.EventHandler(this.label2_Click);
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(302, 8);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(94, 13);
            this.label3.TabIndex = 11;
            this.label3.Text = "Tipo Instalación :";
            // 
            // frmInst
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(698, 462);
            this.Controls.Add(this.rdInstalaciones);
            this.Controls.Add(this.radPanel1);
            this.Name = "frmInst";
            // 
            // 
            // 
            this.RootElement.ApplyShapeToControl = true;
            this.Text = "Listado de Instalaciones";
            this.ThemeName = "ControlDefault";
            this.Load += new System.EventHandler(this.frmInst_Load);
            ((System.ComponentModel.ISupportInitialize)(this.radTipo)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.tipoinstalacionBindingSource)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.tipoInstDataSet)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.ddMun)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.municipiosBindingSource)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.municipiosDataSet)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.ddProv)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.provinciasBindingSource)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.provDataSet)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.radPanel1)).EndInit();
            this.radPanel1.ResumeLayout(false);
            this.radPanel1.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)(this.radButton1)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.lbprueba)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.rdInstalaciones.MasterTemplate)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.rdInstalaciones)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this)).EndInit();
            this.ResumeLayout(false);

        }

        #endregion

        private Telerik.WinControls.UI.RadDropDownList radTipo;
        private Telerik.WinControls.UI.RadDropDownList ddMun;
        private Telerik.WinControls.UI.RadDropDownList ddProv;
        private Telerik.WinControls.UI.RadPanel radPanel1;
        private Telerik.WinControls.UI.RadLabel lbprueba;
        private Telerik.WinControls.UI.RadGridView rdInstalaciones; 
        private Telerik.WinControls.UI.RadButton radButton1;
        private ProvDataSet provDataSet;
        private System.Windows.Forms.BindingSource provinciasBindingSource;
        private ProvDataSetTableAdapters.ProvinciasTableAdapter provinciasTableAdapter;
        private MunicipiosDataSet municipiosDataSet;
        private System.Windows.Forms.BindingSource municipiosBindingSource;
        private MunicipiosDataSetTableAdapters.municipiosTableAdapter municipiosTableAdapter;
        private TipoInstDataSet tipoInstDataSet;
        private System.Windows.Forms.BindingSource tipoinstalacionBindingSource;
        private TipoInstDataSetTableAdapters.tipo_instalacionTableAdapter tipo_instalacionTableAdapter;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.Label label3;

    }
}
