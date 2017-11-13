using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Text;
using System.Windows.Forms;
using Telerik.WinControls;
using Microsoft.Reporting.WinForms;
using System.Data.OleDb;

namespace SIGCampismo
{
    public partial class frmCatalog : Telerik.WinControls.UI.RadForm
    {
        string cad;
        public frmCatalog()
        {
            InitializeComponent();
        }

        private void frmCatalog_Load(object sender, EventArgs e)
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
            ReportParameter param2 = new ReportParameter();
            param2.Name = "titulo";
            param2.Values.Add("Reporte Empresa"); 
            reportViewer1.LocalReport.SetParameters(new ReportParameter[] { param,param2});
            
            this.reportViewer1.RefreshReport();
        }

        public string obtieneservicios(string idinstalacion)
        {

            string queryString = "SELECT distinct Servicio.nombre_servicio FROM Servicio INNER JOIN (servicio_instalacion INNER JOIN instalaciones ON servicio_instalacion.Id_instalacion = instalaciones.id_instalacion) ON Servicio.Id_servicio = servicio_instalacion.Id_servicio " +
                                " WHERE (((instalaciones.id_instalacion)=" + idinstalacion + "))";
            string pathapp = Application.StartupPath;
            String connectionString = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" + pathapp + @"\Datos\Campismo.mdb";

            global::System.Data.OleDb.OleDbCommand comand = new global::System.Data.OleDb.OleDbCommand();
            comand.CommandType = global::System.Data.CommandType.Text;
            global::System.Data.OleDb.OleDbConnection _connection = new global::System.Data.OleDb.OleDbConnection();
            _connection.ConnectionString = connectionString;
            comand.CommandText = queryString;
            global::System.Data.OleDb.OleDbDataAdapter Adapter = new global::System.Data.OleDb.OleDbDataAdapter();
            Adapter.SelectCommand = comand;
            Adapter.SelectCommand.Connection = _connection;
            global::System.Data.DataTable dataTable2 = new global::System.Data.DataTable();
            Adapter.Fill(dataTable2);
            String cad = "asdas";

            int cantElem = dataTable2.Rows.Count;
            
            for (int i = 0; i < cantElem; i++) 
                cad += dataTable2.Rows[i].ItemArray[0].ToString() + ", ";

            if(cad != "")
                cad = cad.Substring(0, cad.Length - 3);

            return cad;
        }

        public Microsoft.Reporting.WinForms.ReportViewer obtenerReport()
        {
            return reportViewer1;
        }
    }
}
