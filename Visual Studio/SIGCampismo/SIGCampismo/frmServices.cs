using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Text;
using System.Windows.Forms;
using Telerik.WinControls;
using Telerik.WinControls.UI;

namespace SIGCampismo
{
    public partial class frmServices : Telerik.WinControls.UI.RadForm
    {
        public frmServices()
        {
            InitializeComponent();
        }

        private String[] empresas;
        private String[] servicios;

        frmwaiting fwai;

        private void frmServices_Load(object sender, EventArgs e)
        {
            string pathapp = Application.StartupPath;
            servicioTableAdapter.Connection.ConnectionString = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" + pathapp + @"\Datos\Campismo.mdb";
            instalacionesTableAdapter.Connection.ConnectionString = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" + pathapp + @"\Datos\Campismo.mdb";
            instalacionesTableAdapter1.Connection.ConnectionString = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" + pathapp + @"\Datos\Campismo.mdb";


            this.instalacionesTableAdapter1.Fill(this.instDataSet.instalaciones);
            this.instalacionesTableAdapter.Fill(this.instalacionesDataSet.instalaciones);
            this.servicioTableAdapter.Fill(this.servicioDataSet.Servicio);

            instalacionesBindingSource.Filter = "id_tipo_instalacion = 5";
            instalacionesBindingSource1.Filter = "id_tipo_instalacion <> 5";
            instalacionesBindingSource.Sort = "id_provincia";

            servicios = new String[100];
            empresas = new String[300];
            fwai = new frmwaiting();
            this.BackgroundWorker.RunWorkerAsync();
            fwai.ShowDialog(this);
        }

        private void radButton4_Click(object sender, EventArgs e)
        {
            if (radServ1.SelectedIndex != -1)
            {
                radServ2.Items.Add(radServ1.Items[radServ1.SelectedIndex].ToString());
                radServ1.Items.RemoveAt(radServ1.SelectedIndex);
            }
        }

        private void radButton3_Click(object sender, EventArgs e)
        {
            if (radServ2.SelectedIndex != -1)
            {
                radServ1.Items.Add(radServ2.Items[radServ2.SelectedIndex].ToString());
                radServ2.Items.RemoveAt(radServ2.SelectedIndex);
            }
        }

        public int obtenerIdServicio(String nombre)
        {
            int cant = this.servicioTableAdapter.GetData().Count;
            int pos = 0;
            for (int i = 0; i < cant; i++)
            {
                if (servicios[int.Parse(this.servicioTableAdapter.GetData()[i].ItemArray[2].ToString())] == nombre)
                {
                    pos = int.Parse(this.servicioTableAdapter.GetData()[i].ItemArray[0].ToString());
                    break;
                }
            }
            return pos;
        }

        private void radButton6_Click(object sender, EventArgs e)
        {
            CreateUnboundHierarchy();
        }

        private void radCampismo_Click(object sender, EventArgs e)
        {

        }

        private void radButton5_Click(object sender, EventArgs e)
        {
            frmRServCamp frmserv = new frmRServCamp();
            frmserv.obtenerReport().LocalReport.ReportEmbeddedResource = "SIGCampismo.Reportes.reportServCamp.rdlc";
            frmserv.obtenerReport().LocalReport.DataSources[0].Value = this.radCampismo.MasterTemplate.Templates[0].Templates[0].DataSource;
            frmserv.Show();
        }

        private void BackgroundWorker_DoWork(object sender, DoWorkEventArgs e)
        {
            int cant = this.servicioTableAdapter.GetData().Count;

            for (int i = 0; i < cant; i++)
            {
                radServ1.Items.Add(this.servicioTableAdapter.GetData()[i].ItemArray[1].ToString());
                servicios[int.Parse(this.servicioTableAdapter.GetData()[i].ItemArray[2].ToString())] = this.servicioTableAdapter.GetData()[i].ItemArray[1].ToString();
            }
        }

        private void BackgroundWorker_RunWorkerCompleted(object sender, RunWorkerCompletedEventArgs e)
        {
            fwai.Hide();
            this.fwai = null;
        }

        private void radall_ToggleStateChanged(object sender, Telerik.WinControls.UI.StateChangedEventArgs args)
        {
            radAIns.Enabled = !radall.Checked;
        }

