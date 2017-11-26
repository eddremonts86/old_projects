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
    public partial class frmFCatalog : Telerik.WinControls.UI.RadForm
    {
        public frmFCatalog()
        {
            InitializeComponent();
        }

        private void frmFCatalog_Load(object sender, EventArgs e)
        {
            string pathapp = Application.StartupPath;
            String ConnectionString = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" + pathapp + @"\Datos\Campismo.mdb";
            provinciasTableAdapter.Connection.ConnectionString = ConnectionString;
            instalacionesTableAdapter.Connection.ConnectionString = ConnectionString;

            // TODO: This line of code loads data into the 'instalacionesDataSet.instalaciones' table. You can move, or remove it, as needed.
            this.instalacionesTableAdapter.Fill(this.instalacionesDataSet.instalaciones);
            // TODO: This line of code loads data into the 'provinciaDataSet.Provincias' table. You can move, or remove it, as needed.
            this.provinciasTableAdapter.Fill(this.provinciaDataSet.Provincias);

            provinciasBindingSource.Filter = "idprovincia <> 20";
            provinciasBindingSource.Sort = "idprovincia";
        }

        private void allInst_Click(object sender, EventArgs e)
        {
            InstCamp.Visible = allInst.Checked;
        }

        private void radButton1_Click(object sender, EventArgs e)
        {
            if (radcuba.Checked)
            {
                String id_inst = radDropDownList1.SelectedValue.ToString();
                frmRCEmp frmcat = new frmRCEmp();
                frmcat.obtenerReport().LocalReport.DataSources[0].Value = this.obtenerDatosGenerales(id_inst, true,false,true);
                frmcat.obtenerReport().LocalReport.SubreportProcessing += new SubreportProcessingEventHandler(DemoSubreportProcessingEventHandlerPais);
                frmcat.Show();
            }
            else
            {
                if (!InstCamp.Visible)
                {
                    String id_inst = radDropDownList1.SelectedValue.ToString();
                    string pathapp = Application.StartupPath;
                    if (rdresumen.Checked)
                    {
                        frmCatalog frmcat = new frmCatalog();
                        frmcat.obtenerReport().LocalReport.DataSources[0].Value = this.obtenerDatosGenerales(id_inst, true, true);
                        frmcat.obtenerReport().LocalReport.DataSources[1].Value = this.obtenerServicios(id_inst, true);
                        frmcat.obtenerReport().LocalReport.DataSources[2].Value = this.obtenerEquipos(id_inst, true);
                        frmcat.obtenerReport().LocalReport.DataSources[3].Value = this.obtenerDatosCabannas(id_inst, true);
                        frmcat.Show();
                    }
                    else
                    {
                        frmRCEmp frmcat = new frmRCEmp();
                        frmcat.obtenerReport().LocalReport.DataSources[0].Value = this.obtenerDatosGenerales(id_inst, true);
                        frmcat.obtenerReport().LocalReport.SubreportProcessing += new SubreportProcessingEventHandler(DemoSubreportProcessingEventHandler);
                        frmcat.Show();
                    }
                }
                else
                {
                    frmCatCamp frmcat = new frmCatCamp();
                    String id_inst = InstCamp.SelectedValue.ToString();
                    frmcat.obtenerReport().LocalReport.DataSources[0].Value = this.obtenerDatosGenerales(id_inst, false);
                    frmcat.obtenerReport().LocalReport.DataSources[1].Value = this.obtenerServicios(id_inst, false);
                    frmcat.obtenerReport().LocalReport.DataSources[2].Value = this.obtenerEquipos(id_inst, false);
                    frmcat.obtenerReport().LocalReport.DataSources[3].Value = this.obtenerDatosCabannas(id_inst, false);
                    frmcat.Show();
                }
            }
        }

        void DemoSubreportProcessingEventHandler(object sender, SubreportProcessingEventArgs e)
        {
            String filtro = e.Parameters[0].Values[0].ToString();
            if (e.DataSources.Count == 0)
            {
                e.DataSources.Add(new ReportDataSource("DataSet1", this.obtenerServicios(filtro, false)));
                e.DataSources.Add(new ReportDataSource("DataSet2", this.obtenerEquipos(filtro, false)));
                e.DataSources.Add(new ReportDataSource("DataSet3", this.obtenerDatosCabannas(filtro, false)));
            }
            else
            {
                e.DataSources[0].Value = this.obtenerServicios(filtro, false);
                e.DataSources[1].Value = this.obtenerEquipos(filtro, false);
                e.DataSources[2].Value = this.obtenerDatosCabannas(filtro, false);
            }
        }

        void DemoSubreportProcessingEventHandlerPais(object sender, SubreportProcessingEventArgs e)
        {
            String filtro = e.Parameters[2].Values[0].ToString();
            if (e.DataSources.Count == 0)
            {
                e.DataSources.Add(new ReportDataSource("DataSet1", this.obtenerServicios(filtro, true)));
                e.DataSources.Add(new ReportDataSource("DataSet2", this.obtenerEquipos(filtro, true)));
                e.DataSources.Add(new ReportDataSource("DataSet3", this.obtenerDatosCabannas(filtro, true)));
            }
            else
            {
                e.DataSources[0].Value = this.obtenerServicios(filtro, true);
                e.DataSources[1].Value = this.obtenerEquipos(filtro, true);
                e.DataSources[2].Value = this.obtenerDatosCabannas(filtro, true);
            }
        }

        public global::System.Data.DataTable obtenerServicios(String id_intalacion, bool prov, bool pais = false)
        {
            String filtro = "";
            if (prov)
            {
                if(!pais)
                    filtro = " WHERE padre.id_provincia = " + id_intalacion + " AND padre.id_tipo_instalacion = 5";
                else
                    filtro = " WHERE padre.id_tipo_instalacion = 5";
            }
            else
            {
                filtro = " WHERE instalaciones.id_instalacion = " + id_intalacion;
            }

            String query = @"SELECT DISTINCT Servicio.*
                                FROM (((Servicio 
                                INNER JOIN servicio_instalacion ON Servicio.Id_servicio = servicio_instalacion.Id_servicio) 
                                INNER JOIN instalaciones ON servicio_instalacion.Id_instalacion = instalaciones.id_instalacion) 
                                INNER JOIN Provincias ON instalaciones.id_provincia = Provincias.idprovincia) INNER JOIN
                         instalaciones padre ON padre.id_provincia =  instalaciones.id_provincia" + filtro;

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

        public global::System.Data.DataTable obtenerEquipos(String id_intalacion, bool prov,bool pais = false)
        {
            String filtro = "";
            String campos = "";
            String group = "";
            if (prov)
            {                
                campos = "equipo.Id_equipo, equipo.nombre_equipo, SUM(instalacion_equipo.cantidad) as cantidad, SUM(instalacion_equipo.disponibles) as  disponibles";
                group = " GROUP BY equipo.Id_equipo, equipo.nombre_equipo";
                if (!pais)
                {
                    filtro = " AND padre.id_provincia = " + id_intalacion + " AND padre.id_tipo_instalacion = 5";
                }
                else
                {
                    filtro = " AND padre.id_tipo_instalacion = 5";
                }
            }
            else
            {
                filtro = " AND instalaciones.id_instalacion = " + id_intalacion;
                campos = "equipo.Id_equipo, equipo.nombre_equipo, instalacion_equipo.cantidad, instalacion_equipo.disponibles";               
            }

            String query = @"SELECT DISTINCT " + campos
                                +@" FROM (((equipo 
                                INNER JOIN instalacion_equipo ON equipo.Id_equipo = instalacion_equipo.Id_equipo) 
                                INNER JOIN instalaciones ON instalacion_equipo.Id_instalacion = instalaciones.id_instalacion)
                                INNER JOIN Provincias ON instalaciones.id_provincia = Provincias.idprovincia) INNER JOIN
                         instalaciones padre ON padre.id_provincia =  instalaciones.id_provincia WHERE  instalacion_equipo.cantidad > 0 " + filtro
                        + group;
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

        public global::System.Data.DataTable obtenerDatosGenerales(String id_intalacion, bool prov, bool padre = false, bool pais = false)
        {
            String filtro = "", inst = "";
            if (prov)
            {
                if (!pais)
                {
                    filtro = " WHERE padre.id_provincia = " + id_intalacion + " AND padre.id_tipo_instalacion = 5";
                }
                else
                {
                    filtro = " WHERE padre.id_tipo_instalacion = 5 ORDER BY padre.id_provincia";
                }
                inst = @"padre.Nombre_Instalacion as Instalación, padre.direccion as Dirección, padre.telefono as Teléfono, padre.fax, 
                         padre.email, Nombre_Provincia as Provincia, padre_municipio.Nombre_Municipio as Municipio, 
                        padre.nacional, padre.inernacional, padre.aparcamiento,Provincias.img_provincia,padre_municipio.img_municipio,
                        padre.id_instalacion,padre.img_osm,padre.img_google,padre.img_instalacion,padre.img_ubicacion,padre.id_provincia,padre.estado";
            }
            else
            {
                filtro = " WHERE instalaciones.id_instalacion = " + id_intalacion;
                inst = @"instalaciones.Nombre_Instalacion as Instalación, instalaciones.direccion as Dirección, instalaciones.telefono as Teléfono, instalaciones.fax, 
                         instalaciones.email, Nombre_Provincia as Provincia, municipios.Nombre_Municipio as Municipio, instalaciones.nacional, instalaciones.inernacional, instalaciones.aparcamiento, 
                         tipo_instalacion.nombre_instalacion AS Tipo,Provincias.img_provincia,municipios.img_municipio,instalaciones.id_instalacion,instalaciones.img_osm,instalaciones.img_google,instalaciones.img_instalacion,instalaciones.img_ubicacion,
                         instalaciones.estado,instalaciones.cat_camp,instalaciones.id_provincia ";
            }
            if (!padre && prov && !pais)
            {
                filtro += " AND instalaciones.id_tipo_instalacion = 1";
                inst = @"instalaciones.Nombre_Instalacion as Instalación, instalaciones.direccion as Dirección, instalaciones.telefono as Teléfono, instalaciones.fax, 
                         instalaciones.email, Nombre_Provincia as Provincia, municipios.Nombre_Municipio as Municipio, instalaciones.nacional, instalaciones.inernacional, instalaciones.aparcamiento, 
                         tipo_instalacion.nombre_instalacion AS Tipo,Provincias.img_provincia,municipios.img_municipio,instalaciones.id_instalacion,instalaciones.img_osm,instalaciones.img_google,instalaciones.img_instalacion,instalaciones.img_ubicacion,
                            instalaciones.estado,instalaciones.cat_camp,instalaciones.id_provincia ";
            }

            String query = @"SELECT DISTINCT " + inst + @" 
                            FROM           (((((instalaciones INNER JOIN
                         tipo_instalacion ON instalaciones.id_tipo_instalacion = tipo_instalacion.Id_tipo_instalacion) INNER JOIN                         
                         municipios ON instalaciones.id_municipio = municipios.idmunicipio) INNER JOIN
                         Provincias ON municipios.idprovincia = Provincias.idprovincia) INNER JOIN
                         instalaciones padre ON padre.id_provincia =  instalaciones.id_provincia) INNER JOIN
                           municipios padre_municipio ON padre.id_municipio = padre_municipio.idmunicipio) " + filtro;
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

        public global::System.Data.DataTable obtenerDatosCabannas(String id_intalacion, bool prov, bool resumen = true, bool pais = false)
        {
            String filtro = "";
            String query;
            if (prov)
            {
                if (!pais)
                {
                    filtro = " WHERE padre.id_provincia = " + id_intalacion + " AND padre.id_tipo_instalacion = 5";
                }
                else
                {
                    filtro = " WHERE padre.id_tipo_instalacion = 5";
                }
            }
            else
            {
                filtro = " WHERE cabanna_instalacion.Id_instalacion = " + id_intalacion;
            }

            if (!resumen)
            {
                 query = @"SELECT DISTINCT total.total as total, disponibles.disponibles as disponibles, cant8cuc.cant8dcuc as cant8dcuc, 
                                cant6cuc.cant6dcuc as cant6dcuc, cant4cuc.cant4dcuc as cant4dcuc, cant2cuc.cant2dcuc as cant2dcuc, cant8mn.cant8dmn as cant8dmn, 
                                cant6mn.cant6dmn as cant6dmn, cant4mn.cant4dmn as cant4dmn, cant2mn.cant2dmn as cant2dmn, cant8cuc.cant8cuc as cant8cuc, 
                                cant6cuc.cant6cuc as cant6cuc, cant4cuc.cant4cuc as cant4cuc, cant2cuc.cant2cuc as cant2cuc, cant8mn.cant8mn as cant8mn,
                                cant6mn.cant6mn as cant6mn, cant4mn.cant4mn as cant4mn, cant2mn.cant2mn as cant2mn

                                    FROM 
                                      (((((((((((cabanna_instalacion 
                                    INNER JOIN (SELECT SUM(cabanna_instalacion.disponibles) as cant8dcuc,SUM(cabanna_instalacion.cantidad) as cant8cuc, Id_instalacion FROM cabanna_instalacion WHERE Id_tipo_cabanna = 8 GROUP BY  Id_instalacion) cant8cuc ON cant8cuc.Id_instalacion = cabanna_instalacion.Id_instalacion) 

                                    INNER JOIN (SELECT SUM(cabanna_instalacion.disponibles) as cant6dcuc,SUM(cabanna_instalacion.cantidad) as cant6cuc, Id_instalacion FROM cabanna_instalacion WHERE Id_tipo_cabanna = 7 GROUP BY  Id_instalacion) cant6cuc ON cant6cuc.Id_instalacion = cabanna_instalacion.Id_instalacion) 

                                    INNER JOIN (SELECT SUM(cabanna_instalacion.disponibles) as cant4dcuc,SUM(cabanna_instalacion.cantidad) as cant4cuc, Id_instalacion FROM cabanna_instalacion WHERE Id_tipo_cabanna = 6 GROUP BY  Id_instalacion) cant4cuc ON cant4cuc.Id_instalacion = cabanna_instalacion.Id_instalacion) 

                                    INNER JOIN (SELECT SUM(cabanna_instalacion.disponibles) as cant2dcuc,SUM(cabanna_instalacion.cantidad) as cant2cuc, Id_instalacion FROM cabanna_instalacion WHERE Id_tipo_cabanna = 5 GROUP BY  Id_instalacion) cant2cuc ON cant2cuc.Id_instalacion = cabanna_instalacion.Id_instalacion) 

                                    INNER JOIN (SELECT SUM(cabanna_instalacion.disponibles) as cant8dmn,SUM(cabanna_instalacion.cantidad) as cant8mn, Id_instalacion FROM cabanna_instalacion WHERE Id_tipo_cabanna = 4 GROUP BY  Id_instalacion) cant8mn ON cant8mn.Id_instalacion = cabanna_instalacion.Id_instalacion) 

                                    INNER JOIN (SELECT SUM(cabanna_instalacion.disponibles) as cant6dmn,SUM(cabanna_instalacion.cantidad) as cant6mn, Id_instalacion FROM cabanna_instalacion WHERE Id_tipo_cabanna = 3 GROUP BY  Id_instalacion) cant6mn ON cant6mn.Id_instalacion = cabanna_instalacion.Id_instalacion) 

                                    INNER JOIN (SELECT SUM(cabanna_instalacion.disponibles) as cant4dmn,SUM(cabanna_instalacion.cantidad) as cant4mn, Id_instalacion FROM cabanna_instalacion WHERE Id_tipo_cabanna = 2 GROUP BY  Id_instalacion) cant4mn ON cant4mn.Id_instalacion = cabanna_instalacion.Id_instalacion) 

                                    INNER JOIN (SELECT SUM(cabanna_instalacion.disponibles) as cant2dmn,SUM(cabanna_instalacion.cantidad) as cant2mn, Id_instalacion FROM cabanna_instalacion WHERE Id_tipo_cabanna = 1 GROUP BY  Id_instalacion) cant2mn ON cant2mn.Id_instalacion = cabanna_instalacion.Id_instalacion) 

                                    INNER JOIN (SELECT SUM(cabanna_instalacion.cantidad) as total, Id_instalacion FROM cabanna_instalacion GROUP BY  Id_instalacion) 
                                    total ON total.Id_instalacion = cabanna_instalacion.Id_instalacion)

                                    INNER JOIN (SELECT SUM(cabanna_instalacion.disponibles) as disponibles, Id_instalacion FROM cabanna_instalacion GROUP BY  Id_instalacion) 
                                    disponibles ON disponibles.Id_instalacion = cabanna_instalacion.Id_instalacion)

                                    INNER JOIN instalaciones ON cabanna_instalacion.Id_instalacion =  instalaciones.id_instalacion)

                                    INNER JOIN instalaciones padre ON padre.id_provincia =  instalaciones.id_provincia" + filtro;

            }
            else
            {
                query = @"SELECT
                            SUM(total.total) as total, SUM(disponibles.disponibles) as disponibles, SUM(cant8cuc.cant8dcuc) as cant8dcuc, 
                            SUM(cant6cuc.cant6dcuc) as cant6dcuc, SUM(cant4cuc.cant4dcuc) as cant4dcuc, SUM(cant2cuc.cant2dcuc) as cant2dcuc, 
                            SUM(cant8mn.cant8dmn) as cant8dmn, SUM(cant6mn.cant6dmn) as cant6dmn, SUM(cant4mn.cant4dmn) as cant4dmn, 
                            SUM(cant2mn.cant2dmn) as cant2dmn, SUM(cant8cuc.cant8cuc) as cant8cuc, SUM(cant6cuc.cant6cuc) as cant6cuc, 
                            SUM(cant4cuc.cant4cuc) as cant4cuc, SUM(cant2cuc.cant2cuc) as cant2cuc, SUM(cant8mn.cant8mn) as cant8mn,SUM(cant6mn.cant6mn) as cant6mn, 
                            SUM(cant4mn.cant4mn) as cant4mn, SUM(cant2mn.cant2mn) as cant2mn

                                FROM
                            (SELECT DISTINCT total.total, disponibles.disponibles, cant8cuc.cant8dcuc, cant6cuc.cant6dcuc, cant4cuc.cant4dcuc, cant2cuc.cant2dcuc, cant8mn.cant8dmn, cant6mn.cant6dmn, cant4mn.cant4dmn, cant2mn.cant2dmn, cant8cuc.cant8cuc, cant6cuc.cant6cuc, cant4cuc.cant4cuc, cant2cuc.cant2cuc, cant8mn.cant8mn, cant6mn.cant6mn, cant4mn.cant4mn, cant2mn.cant2mn

                            FROM (((((((((((cabanna_instalacion 
                            INNER JOIN (SELECT SUM(cabanna_instalacion.disponibles) as cant8dcuc,SUM(cabanna_instalacion.cantidad) as cant8cuc, Id_instalacion FROM cabanna_instalacion WHERE Id_tipo_cabanna = 8 GROUP BY Id_instalacion)  AS cant8cuc ON cabanna_instalacion.Id_instalacion = cant8cuc.Id_instalacion) 
                            INNER JOIN (SELECT SUM(cabanna_instalacion.disponibles) as cant6dcuc,SUM(cabanna_instalacion.cantidad) as cant6cuc, Id_instalacion FROM cabanna_instalacion WHERE Id_tipo_cabanna = 7 GROUP BY Id_instalacion)  AS cant6cuc ON cabanna_instalacion.Id_instalacion = cant6cuc.Id_instalacion) 
                            INNER JOIN (SELECT SUM(cabanna_instalacion.disponibles) as cant4dcuc,SUM(cabanna_instalacion.cantidad) as cant4cuc, Id_instalacion FROM cabanna_instalacion WHERE Id_tipo_cabanna = 6 GROUP BY Id_instalacion)  AS cant4cuc ON cabanna_instalacion.Id_instalacion = cant4cuc.Id_instalacion) 
                            INNER JOIN (SELECT SUM(cabanna_instalacion.disponibles) as cant2dcuc,SUM(cabanna_instalacion.cantidad) as cant2cuc, Id_instalacion FROM cabanna_instalacion WHERE Id_tipo_cabanna = 5 GROUP BY Id_instalacion)  AS cant2cuc ON cabanna_instalacion.Id_instalacion = cant2cuc.Id_instalacion) 
                            INNER JOIN (SELECT SUM(cabanna_instalacion.disponibles) as cant8dmn,SUM(cabanna_instalacion.cantidad) as cant8mn, Id_instalacion FROM cabanna_instalacion WHERE Id_tipo_cabanna = 4 GROUP BY Id_instalacion)  AS cant8mn ON cabanna_instalacion.Id_instalacion = cant8mn.Id_instalacion) 
                            INNER JOIN (SELECT SUM(cabanna_instalacion.disponibles) as cant6dmn,SUM(cabanna_instalacion.cantidad) as cant6mn, Id_instalacion FROM cabanna_instalacion WHERE Id_tipo_cabanna = 3 GROUP BY Id_instalacion)  AS cant6mn ON cabanna_instalacion.Id_instalacion = cant6mn.Id_instalacion) 
                            INNER JOIN (SELECT SUM(cabanna_instalacion.disponibles) as cant4dmn,SUM(cabanna_instalacion.cantidad) as cant4mn, Id_instalacion FROM cabanna_instalacion WHERE Id_tipo_cabanna = 2 GROUP BY Id_instalacion)  AS cant4mn ON cabanna_instalacion.Id_instalacion = cant4mn.Id_instalacion) 
                            INNER JOIN (SELECT SUM(cabanna_instalacion.disponibles) as cant2dmn,SUM(cabanna_instalacion.cantidad) as cant2mn, Id_instalacion FROM cabanna_instalacion WHERE Id_tipo_cabanna = 1 GROUP BY Id_instalacion)  AS cant2mn ON cabanna_instalacion.Id_instalacion = cant2mn.Id_instalacion) 
                            INNER JOIN (SELECT SUM(cabanna_instalacion.cantidad) as total, Id_instalacion FROM cabanna_instalacion GROUP BY Id_instalacion)  AS total ON cabanna_instalacion.Id_instalacion = total.Id_instalacion)
                                INNER JOIN (SELECT SUM(cabanna_instalacion.disponibles) as disponibles, Id_instalacion FROM cabanna_instalacion GROUP BY Id_instalacion)  AS disponibles ON cabanna_instalacion.Id_instalacion = disponibles.Id_instalacion)
                                INNER JOIN instalaciones ON cabanna_instalacion.Id_instalacion = instalaciones.id_instalacion) 
                            INNER JOIN instalaciones AS padre ON instalaciones.id_provincia = padre.id_provincia
                            "+filtro+" ) grupo;";
           
            
            }
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

        private void radDropDownList1_SelectedValueChanged(object sender, EventArgs e)
        {
            if (radDropDownList1.SelectedIndex != -1)
            {
                instalacionesBindingSource.Filter = "id_provincia = " + radDropDownList1.SelectedValue.ToString();
            }
        }

    }
}
