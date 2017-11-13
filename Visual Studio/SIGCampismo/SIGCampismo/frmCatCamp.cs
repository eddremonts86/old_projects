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
    public partial class frmCatCamp : Telerik.WinControls.UI.RadForm
    {
        public frmCatCamp()
        {
            InitializeComponent();
        }

        private void frmCatCamp_Load(object sender, EventArgs e)
        {
            string pathapp = Application.StartupPath;
            global::System.Data.OleDb.OleDbConnection _connection = new global::System.Data.OleDb.OleDbConnection();
            _connection.ConnectionString = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" + pathapp + @"\Datos\Campismo.mdb";
            this.tipo_cabannaTableAdapter.Connection.ConnectionString = _connection.ConnectionString;
            this.equipoTableAdapter.Connection.ConnectionString = _connection.ConnectionString;
            this.servicioTableAdapter.Connection.ConnectionString = _connection.ConnectionString;
            this.instalacionesTableAdapter.Connection.ConnectionString = _connection.ConnectionString;

            // TODO: This line of code loads data into the 'cabDataSet.tipo_cabanna' table. You can move, or remove it, as needed.
            this.tipo_cabannaTableAdapter.Fill(this.cabDataSet.tipo_cabanna);
            // TODO: This line of code loads data into the 'equipoDataSet.equipo' table. You can move, or remove it, as needed.
            this.equipoTableAdapter.Fill(this.equipoDataSet.equipo);
            // TODO: This line of code loads data into the 'servicioDataSet.Servicio' table. You can move, or remove it, as needed.
            this.servicioTableAdapter.Fill(this.servicioDataSet.Servicio);
            // TODO: This line of code loads data into the 'instalacionesDataSet.instalaciones' table. You can move, or remove it, as needed.
            this.instalacionesTableAdapter.Fill(this.instalacionesDataSet.instalaciones);

            ReportParameter param = new ReportParameter();
            param.Name = "imagepath";
            param.Values.Add(pathapp + "\\Datos\\imagenes");
           

            repCamp.LocalReport.SetParameters(new ReportParameter[] { param });

            this.repCamp.RefreshReport();
        }

        public Microsoft.Reporting.WinForms.ReportViewer obtenerReport()
        {
            return repCamp;
        }

        private void repCamp_Load(object sender, EventArgs e)
        {

        }
    }
}