        private void CreateUnboundHierarchy()
        {
            using (this.radCampismo.DeferRefresh())
            {
                this.radCampismo.MasterTemplate.Reset();
                GridViewTemplate template = new GridViewTemplate();
                this.radCampismo.MasterTemplate.Templates.Add(template);
                GridViewTemplate template2 = new GridViewTemplate();
                //this.radCampismo.Templates.Add(template2);
                this.radCampismo.MasterTemplate.Templates[0].Templates.Add(template2);

                int cantE = radServ2.Items.Count;
                String empF = "";
                String empF2 = "";
                String having = "";
                for (int i = 0; i < cantE; i++)
                {
                    if (empF == "")
                        empF = " servicio_instalacion.Id_servicio IN (" + this.obtenerIdServicio(radServ2.Items[i].Text.ToString());
                    else
                        empF += "," + this.obtenerIdServicio(radServ2.Items[i].Text.ToString()); ;
                }
                if (empF != "")
                {
                    empF2 = " WHERE " + empF +" ) ";
                    empF = " AND "+ empF +" ) ";
                    
                    having = " HAVING COUNT(servicio_instalacion.Id_servicio) = " + cantE.ToString();
                }

                String consulta = @" INNER JOIN (SELECT DISTINCT id_instalacion
                                     FROM servicio_instalacion
                                    " + empF2 + "   GROUP BY id_instalacion" + having + " ) filter ON filter.id_instalacion  = instalaciones.id_instalacion";

                if (radall.Checked || radEmpresas.SelectedIndex == -1)
                {
                    if (radEmpresas.SelectedIndex != -1)
                        this.radCampismo.MasterTemplate.DataSource = this.obtenerServicios((((System.Data.DataRowView)(radEmpresas.SelectedValue)).Row).ItemArray[12].ToString(), true, true, false, consulta, empF);
                    else
                        this.radCampismo.MasterTemplate.DataSource = this.obtenerServicios("", true, true, false, consulta, empF);

                    this.radCampismo.MasterTemplate.Templates[0].DataSource = this.obtenerServicios("null", false, false, false, consulta, empF);
                    this.radCampismo.MasterTemplate.Templates[0].Templates[0].DataSource = this.obtenerServicios("null", false, false, true, consulta, empF);
                }
                else
                {
                    if (radAIns.Checked)
                    {
                        this.radCampismo.MasterTemplate.DataSource = this.obtenerServicios((((System.Data.DataRowView)(radEmpresas.SelectedValue)).Row).ItemArray[12].ToString(), true, false, false, consulta, empF);
                        this.radCampismo.MasterTemplate.Templates[0].DataSource = this.obtenerServicios("null", false, false, false, consulta, empF);
                        this.radCampismo.MasterTemplate.Templates[0].Templates[0].DataSource = this.obtenerServicios("null", false, false, true, consulta, empF);
                    }
                    else
                    {
                        if (radInstalaciones.SelectedIndex != -1)
                        {
                            this.radCampismo.MasterTemplate.DataSource = this.obtenerServicios(radInstalaciones.SelectedValue.ToString(), false, false, false, consulta, empF);
                            this.radCampismo.MasterTemplate.Templates[0].DataSource = this.obtenerServicios(radInstalaciones.SelectedValue.ToString(), false, true, false, consulta, empF);
                            this.radCampismo.MasterTemplate.Templates[0].Templates[0].DataSource = this.obtenerServicios(radInstalaciones.SelectedValue.ToString(), false, false, true, consulta, empF);
                        }
                    }
                }

                this.radCampismo.MasterTemplate.Templates[0].Templates[0].Columns[0].IsVisible = false;
                this.radCampismo.MasterTemplate.Templates[0].Templates[0].Columns[1].IsVisible = false;
                this.radCampismo.MasterTemplate.Templates[0].Columns[0].IsVisible = false;
                this.radCampismo.MasterTemplate.Templates[0].Columns[1].IsVisible = false;
                this.radCampismo.MasterTemplate.Columns[0].IsVisible = false;

                template.AutoSizeColumnsMode = GridViewAutoSizeColumnsMode.Fill;
                template2.AutoSizeColumnsMode = GridViewAutoSizeColumnsMode.Fill;
                GridViewRelation relation = new GridViewRelation(this.radCampismo.MasterTemplate, template);
                relation.RelationName = "Empresa - Instalaciones";
                relation.ParentColumnNames.Add("id_padre");
                relation.ParentColumnNames.Add("Empresa");
                relation.ChildColumnNames.Add("id_padre");
                relation.ChildColumnNames.Add("Empresa");
                radCampismo.Relations.Add(relation);

                GridViewRelation relation2 = new GridViewRelation(template, template2);
                relation2.RelationName = "Instalaciones - Servicio";
                relation2.ParentColumnNames.Add("id_instalacion");
                relation2.ParentColumnNames.Add("Instalación");
                relation2.ChildColumnNames.Add("id_instalacion");
                relation2.ChildColumnNames.Add("Instalación");
                radCampismo.Relations.Add(relation2);

            }
            this.radCampismo.AutoExpandGroups = true;
        }

