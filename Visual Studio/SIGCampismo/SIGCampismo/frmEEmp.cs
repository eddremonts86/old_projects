using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Text;
using System.Windows.Forms;
using Telerik.WinControls;
using Telerik.WinControls.UI;
using System.IO;

namespace SIGCampismo
{
    public partial class frmEEmp : Telerik.WinControls.UI.RadForm
    {
        public frmEEmp()
        {
            InitializeComponent();
        }

        private String[] equipos;
        frmwaiting fwai;

        private void frmEEmp_Load(object sender, EventArgs e)
        {
            equipos = new String[300];
            string pathapp = Application.StartupPath;
            String ConnectionString = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" + pathapp + @"\Datos\Campismo.mdb";
            instalacionesTableAdapter.Connection.ConnectionString = ConnectionString;
            instalacionesTableAdapter1.Connection.ConnectionString = ConnectionString;
            provinciasTableAdapter.Connection.ConnectionString = ConnectionString;
            // TODO: This line of code loads data into the 'instalacionesDataSet.instalaciones' table. You can move, or remove it, as needed.
            this.instalacionesTableAdapter.Fill(this.instalacionesDataSet.instalaciones);
            // TODO: This line of code loads data into the 'provinciaDataSet.Provincias' table. You can move, or remove it, as needed.
            this.provinciasTableAdapter.Fill(this.provinciaDataSet.Provincias);
            // TODO: This line of code loads data into the 'instDataSet.instalaciones' table. You can move, or remove it, as needed.
            this.instalacionesTableAdapter1.Fill(this.instDataSet.instalaciones);
            instalacionesBindingSource2.Filter = "id_tipo_instalacion = 5";
            instalacionesBindingSource1.Filter = "id_tipo_instalacion <> 5";
            instalacionesBindingSource2.Sort = "id_provincia";

            this.BackgroundWorker.RunWorkerAsync();
            fwai = new frmwaiting();
            fwai.ShowDialog(this);

        }

