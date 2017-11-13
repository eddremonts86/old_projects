namespace SIGCampismo
{
    partial class frmEEmp
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
            this.radPanel1 = new Telerik.WinControls.UI.RadPanel();
            this.btnmostrar = new Telerik.WinControls.UI.RadButton();
            this.radGroupBox1 = new Telerik.WinControls.UI.RadGroupBox();
            this.radEmp1 = new Telerik.WinControls.UI.RadListControl();
            this.radEmp2 = new Telerik.WinControls.UI.RadListControl();
            this.radButton2 = new Telerik.WinControls.UI.RadButton();
            this.radButton3 = new Telerik.WinControls.UI.RadButton();
            this.radLabel2 = new Telerik.WinControls.UI.RadLabel();
            this.radLabel1 = new Telerik.WinControls.UI.RadLabel();
            this.radall = new Telerik.WinControls.UI.RadCheckBox();
            this.radAIns = new Telerik.WinControls.UI.RadCheckBox();
            this.btnimprimir = new Telerik.WinControls.UI.RadButton();
            this.radInstalaciones = new Telerik.WinControls.UI.RadDropDownList();
            this.instalacionesBindingSource1 = new System.Windows.Forms.BindingSource(this.components);
            this.instalacionesDataSet = new SIGCampismo.InstalacionesDataSet();
            this.radEmpresas = new Telerik.WinControls.UI.RadDropDownList();
            this.instalacionesBindingSource2 = new System.Windows.Forms.BindingSource(this.components);
            this.instDataSet = new SIGCampismo.InstDataSet();
            this.equipoBindingSource = new System.Windows.Forms.BindingSource(this.components);
            this.equipoDataSet = new SIGCampismo.EquipoDataSet();
            this.instalacionesBindingSource = new System.Windows.Forms.BindingSource(this.components);
            this.instalacionesTableAdapter = new SIGCampismo.InstalacionesDataSetTableAdapters.instalacionesTableAdapter();
            this.radEquipos = new Telerik.WinControls.UI.RadGridView();
            this.provinciaDataSet = new SIGCampismo.ProvinciaDataSet();
            this.provinciasBindingSource = new System.Windows.Forms.BindingSource(this.components);
            this.provinciasTableAdapter = new SIGCampismo.ProvinciaDataSetTableAdapters.ProvinciasTableAdapter();
            this.instalacionesTableAdapter1 = new SIGCampismo.InstDataSetTableAdapters.instalacionesTableAdapter();
            this.BackgroundWorker = new System.ComponentModel.BackgroundWorker();
            this.equipoTableAdapter = new SIGCampismo.EquipoDataSetTableAdapters.equipoTableAdapter();
            ((System.ComponentModel.ISupportInitialize)(this.radPanel1)).BeginInit();
            this.radPanel1.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.btnmostrar)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.radGroupBox1)).BeginInit();
            this.radGroupBox1.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.radEmp1)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.radEmp2)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.radButton2)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.radButton3)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.radLabel2)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.radLabel1)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.radall)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.radAIns)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.btnimprimir)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.radInstalaciones)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.instalacionesBindingSource1)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.instalacionesDataSet)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.radEmpresas)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.instalacionesBindingSource2)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.instDataSet)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.equipoBindingSource)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.equipoDataSet)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.instalacionesBindingSource)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.radEquipos)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.provinciaDataSet)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.provinciasBindingSource)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this)).BeginInit();
            this.SuspendLayout();
            // 
            // radPanel1
            // 
            this.radPanel1.Controls.Add(this.btnmostrar);
            this.radPanel1.Controls.Add(this.radGroupBox1);
            this.radPanel1.Controls.Add(this.radLabel2);
            this.radPanel1.Controls.Add(this.radLabel1);
            this.radPanel1.Controls.Add(this.radall);
            this.radPanel1.Controls.Add(this.radAIns);
            this.radPanel1.Controls.Add(this.btnimprimir);
            this.radPanel1.Controls.Add(this.radInstalaciones);
            this.radPanel1.Controls.Add(this.radEmpresas);
            this.radPanel1.Dock = System.Windows.Forms.DockStyle.Left;
            this.radPanel1.Location = new System.Drawing.Point(0, 0);
            this.radPanel1.Name = "radPanel1";
            this.radPanel1.Size = new System.Drawing.Size(228, 481);
            this.radPanel1.TabIndex = 0;
            // 
            // btnmostrar
            // 
            this.btnmostrar.Location = new System.Drawing.Point(12, 425);
            this.btnmostrar.Name = "btnmostrar";
            this.btnmostrar.Size = new System.Drawing.Size(98, 20);
            this.btnmostrar.TabIndex = 3;
            this.btnmostrar.Text = "Mostrar";
            this.btnmostrar.Click += new System.EventHandler(this.radButton4_Click);
            // 
            // radGroupBox1
            // 
            this.radGroupBox1.AccessibleRole = System.Windows.Forms.AccessibleRole.Grouping;
            this.radGroupBox1.Controls.Add(this.radEmp1);
            this.radGroupBox1.Controls.Add(this.radEmp2);
            this.radGroupBox1.Controls.Add(this.radButton2);
            this.radGroupBox1.Controls.Add(this.radButton3);
            this.radGroupBox1.FooterImageIndex = -1;
            this.radGroupBox1.FooterImageKey = "";
            this.radGroupBox1.HeaderImageIndex = -1;
            this.radGroupBox1.HeaderImageKey = "";
            this.radGroupBox1.HeaderMargin = new System.Windows.Forms.Padding(0);
            this.radGroupBox1.HeaderText = "Equipos";
            this.radGroupBox1.Location = new System.Drawing.Point(12, 152);
            this.radGroupBox1.Name = "radGroupBox1";
            this.radGroupBox1.Padding = new System.Windows.Forms.Padding(10, 20, 10, 10);
            // 
            // 
            // 
            this.radGroupBox1.RootElement.Padding = new System.Windows.Forms.Padding(10, 20, 10, 10);
            this.radGroupBox1.Size = new System.Drawing.Size(207, 261);
            this.radGroupBox1.TabIndex = 12;
            this.radGroupBox1.Text = "Equipos";
            // 
            // radEmp1
            // 
            this.radEmp1.CaseSensitiveSort = true;
            this.radEmp1.ItemHeight = 18;
            this.radEmp1.Location = new System.Drawing.Point(13, 23);
            this.radEmp1.Name = "radEmp1";
            this.radEmp1.Size = new System.Drawing.Size(181, 95);
            this.radEmp1.TabIndex = 2;
            this.radEmp1.Text = "radListControl2";
            // 
            // radEmp2
            // 
            this.radEmp2.CaseSensitiveSort = true;
            this.radEmp2.ItemHeight = 18;
            this.radEmp2.Location = new System.Drawing.Point(13, 154);
            this.radEmp2.Name = "radEmp2";
            this.radEmp2.Size = new System.Drawing.Size(181, 95);
            this.radEmp2.TabIndex = 0;
            this.radEmp2.Text = "radListControl1";
            // 
            // radButton2
            // 
            this.radButton2.Location = new System.Drawing.Point(54, 124);
            this.radButton2.Name = "radButton2";
            this.radButton2.Size = new System.Drawing.Size(14, 24);
            this.radButton2.TabIndex = 3;
            this.radButton2.Text = "v";
            this.radButton2.Click += new System.EventHandler(this.radButton2_Click);
            // 
            // radButton3
            // 
            this.radButton3.Location = new System.Drawing.Point(120, 124);
            this.radButton3.Name = "radButton3";
            this.radButton3.Size = new System.Drawing.Size(14, 24);
            this.radButton3.TabIndex = 4;
            this.radButton3.Text = "^";
            this.radButton3.Click += new System.EventHandler(this.radButton3_Click);
            // 
            // radLabel2
            // 
            this.radLabel2.Location = new System.Drawing.Point(10, 101);
            this.radLabel2.Name = "radLabel2";
            this.radLabel2.Size = new System.Drawing.Size(70, 18);
            this.radLabel2.TabIndex = 7;
            this.radLabel2.Text = "Instalaciones";
            // 
            // radLabel1
            // 
            this.radLabel1.Location = new System.Drawing.Point(12, 51);
            this.radLabel1.Name = "radLabel1";
            this.radLabel1.Size = new System.Drawing.Size(54, 18);
            this.radLabel1.TabIndex = 6;
            this.radLabel1.Text = "Empresas";
            // 
            // radall
            // 
            this.radall.Location = new System.Drawing.Point(12, 27);
            this.radall.Name = "radall";
            this.radall.Size = new System.Drawing.Size(68, 18);
            this.radall.TabIndex = 5;
            this.radall.Text = "Total País";
            this.radall.ToggleStateChanged += new Telerik.WinControls.UI.StateChangedEventHandler(this.radCheckBox3_ToggleStateChanged);
            // 
            // radAIns
            // 
            this.radAIns.Location = new System.Drawing.Point(12, 3);
            this.radAIns.Name = "radAIns";
            this.radAIns.Size = new System.Drawing.Size(134, 18);
            this.radAIns.TabIndex = 3;
            this.radAIns.Text = "Todas las Instalaciones";
            // 
            // btnimprimir
            // 
            this.btnimprimir.Location = new System.Drawing.Point(121, 425);
            this.btnimprimir.Name = "btnimprimir";
            this.btnimprimir.Size = new System.Drawing.Size(98, 20);
            this.btnimprimir.TabIndex = 2;
            this.btnimprimir.Text = "Imprimir";
            this.btnimprimir.Click += new System.EventHandler(this.btnimprimir_Click);
            // 
            // radInstalaciones
            // 
            this.radInstalaciones.AutoCompleteDisplayMember = "Nombre_Instalacion";
            this.radInstalaciones.AutoCompleteValueMember = "id_instalacion";
            this.radInstalaciones.DataSource = this.instalacionesBindingSource1;
            this.radInstalaciones.DisplayMember = "Nombre_Instalacion";
            this.radInstalaciones.Location = new System.Drawing.Point(12, 125);
            this.radInstalaciones.Name = "radInstalaciones";
            this.radInstalaciones.ShowImageInEditorArea = true;
            this.radInstalaciones.Size = new System.Drawing.Size(194, 20);
            this.radInstalaciones.TabIndex = 1;
            this.radInstalaciones.ValueMember = "id_instalacion";
            this.radInstalaciones.SelectedValueChanged += new System.EventHandler(this.radInstalaciones_SelectedValueChanged);
            // 
            // instalacionesBindingSource1
            // 
            this.instalacionesBindingSource1.DataMember = "instalaciones";
            this.instalacionesBindingSource1.DataSource = this.instalacionesDataSet;
            // 
            // instalacionesDataSet
            // 
            this.instalacionesDataSet.DataSetName = "InstalacionesDataSet";
            this.instalacionesDataSet.SchemaSerializationMode = System.Data.SchemaSerializationMode.IncludeSchema;
            // 
            // radEmpresas
            // 
            this.radEmpresas.AutoCompleteDisplayMember = "Nombre_Instalacion";
            this.radEmpresas.AutoCompleteValueMember = "id_instalacion";
            this.radEmpresas.DataSource = this.instalacionesBindingSource2;
            this.radEmpresas.DisplayMember = "Nombre_Instalacion";
            this.radEmpresas.Location = new System.Drawing.Point(12, 75);
            this.radEmpresas.Name = "radEmpresas";
            this.radEmpresas.ShowImageInEditorArea = true;
            this.radEmpresas.Size = new System.Drawing.Size(194, 20);
            this.radEmpresas.TabIndex = 0;
            this.radEmpresas.ValueMember = "id_instalacion";
            this.radEmpresas.SelectedValueChanged += new System.EventHandler(this.radEmpresas_SelectedValueChanged);
            // 
            // instalacionesBindingSource2
            // 
            this.instalacionesBindingSource2.DataMember = "instalaciones";
            this.instalacionesBindingSource2.DataSource = this.instDataSet;
            // 
            // instDataSet
            // 
            this.instDataSet.DataSetName = "InstDataSet";
            this.instDataSet.SchemaSerializationMode = System.Data.SchemaSerializationMode.IncludeSchema;
            // 
            // equipoBindingSource
            // 
            this.equipoBindingSource.DataMember = "equipo";
            this.equipoBindingSource.DataSource = this.equipoDataSet;
            // 
            // equipoDataSet
            // 
            this.equipoDataSet.DataSetName = "EquipoDataSet";
            this.equipoDataSet.SchemaSerializationMode = System.Data.SchemaSerializationMode.IncludeSchema;
            // 
            // instalacionesBindingSource
            // 
            this.instalacionesBindingSource.DataMember = "instalaciones";
            this.instalacionesBindingSource.DataSource = this.instalacionesDataSet;
            // 
            // instalacionesTableAdapter
            // 
            this.instalacionesTableAdapter.ClearBeforeFill = true;
            // 
            // radEquipos
            // 
            this.radEquipos.AutoGenerateHierarchy = true;
            this.radEquipos.Dock = System.Windows.Forms.DockStyle.Fill;
            this.radEquipos.Location = new System.Drawing.Point(228, 0);
            // 
            // radEquipos
            // 
            this.radEquipos.MasterTemplate.AutoSizeColumnsMode = Telerik.WinControls.UI.GridViewAutoSizeColumnsMode.Fill;
            this.radEquipos.Name = "radEquipos";
            this.radEquipos.Size = new System.Drawing.Size(579, 481);
            this.radEquipos.TabIndex = 1;
            // 
            // provinciaDataSet
            // 
            this.provinciaDataSet.DataSetName = "ProvinciaDataSet";
            this.provinciaDataSet.SchemaSerializationMode = System.Data.SchemaSerializationMode.IncludeSchema;
            // 
            // provinciasBindingSource
            // 
            this.provinciasBindingSource.DataMember = "Provincias";
            this.provinciasBindingSource.DataSource = this.provinciaDataSet;
            // 
            // provinciasTableAdapter
            // 
            this.provinciasTableAdapter.ClearBeforeFill = true;
            // 
            // instalacionesTableAdapter1
            // 
            this.instalacionesTableAdapter1.ClearBeforeFill = true;
            // 
            // BackgroundWorker
            // 
            this.BackgroundWorker.DoWork += new System.ComponentModel.DoWorkEventHandler(this.BackgroundWorker_DoWork);
            this.BackgroundWorker.RunWorkerCompleted += new System.ComponentModel.RunWorkerCompletedEventHandler(this.BackgroundWorker_RunWorkerCompleted);
            // 
            // equipoTableAdapter
            // 
            this.equipoTableAdapter.ClearBeforeFill = true;
            // 
            // frmEEmp
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(807, 481);
            this.Controls.Add(this.radEquipos);
            this.Controls.Add(this.radPanel1);
            this.Name = "frmEEmp";
            // 
            // 
            // 
            this.RootElement.ApplyShapeToControl = true;
            this.Text = "Reporte de Equipos por Empresa";
            this.ThemeName = "ControlDefault";
            this.WindowState = System.Windows.Forms.FormWindowState.Maximized;
            this.Load += new System.EventHandler(this.frmEEmp_Load);
            ((System.ComponentModel.ISupportInitialize)(this.radPanel1)).EndInit();
            this.radPanel1.ResumeLayout(false);
            this.radPanel1.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)(this.btnmostrar)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.radGroupBox1)).EndInit();
            this.radGroupBox1.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)(this.radEmp1)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.radEmp2)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.radButton2)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.radButton3)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.radLabel2)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.radLabel1)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.radall)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.radAIns)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.btnimprimir)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.radInstalaciones)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.instalacionesBindingSource1)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.instalacionesDataSet)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.radEmpresas)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.instalacionesBindingSource2)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.instDataSet)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.equipoBindingSource)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.equipoDataSet)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.instalacionesBindingSource)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.radEquipos)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.provinciaDataSet)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.provinciasBindingSource)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this)).EndInit();
            this.ResumeLayout(false);

        }

        #endregion

        private Telerik.WinControls.UI.RadPanel radPanel1;
        private Telerik.WinControls.UI.RadDropDownList radInstalaciones;
        private Telerik.WinControls.UI.RadDropDownList radEmpresas;
        private InstalacionesDataSet instalacionesDataSet;
        private System.Windows.Forms.BindingSource instalacionesBindingSource;
        private InstalacionesDataSetTableAdapters.instalacionesTableAdapter instalacionesTableAdapter;
        private Telerik.WinControls.UI.RadButton btnimprimir;
        private System.Windows.Forms.BindingSource instalacionesBindingSource1;
        private Telerik.WinControls.UI.RadGridView radEquipos;
        private Telerik.WinControls.UI.RadCheckBox radall;
        private ProvinciaDataSet provinciaDataSet;
        private System.Windows.Forms.BindingSource provinciasBindingSource;
        private ProvinciaDataSetTableAdapters.ProvinciasTableAdapter provinciasTableAdapter;
        private InstDataSet instDataSet;
        private System.Windows.Forms.BindingSource instalacionesBindingSource2;
        private InstDataSetTableAdapters.instalacionesTableAdapter instalacionesTableAdapter1;
        private Telerik.WinControls.UI.RadLabel radLabel2;
        private Telerik.WinControls.UI.RadLabel radLabel1;
        private Telerik.WinControls.UI.RadGroupBox radGroupBox1;
        private Telerik.WinControls.UI.RadListControl radEmp1;
        private Telerik.WinControls.UI.RadListControl radEmp2;
        private Telerik.WinControls.UI.RadButton radButton2;
        private Telerik.WinControls.UI.RadButton radButton3;
        private System.ComponentModel.BackgroundWorker BackgroundWorker;
        private EquipoDataSet equipoDataSet;
        private System.Windows.Forms.BindingSource equipoBindingSource;
        private EquipoDataSetTableAdapters.equipoTableAdapter equipoTableAdapter;
        private Telerik.WinControls.UI.RadCheckBox radAIns;
        private Telerik.WinControls.UI.RadButton btnmostrar;
    }
}
