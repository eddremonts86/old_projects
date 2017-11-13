namespace SIGCampismo
{
    partial class frmbusqInstalacion
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
            this.cbprovincia = new Telerik.WinControls.UI.RadDropDownList();
            this.provinciasBindingSource = new System.Windows.Forms.BindingSource(this.components);
            this.provinciaDataSetBindingSource = new System.Windows.Forms.BindingSource(this.components);
            this.provinciaDataSet = new SIGCampismo.ProvinciaDataSet();
            this.radLabel1 = new Telerik.WinControls.UI.RadLabel();
            this.radLabel2 = new Telerik.WinControls.UI.RadLabel();
            this.radGroupBox4 = new Telerik.WinControls.UI.RadGroupBox();
            this.radRadioButton4 = new Telerik.WinControls.UI.RadRadioButton();
            this.radRadioButton3 = new Telerik.WinControls.UI.RadRadioButton();
            this.radRadioButton2 = new Telerik.WinControls.UI.RadRadioButton();
            this.radRadioButton1 = new Telerik.WinControls.UI.RadRadioButton();
            this.radRadioButton11 = new Telerik.WinControls.UI.RadRadioButton();
            this.radRadioButton10 = new Telerik.WinControls.UI.RadRadioButton();
            this.radRadioButton9 = new Telerik.WinControls.UI.RadRadioButton();
            this.radRadioButton8 = new Telerik.WinControls.UI.RadRadioButton();
            this.radRadioButton7 = new Telerik.WinControls.UI.RadRadioButton();
            this.radLabel3 = new Telerik.WinControls.UI.RadLabel();
            this.cbinstalacion = new Telerik.WinControls.UI.RadDropDownList();
            this.instalacionesBindingSource = new System.Windows.Forms.BindingSource(this.components);
            this.instalacionesDataSet = new SIGCampismo.InstalacionesDataSet();
            this.btnlocalizar = new Telerik.WinControls.UI.RadButton();
            this.provinciasTableAdapter = new SIGCampismo.ProvinciaDataSetTableAdapters.ProvinciasTableAdapter();
            this.cbmunicipios = new Telerik.WinControls.UI.RadDropDownList();
            this.municipiosBindingSource = new System.Windows.Forms.BindingSource(this.components);
            this.municipiosDataSet = new SIGCampismo.MunicipiosDataSet();
            this.municipiosTableAdapter = new SIGCampismo.MunicipiosDataSetTableAdapters.municipiosTableAdapter();
            this.instalacionesTableAdapter = new SIGCampismo.InstalacionesDataSetTableAdapters.instalacionesTableAdapter();
            ((System.ComponentModel.ISupportInitialize)(this.cbprovincia)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.provinciasBindingSource)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.provinciaDataSetBindingSource)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.provinciaDataSet)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.radLabel1)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.radLabel2)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.radGroupBox4)).BeginInit();
            this.radGroupBox4.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.radRadioButton4)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.radRadioButton3)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.radRadioButton2)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.radRadioButton1)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.radRadioButton11)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.radRadioButton10)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.radRadioButton9)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.radRadioButton8)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.radRadioButton7)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.radLabel3)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbinstalacion)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.instalacionesBindingSource)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.instalacionesDataSet)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.btnlocalizar)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbmunicipios)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.municipiosBindingSource)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.municipiosDataSet)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this)).BeginInit();
            this.SuspendLayout();
            // 
            // cbprovincia
            // 
            this.cbprovincia.AutoCompleteDisplayMember = "Nombre_Provincia";
            this.cbprovincia.AutoCompleteMode = System.Windows.Forms.AutoCompleteMode.Suggest;
            this.cbprovincia.AutoCompleteValueMember = "idprovincia";
            this.cbprovincia.DataSource = this.provinciasBindingSource;
            this.cbprovincia.DisplayMember = "Nombre_Provincia";
            this.cbprovincia.Location = new System.Drawing.Point(26, 25);
            this.cbprovincia.Name = "cbprovincia";
            this.cbprovincia.NullText = "-- Seleccione --";
            this.cbprovincia.ShowImageInEditorArea = true;
            this.cbprovincia.Size = new System.Drawing.Size(193, 20);
            this.cbprovincia.TabIndex = 0;
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
            // radLabel1
            // 
            this.radLabel1.Location = new System.Drawing.Point(30, 1);
            this.radLabel1.Name = "radLabel1";
            this.radLabel1.Size = new System.Drawing.Size(51, 18);
            this.radLabel1.TabIndex = 2;
            this.radLabel1.Text = "Provincia";
            // 
            // radLabel2
            // 
            this.radLabel2.Location = new System.Drawing.Point(30, 52);
            this.radLabel2.Name = "radLabel2";
            this.radLabel2.Size = new System.Drawing.Size(56, 18);
            this.radLabel2.TabIndex = 3;
            this.radLabel2.Text = "Municipio";
            // 
            // radGroupBox4
            // 
            this.radGroupBox4.AccessibleRole = System.Windows.Forms.AccessibleRole.Grouping;
            this.radGroupBox4.Controls.Add(this.radRadioButton4);
            this.radGroupBox4.Controls.Add(this.radRadioButton3);
            this.radGroupBox4.Controls.Add(this.radRadioButton2);
            this.radGroupBox4.Controls.Add(this.radRadioButton1);
            this.radGroupBox4.Controls.Add(this.radRadioButton11);
            this.radGroupBox4.Controls.Add(this.radRadioButton10);
            this.radGroupBox4.Controls.Add(this.radRadioButton9);
            this.radGroupBox4.Controls.Add(this.radRadioButton8);
            this.radGroupBox4.Controls.Add(this.radRadioButton7);
            this.radGroupBox4.FooterImageIndex = -1;
            this.radGroupBox4.FooterImageKey = "";
            this.radGroupBox4.ForeColor = System.Drawing.Color.Black;
            this.radGroupBox4.HeaderImageIndex = -1;
            this.radGroupBox4.HeaderImageKey = "";
            this.radGroupBox4.HeaderMargin = new System.Windows.Forms.Padding(0);
            this.radGroupBox4.HeaderText = "Tipo de Instalación";
            this.radGroupBox4.Location = new System.Drawing.Point(234, 12);
            this.radGroupBox4.Name = "radGroupBox4";
            this.radGroupBox4.Padding = new System.Windows.Forms.Padding(10, 20, 10, 10);
            // 
            // 
            // 
            this.radGroupBox4.RootElement.ForeColor = System.Drawing.Color.Black;
            this.radGroupBox4.RootElement.Padding = new System.Windows.Forms.Padding(10, 20, 10, 10);
            this.radGroupBox4.Size = new System.Drawing.Size(273, 220);
            this.radGroupBox4.TabIndex = 4;
            this.radGroupBox4.Text = "Tipo de Instalación";
            // 
            // radRadioButton4
            // 
            this.radRadioButton4.Location = new System.Drawing.Point(16, 189);
            this.radRadioButton4.Name = "radRadioButton4";
            this.radRadioButton4.Size = new System.Drawing.Size(110, 18);
            this.radRadioButton4.TabIndex = 8;
            this.radRadioButton4.Tag = "9";
            this.radRadioButton4.Text = "Parque Turístico";
            this.radRadioButton4.Click += new System.EventHandler(this.radRadioButton4_Click);
            // 
            // radRadioButton3
            // 
            this.radRadioButton3.Location = new System.Drawing.Point(16, 149);
            this.radRadioButton3.Name = "radRadioButton3";
            this.radRadioButton3.Size = new System.Drawing.Size(110, 18);
            this.radRadioButton3.TabIndex = 7;
            this.radRadioButton3.Tag = "7";
            this.radRadioButton3.Text = "Villa Turística";
            this.radRadioButton3.Click += new System.EventHandler(this.radRadioButton3_Click);
            // 
            // radRadioButton2
            // 
            this.radRadioButton2.ForeColor = System.Drawing.Color.Black;
            this.radRadioButton2.Location = new System.Drawing.Point(16, 104);
            this.radRadioButton2.Name = "radRadioButton2";
            // 
            // 
            // 
            this.radRadioButton2.RootElement.ForeColor = System.Drawing.Color.Black;
            this.radRadioButton2.Size = new System.Drawing.Size(179, 23);
            this.radRadioButton2.TabIndex = 6;
            this.radRadioButton2.Tag = "5";
            this.radRadioButton2.Text = "Empresa";
            this.radRadioButton2.Click += new System.EventHandler(this.radRadioButton2_Click);
            // 
            // radRadioButton1
            // 
            this.radRadioButton1.ForeColor = System.Drawing.Color.Black;
            this.radRadioButton1.Location = new System.Drawing.Point(16, 168);
            this.radRadioButton1.Name = "radRadioButton1";
            // 
            // 
            // 
            this.radRadioButton1.RootElement.ForeColor = System.Drawing.Color.Black;
            this.radRadioButton1.Size = new System.Drawing.Size(111, 16);
            this.radRadioButton1.TabIndex = 5;
            this.radRadioButton1.Tag = "8";
            this.radRadioButton1.Text = "Abastecimiento";
            this.radRadioButton1.Click += new System.EventHandler(this.radRadioButton1_Click);
            // 
            // radRadioButton11
            // 
            this.radRadioButton11.ForeColor = System.Drawing.Color.Black;
            this.radRadioButton11.Location = new System.Drawing.Point(16, 127);
            this.radRadioButton11.Name = "radRadioButton11";
            // 
            // 
            // 
            this.radRadioButton11.RootElement.ForeColor = System.Drawing.Color.Black;
            this.radRadioButton11.Size = new System.Drawing.Size(196, 16);
            this.radRadioButton11.TabIndex = 4;
            this.radRadioButton11.Tag = "6";
            this.radRadioButton11.Text = "Agencia de Viajes Cubamar";
            this.radRadioButton11.Click += new System.EventHandler(this.radRadioButton11_Click);
            // 
            // radRadioButton10
            // 
            this.radRadioButton10.ForeColor = System.Drawing.Color.Black;
            this.radRadioButton10.Location = new System.Drawing.Point(16, 87);
            this.radRadioButton10.Name = "radRadioButton10";
            // 
            // 
            // 
            this.radRadioButton10.RootElement.ForeColor = System.Drawing.Color.Black;
            this.radRadioButton10.Size = new System.Drawing.Size(183, 16);
            this.radRadioButton10.TabIndex = 3;
            this.radRadioButton10.Tag = "4";
            this.radRadioButton10.Text = "Oficina de Reservación";
            this.radRadioButton10.Click += new System.EventHandler(this.radRadioButton10_Click);
            // 
            // radRadioButton9
            // 
            this.radRadioButton9.ForeColor = System.Drawing.Color.Black;
            this.radRadioButton9.Location = new System.Drawing.Point(16, 65);
            this.radRadioButton9.Name = "radRadioButton9";
            // 
            // 
            // 
            this.radRadioButton9.RootElement.ForeColor = System.Drawing.Color.Black;
            this.radRadioButton9.Size = new System.Drawing.Size(141, 16);
            this.radRadioButton9.TabIndex = 2;
            this.radRadioButton9.Tag = "3";
            this.radRadioButton9.Text = "Casa Matriz";
            this.radRadioButton9.Click += new System.EventHandler(this.radRadioButton9_Click);
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
            this.radRadioButton7.Size = new System.Drawing.Size(183, 14);
            this.radRadioButton7.TabIndex = 0;
            this.radRadioButton7.Tag = "1";
            this.radRadioButton7.Text = "Base de Campismo";
            this.radRadioButton7.Click += new System.EventHandler(this.radRadioButton7_Click);
            // 
            // radLabel3
            // 
            this.radLabel3.Location = new System.Drawing.Point(30, 99);
            this.radLabel3.Name = "radLabel3";
            this.radLabel3.Size = new System.Drawing.Size(60, 18);
            this.radLabel3.TabIndex = 5;
            this.radLabel3.Text = "Instalación";
            // 
            // cbinstalacion
            // 
            this.cbinstalacion.AutoCompleteDisplayMember = "Nombre_Instalacion";
            this.cbinstalacion.AutoCompleteMode = System.Windows.Forms.AutoCompleteMode.Suggest;
            this.cbinstalacion.AutoCompleteValueMember = "id_instalacion";
            this.cbinstalacion.DataSource = this.instalacionesBindingSource;
            this.cbinstalacion.DisplayMember = "Nombre_Instalacion";
            this.cbinstalacion.Location = new System.Drawing.Point(26, 124);
            this.cbinstalacion.Name = "cbinstalacion";
            this.cbinstalacion.NullText = "-- Seleccione --";
            this.cbinstalacion.ShowImageInEditorArea = true;
            this.cbinstalacion.Size = new System.Drawing.Size(193, 20);
            this.cbinstalacion.TabIndex = 6;
            this.cbinstalacion.ValueMember = "id_instalacion";
            // 
            // instalacionesBindingSource
            // 
            this.instalacionesBindingSource.DataMember = "instalaciones";
            this.instalacionesBindingSource.DataSource = this.instalacionesDataSet;
            // 
            // instalacionesDataSet
            // 
            this.instalacionesDataSet.DataSetName = "InstalacionesDataSet";
            this.instalacionesDataSet.SchemaSerializationMode = System.Data.SchemaSerializationMode.IncludeSchema;
            // 
            // btnlocalizar
            // 
            this.btnlocalizar.Location = new System.Drawing.Point(48, 180);
            this.btnlocalizar.Name = "btnlocalizar";
            this.btnlocalizar.Size = new System.Drawing.Size(130, 24);
            this.btnlocalizar.TabIndex = 7;
            this.btnlocalizar.Text = "Localizar";
            this.btnlocalizar.Click += new System.EventHandler(this.btnlocalizar_Click);
            // 
            // provinciasTableAdapter
            // 
            this.provinciasTableAdapter.ClearBeforeFill = true;
            // 
            // cbmunicipios
            // 
            this.cbmunicipios.AutoCompleteDisplayMember = "Nombre_Municipio";
            this.cbmunicipios.AutoCompleteMode = System.Windows.Forms.AutoCompleteMode.Suggest;
            this.cbmunicipios.AutoCompleteValueMember = "idmunicipio";
            this.cbmunicipios.DataSource = this.municipiosBindingSource;
            this.cbmunicipios.DisplayMember = "Nombre_Municipio";
            this.cbmunicipios.Location = new System.Drawing.Point(26, 72);
            this.cbmunicipios.Name = "cbmunicipios";
            this.cbmunicipios.NullText = "-- Seleccione --";
            this.cbmunicipios.ShowImageInEditorArea = true;
            this.cbmunicipios.Size = new System.Drawing.Size(193, 20);
            this.cbmunicipios.TabIndex = 8;
            this.cbmunicipios.ValueMember = "idmunicipio";
            this.cbmunicipios.SelectedIndexChanged += new Telerik.WinControls.UI.Data.PositionChangedEventHandler(this.cbmunicipios_SelectedIndexChanged);
            // 
            // municipiosBindingSource
            // 
            this.municipiosBindingSource.AllowNew = false;
            this.municipiosBindingSource.DataMember = "municipios";
            this.municipiosBindingSource.DataSource = this.municipiosDataSet;
            // 
            // municipiosDataSet
            // 
            this.municipiosDataSet.DataSetName = "MunicipiosDataSet";
            this.municipiosDataSet.SchemaSerializationMode = System.Data.SchemaSerializationMode.IncludeSchema;
            // 
            // municipiosTableAdapter
            // 
            this.municipiosTableAdapter.ClearBeforeFill = true;
            // 
            // instalacionesTableAdapter
            // 
            this.instalacionesTableAdapter.ClearBeforeFill = true;
            // 
            // frmbusqInstalacion
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(513, 244);
            this.Controls.Add(this.cbmunicipios);
            this.Controls.Add(this.btnlocalizar);
            this.Controls.Add(this.cbinstalacion);
            this.Controls.Add(this.radLabel3);
            this.Controls.Add(this.radGroupBox4);
            this.Controls.Add(this.radLabel2);
            this.Controls.Add(this.radLabel1);
            this.Controls.Add(this.cbprovincia);
            this.MaximizeBox = false;
            this.MinimizeBox = false;
            this.Name = "frmbusqInstalacion";
            // 
            // 
            // 
            this.RootElement.ApplyShapeToControl = true;
            this.Text = "Localizar una Instalacion";
            this.ThemeName = "ControlDefault";
            this.Load += new System.EventHandler(this.frmbusqInstalacion_Load);
            ((System.ComponentModel.ISupportInitialize)(this.cbprovincia)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.provinciasBindingSource)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.provinciaDataSetBindingSource)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.provinciaDataSet)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.radLabel1)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.radLabel2)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.radGroupBox4)).EndInit();
            this.radGroupBox4.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)(this.radRadioButton4)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.radRadioButton3)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.radRadioButton2)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.radRadioButton1)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.radRadioButton11)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.radRadioButton10)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.radRadioButton9)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.radRadioButton8)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.radRadioButton7)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.radLabel3)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbinstalacion)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.instalacionesBindingSource)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.instalacionesDataSet)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.btnlocalizar)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbmunicipios)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.municipiosBindingSource)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.municipiosDataSet)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private Telerik.WinControls.UI.RadDropDownList cbprovincia;
        private Telerik.WinControls.UI.RadLabel radLabel1;
        private Telerik.WinControls.UI.RadLabel radLabel2;
        private Telerik.WinControls.UI.RadGroupBox radGroupBox4;
        private Telerik.WinControls.UI.RadRadioButton radRadioButton11;
        private Telerik.WinControls.UI.RadRadioButton radRadioButton10;
        private Telerik.WinControls.UI.RadRadioButton radRadioButton9;
        private Telerik.WinControls.UI.RadRadioButton radRadioButton8;
        private Telerik.WinControls.UI.RadRadioButton radRadioButton7;
        private Telerik.WinControls.UI.RadRadioButton radRadioButton1;
        private Telerik.WinControls.UI.RadLabel radLabel3;
        private Telerik.WinControls.UI.RadDropDownList cbinstalacion;
        private Telerik.WinControls.UI.RadButton btnlocalizar;
        private System.Windows.Forms.BindingSource provinciaDataSetBindingSource;
        private ProvinciaDataSet provinciaDataSet;
        private System.Windows.Forms.BindingSource provinciasBindingSource;
        private ProvinciaDataSetTableAdapters.ProvinciasTableAdapter provinciasTableAdapter;
        private Telerik.WinControls.UI.RadRadioButton radRadioButton2;
        private Telerik.WinControls.UI.RadDropDownList cbmunicipios;
        private MunicipiosDataSet municipiosDataSet;
        private System.Windows.Forms.BindingSource municipiosBindingSource;
        private MunicipiosDataSetTableAdapters.municipiosTableAdapter municipiosTableAdapter;
        private InstalacionesDataSet instalacionesDataSet;
        private System.Windows.Forms.BindingSource instalacionesBindingSource;
        private InstalacionesDataSetTableAdapters.instalacionesTableAdapter instalacionesTableAdapter;
        private Telerik.WinControls.UI.RadRadioButton radRadioButton3;
        private Telerik.WinControls.UI.RadRadioButton radRadioButton4;

    }
}