        public global::System.Data.DataTable obtenerEquipos(String id_intalacion,bool padres, bool todos, bool equipos = false,String consulta = "",String empF = "")
        {
            String filtro = "";
            String campos = "";
            String group = " GROUP BY equipo.Id_equipo, equipo.nombre_equipo, Provincias.Nombre_Provincia,instalaciones.nombre_instalacion";

            if (todos)
            {
                filtro = "";
                campos = " padre.id_instalacion as id_padre,padre.nombre_instalacion as Empresa, SUM(instalacion_equipo.cantidad) as Total, SUM(instalacion_equipo.disponibles) as Disponibles,Provincias.Nombre_Provincia as Provincia";
                group = " GROUP BY padre.id_instalacion,Provincias.Nombre_Provincia,padre.nombre_instalacion";
                if (!padres) {
                    filtro = " AND instalaciones.id_instalacion = " + id_intalacion;
                    campos = " instalaciones.id_instalacion,padre.id_instalacion as id_padre,padre.nombre_instalacion as Empresa,instalaciones.nombre_instalacion as Instalación, SUM(instalacion_equipo.cantidad) as Total, SUM(instalacion_equipo.disponibles) as Disponibles,Provincias.Nombre_Provincia as Provincia";
                    group = " GROUP BY instalaciones.id_instalacion,padre.id_instalacion,padre.nombre_instalacion,Provincias.Nombre_Provincia,instalaciones.nombre_instalacion";
                }
            }
            else
            {
                if (padres)
                {
                    filtro = " AND padre.id_instalacion = " + id_intalacion;
                    campos = " padre.id_instalacion as id_padre,padre.nombre_instalacion as Empresa, SUM(instalacion_equipo.cantidad) as Total, SUM(instalacion_equipo.disponibles) as Disponibles,Provincias.Nombre_Provincia as Provincia";
                    group = " GROUP BY padre.id_instalacion,Provincias.Nombre_Provincia,padre.nombre_instalacion";
                }
                else
                {
                    filtro = "";
                    campos = " instalaciones.id_instalacion,padre.id_instalacion as id_padre,padre.nombre_instalacion as Empresa,instalaciones.nombre_instalacion as Instalación, SUM(instalacion_equipo.cantidad) as Total, SUM(instalacion_equipo.disponibles) as Disponibles,Provincias.Nombre_Provincia as Provincia";
                    group = " GROUP BY instalaciones.id_instalacion,padre.id_instalacion,padre.nombre_instalacion,Provincias.Nombre_Provincia,instalaciones.nombre_instalacion";
                    if (id_intalacion != "null")
                    {
                        campos = " padre.id_instalacion as id_padre,padre.nombre_instalacion as Empresa, SUM(instalacion_equipo.cantidad) as Total, SUM(instalacion_equipo.disponibles) as Disponibles,Provincias.Nombre_Provincia as Provincia";
                        group = " GROUP BY padre.id_instalacion,Provincias.Nombre_Provincia,padre.nombre_instalacion";
                        filtro = " AND instalaciones.id_instalacion = " + id_intalacion;
                    }
                }
            }

            if (equipos) {
                filtro = "";
                if (id_intalacion != "null")
                {
                    filtro = " AND instalaciones.id_instalacion = " + id_intalacion;
                }
                campos = " instalaciones.id_instalacion,padre.nombre_instalacion as Empresa,instalaciones.nombre_instalacion as Instalación,equipo.nombre_equipo as Equipo, SUM(instalacion_equipo.cantidad) as Total, SUM(instalacion_equipo.disponibles) as Disponibles,Provincias.Nombre_Provincia as Provincia";
                group = " GROUP BY instalaciones.id_instalacion,padre.nombre_instalacion,Provincias.Nombre_Provincia,instalaciones.nombre_instalacion,equipo.nombre_equipo ";
            }
            


            String query = @"SELECT DISTINCT"+ campos + @"
                                FROM ((((equipo 
                                INNER JOIN instalacion_equipo ON equipo.Id_equipo = instalacion_equipo.Id_equipo) 
                                INNER JOIN instalaciones ON instalacion_equipo.Id_instalacion = instalaciones.id_instalacion)
                                INNER JOIN Provincias ON instalaciones.id_provincia = Provincias.idprovincia) INNER JOIN
                         instalaciones padre ON padre.id_provincia =  instalaciones.id_provincia)"+
                            consulta
                        + " WHERE padre.Id_tipo_instalacion = 5 AND " + empF + " instalacion_equipo.cantidad > 0 " + filtro + group;

            //*********************Consulta a la BD*************************
            string pathapp = Application.StartupPath;
            String connectionString = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" + pathapp + @"\Datos\Campismo.mdb";
            global::System.Data.OleDb.OleDbCommand comand = new global::System.Data.OleDb.OleDbCommand();
            comand.CommandType = global::System.Data.CommandType.Text;
            global::System.Data.OleDb.OleDbConnection _connection = new global::System.Data.OleDb.OleDbConnection();
            _connection.ConnectionString = connectionString;
            comand.CommandText = query;
            global::System.Data.OleDb.OleDbDataAdapter Adapter = new global::System.Data.OleDb.OleDbDataAdapter();
            Adapter.SelectCommand = comand;
            Adapter.SelectCommand.Connection = _connection;
            global::System.Data.DataTable dataTable2 = new global::System.Data.DataTable();
            Adapter.Fill(dataTable2);

            return dataTable2;
        }

        private void radCheckBox3_ToggleStateChanged(object sender, Telerik.WinControls.UI.StateChangedEventArgs args)
        {
            radAIns.Enabled = !radall.Checked;            
        }

        private void radEmpresas_SelectedValueChanged(object sender, EventArgs e)
        {
            if (radEmpresas.SelectedIndex != -1)
            {
                //instalacionesBindingSource1.Filter = "id_provincia = " + radEmpresas.SelectedValue.ToString() ;
                instalacionesBindingSource1.Filter = "id_tipo_instalacion <> 5 AND id_provincia = " + (((System.Data.DataRowView)(instalacionesBindingSource2[radEmpresas.SelectedItem.RowIndex])).Row).ItemArray[19].ToString(); 
            }
        }

