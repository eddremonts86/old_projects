namespace SIGCampismo
{
    partial class frmCatalog
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
            Microsoft.Reporting.WinForms.ReportDataSource reportDataSource1 = new Microsoft.Reporting.WinForms.ReportDataSource();
            Microsoft.Reporting.WinForms.ReportDataSource reportDataSource2 = new Microsoft.Reporting.WinForms.ReportDataSource();
            Microsoft.Reporting.WinForms.ReportDataSource reportDataSource3 = new Microsoft.Reporting.WinForms.ReportDataSource();
            Microsoft.Reporting.WinForms.ReportDataSource reportDataSource4 = new Microsoft.Reporting.WinForms.ReportDataSource();
            this.instalacionesBindingSource = new System.Windows.Forms.BindingSource(this.components);
            this.instalacionesDataSet = new SIGCampismo.InstalacionesDataSet();
            this.servicioBindingSource = new System.Windows.Forms.BindingSource(this.components);
            this.servicioDataSet = new SIGCampismo.servicioDataSet();
            this.equipoBindingSource = new System.Windows.Forms.BindingSource(this.components);
            this.equipoDataSet = new SIGCampismo.EquipoDataSet();
            this.tipocabannaBindingSource = new System.Windows.Forms.BindingSource(this.components);
            this.cabDataSet = new SIGCampismo.CabDataSet();
            this.reportViewer1 = new Microsoft.Reporting.WinForms.ReportViewer();
            this.instalacionesTableAdapter = new SIGCampismo.InstalacionesDataSetTableAdapters.instalacionesTableAdapter();
            this.servicioTableAdapter = new SIGCampismo.servicioDataSetTableAdapters.ServicioTableAdapter();
            this.equipoTableAdapter = new SIGCampismo.EquipoDataSetTableAdapters.equipoTableAdapter();
            this.tipo_cabannaTableAdapter = new SIGCampismo.CabDataSetTableAdapters.tipo_cabannaTableAdapter();
            ((System.ComponentModel.ISupportInitialize)(this.instalacionesBindingSource)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.instalacionesDataSet)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.servicioBindingSource)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.servicioDataSet)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.equipoBindingSource)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.equipoDataSet)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.tipocabannaBindingSource)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cabDataSet)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this)).BeginInit();
            this.SuspendLayout();
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
            // servicioBindingSource
            // 
            this.servicioBindingSource.DataMember = "Servicio";
            this.servicioBindingSource.DataSource = this.servicioDataSet;
            // 
            // servicioDataSet
            // 
            this.servicioDataSet.DataSetName = "servicioDataSet";
            this.servicioDataSet.SchemaSerializationMode = System.Data.SchemaSerializationMode.IncludeSchema;
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
            // tipocabannaBindingSource
            // 
            this.tipocabannaBindingSource.DataMember = "tipo_cabanna";
            this.tipocabannaBindingSource.DataSource = this.cabDataSet;
            // 
            // cabDataSet
            // 
            this.cabDataSet.DataSetName = "CabDataSet";
            this.cabDataSet.SchemaSerializationMode = System.Data.SchemaSerializationMode.IncludeSchema;
            // 
            // reportViewer1
            // 
            this.reportViewer1.Dock = System.Windows.Forms.DockStyle.Fill;
            reportDataSource1.Name = "DataSet1";
            reportDataSource1.Value = this.instalacionesBindingSource;
            reportDataSource2.Name = "DataSet2";
            reportDataSource2.Value = this.servicioBindingSource;
            reportDataSource3.Name = "DataSet3";
            reportDataSource3.Value = this.equipoBindingSource;
            reportDataSource4.Name = "DataSet4";
            reportDataSource4.Value = this.tipocabannaBindingSource;
            this.reportViewer1.LocalReport.DataSources.Add(reportDataSource1);
            this.reportViewer1.LocalReport.DataSources.Add(reportDataSource2);
            this.reportViewer1.LocalReport.DataSources.Add(reportDataSource3);
            this.reportViewer1.LocalReport.DataSources.Add(reportDataSource4);
            this.reportViewer1.LocalReport.EnableExternalImages = true;
            this.reportViewer1.LocalReport.ReportEmbeddedResource = "SIGCampismo.Reportes.ReporteEmp.rdlc";
            this.reportViewer1.Location = new System.Drawing.Point(0, 0);
            this.reportViewer1.Name = "reportViewer1";
            this.reportViewer1.Size = new System.Drawing.Size(519, 395);
            this.reportViewer1.TabIndex = 0;
            // 
            // instalacionesTableAdapter
            // 
            this.instalacionesTableAdapter.ClearBeforeFill = true;
            // 
            // servicioTableAdapter
            // 
            this.servicioTableAdapter.ClearBeforeFill = true;
            // 
            // equipoTableAdapter
            // 
            this.equipoTableAdapter.ClearBeforeFill = true;
            // 
            // tipo_cabannaTableAdapter
            // 
            this.tipo_cabannaTableAdapter.ClearBeforeFill = true;
            // 
            // frmCatalog
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(519, 395);
            this.Controls.Add(this.reportViewer1);
            this.Name = "frmCatalog";
            // 
            // 
            // 
            this.RootElement.ApplyShapeToControl = true;
            this.Text = "Catálogo";
            this.ThemeName = "ControlDefault";
            this.WindowState = System.Windows.Forms.FormWindowState.Maximized;
            this.Load += new System.EventHandler(this.frmCatalog_Load);
            ((System.ComponentModel.ISupportInitialize)(this.instalacionesBindingSource)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.instalacionesDataSet)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.servicioBindingSource)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.servicioDataSet)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.equipoBindingSource)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.equipoDataSet)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.tipocabannaBindingSource)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cabDataSet)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this)).EndInit();
            this.ResumeLayout(false);

        }

        #endregion

        private Microsoft.Reporting.WinForms.ReportViewer reportViewer1;
        private InstalacionesDataSet instalacionesDataSet;
        private System.Windows.Forms.BindingSource instalacionesBindingSource;
        private InstalacionesDataSetTableAdapters.instalacionesTableAdapter instalacionesTableAdapter;
        private servicioDataSet servicioDataSet;
        private System.Windows.Forms.BindingSource servicioBindingSource;
        private servicioDataSetTableAdapters.ServicioTableAdapter servicioTableAdapter;
        private EquipoDataSet equipoDataSet;
        private System.Windows.Forms.BindingSource equipoBindingSource;
        private EquipoDataSetTableAdapters.equipoTableAdapter equipoTableAdapter;
        private CabDataSet cabDataSet;
        private System.Windows.Forms.BindingSource tipocabannaBindingSource;
        private CabDataSetTableAdapters.tipo_cabannaTableAdapter tipo_cabannaTableAdapter;        
    }
}
