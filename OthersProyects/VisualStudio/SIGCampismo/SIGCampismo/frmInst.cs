using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Text;
using System.Windows.Forms;
using Telerik.WinControls;

namespace SIGCampismo
{
    public partial class frmInst : Telerik.WinControls.UI.RadForm
    {
        string pathapp = Application.StartupPath;

        public frmInst()
        {
            InitializeComponent();
        }

        private void frmInst_Load(object sender, EventArgs e)
        {
                municipiosTableAdapter.Connection.ConnectionString = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" + pathapp + @"\Datos\Campismo.mdb";
                provinciasTableAdapter.Connection.ConnectionString = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" + pathapp + @"\Datos\Campismo.mdb";
                tipo_instalacionTableAdapter.Connection.ConnectionString = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" + pathapp + @"\Datos\Campismo.mdb";

                // TODO: This line of code loads data into the 'tipoInstDataSet.tipo_instalacion' table. You can move, or remove it, as needed.
                this.tipo_instalacionTableAdapter.Fill(this.tipoInstDataSet.tipo_instalacion);
                // TODO: This line of code loads data into the 'municipiosDataSet.municipios' table. You can move, or remove it, as needed.
                this.municipiosTableAdapter.Fill(this.municipiosDataSet.municipios);
                // TODO: This line of code loads data into the 'provDataSet.Provincias' table. You can move, or remove it, as needed.
                this.provinciasTableAdapter.Fill(this.provDataSet.Provincias);
                ddProv.SelectedIndex = -1;
                ddProv.NullText = "--Selecione--";
                ddProv.Text = "--Selecione--";
                ddMun.SelectedIndex = -1;
                ddMun.NullText = "--Selecione--";
                provinciasBindingSource.Sort = "idprovincia";
                municipiosBindingSource.Sort = "idprovincia,idmunicipios";
           
        }


        private void radDropDownList3_SelectedValueChanged(object sender, EventArgs e)
        {
            if (radTipo.SelectedIndex != -1)
                this.ActualizarListado();
        }

        private void ActualizarListado()
        {
            String filtro = "";

            if ((ddMun.SelectedIndex != -1) && (!ddMun.Text.Contains("Todos")))
            {
                filtro = " instalaciones.id_municipio = " + ddMun.SelectedValue.ToString();
            }
            else {
                if ((ddProv.SelectedIndex != -1) && (!ddProv.Text.Contains("Todas")))
                {
                    filtro = " instalaciones.id_provincia = " + ddProv.SelectedValue.ToString(); 
                }
            }

            if (radTipo.SelectedIndex != -1)
            {
                if (filtro != "")
                    filtro += " AND instalaciones.id_tipo_instalacion = " + radTipo.SelectedValue.ToString();
                else
                    filtro = " instalaciones.id_tipo_instalacion = " + radTipo.SelectedValue.ToString();
            }

            if (filtro != "")
                filtro = " WHERE " + filtro;

            String query = @"SELECT DISTINCT instalaciones.Nombre_Instalacion as Instalación, instalaciones.direccion as Dirección, instalaciones.telefono as Teléfono, instalaciones.fax, 
                         instalaciones.email, Nombre_Provincia as Provincia, Nombre_Municipio as Municipio, instalaciones.nacional, instalaciones.inernacional, instalaciones.aparcamiento, 
                         tipo_instalacion.nombre_instalacion AS Tipo,instalaciones.id_municipio
                            FROM           (((instalaciones INNER JOIN                         
                         tipo_instalacion ON instalaciones.id_tipo_instalacion = tipo_instalacion.Id_tipo_instalacion) INNER JOIN                         
                         municipios ON instalaciones.id_municipio = municipios.idmunicipio) INNER JOIN
                         Provincias ON municipios.idprovincia = Provincias.idprovincia)" + filtro + " ORDER by instalaciones.id_municipio";
            
                

            //*********************Consulta a la BD*************************
            global::System.Data.OleDb.OleDbCommand comand = new global::System.Data.OleDb.OleDbCommand();
            comand.CommandType = global::System.Data.CommandType.Text;
            global::System.Data.OleDb.OleDbConnection _connection = new global::System.Data.OleDb.OleDbConnection();


            _connection.ConnectionString = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" + pathapp + @"\Datos\Campismo.mdb";
            comand.CommandText = query;
            global::System.Data.OleDb.OleDbDataAdapter Adapter = new global::System.Data.OleDb.OleDbDataAdapter();
            Adapter.SelectCommand = comand;
            Adapter.SelectCommand.Connection = _connection;
            global::System.Data.DataTable dataTable2 = new global::System.Data.DataTable();

            Adapter.Fill(dataTable2);

            int cantElem = dataTable2.Rows.Count;
            int cantColumn = dataTable2.Columns.Count;
            dataTable2.Columns.Add("Nacional");
            dataTable2.Columns.Add("Internacional");
            dataTable2.Columns.Add("Aparcamiento");

            for (int i = 0; i < cantElem; i++)
            {
                if (dataTable2.Rows[i].ItemArray[8].ToString() == "0")
                    dataTable2.Rows[i].SetField("Nacional", "No");
                else
                    dataTable2.Rows[i].SetField("Nacional", "Si");

                if (dataTable2.Rows[i].ItemArray[9].ToString() == "0")
                    dataTable2.Rows[i].SetField("Internacional", "No");
                else
                    dataTable2.Rows[i].SetField("Internacional", "Si");

                if (dataTable2.Rows[i].ItemArray[10].ToString() == "0")
                    dataTable2.Rows[i].SetField("Aparcamiento", "No");
                else
                    dataTable2.Rows[i].SetField("Aparcamiento", "Si");
            }
            dataTable2.Columns.Remove("nacional");
            dataTable2.Columns.Remove("inernacional");
            dataTable2.Columns.Remove("aparcamiento");
            rdInstalaciones.DataSource = dataTable2;
        }

        private void ddProv_SelectedValueChanged(object sender, EventArgs e)
        {
            if (ddProv.SelectedIndex != -1)
            {
                municipiosBindingSource.Filter = "idprovincia = " + ddProv.SelectedValue.ToString();
            }
            if (ddProv.Text.Contains("Todas"))
                this.ActualizarListado();
        }

        private void ddMun_SelectedValueChanged(object sender, EventArgs e)
        {
            if (ddMun.SelectedIndex != -1)
                this.ActualizarListado();
        }

        private void radButton1_Click(object sender, EventArgs e)
        {
            frmRInst frminst = new frmRInst();
            frminst.obtenerReport().LocalReport.ReportEmbeddedResource = "SIGCampismo.Reportes.reportInstalac.rdlc";
            frminst.obtenerReport().LocalReport.DataSources[0].Value = rdInstalaciones.DataSource;
            frminst.Show();
        }

        private void label1_Click(object sender, EventArgs e)
        {

        }

        private void label2_Click(object sender, EventArgs e)
        {

        }
    }
}
