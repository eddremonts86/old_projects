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
    public partial class frmRServCamp : Telerik.WinControls.UI.RadForm
    {
        public frmRServCamp()
        {
            InitializeComponent();
        }

        private void frmRServCamp_Load(object sender, EventArgs e)
        {
            string pathapp = Application.StartupPath;
            ReportParameter param = new ReportParameter();
            param.Name = "imagepath";
            param.Values.Add(pathapp + "\\Datos\\imagenes");
            rpVSerCamp.LocalReport.SetParameters(new ReportParameter[] { param });
            Object o = rpVSerCamp.ActiveControl;
            this.rpVSerCamp.RefreshReport();            
        }

        public Microsoft.Reporting.WinForms.ReportViewer obtenerReport()
        {            
            return rpVSerCamp;
        }

        private void rpVSerCamp_Load(object sender, EventArgs e)
        {
        
        } 
    }
}