        private void radInstalaciones_SelectedValueChanged(object sender, EventArgs e)
        {
            /*if(!radall.Checked)
                if(!radAE.Checked)
                    if(!radAIns.Checked)
                        radEquipos.DataSource = this.obtenerEquipos(radInstalaciones.SelectedValue.ToString(), false);
            if(!radall.Checked)
                if(radAE.Checked)
                    radEquipos.DataSource = this.obtenerEquipos(radInstalaciones.SelectedValue.ToString(), true);*/

        }

        private void CreateUnboundHierarchy()
        {
            using (this.radEquipos.DeferRefresh())            
            {                
                this.radEquipos.MasterTemplate.Reset();                   
                GridViewTemplate template = new GridViewTemplate();
                this.radEquipos.MasterTemplate.Templates.Add(template);
                GridViewTemplate template2 = new GridViewTemplate();
                //this.radEquipos.Templates.Add(template2);
                this.radEquipos.MasterTemplate.Templates[0].Templates.Add(template2);

                int cantE = radEmp2.Items.Count;
                String empF = "";
                String having = "";
                for (int i = 0; i < cantE; i++)
                {
                    if (empF == "")
                        empF = " equipo.Id_equipo IN (" + this.obtenerIdEquipo(radEmp2.Items[i].Text.ToString());
                    else
                        empF += "," + this.obtenerIdEquipo(radEmp2.Items[i].Text.ToString()); ;
                }
                if (empF != "")
                {
                    empF += " ) AND";
                    having = " HAVING COUNT(equipo.Id_equipo) = " + cantE.ToString();
                }

                String consulta = @" INNER JOIN (SELECT DISTINCT id_instalacion
                                     FROM equipo  INNER JOIN instalacion_equipo ON equipo.Id_equipo = instalacion_equipo.Id_equipo
                                    WHERE " + empF + "  instalacion_equipo.cantidad > 0 GROUP BY id_instalacion" + having + " ) filter ON filter.id_instalacion  = instalaciones.id_instalacion";

                if (radall.Checked)
                {
                    if (radEmpresas.SelectedIndex != -1)
                        this.radEquipos.MasterTemplate.DataSource = this.obtenerEquipos(radEmpresas.SelectedValue.ToString(), true, true, false, consulta, empF);
                    else
                        this.radEquipos.MasterTemplate.DataSource = this.obtenerEquipos("", true, true, false, consulta, empF);

                    this.radEquipos.MasterTemplate.Templates[0].DataSource = this.obtenerEquipos("null", false, false, false, consulta, empF);
                    this.radEquipos.MasterTemplate.Templates[0].Templates[0].DataSource = this.obtenerEquipos("null", false, false, true, consulta, empF);
                }
                else
                {
                    if (radAIns.Checked)
                    {
                        this.radEquipos.MasterTemplate.DataSource = this.obtenerEquipos(radEmpresas.SelectedValue.ToString(), true, false, false, consulta, empF);
                        this.radEquipos.MasterTemplate.Templates[0].DataSource = this.obtenerEquipos("null", false, false, false, consulta, empF);
                        this.radEquipos.MasterTemplate.Templates[0].Templates[0].DataSource = this.obtenerEquipos("null", false, false, true, consulta, empF);
                    }
                    else
                    {
                        if (radInstalaciones.SelectedIndex != -1)
                        {
                            this.radEquipos.MasterTemplate.DataSource = this.obtenerEquipos(radInstalaciones.SelectedValue.ToString(), false, false, false, consulta, empF);
                            this.radEquipos.MasterTemplate.Templates[0].DataSource = this.obtenerEquipos(radInstalaciones.SelectedValue.ToString(), false, true, false, consulta, empF);
                            this.radEquipos.MasterTemplate.Templates[0].Templates[0].DataSource = this.obtenerEquipos(radInstalaciones.SelectedValue.ToString(), false, false, true, consulta, empF);
                        }
                    }
                }



                this.radEquipos.MasterTemplate.Templates[0].Templates[0].Columns[0].IsVisible = false;
                this.radEquipos.MasterTemplate.Templates[0].Templates[0].Columns[1].IsVisible = false;
                this.radEquipos.MasterTemplate.Templates[0].Templates[0].Columns[2].IsVisible = false;
                this.radEquipos.MasterTemplate.Templates[0].Columns[0].IsVisible = false;
                this.radEquipos.MasterTemplate.Templates[0].Columns[1].IsVisible = false;
                this.radEquipos.MasterTemplate.Templates[0].Columns[2].IsVisible = false;
                this.radEquipos.MasterTemplate.Columns[0].IsVisible = false;

                template.AutoSizeColumnsMode = GridViewAutoSizeColumnsMode.Fill;
                template2.AutoSizeColumnsMode = GridViewAutoSizeColumnsMode.Fill;   
                GridViewRelation relation = new GridViewRelation(this.radEquipos.MasterTemplate, template);
                relation.RelationName = "Empresa - Instalaciones";
                relation.ParentColumnNames.Add("id_padre");
                relation.ParentColumnNames.Add("Empresa");
                relation.ChildColumnNames.Add("id_padre");
                relation.ChildColumnNames.Add("Empresa");
                radEquipos.Relations.Add(relation);

                GridViewRelation relation2 = new GridViewRelation(template, template2);
                relation2.RelationName = "Instalaciones - Equipo";
                relation2.ParentColumnNames.Add("id_instalacion");
                relation2.ParentColumnNames.Add("Instalación");
                relation2.ChildColumnNames.Add("id_instalacion");
                relation2.ChildColumnNames.Add("Instalación"); 
                radEquipos.Relations.Add(relation2);

            }            
            this.radEquipos.AutoExpandGroups = true;        
        }                      

