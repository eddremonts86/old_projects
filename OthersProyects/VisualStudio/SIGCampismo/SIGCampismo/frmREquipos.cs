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
    public partial class frmREquipos : Telerik.WinControls.UI.RadForm
    {
        public frmREquipos()
        {
            InitializeComponent();
        }

        private void frmREquipos_Load(object sender, EventArgs e)
        {
            // TODO: This line of code loads data into the 'equipoDataSet.equipo' table. You can move, or remove it, as needed.
            //this.equipoTableAdapter.Fill(this.equipoDataSet.equipo);
            string pathapp = Application.StartupPath;
            ReportParameter param = new ReportParameter();
            param.Name = "imagepath";
            param.Values.Add(pathapp + "\\Datos\\imagenes");
            reportEquipos.LocalReport.SetParameters(new ReportParameter[] { param });
            Object o = reportEquipos.ActiveControl;
            this.reportEquipos.RefreshReport();
        }

        public Microsoft.Reporting.WinForms.ReportViewer obtenerReport()
        {
            return reportEquipos;
        }
    }
}
