using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Text;
using System.Windows.Forms;
using Telerik.WinControls;
using Microsoft.Reporting.WinForms;


namespace SIGCampismo
{
    public partial class frmRInst : Telerik.WinControls.UI.RadForm
    {
        public frmRInst()
        {
            InitializeComponent();
        }

        private void frmRInst_Load(object sender, EventArgs e)
        {
            // TODO: This line of code loads data into the 'InstDataSet.instalaciones' table. You can move, or remove it, as needed.

            string pathapp = Application.StartupPath;

            ReportParameter param = new ReportParameter();
            param.Name = "imagepath";
            param.Values.Add(pathapp + "\\Datos\\imagenes");
            reportViewer1.LocalReport.SetParameters(new ReportParameter[] { param });

            instalacionesTableAdapter.Connection.ConnectionString = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" + pathapp + @"\Datos\Campismo.mdb";
            this.instalacionesTableAdapter.Fill(this.InstalacionesDataSet.instalaciones);
            this.reportViewer1.LocalReport.ReportEmbeddedResource = "SIGCampismo.Reportes.reportInstalac.rdlc";
            this.reportViewer1.RefreshReport();
        }

        public Microsoft.Reporting.WinForms.ReportViewer obtenerReport()
        {
            return reportViewer1;
        }
    }
}
