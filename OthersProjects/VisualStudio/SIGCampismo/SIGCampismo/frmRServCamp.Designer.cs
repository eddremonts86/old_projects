namespace SIGCampismo
{
    partial class frmRServCamp
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
            Microsoft.Reporting.WinForms.ReportDataSource reportDataSource2 = new Microsoft.Reporting.WinForms.ReportDataSource();
            this.instalacionesBindingSource = new System.Windows.Forms.BindingSource(this.components);
            this.InstalacionesDataSet = new SIGCampismo.InstalacionesDataSet();
            this.rpVSerCamp = new Microsoft.Reporting.WinForms.ReportViewer();
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
            this.InstalacionesDataSet.DataSetName = "InstalacionesDataSet";
            this.InstalacionesDataSet.SchemaSerializationMode = System.Data.SchemaSerializationMode.IncludeSchema;
            // 
            // rpVSerCamp
            // 
            this.rpVSerCamp.Dock = System.Windows.Forms.DockStyle.Fill;
            reportDataSource2.Name = "DataSet1";
            reportDataSource2.Value = this.instalacionesBindingSource;
            this.rpVSerCamp.LocalReport.DataSources.Add(reportDataSource2);
            this.rpVSerCamp.LocalReport.EnableExternalImages = true;
            this.rpVSerCamp.LocalReport.ReportEmbeddedResource = "SIGCampismo.Reportes.reportServCamp.rdlc";
            this.rpVSerCamp.Location = new System.Drawing.Point(0, 0);
            this.rpVSerCamp.Name = "rpVSerCamp";
            this.rpVSerCamp.Size = new System.Drawing.Size(430, 279);
            this.rpVSerCamp.TabIndex = 0;
            this.rpVSerCamp.Load += new System.EventHandler(this.rpVSerCamp_Load);
            // 
            // instalacionesTableAdapter
            // 
            this.instalacionesTableAdapter.ClearBeforeFill = true;
            // 
            // frmRServCamp
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(430, 279);
            this.Controls.Add(this.rpVSerCamp);
            this.Name = "frmRServCamp";
            // 
            // 
            // 
            this.RootElement.ApplyShapeToControl = true;
            this.Text = "Listado de Instalaciones por Servicio";
            this.ThemeName = "ControlDefault";
            this.WindowState = System.Windows.Forms.FormWindowState.Maximized;
            this.Load += new System.EventHandler(this.frmRServCamp_Load);
            ((System.ComponentModel.ISupportInitialize)(this.instalacionesBindingSource)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.InstalacionesDataSet)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this)).EndInit();
            this.ResumeLayout(false);

        }

        #endregion

        private Microsoft.Reporting.WinForms.ReportViewer rpVSerCamp;
        private System.Windows.Forms.BindingSource instalacionesBindingSource;
        private InstalacionesDataSet InstalacionesDataSet;
        private InstalacionesDataSetTableAdapters.instalacionesTableAdapter instalacionesTableAdapter;
    }
}
