namespace SIGCampismo
{
    partial class frmREquipos
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
            this.reportEquipos = new Microsoft.Reporting.WinForms.ReportViewer();
            this.equipoDataSet = new SIGCampismo.EquipoDataSet();
            this.equipoBindingSource = new System.Windows.Forms.BindingSource(this.components);
            this.equipoTableAdapter = new SIGCampismo.EquipoDataSetTableAdapters.equipoTableAdapter();
            ((System.ComponentModel.ISupportInitialize)(this.equipoDataSet)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.equipoBindingSource)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this)).BeginInit();
            this.SuspendLayout();
            // 
            // reportEquipos
            // 
            this.reportEquipos.Dock = System.Windows.Forms.DockStyle.Fill;
            reportDataSource1.Name = "DataSet1";
            reportDataSource1.Value = this.equipoBindingSource;
            this.reportEquipos.LocalReport.DataSources.Add(reportDataSource1);
            this.reportEquipos.LocalReport.EnableExternalImages = true;
            this.reportEquipos.LocalReport.ReportEmbeddedResource = "SIGCampismo.Reportes.ReportEquipos.rdlc";
            this.reportEquipos.Location = new System.Drawing.Point(0, 0);
            this.reportEquipos.Name = "reportEquipos";
            this.reportEquipos.Size = new System.Drawing.Size(685, 400);
            this.reportEquipos.TabIndex = 0;
            // 
            // equipoDataSet
            // 
            this.equipoDataSet.DataSetName = "EquipoDataSet";
            this.equipoDataSet.SchemaSerializationMode = System.Data.SchemaSerializationMode.IncludeSchema;
            // 
            // equipoBindingSource
            // 
            this.equipoBindingSource.DataMember = "equipo";
            this.equipoBindingSource.DataSource = this.equipoDataSet;
            // 
            // equipoTableAdapter
            // 
            this.equipoTableAdapter.ClearBeforeFill = true;
            // 
            // frmREquipos
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(685, 400);
            this.Controls.Add(this.reportEquipos);
            this.Name = "frmREquipos";
            // 
            // 
            // 
            this.RootElement.ApplyShapeToControl = true;
            this.Text = "Listado de Equipos";
            this.ThemeName = "ControlDefault";
            this.WindowState = System.Windows.Forms.FormWindowState.Maximized;
            this.Load += new System.EventHandler(this.frmREquipos_Load);
            ((System.ComponentModel.ISupportInitialize)(this.equipoDataSet)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.equipoBindingSource)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this)).EndInit();
            this.ResumeLayout(false);

        }

        #endregion

        private Microsoft.Reporting.WinForms.ReportViewer reportEquipos;
        private EquipoDataSet equipoDataSet;
        private System.Windows.Forms.BindingSource equipoBindingSource;
        private EquipoDataSetTableAdapters.equipoTableAdapter equipoTableAdapter;
    }
}
