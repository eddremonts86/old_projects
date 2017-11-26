namespace SIGCampismo
{
    partial class frmSpatialFilter
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
            this.cbmunicipios = new Telerik.WinControls.UI.RadDropDownList();
            this.municipiosBindingSource = new System.Windows.Forms.BindingSource(this.components);
            this.municipiosDataSet = new SIGCampismo.MunicipiosDataSet();
            this.btnlocalizar = new Telerik.WinControls.UI.RadButton();
            this.radGroupBox4 = new Telerik.WinControls.UI.RadGroupBox();
            this.radRadioButton4 = new Telerik.WinControls.UI.RadRadioButton();
            this.radRadioButton3 = new Telerik.WinControls.UI.RadRadioButton();
            this.radRadioButton1 = new Telerik.WinControls.UI.RadRadioButton();
            this.radRadioButton10 = new Telerik.WinControls.UI.RadRadioButton();
            this.radRadioButton2 = new Telerik.WinControls.UI.RadRadioButton();
            this.radRadioButton11 = new Telerik.WinControls.UI.RadRadioButton();
            this.radRadioButton8 = new Telerik.WinControls.UI.RadRadioButton();
            this.radRadioButton7 = new Telerik.WinControls.UI.RadRadioButton();
            this.radLabel2 = new Telerik.WinControls.UI.RadLabel();
            this.radLabel1 = new Telerik.WinControls.UI.RadLabel();
            this.cbprovincia = new Telerik.WinControls.UI.RadDropDownList();
            this.provinciasBindingSource = new System.Windows.Forms.BindingSource(this.components);
            this.provinciaDataSetBindingSource = new System.Windows.Forms.BindingSource(this.components);
            this.provinciaDataSet = new SIGCampismo.ProvinciaDataSet();
            this.radButton2 = new Telerik.WinControls.UI.RadButton();
            this.radButton1 = new Telerik.WinControls.UI.RadButton();
            this.listaservicios = new Telerik.WinControls.UI.RadListControl();
            this.listaserviciosele = new Telerik.WinControls.UI.RadListControl();
            this.oleDbConnection = new System.Data.OleDb.OleDbConnection();
            this.provinciasTableAdapter = new SIGCampismo.ProvinciaDataSetTableAdapters.ProvinciasTableAdapter();
            this.municipiosTableAdapter = new SIGCampismo.MunicipiosDataSetTableAdapters.municipiosTableAdapter();
            this.servicioDataSet = new SIGCampismo.servicioDataSet();
            this.servicioBindingSource = new System.Windows.Forms.BindingSource(this.components);
            this.servicioTableAdapter = new SIGCampismo.servicioDataSetTableAdapters.ServicioTableAdapter();
            this.radLabel3 = new Telerik.WinControls.UI.RadLabel();
            this.radLabel4 = new Telerik.WinControls.UI.RadLabel();
            ((System.ComponentModel.ISupportInitialize)(this.cbmunicipios)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.municipiosBindingSource)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.municipiosDataSet)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.btnlocalizar)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.radGroupBox4)).BeginInit();
            this.radGroupBox4.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.radRadioButton4)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.radRadioButton3)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.radRadioButton1)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.radRadioButton10)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.radRadioButton2)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.radRadioButton11)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.radRadioButton8)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.radRadioButton7)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.radLabel2)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.radLabel1)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbprovincia)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.provinciasBindingSource)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.provinciaDataSetBindingSource)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.provinciaDataSet)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.radButton2)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.radButton1)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.listaservicios)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.listaserviciosele)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.servicioDataSet)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.servicioBindingSource)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.radLabel3)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.radLabel4)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this)).BeginInit();
            this.SuspendLayout();
            // 
            // cbmunicipios
            // 
            this.cbmunicipios.AutoCompleteDisplayMember = "Nombre_Municipio";
            this.cbmunicipios.AutoCompleteMode = System.Windows.Forms.AutoCompleteMode.Suggest;
            this.cbmunicipios.AutoCompleteValueMember = "idmunicipio";
            this.cbmunicipios.DataSource = this.municipiosBindingSource;
            this.cbmunicipios.DisplayMember = "Nombre_Municipio";
            this.cbmunicipios.Location = new System.Drawing.Point(351, 14);
            this.cbmunicipios.Name = "cbmunicipios";
            this.cbmunicipios.NullText = "Todos";
            this.cbmunicipios.ShowImageInEditorArea = true;
            this.cbmunicipios.Size = new System.Drawing.Size(193, 20);
            this.cbmunicipios.TabIndex = 16;
            this.cbmunicipios.Text = "Todos";
            this.cbmunicipios.ValueMember = "idmunicipio";
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
            // btnlocalizar
            // 
            this.btnlocalizar.Location = new System.Drawing.Point(265, 391);
            this.btnlocalizar.Name = "btnlocalizar";
            this.btnlocalizar.Size = new System.Drawing.Size(130, 24);
            this.btnlocalizar.TabIndex = 15;
            this.btnlocalizar.Text = "Mostrar";
            this.btnlocalizar.Click += new System.EventHandler(this.btnlocalizar_Click);
            // 
            // radGroupBox4
            // 
            this.radGroupBox4.AccessibleRole = System.Windows.Forms.AccessibleRole.Grouping;
            this.radGroupBox4.Controls.Add(this.radRadioButton4);
            this.radGroupBox4.Controls.Add(this.radRadioButton3);
            this.radGroupBox4.Controls.Add(this.radRadioButton1);
            this.radGroupBox4.Controls.Add(this.radRadioButton10);
            this.radGroupBox4.Controls.Add(this.radRadioButton2);
            this.radGroupBox4.Controls.Add(this.radRadioButton11);
            this.radGroupBox4.Controls.Add(this.radRadioButton8);
            this.radGroupBox4.Controls.Add(this.radRadioButton7);
            this.radGroupBox4.FooterImageIndex = -1;
            this.radGroupBox4.FooterImageKey = "";
            this.radGroupBox4.ForeColor = System.Drawing.Color.Black;
            this.radGroupBox4.HeaderImageIndex = -1;
            this.radGroupBox4.HeaderImageKey = "";
            this.radGroupBox4.HeaderMargin = new System.Windows.Forms.Padding(0);
            this.radGroupBox4.HeaderText = "Tipo de Instalación";
            this.radGroupBox4.Location = new System.Drawing.Point(12, 40);
            this.radGroupBox4.Name = "radGroupBox4";
            this.radGroupBox4.Padding = new System.Windows.Forms.Padding(10, 20, 10, 10);
            // 
            // 
            // 
            this.radGroupBox4.RootElement.ForeColor = System.Drawing.Color.Black;
            this.radGroupBox4.RootElement.Padding = new System.Windows.Forms.Padding(10, 20, 10, 10);
            this.radGroupBox4.Size = new System.Drawing.Size(672, 75);
            this.radGroupBox4.TabIndex = 12;
            this.radGroupBox4.Text = "Tipo de Instalación";
            // 
            // radRadioButton4
            // 
            this.radRadioButton4.Location = new System.Drawing.Point(478, 45);
            this.radRadioButton4.Name = "radRadioButton4";
            this.radRadioButton4.Size = new System.Drawing.Size(110, 18);
            this.radRadioButton4.TabIndex = 10;
            this.radRadioButton4.Text = "Parque Turístico";
            this.radRadioButton4.Click += new System.EventHandler(this.radRadioButton4_Click);
            // 
            // radRadioButton3
            // 
            this.radRadioButton3.Location = new System.Drawing.Point(478, 24);
            this.radRadioButton3.Name = "radRadioButton3";
            this.radRadioButton3.Size = new System.Drawing.Size(110, 18);
            this.radRadioButton3.TabIndex = 9;
            this.radRadioButton3.Text = "Abastecimiento";
            this.radRadioButton3.Click += new System.EventHandler(this.radRadioButton3_Click);
            // 
            // radRadioButton1
            // 
            this.radRadioButton1.ForeColor = System.Drawing.Color.Black;
            this.radRadioButton1.Location = new System.Drawing.Point(293, 45);
            this.radRadioButton1.Name = "radRadioButton1";
            // 
            // 
            // 
            this.radRadioButton1.RootElement.ForeColor = System.Drawing.Color.Black;
            this.radRadioButton1.Size = new System.Drawing.Size(111, 16);
            this.radRadioButton1.TabIndex = 8;
            this.radRadioButton1.Tag = "7";
            this.radRadioButton1.Text = "Villa Turística";
            this.radRadioButton1.Click += new System.EventHandler(this.radRadioButton1_Click);
            // 
            // radRadioButton10
            // 
            this.radRadioButton10.ForeColor = System.Drawing.Color.Black;
            this.radRadioButton10.Location = new System.Drawing.Point(144, 23);
            this.radRadioButton10.Name = "radRadioButton10";
            // 
            // 
            // 
            this.radRadioButton10.RootElement.ForeColor = System.Drawing.Color.Black;
            this.radRadioButton10.Size = new System.Drawing.Size(143, 14);
            this.radRadioButton10.TabIndex = 7;
            this.radRadioButton10.Tag = "4";
            this.radRadioButton10.Text = "Oficina de Reservación";
            this.radRadioButton10.Click += new System.EventHandler(this.radRadioButton10_Click);
            // 
            // radRadioButton2
            // 
            this.radRadioButton2.ForeColor = System.Drawing.Color.Black;
            this.radRadioButton2.Location = new System.Drawing.Point(144, 43);
            this.radRadioButton2.Name = "radRadioButton2";
            // 
            // 
            // 
            this.radRadioButton2.RootElement.ForeColor = System.Drawing.Color.Black;
            this.radRadioButton2.Size = new System.Drawing.Size(83, 16);
            this.radRadioButton2.TabIndex = 6;
            this.radRadioButton2.Tag = "5";
            this.radRadioButton2.Text = "Empresa";
            this.radRadioButton2.Click += new System.EventHandler(this.radRadioButton2_Click);
            // 
            // radRadioButton11
            // 
            this.radRadioButton11.ForeColor = System.Drawing.Color.Black;
            this.radRadioButton11.Location = new System.Drawing.Point(293, 23);
            this.radRadioButton11.Name = "radRadioButton11";
            // 
            // 
            // 
            this.radRadioButton11.RootElement.ForeColor = System.Drawing.Color.Black;
            this.radRadioButton11.Size = new System.Drawing.Size(164, 16);
            this.radRadioButton11.TabIndex = 4;
            this.radRadioButton11.Tag = "6";
            this.radRadioButton11.Text = "Agencia de Viajes Cubamar";
            this.radRadioButton11.Click += new System.EventHandler(this.radRadioButton11_Click);
            // 
            // radRadioButton8
            // 
            this.radRadioButton8.ForeColor = System.Drawing.Color.Black;
            this.radRadioButton8.Location = new System.Drawing.Point(16, 43);
            this.radRadioButton8.Name = "radRadioButton8";
            // 
            // 
            // 
            this.radRadioButton8.RootElement.ForeColor = System.Drawing.Color.Black;
            this.radRadioButton8.Size = new System.Drawing.Size(108, 16);
            this.radRadioButton8.TabIndex = 1;
            this.radRadioButton8.Tag = "2";
            this.radRadioButton8.Text = "Extrahotelera";
            this.radRadioButton8.Click += new System.EventHandler(this.radRadioButton8_Click);
            // 
            // radRadioButton7
            // 
            this.radRadioButton7.ForeColor = System.Drawing.Color.Black;
            this.radRadioButton7.Location = new System.Drawing.Point(16, 23);
            this.radRadioButton7.Name = "radRadioButton7";
            // 
            // 
            // 
            this.radRadioButton7.RootElement.ForeColor = System.Drawing.Color.Black;
            this.radRadioButton7.Size = new System.Drawing.Size(122, 14);
            this.radRadioButton7.TabIndex = 0;
            this.radRadioButton7.Tag = "1";
            this.radRadioButton7.Text = "Base de Campismo";
            this.radRadioButton7.ToggleState = Telerik.WinControls.Enumerations.ToggleState.On;
            this.radRadioButton7.Click += new System.EventHandler(this.radRadioButton7_Click);
            // 
            // radLabel2
            // 
            this.radLabel2.Location = new System.Drawing.Point(289, 14);
            this.radLabel2.Name = "radLabel2";
            this.radLabel2.Size = new System.Drawing.Size(56, 18);
            this.radLabel2.TabIndex = 11;
            this.radLabel2.Text = "Municipio";
            // 
            // radLabel1
            // 
            this.radLabel1.Location = new System.Drawing.Point(12, 12);
            this.radLabel1.Name = "radLabel1";
            this.radLabel1.Size = new System.Drawing.Size(51, 18);
            this.radLabel1.TabIndex = 10;
            this.radLabel1.Text = "Provincia";
            // 
            // cbprovincia
            // 
            this.cbprovincia.AutoCompleteDisplayMember = "Nombre_Provincia";
            this.cbprovincia.AutoCompleteValueMember = "idprovincia";
            this.cbprovincia.DataSource = this.provinciasBindingSource;
            this.cbprovincia.DisplayMember = "Nombre_Provincia";
            this.cbprovincia.DropDownStyle = Telerik.WinControls.RadDropDownStyle.DropDownList;
            this.cbprovincia.Location = new System.Drawing.Point(78, 12);
            this.cbprovincia.Name = "cbprovincia";
            this.cbprovincia.NullText = "Todas";
            this.cbprovincia.ShowImageInEditorArea = true;
            this.cbprovincia.Size = new System.Drawing.Size(193, 20);
            this.cbprovincia.TabIndex = 9;
            this.cbprovincia.Text = "Todas";
            this.cbprovincia.ValueMember = "idprovincia";
            this.cbprovincia.SelectedIndexChanged += new Telerik.WinControls.UI.Data.PositionChangedEventHandler(this.cbprovincia_SelectedIndexChanged);
            // 
            // provinciasBindingSource
            // 
            this.provinciasBindingSource.DataMember = "Provincias";
            this.provinciasBindingSource.DataSource = this.provinciaDataSetBindingSource;
            // 
            // provinciaDataSetBindingSource
            // 
            this.provinciaDataSetBindingSource.DataSource = this.provinciaDataSet;
            this.provinciaDataSetBindingSource.Position = 0;
            // 
            // provinciaDataSet
            // 
            this.provinciaDataSet.DataSetName = "ProvinciaDataSet";
            this.provinciaDataSet.SchemaSerializationMode = System.Data.SchemaSerializationMode.IncludeSchema;
            // 
            // radButton2
            // 
            this.radButton2.Location = new System.Drawing.Point(331, 292);
            this.radButton2.Name = "radButton2";
            this.radButton2.Size = new System.Drawing.Size(14, 25);
            this.radButton2.TabIndex = 20;
            this.radButton2.Text = "<";
            this.radButton2.Click += new System.EventHandler(this.radButton2_Click);
            // 
            // radButton1
            // 
            this.radButton1.Location = new System.Drawing.Point(331, 212);
            this.radButton1.Name = "radButton1";
            this.radButton1.Size = new System.Drawing.Size(14, 24);
            this.radButton1.TabIndex = 19;
            this.radButton1.Text = ">";
            this.radButton1.Click += new System.EventHandler(this.radButton1_Click);
            // 
            // listaservicios
            // 
            this.listaservicios.CaseSensitiveSort = true;
            this.listaservicios.DisplayMember = "Nombre_Instalacion";
            this.listaservicios.ItemHeight = 18;
            this.listaservicios.Location = new System.Drawing.Point(12, 139);
            this.listaservicios.Name = "listaservicios";
            this.listaservicios.Size = new System.Drawing.Size(287, 218);
            this.listaservicios.TabIndex = 18;
            this.listaservicios.Text = "radListControl2";
            this.listaservicios.ValueMember = "id_instalacion";
            // 
            // listaserviciosele
            // 
            this.listaserviciosele.CaseSensitiveSort = true;
            this.listaserviciosele.ItemHeight = 18;
            this.listaserviciosele.Location = new System.Drawing.Point(373, 139);
            this.listaserviciosele.Name = "listaserviciosele";
            this.listaserviciosele.Size = new System.Drawing.Size(311, 218);
            this.listaserviciosele.TabIndex = 17;
            this.listaserviciosele.Text = "radListControl1";
            // 
            // oleDbConnection
            // 
            this.oleDbConnection.ConnectionString = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=D:\\Proyectos\\_2014\\Campismo\\SIGCampi" +
                "smo\\SIGCampismo\\Campismo.mdb";
            // 
            // provinciasTableAdapter
            // 
            this.provinciasTableAdapter.ClearBeforeFill = true;
            // 
            // municipiosTableAdapter
            // 
            this.municipiosTableAdapter.ClearBeforeFill = true;
            // 
            // servicioDataSet
            // 
            this.servicioDataSet.DataSetName = "servicioDataSet";
            this.servicioDataSet.SchemaSerializationMode = System.Data.SchemaSerializationMode.IncludeSchema;
            // 
            // servicioBindingSource
            // 
            this.servicioBindingSource.DataMember = "Servicio";
            this.servicioBindingSource.DataSource = this.servicioDataSet;
            // 
            // servicioTableAdapter
            // 
            this.servicioTableAdapter.ClearBeforeFill = true;
            // 
            // radLabel3
            // 
            this.radLabel3.Location = new System.Drawing.Point(118, 121);
            this.radLabel3.Name = "radLabel3";
            this.radLabel3.Size = new System.Drawing.Size(50, 18);
            this.radLabel3.TabIndex = 21;
            this.radLabel3.Text = "Servicios";
            // 
            // radLabel4
            // 
            this.radLabel4.Location = new System.Drawing.Point(478, 121);
            this.radLabel4.Name = "radLabel4";
            this.radLabel4.Size = new System.Drawing.Size(122, 18);
            this.radLabel4.TabIndex = 0;
            this.radLabel4.Text = "Servicios seleccionados";
            this.radLabel4.Click += new System.EventHandler(this.radLabel4_Click);
            // 
            // frmSpatialFilter
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(718, 427);
            this.Controls.Add(this.radLabel4);
            this.Controls.Add(this.radLabel3);
            this.Controls.Add(this.radButton2);
            this.Controls.Add(this.radButton1);
            this.Controls.Add(this.listaservicios);
            this.Controls.Add(this.listaserviciosele);
            this.Controls.Add(this.cbmunicipios);
            this.Controls.Add(this.btnlocalizar);
            this.Controls.Add(this.radGroupBox4);
            this.Controls.Add(this.radLabel2);
            this.Controls.Add(this.radLabel1);
            this.Controls.Add(this.cbprovincia);
            this.MaximizeBox = false;
            this.MinimizeBox = false;
            this.Name = "frmSpatialFilter";
            // 
            // 
            // 
            this.RootElement.ApplyShapeToControl = true;
            this.Text = "Ver en el Mapa Instalaciones por servicios";
            this.ThemeName = "ControlDefault";
            this.FormClosed += new System.Windows.Forms.FormClosedEventHandler(this.frmSpatialFilter_FormClosed);
            this.Load += new System.EventHandler(this.frmSpatialFilter_Load);
            ((System.ComponentModel.ISupportInitialize)(this.cbmunicipios)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.municipiosBindingSource)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.municipiosDataSet)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.btnlocalizar)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.radGroupBox4)).EndInit();
            this.radGroupBox4.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)(this.radRadioButton4)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.radRadioButton3)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.radRadioButton1)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.radRadioButton10)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.radRadioButton2)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.radRadioButton11)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.radRadioButton8)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.radRadioButton7)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.radLabel2)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.radLabel1)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbprovincia)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.provinciasBindingSource)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.provinciaDataSetBindingSource)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.provinciaDataSet)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.radButton2)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.radButton1)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.listaservicios)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.listaserviciosele)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.servicioDataSet)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.servicioBindingSource)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.radLabel3)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.radLabel4)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private Telerik.WinControls.UI.RadDropDownList cbmunicipios;
        private Telerik.WinControls.UI.RadButton btnlocalizar;
        private Telerik.WinControls.UI.RadGroupBox radGroupBox4;
        private Telerik.WinControls.UI.RadRadioButton radRadioButton2;
        private Telerik.WinControls.UI.RadRadioButton radRadioButton11;
        private Telerik.WinControls.UI.RadRadioButton radRadioButton8;
        private Telerik.WinControls.UI.RadRadioButton radRadioButton7;
        private Telerik.WinControls.UI.RadLabel radLabel2;
        private Telerik.WinControls.UI.RadLabel radLabel1;
        private Telerik.WinControls.UI.RadDropDownList cbprovincia;
        private Telerik.WinControls.UI.RadRadioButton radRadioButton1;
        private Telerik.WinControls.UI.RadRadioButton radRadioButton10;
        private Telerik.WinControls.UI.RadButton radButton2;
        private Telerik.WinControls.UI.RadButton radButton1;
        private Telerik.WinControls.UI.RadListControl listaservicios;
        private Telerik.WinControls.UI.RadListControl listaserviciosele;
        private System.Windows.Forms.BindingSource provinciaDataSetBindingSource;
        private ProvinciaDataSet provinciaDataSet;
        private System.Windows.Forms.BindingSource provinciasBindingSource;
        private ProvinciaDataSetTableAdapters.ProvinciasTableAdapter provinciasTableAdapter;
        private MunicipiosDataSet municipiosDataSet;
        private System.Windows.Forms.BindingSource municipiosBindingSource;
        private MunicipiosDataSetTableAdapters.municipiosTableAdapter municipiosTableAdapter;
        private servicioDataSet servicioDataSet;
        private System.Windows.Forms.BindingSource servicioBindingSource;
        private servicioDataSetTableAdapters.ServicioTableAdapter servicioTableAdapter;
        private System.Data.OleDb.OleDbConnection oleDbConnection;
        private Telerik.WinControls.UI.RadRadioButton radRadioButton3;
        private Telerik.WinControls.UI.RadRadioButton radRadioButton4;
        private Telerik.WinControls.UI.RadLabel radLabel3;
        private Telerik.WinControls.UI.RadLabel radLabel4;
    }
}
