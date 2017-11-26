namespace SIGCampismo
{
    partial class frmCatCamp
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
            Microsoft.Reporting.WinForms.ReportDataSource reportDataSource5 = new Microsoft.Reporting.WinForms.ReportDataSource();
            Microsoft.Reporting.WinForms.ReportDataSource reportDataSource6 = new Microsoft.Reporting.WinForms.ReportDataSource();
            Microsoft.Reporting.WinForms.ReportDataSource reportDataSource7 = new Microsoft.Reporting.WinForms.ReportDataSource();
            Microsoft.Reporting.WinForms.ReportDataSource reportDataSource8 = new Microsoft.Reporting.WinForms.ReportDataSource();
            this.instalacionesBindingSource = new System.Windows.Forms.BindingSource(this.components);
            this.instalacionesDataSet = new SIGCampismo.InstalacionesDataSet();
            this.servicioBindingSource = new System.Windows.Forms.BindingSource(this.components);
            this.servicioDataSet = new SIGCampismo.servicioDataSet();
            this.equipoBindingSource = new System.Windows.Forms.BindingSource(this.components);
            this.equipoDataSet = new SIGCampismo.EquipoDataSet();
            this.tipocabannaBindingSource = new System.Windows.Forms.BindingSource(this.components);
            this.cabDataSet = new SIGCampismo.CabDataSet();
            this.repCamp = new Microsoft.Reporting.WinForms.ReportViewer();
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
            // repCamp
            // 
            this.repCamp.Dock = System.Windows.Forms.DockStyle.Fill;
            reportDataSource5.Name = "DataSet1";
            reportDataSource5.Value = this.instalacionesBindingSource;
            reportDataSource6.Name = "DataSet2";
            reportDataSource6.Value = this.servicioBindingSource;
            reportDataSource7.Name = "DataSet3";
            reportDataSource7.Value = this.equipoBindingSource;
            reportDataSource8.Name = "DataSet4";
            reportDataSource8.Value = this.tipocabannaBindingSource;
            this.repCamp.LocalReport.DataSources.Add(reportDataSource5);
            this.repCamp.LocalReport.DataSources.Add(reportDataSource6);
            this.repCamp.LocalReport.DataSources.Add(reportDataSource7);
            this.repCamp.LocalReport.DataSources.Add(reportDataSource8);
            this.repCamp.LocalReport.EnableExternalImages = true;
            this.repCamp.LocalReport.ReportEmbeddedResource = "SIGCampismo.Reportes.ReporteEmp.rdlc";
            this.repCamp.Location = new System.Drawing.Point(0, 0);
            this.repCamp.Name = "repCamp";
            this.repCamp.Size = new System.Drawing.Size(594, 487);
            this.repCamp.TabIndex = 0;
            this.repCamp.Load += new System.EventHandler(this.repCamp_Load);
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
            // frmCatCamp
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(594, 487);
            this.Controls.Add(this.repCamp);
            this.Name = "frmCatCamp";
            // 
            // 
            // 
            this.RootElement.ApplyShapeToControl = true;
            this.Text = "Reporte de la Instalación";
            this.ThemeName = "ControlDefault";
            this.Load += new System.EventHandler(this.frmCatCamp_Load);
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

        private Microsoft.Reporting.WinForms.ReportViewer repCamp;
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
