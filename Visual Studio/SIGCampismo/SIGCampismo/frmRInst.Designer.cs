namespace SIGCampismo
{
    partial class frmRInst
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
            this.instalacionesBindingSource = new System.Windows.Forms.BindingSource(this.components);
            this.InstalacionesDataSet = new SIGCampismo.InstalacionesDataSet();
            this.reportViewer1 = new Microsoft.Reporting.WinForms.ReportViewer();
            this.instalacionesTableAdapter = new SIGCampismo.InstalacionesDataSetTableAdapters.instalacionesTableAdapter();
            ((System.ComponentModel.ISupportInitialize)(this.instalacionesBindingSource)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.InstalacionesDataSet)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this)).BeginInit();
            this.SuspendLayout();
            // 
            // instalacionesBindingSource
            // 
            this.instalacionesBindingSource.DataMember = "instalaciones";
            this.instalacionesBindingSource.DataSource = this.InstalacionesDataSet;
            // 
            // InstalacionesDataSet
            // 
            this.InstalacionesDataSet.DataSetName = "InstDataSet";
            this.InstalacionesDataSet.SchemaSerializationMode = System.Data.SchemaSerializationMode.IncludeSchema;
            // 
            // reportViewer1
            // 
            this.reportViewer1.Dock = System.Windows.Forms.DockStyle.Fill;
            reportDataSource1.Name = "DataSet1";
            reportDataSource1.Value = this.instalacionesBindingSource;
            this.reportViewer1.LocalReport.DataSources.Add(reportDataSource1);
            this.reportViewer1.LocalReport.EnableExternalImages = true;
            this.reportViewer1.LocalReport.ReportEmbeddedResource = "SIGCampismo.Reportes.reportServCamp.rdlc";
            this.reportViewer1.Location = new System.Drawing.Point(0, 0);
            this.reportViewer1.Name = "reportViewer1";
            this.reportViewer1.Size = new System.Drawing.Size(298, 279);
            this.reportViewer1.TabIndex = 0;
            // 
            // instalacionesTableAdapter
            // 
            this.instalacionesTableAdapter.ClearBeforeFill = true;
            // 
            // frmRInst
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(298, 279);
            this.Controls.Add(this.reportViewer1);
            this.Name = "frmRInst";
            // 
            // 
            // 
            this.RootElement.ApplyShapeToControl = true;
            this.Text = "Listado de Instalaciones";
            this.ThemeName = "ControlDefault";
            this.WindowState = System.Windows.Forms.FormWindowState.Maximized;
            this.Load += new System.EventHandler(this.frmRInst_Load);
            ((System.ComponentModel.ISupportInitialize)(this.instalacionesBindingSource)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.InstalacionesDataSet)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this)).EndInit();
            this.ResumeLayout(false);

        }

        #endregion

        private Microsoft.Reporting.WinForms.ReportViewer reportViewer1;
        private System.Windows.Forms.BindingSource instalacionesBindingSource;
        private InstalacionesDataSet InstalacionesDataSet;
        private InstalacionesDataSetTableAdapters.instalacionesTableAdapter instalacionesTableAdapter;
    }
}
