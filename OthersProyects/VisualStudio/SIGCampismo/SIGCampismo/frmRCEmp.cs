using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Text;
using System.Windows.Forms;
using Microsoft.Reporting.WinForms;
using Telerik.WinControls;

namespace SIGCampismo
{
    public partial class frmRCEmp : Telerik.WinControls.UI.RadForm
    {
        public frmRCEmp()
        {
            InitializeComponent();
        }

        private void frmRCEmp_Load(object sender, EventArgs e)
        {
            // TODO: This line of code loads data into the 'InstalacionesDataSet.instalaciones' table. You can move, or remove it, as needed.
            string pathapp = Application.StartupPath;
            global::System.Data.OleDb.OleDbConnection _connection = new global::System.Data.OleDb.OleDbConnection();
            _connection.ConnectionString = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" + pathapp + @"\Datos\Campismo.mdb";
            this.instalacionesTableAdapter.Connection.ConnectionString = _connection.ConnectionString;
            this.instalacionesTableAdapter.Fill(this.InstalacionesDataSet.instalaciones);

            ReportParameter param = new ReportParameter();
            param.Name = "imagepath";
            param.Values.Add(pathapp + "\\Datos\\imagenes");
            reportViewer1.LocalReport.SetParameters(new ReportParameter[] { param });
            Object o = reportViewer1.ActiveControl;

            this.reportViewer1.RefreshReport();
        }

        public Microsoft.Reporting.WinForms.ReportViewer obtenerReport()
        {
            return reportViewer1;
        }
    }
}