        private void BackgroundWorker_DoWork(object sender, DoWorkEventArgs e)
        {
            string pathapp = Application.StartupPath;            
            equipoTableAdapter.Connection.ConnectionString = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" + pathapp + @"\Datos\Campismo.mdb";            
            this.equipoTableAdapter.Fill(this.equipoDataSet.equipo);

            int cant = this.equipoTableAdapter.GetData().Count;

            for (int i = 0; i < cant; i++)
            {
                radEmp1.Items.Add(this.equipoTableAdapter.GetData()[i].ItemArray[1].ToString());
                equipos[int.Parse(this.equipoTableAdapter.GetData()[i].ItemArray[0].ToString())] = this.equipoTableAdapter.GetData()[i].ItemArray[1].ToString();                
            }
            
        }

        private void BackgroundWorker_RunWorkerCompleted(object sender, RunWorkerCompletedEventArgs e)
        {
            fwai.Hide();
            this.fwai = null;
        }

        private void radButton4_Click(object sender, EventArgs e)
        {
            CreateUnboundHierarchy();
        }

        public int obtenerIdEquipo(String nombre)
        {
            int cant = this.instalacionesTableAdapter.GetDataBy().Count;
            int pos = 0;
            bool found = false;
            int i = 0;
            while(!found && pos == 0){
                if (equipos[i] == nombre)
                {
                    pos = i;
                    break;
                }                
                i++;
            }
            return pos;
        }

        private void radButton2_Click(object sender, EventArgs e)
        {
            if (radEmp1.SelectedIndex != -1)
            {
                radEmp2.Items.Add(radEmp1.Items[radEmp1.SelectedIndex].ToString());
                radEmp1.Items.RemoveAt(radEmp1.SelectedIndex);
            }
        }

        private void radButton3_Click(object sender, EventArgs e)
        {
            if (radEmp2.SelectedIndex != -1)
            {
                radEmp1.Items.Add(radEmp2.Items[radEmp2.SelectedIndex].ToString());
                radEmp2.Items.RemoveAt(radEmp2.SelectedIndex);

            }
        }

        private void btnimprimir_Click(object sender, EventArgs e)
        {
            frmREquipos frmre = new frmREquipos();
            frmre.obtenerReport().LocalReport.DataSources[0].Value = this.radEquipos.MasterTemplate.Templates[0].Templates[0].DataSource;
            frmre.Show();
        }

    }
}