        public global::System.Data.DataTable obtenerServicios(String id_intalacion, bool padres, bool todos, bool equipos = false, String consulta = "", String empF = "")
        {

            String filtro = "";
            String campos = "";

            if (todos)
            {
                filtro = "";
                campos = @" padre.id_instalacion as id_padre,padre.nombre_instalacion as Empresa, padre.direccion as Dirección, padre.telefono as Teléfono, padre.fax as Fax, 
                         padre.email as Correo";
                if (!padres)
                {
                    filtro = " AND instalaciones.id_instalacion = " + id_intalacion;
                    campos = @" instalaciones.id_instalacion,padre.id_instalacion as id_padre,padre.nombre_instalacion as Empresa, instalaciones.Nombre_Instalacion as Instalación, instalaciones.direccion as Dirección, instalaciones.telefono as Teléfono, instalaciones.fax, 
                         instalaciones.email, Nombre_Provincia as Provincia, Nombre_Municipio as Municipio,
                         tipo_instalacion.nombre_instalacion AS Tipo";
                }
            }
            else
            {
                if (padres)
                {
                    filtro = " AND padre.id_instalacion = " + id_intalacion;
                    campos = @" padre.id_instalacion as id_padre,padre.nombre_instalacion as Empresa, padre.direccion as Dirección, padre.telefono as Teléfono, padre.fax, 
                         padre.email";
                }
                else
                {
                    filtro = "";
                    campos = @" instalaciones.id_instalacion,padre.id_instalacion as id_padre,padre.nombre_instalacion as Empresa, instalaciones.Nombre_Instalacion as Instalación, instalaciones.direccion as Dirección, instalaciones.telefono as Teléfono, instalaciones.fax, 
                         instalaciones.email, Nombre_Provincia as Provincia, Nombre_Municipio as Municipio,
                         tipo_instalacion.nombre_instalacion AS Tipo";
                    if (id_intalacion != "null")
                    {
                        campos = @" padre.id_instalacion as id_padre,padre.nombre_instalacion as Empresa, padre.direccion as Dirección, padre.telefono as Teléfono, padre.fax, 
                         padre.email";
                        filtro = " AND instalaciones.id_instalacion = " + id_intalacion;
                    }
                }
            }

            if (equipos)
            {
                filtro = "";
                if (id_intalacion != "null")
                {
                    filtro = " AND instalaciones.id_instalacion = " + id_intalacion;
                }
                campos = @" instalaciones.id_instalacion,instalaciones.nombre_instalacion as Instalación,Servicio.nombre_servicio as Servicio, instalaciones.direccion as Dirección, instalaciones.telefono as Teléfono, instalaciones.fax, 
                         instalaciones.email, Nombre_Provincia as Provincia, Nombre_Municipio as Municipio,
                         tipo_instalacion.nombre_instalacion AS Tipo,Servicio.idservicio";
            }


            String query = @"SELECT DISTINCT" + campos + @"
                                FROM           ((((((instalaciones INNER JOIN
                         servicio_instalacion ON instalaciones.id_instalacion = servicio_instalacion.Id_instalacion) INNER JOIN
                         Servicio ON servicio_instalacion.Id_servicio = Servicio.Id_servicio) INNER JOIN
                         tipo_instalacion ON instalaciones.id_tipo_instalacion = tipo_instalacion.Id_tipo_instalacion) INNER JOIN                         
                         municipios ON instalaciones.id_municipio = municipios.idmunicipio) INNER JOIN
                         Provincias ON municipios.idprovincia = Provincias.idprovincia) INNER JOIN
                         instalaciones padre ON padre.id_provincia =  instalaciones.id_provincia)" +
                            consulta
                        + " WHERE padre.Id_tipo_instalacion = 5 " + empF + filtro;


            //*********************Consulta a la BD*************************
            string pathapp = Application.StartupPath;
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
            return dataTable2;
            //******************************************
        }

        private void radDropDownList1_SelectedValueChanged(object sender, EventArgs e)
        {
            if (radEmpresas.SelectedIndex != -1)
            {
                instalacionesBindingSource1.Filter = "id_tipo_instalacion <> 5 AND id_provincia = " + (((System.Data.DataRowView)(instalacionesBindingSource[radEmpresas.SelectedItem.RowIndex])).Row).ItemArray[16].ToString();
            }
        }

    }
}
