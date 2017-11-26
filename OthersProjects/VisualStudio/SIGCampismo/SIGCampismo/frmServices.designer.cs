namespace SIGCampismo
{
    partial class frmServices
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
            this.radInstalaciones = new Telerik.WinControls.UI.RadDropDownList();
            this.instalacionesBindingSource1 = new System.Windows.Forms.BindingSource(this.components);
            this.instDataSet = new SIGCampismo.InstDataSet();
            this.instalacionesBindingSource = new System.Windows.Forms.BindingSource(this.components);
            this.instalacionesDataSet = new SIGCampismo.InstalacionesDataSet();
            this.radLabel2 = new Telerik.WinControls.UI.RadLabel();
            this.radLabel1 = new Telerik.WinControls.UI.RadLabel();
            this.radall = new Telerik.WinControls.UI.RadCheckBox();
            this.radAIns = new Telerik.WinControls.UI.RadCheckBox();
            this.radGroupBox2 = new Telerik.WinControls.UI.RadGroupBox();
            this.radServ1 = new Telerik.WinControls.UI.RadListControl();
            this.radServ2 = new Telerik.WinControls.UI.RadListControl();
            this.radButton4 = new Telerik.WinControls.UI.RadButton();
            this.radButton3 = new Telerik.WinControls.UI.RadButton();
            this.btnmostrar = new Telerik.WinControls.UI.RadButton();
            this.btnimprimir = new Telerik.WinControls.UI.RadButton();
            this.radCampismo = new Telerik.WinControls.UI.RadGridView();
            this.BackgroundWorker = new System.ComponentModel.BackgroundWorker();
            this.servicioDataSet = new SIGCampismo.servicioDataSet();
            this.servicioBindingSource = new System.Windows.Forms.BindingSource(this.components);
            this.servicioTableAdapter = new SIGCampismo.servicioDataSetTableAdapters.ServicioTableAdapter();
            this.instalacionesTableAdapter = new SIGCampismo.InstalacionesDataSetTableAdapters.instalacionesTableAdapter();
            this.instalacionesTableAdapter1 = new SIGCampismo.InstDataSetTableAdapters.instalacionesTableAdapter();
            this.radEmpresas = new Telerik.WinControls.UI.RadDropDownList();
            ((System.ComponentModel.ISupportInitialize)(this.radPanel1)).BeginInit();
            this.radPanel1.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.radInstalaciones)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.instalacionesBindingSource1)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.instDataSet)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.instalacionesBindingSource)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.instalacionesDataSet)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.radLabel2)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.radLabel1)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.radall)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.radAIns)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.radGroupBox2)).BeginInit();
            this.radGroupBox2.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.radServ1)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.radServ2)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.radButton4)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.radButton3)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.btnmostrar)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.btnimprimir)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.radCampismo)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.servicioDataSet)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.servicioBindingSource)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.radEmpresas)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this)).BeginInit();
            this.SuspendLayout();
            // 
            // radPanel1
            // 
            this.radPanel1.Controls.Add(this.radEmpresas);
            this.radPanel1.Controls.Add(this.radInstalaciones);
            this.radPanel1.Controls.Add(this.radLabel2);
            this.radPanel1.Controls.Add(this.radLabel1);
            this.radPanel1.Controls.Add(this.radall);
            this.radPanel1.Controls.Add(this.radAIns);
            this.radPanel1.Controls.Add(this.radGroupBox2);
            this.radPanel1.Controls.Add(this.btnmostrar);
            this.radPanel1.Controls.Add(this.btnimprimir);
            this.radPanel1.Dock = System.Windows.Forms.DockStyle.Left;
            this.radPanel1.Location = new System.Drawing.Point(0, 0);
            this.radPanel1.Name = "radPanel1";
            this.radPanel1.Size = new System.Drawing.Size(280, 580);
            this.radPanel1.TabIndex = 0;
            // 
            // radInstalaciones
            // 
            this.radInstalaciones.AutoCompleteDisplayMember = "Nombre_Instalacion";
            this.radInstalaciones.AutoCompleteValueMember = "id_instalacion";
            this.radInstalaciones.DataSource = this.instalacionesBindingSource1;
            this.radInstalaciones.DisplayMember = "Nombre_Instalacion";
            this.radInstalaciones.Location = new System.Drawing.Point(22, 135);
            this.radInstalaciones.Name = "radInstalaciones";
            this.radInstalaciones.ShowImageInEditorArea = true;
            this.radInstalaciones.Size = new System.Drawing.Size(236, 20);
            this.radInstalaciones.TabIndex = 20;
            this.radInstalaciones.ValueMember = "id_instalacion";
            // 
            // instalacionesBindingSource1
            // 
            this.instalacionesBindingSource1.DataMember = "instalaciones";
            this.instalacionesBindingSource1.DataSource = this.instDataSet;
            // 
            // instDataSet
            // 
            this.instDataSet.DataSetName = "InstDataSet";
            this.instDataSet.SchemaSerializationMode = System.Data.SchemaSerializationMode.IncludeSchema;
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
            // radLabel2
            // 
            this.radLabel2.Location = new System.Drawing.Point(9, 110);
            this.radLabel2.Name = "radLabel2";
            this.radLabel2.Size = new System.Drawing.Size(70, 18);
            this.radLabel2.TabIndex = 18;
            this.radLabel2.Text = "Instalaciones";
            // 
            // radLabel1
            // 
            this.radLabel1.Location = new System.Drawing.Point(11, 60);
            this.radLabel1.Name = "radLabel1";
            this.radLabel1.Size = new System.Drawing.Size(54, 18);
            this.radLabel1.TabIndex = 17;
            this.radLabel1.Text = "Empresas";
            // 
            // radall
            // 
            this.radall.Location = new System.Drawing.Point(11, 36);
            this.radall.Name = "radall";
            this.radall.Size = new System.Drawing.Size(68, 18);
            this.radall.TabIndex = 16;
            this.radall.Text = "Total País";
            this.radall.ToggleStateChanged += new Telerik.WinControls.UI.StateChangedEventHandler(this.radall_ToggleStateChanged);
            // 
            // radAIns
            // 
            this.radAIns.Location = new System.Drawing.Point(11, 12);
            this.radAIns.Name = "radAIns";
            this.radAIns.Size = new System.Drawing.Size(134, 18);
            this.radAIns.TabIndex = 15;
            this.radAIns.Text = "Todas las Instalaciones";
            // 
            // radGroupBox2
            // 
            this.radGroupBox2.AccessibleRole = System.Windows.Forms.AccessibleRole.Grouping;
            this.radGroupBox2.Controls.Add(this.radServ1);
            this.radGroupBox2.Controls.Add(this.radServ2);
            this.radGroupBox2.Controls.Add(this.radButton4);
            this.radGroupBox2.Controls.Add(this.radButton3);
            this.radGroupBox2.FooterImageIndex = -1;
            this.radGroupBox2.FooterImageKey = "";
            this.radGroupBox2.HeaderImageIndex = -1;
            this.radGroupBox2.HeaderImageKey = "";
            this.radGroupBox2.HeaderMargin = new System.Windows.Forms.Padding(0);
            this.radGroupBox2.HeaderText = "Servicios";
            this.radGroupBox2.Location = new System.Drawing.Point(9, 160);
            this.radGroupBox2.Name = "radGroupBox2";
            this.radGroupBox2.Padding = new System.Windows.Forms.Padding(10, 20, 10, 10);
            // 
            // 
            // 
            this.radGroupBox2.RootElement.Padding = new System.Windows.Forms.Padding(10, 20, 10, 10);
            this.radGroupBox2.Size = new System.Drawing.Size(262, 259);
            this.radGroupBox2.TabIndex = 12;
            this.radGroupBox2.Text = "Servicios";
            // 
            // radServ1
            // 
            this.radServ1.CaseSensitiveSort = true;
            this.radServ1.ItemHeight = 18;
            this.radServ1.Location = new System.Drawing.Point(13, 23);
            this.radServ1.Name = "radServ1";
            this.radServ1.Size = new System.Drawing.Size(236, 95);
            this.radServ1.TabIndex = 9;
            this.radServ1.Text = "radListControl1";
            // 
            // radServ2
            // 
            this.radServ2.CaseSensitiveSort = true;
            this.radServ2.ItemHeight = 18;
            this.radServ2.Location = new System.Drawing.Point(13, 154);
            this.radServ2.Name = "radServ2";
            this.radServ2.Size = new System.Drawing.Size(238, 95);
            this.radServ2.TabIndex = 5;
            this.radServ2.Text = "radListControl4";
            // 
            // radButton4
            // 
            this.radButton4.Location = new System.Drawing.Point(69, 124);
            this.radButton4.Name = "radButton4";
            this.radButton4.Size = new System.Drawing.Size(14, 24);
            this.radButton4.TabIndex = 7;
            this.radButton4.Text = "V";
            this.radButton4.Click += new System.EventHandler(this.radButton4_Click);
            // 
            // radButton3
            // 
            this.radButton3.Location = new System.Drawing.Point(162, 124);
            this.radButton3.Name = "radButton3";
            this.radButton3.Size = new System.Drawing.Size(14, 24);
            this.radButton3.TabIndex = 8;
            this.radButton3.Text = "^";
            this.radButton3.Click += new System.EventHandler(this.radButton3_Click);
            // 
            // btnmostrar
            // 
            this.btnmostrar.Location = new System.Drawing.Point(9, 425);
            this.btnmostrar.Name = "btnmostrar";
            this.btnmostrar.Size = new System.Drawing.Size(120, 24);
            this.btnmostrar.TabIndex = 10;
            this.btnmostrar.Text = "Mostrar";
            this.btnmostrar.Click += new System.EventHandler(this.radButton6_Click);
            // 
            // btnimprimir
            // 
            this.btnimprimir.Location = new System.Drawing.Point(140, 425);
            this.btnimprimir.Name = "btnimprimir";
            this.btnimprimir.Size = new System.Drawing.Size(120, 24);
            this.btnimprimir.TabIndex = 9;
            this.btnimprimir.Text = "Imprimir";
            this.btnimprimir.Click += new System.EventHandler(this.radButton5_Click);
            // 
            // radCampismo
            // 
            this.radCampismo.AutoGenerateHierarchy = true;
            this.radCampismo.Dock = System.Windows.Forms.DockStyle.Fill;
            this.radCampismo.Location = new System.Drawing.Point(280, 0);
            // 
            // radCampismo
            // 
            this.radCampismo.MasterTemplate.AllowAddNewRow = false;
            this.radCampismo.MasterTemplate.AllowDeleteRow = false;
            this.radCampismo.MasterTemplate.AllowDragToGroup = false;
            this.radCampismo.MasterTemplate.AllowEditRow = false;
            this.radCampismo.MasterTemplate.AutoSizeColumnsMode = Telerik.WinControls.UI.GridViewAutoSizeColumnsMode.Fill;
            this.radCampismo.MasterTemplate.EnableFiltering = true;
            this.radCampismo.Name = "radCampismo";
            this.radCampismo.ReadOnly = true;
            this.radCampismo.ShowGroupPanel = false;
            this.radCampismo.Size = new System.Drawing.Size(518, 580);
            this.radCampismo.TabIndex = 1;
            this.radCampismo.Text = "radGridView1";
            this.radCampismo.Click += new System.EventHandler(this.radCampismo_Click);
            // 
            // BackgroundWorker
            // 
            this.BackgroundWorker.DoWork += new System.ComponentModel.DoWorkEventHandler(this.BackgroundWorker_DoWork);
            this.BackgroundWorker.RunWorkerCompleted += new System.ComponentModel.RunWorkerCompletedEventHandler(this.BackgroundWorker_RunWorkerCompleted);
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
            // instalacionesTableAdapter
            // 
            this.instalacionesTableAdapter.ClearBeforeFill = true;
            // 
            // instalacionesTableAdapter1
            // 
            this.instalacionesTableAdapter1.ClearBeforeFill = true;
            // 
            // radEmpresas
            // 
            this.radEmpresas.AutoCompleteDisplayMember = "Nombre_Instalacion";
            this.radEmpresas.DataSource = this.instalacionesBindingSource;
            this.radEmpresas.DisplayMember = "Nombre_Instalacion";
            this.radEmpresas.Location = new System.Drawing.Point(22, 84);
            this.radEmpresas.Name = "radEmpresas";
            this.radEmpresas.ShowImageInEditorArea = true;
            this.radEmpresas.Size = new System.Drawing.Size(236, 20);
            this.radEmpresas.TabIndex = 21;
            this.radEmpresas.SelectedValueChanged += new System.EventHandler(this.radDropDownList1_SelectedValueChanged);
            // 
            // frmServices
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(798, 580);
            this.Controls.Add(this.radCampismo);
            this.Controls.Add(this.radPanel1);
            this.Name = "frmServices";
            // 
            // 
            // 
            this.RootElement.ApplyShapeToControl = true;
            this.Text = "Listado de Instalaciones por Servicio";
            this.ThemeName = "ControlDefault";
            this.WindowState = System.Windows.Forms.FormWindowState.Maximized;
            this.Load += new System.EventHandler(this.frmServices_Load);
            ((System.ComponentModel.ISupportInitialize)(this.radPanel1)).EndInit();
            this.radPanel1.ResumeLayout(false);
            this.radPanel1.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)(this.radInstalaciones)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.instalacionesBindingSource1)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.instDataSet)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.instalacionesBindingSource)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.instalacionesDataSet)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.radLabel2)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.radLabel1)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.radall)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.radAIns)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.radGroupBox2)).EndInit();
            this.radGroupBox2.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)(this.radServ1)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.radServ2)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.radButton4)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.radButton3)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.btnmostrar)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.btnimprimir)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.radCampismo)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.servicioDataSet)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.servicioBindingSource)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.radEmpresas)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this)).EndInit();
            this.ResumeLayout(false);

        }

        #endregion

        private Telerik.WinControls.UI.RadPanel radPanel1;
        private Telerik.WinControls.UI.RadButton radButton3;
        private Telerik.WinControls.UI.RadButton radButton4;
        private Telerik.WinControls.UI.RadListControl radServ2;
        private Telerik.WinControls.UI.RadGridView radCampismo;
        private Telerik.WinControls.UI.RadButton btnimprimir;
        private Telerik.WinControls.UI.RadButton btnmostrar;
        private Telerik.WinControls.UI.RadGroupBox radGroupBox2;
        private System.ComponentModel.BackgroundWorker BackgroundWorker;
        private Telerik.WinControls.UI.RadLabel radLabel2;
        private Telerik.WinControls.UI.RadLabel radLabel1;
        private Telerik.WinControls.UI.RadCheckBox radall;
        private Telerik.WinControls.UI.RadCheckBox radAIns;
        private Telerik.WinControls.UI.RadListControl radServ1;
        private Telerik.WinControls.UI.RadDropDownList radInstalaciones;
        private servicioDataSet servicioDataSet;
        private System.Windows.Forms.BindingSource servicioBindingSource;
        private servicioDataSetTableAdapters.ServicioTableAdapter servicioTableAdapter;
        private InstalacionesDataSet instalacionesDataSet;
        private System.Windows.Forms.BindingSource instalacionesBindingSource;
        private InstalacionesDataSetTableAdapters.instalacionesTableAdapter instalacionesTableAdapter;
        private InstDataSet instDataSet;
        private System.Windows.Forms.BindingSource instalacionesBindingSource1;
        private InstDataSetTableAdapters.instalacionesTableAdapter instalacionesTableAdapter1;
        private Telerik.WinControls.UI.RadDropDownList radEmpresas;
    }
}
