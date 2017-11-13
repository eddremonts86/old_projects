using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Data.OleDb;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using Telerik.WinControls;
using Telerik.WinControls.UI;
using PositionChangedEventArgs = Telerik.WinControls.UI.Data.PositionChangedEventArgs;

namespace SIGCampismo
{
    public partial class PanelInfo : RadForm
    {
        string cad;
        bool infopuntual, imgosm,imginstalacion,imggoogle;

        public PanelInfo()
        {
            InitializeComponent();
        }

        private void RadForm1_Load(object sender, EventArgs e)
        {
            string pathapp = Application.StartupPath;
            provinciasTableAdapter.Connection.ConnectionString = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" + pathapp + @"\Datos\Campismo.mdb";
            instalacionesTableAdapter.Connection.ConnectionString = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" + pathapp + @"\Datos\Campismo.mdb";
            tipo_instalacionTableAdapter.Connection.ConnectionString = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" + pathapp + @"\Datos\Campismo.mdb";
            municipiosTableAdapter.Connection.ConnectionString = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" + pathapp + @"\Datos\Campismo.mdb"; 

            // TODO: This line of code loads data into the 'provinciaDataSet.Provincias' table. You can move, or remove it, as needed.
            this.provinciasTableAdapter.Fill(this.provinciaDataSet.Provincias);
            // TODO: This line of code loads data into the 'municipiosDataSet.municipios' table. You can move, or remove it, as needed.
            this.municipiosTableAdapter.Fill(this.municipiosDataSet.municipios);
            // TODO: This line of code loads data into the 'tipoInstDataSet.tipo_instalacion' table. You can move, or remove it, as needed.
            this.tipo_instalacionTableAdapter.Fill(this.tipoInstDataSet.tipo_instalacion);
            // TODO: This line of code loads data into the 'instalacionesDataSet.instalaciones' table. You can move, or remove it, as needed.
            this.instalacionesTableAdapter.Fill(this.instalacionesDataSet.instalaciones);

            municipiosBindingSource.Sort = "Idprovincia";
            provinciasBindingSource.Sort = "Idprovincia";
    

            imgosm = false;
            imginstalacion = false;
            imggoogle = false;

        }

        private void radDropDownList1_SelectedIndexChanged(object sender, PositionChangedEventArgs e)
        {
          
            if (combo_intitucions.SelectedItem != null) tipo_instalacion.SelectedValue = (((System.Data.DataRowView)(instalacionesBindingSource[combo_intitucions.SelectedItem.RowIndex])).Row).ItemArray[3];
        }       

        private void radButton1_Click(object sender, EventArgs e)   //Boton que envia los datos a el servidor
        {
            //=========================================================================//crear conections y habrir coneccion
            string pathapp = Application.StartupPath;
            OleDbCommand command = new OleDbCommand();
             oleDbConnection.ConnectionString = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" + pathapp + @"\Datos\Campismo.mdb";
            
            
            command.Connection = oleDbConnection;
            oleDbConnection.Open(); 
            //====================================== todoas mis variables de items==================================================//
            int intitucions = int.Parse(combo_intitucions.SelectedValue.ToString()); //id de la instalcion
            int nstalacion;
            try
            {
                 nstalacion = int.Parse(tipo_instalacion.SelectedValue.ToString());   //id del tipo de instalaccion
            }
            catch (Exception)
            {
                string nombre = (((System.Data.DataRowView)(instalacionesBindingSource[combo_intitucions.SelectedItem.RowIndex])).Row).ItemArray[3].ToString();
                //===========================================================================*/
                String query5 = @"SELECT * FROM tipo_instalacion where Id_tipo_instalacion = "+nombre;
            
                //MessageBox.Show(query);
                //*********************Consulta a la BD*************************
                OleDbCommand comand5 = new OleDbCommand();
                comand5.CommandType = CommandType.Text;
                comand5.CommandText = query5;
                OleDbDataAdapter Adapter5 = new OleDbDataAdapter();
                Adapter5.SelectCommand = comand5;
                Adapter5.SelectCommand.Connection = oleDbConnection; 
                DataTable dataTable25 = new DataTable();
                Adapter5.Fill(dataTable25);

                int id = int.Parse(dataTable25.Rows[0].ItemArray[0].ToString());
                nstalacion = id;
                //throw;
            }
           
            
            //======================================================================//categorias de campismos
            string catg = " ";
            if (prim_catg.IsChecked){catg = "1ra";}
            if (s_catg.IsChecked){catg = "2da";}
            if (terc_cat.IsChecked){catg = "3ra";}
            if (cta_catg.IsChecked){catg = "4ta";}
            if (quin_catg.IsChecked){catg = "5ta";}
            //======================================================================//stado de instlacion
            string stado = "B";
            if (radio_bueno.IsChecked){stado = "B";}
            if (radio_regular.IsChecked){stado = "R";}
            if (radio_malo.IsChecked){stado = "M";}
            //======================================================================//categorias de Villas
            string catg_VILLA = "1";
            if (una_estr.IsChecked){catg_VILLA = "1";}
            if (dos_estr.IsChecked){catg_VILLA = "2";}
            if (ter_cat.IsChecked){catg_VILLA = "3";}

            //======================================================================//categorias de Campismos
            int nact = 1;
            int inter = 0;
            int autostop = 0;
            if (national.IsChecked){nact = 1;}
            if (international.IsChecked){inter = 1;}
          
            //======================================================================//informacion Generals
            string direccion = dir.Text;
            if (direccion == "")
            {
                direccion = "Sin Dirección";
            }
         
            Int64 telefono = (Int64)telf.Value;
            Int64 FAX = (Int64)fax.Value;
            string emails = email.Text;
            if (emails == "")
            {
                emails = "campismo@co.cu";
            }
            ;
            string resum = Text_infoG.Text;
            if (resum == "")
            {
                resum = "Sin resumen.";
            }
            string contacto = contactos.Text;
           


            //======================================================================informacion de las cabanas
            /*int tcab = (int)tcban.Value;
            int tcabD = (int)tcbanD.Value;*/
            int cap2mnV = (int)cap2mn.Value;
            int cap4mnV = (int)cap4mn.Value;
            int cap6mnV = (int)cap6mn.Value;
            int cap8mnV = (int)cap8mn.Value;
            int cap2mnDi = (int)cap2mnD.Value;
            int cap4mnDi = (int)cap4mnD.Value;
            int cap6mnDi = (int)cap6mnD.Value;
            int cap8mnDi = (int)cap8mnD.Value;
            int cap2cucV = (int)cap2cuc.Value;
            int cap4cucV = (int)cap4cuc.Value;
            int cap6cucV = (int)cap6cuc.Value;
            int cap8cucV = (int)cap8cuc.Value;
            int cap2cucDi = (int)cap2cucD.Value;
            int cap4cucDi = (int)cap4cucD.Value;
            int cap6cucDi = (int)cap6cucD.Value;
            int cap8cucDi = (int)cap8cucD.Value;
            int[] nationalsT = { cap2mnV, cap4mnV, cap6mnV, cap8mnV };
            int[] nationalsD = { cap2mnDi, cap4mnDi, cap6mnDi, cap8mnDi };
            int[] intcuc = { cap2cucV, cap4cucV, cap6cucV, cap8cucV };
            int[] intcucD = { cap2cucDi, cap4cucDi, cap6cucDi, cap8cucDi };
            int var = 2;
            int var1 = 2;
            //======================================================================Gestionar informacion a guardar
            command.CommandText = "DELETE FROM servicio_instalacion WHERE Id_instalacion =" + intitucions + "";   //Elimina todos os servicios de la instalacion
            command.ExecuteNonQuery();
            //======================================================================Insertar servicios adicionales a la instalacion(agua calinte, serv de enfermeria ....)
        
            //======================================================================Insertar servicios============================  
          
            List<string> list = new List<string>();
            foreach (Control c in Sevicios.Controls)
            {
                RadCheckBox check = (RadCheckBox)c;
                if (check.Checked)
                    list.Add(check.Text);
            }
            foreach (string s in list)
            {
                //buscar que el servicio exista
                command.CommandText = "SELECT count(*) FROM Servicio where nombre_servicio = '" + s + "'";
                Object cant = command.ExecuteScalar();
                int total = (int)cant;
                //borrar todos los servicios de la instalacion
                if (total != 0)
                {  //buscar servicio existente
                    command.CommandText = "SELECT  Id_servicio FROM Servicio where nombre_servicio = '" + s + "'";
                    Object cant1 = command.ExecuteScalar();
                    int id = (int)cant1;
                    //insertar servicio
                    command.CommandText = "Insert into servicio_instalacion (Id_servicio,Id_instalacion) VALUES ('" + id + "'," + intitucions + ") ";
                    command.ExecuteNonQuery();
                }
                else
                {
                    command.CommandText = "Insert into Servicio (nombre_servicio) VALUES ('" + s + "') ";
                    command.ExecuteNonQuery();
                    //buscar servicio existente
                    command.CommandText = "SELECT  Id_servicio FROM Servicio where nombre_servicio = '" + s + "'";
                    Object cant1 = command.ExecuteScalar();
                    int id = (int)cant1;
                    //insertar servicio
                    command.CommandText = "Insert into servicio_instalacion (Id_servicio,Id_instalacion) VALUES ('" + id + "'," + intitucions + ") ";
                    command.ExecuteNonQuery();
                }

            }
            //=============================================================================================================
            //====================================================================== Gestion //======================================================================
            command.CommandText = "DELETE FROM cabanna_instalacion WHERE Id_instalacion =" + intitucions + "";
            command.ExecuteNonQuery();
            for (int i = 0; i < nationalsD.Length; i++)
            {
                command.CommandText = "SELECT  Id_tipo_cabanna FROM tipo_cabanna where cantidad_personas = " + var + " and mn=1 ";
                Object cant1 = command.ExecuteScalar();
                int id = int.Parse(cant1.ToString());
                //insertar cantidad de cabanas
                command.CommandText = "Insert into cabanna_instalacion (Id_instalacion,Id_tipo_cabanna,cantidad,disponibles) VALUES (" + intitucions + ",'" + id + "'," + nationalsT[i] + "," + nationalsD[i] + ") ";
                command.ExecuteNonQuery();
                var += 2;
            }

            for (int i = 0; i < intcuc.Length; i++)
            {
                command.CommandText = "SELECT  Id_tipo_cabanna FROM tipo_cabanna where cantidad_personas = " + var1 + " and mn=0 ";
                Object cant1 = command.ExecuteScalar();
                int id = int.Parse(cant1.ToString());
                //insertar cantidad de cabanas
                command.CommandText = "Insert into cabanna_instalacion (Id_instalacion,Id_tipo_cabanna,cantidad,disponibles) VALUES (" + intitucions + ",'" + id + "'," + intcuc[i] + "," + intcucD[i] + ") ";
                command.ExecuteNonQuery();
                var1 += 2;
            }

            //===================================Insert and update for table Resumen=========================/
            command.CommandText = "DELETE FROM resumen WHERE id_instalacion =" + intitucions + "";
            command.ExecuteNonQuery();
            command.CommandText = "Insert into resumen (descripcion,id_instalacion,contacto) VALUES ('" + resum + "', " + intitucions + ",'" + contacto + "') ";
            command.ExecuteNonQuery();
            //===================================Insert and update for table Servicios y Serv_Inst=========================/
           //========================================Equipamiento======================================================//
            for (int i = 0; i < radGridView1.RowCount; i++)
            {
                string nombre = radGridView1.ChildRows[i].Cells[0].Value.ToString();
                string disp = radGridView1.ChildRows[i].Cells[2].Value.ToString();
                string total = radGridView1.ChildRows[i].Cells[1].Value.ToString();

                command.CommandText = "SELECT  Id_equipo FROM equipo where nombre_equipo = '" + nombre + "'";
                Object cant1 = command.ExecuteScalar(); 
                if (cant1 == null)
                {
                    command.CommandText = "Insert into equipo (nombre_equipo) VALUES ('" + nombre + "') ";
                    command.ExecuteNonQuery();
                    command.CommandText = "SELECT  Id_equipo FROM equipo where nombre_equipo = '" + nombre + "'";
                    Object cant2 = command.ExecuteScalar();
                    int id1 = int.Parse(cant2.ToString());
                    command.CommandText =
                        "Insert into instalacion_equipo (Id_instalacion,Id_equipo,disponibles,cantidad) VALUES ('" +
                        intitucions + "','" + id1 + "'," + disp + "," + total + ") ";
                    command.ExecuteNonQuery();
                }
                else
                {
                    int id = int.Parse(cant1.ToString());
                    command.CommandText = "SELECT  count(*) FROM instalacion_equipo where Id_instalacion =" + intitucions + " and Id_equipo=" + id + "";
                   // MessageBox.Show(command.CommandText);
                    Object cantid = command.ExecuteScalar();
                    if (((int) cantid == null) || ((int) cantid == 0))
                    {
                        command.CommandText =
                            "Insert into instalacion_equipo (Id_instalacion,Id_equipo,disponibles,cantidad) VALUES ('" +
                            intitucions + "','" + id + "'," + disp + "," + total + ") ";
                        command.ExecuteNonQuery();

                    }
                    else
                    {
                        command.CommandText =
                            "UPDATE instalacion_equipo SET " +"disponibles=" + disp + ",cantidad=" + total + " where Id_instalacion =" + intitucions + " and Id_equipo=" + id;
                        command.ExecuteNonQuery();
                    }
                }
            }
            //===================================Actualizar datos de instalacion =========================================//
            //Tomando las imagenes y subiendolas a la app.
            string fileImageDir = openFileDialog1.FileName;
            string fileImageDir1 = openFileDialog2.FileName;
            string fileImageDir2 = openFileDialog3.FileName;
            try
            {
                File.Copy(fileImageDir, pathapp + "\\Datos\\imagenes\\google\\" + openFileDialog1.SafeFileName);
                File.Copy(fileImageDir1, pathapp + "\\Datos\\imagenes\\google\\" + openFileDialog2.SafeFileName);
                File.Copy(fileImageDir2, pathapp + "\\Datos\\imagenes\\instalaciones\\" + openFileDialog3.SafeFileName);
            }
            catch (Exception)
            {
            }

            string cad1 = "UPDATE instalaciones SET " +
                               "instalaciones.cat_camp = '" + catg + "'" +
                               ",instalaciones.cat_villa= '" + catg_VILLA + "'" +
                               ", instalaciones.nacional= " + nact + "," +
                               "instalaciones.inernacional= " + inter + "" +
                               ",instalaciones.aparcamiento= " + autostop + "" +
                               ",instalaciones.direccion= '" + direccion + "'," +
                               "instalaciones.telefono= " + telefono + "" +
                               ",instalaciones.id_tipo_instalacion= " + nstalacion + "" +
                               ",instalaciones.estado= '" + stado + "'" +
                               ",instalaciones.fax= " + FAX + "" +
                               ",instalaciones.email= '" + emails + "' ";
            string cad2 = "";
            if (imgosm) cad2 = cad2 + ",instalaciones.img_osm= '" + openFileDialog1.SafeFileName + "'";
            if (imggoogle) cad2 = cad2 + ",instalaciones.img_google= '" + openFileDialog2.SafeFileName + "'";
            if (imginstalacion) cad2 = cad2 + ",instalaciones.img_instalacion= '" + openFileDialog3.SafeFileName + "'  ";

            command.CommandText = cad1 + cad2 + "where id_instalacion = " + intitucions + " ";
                               
            command.ExecuteNonQuery();
            oleDbConnection.Close();
            MessageBox.Show("Se ha guardado satisfactoriamente....");
        }

        private void radSpinEditor1_ValueChanged(object sender, EventArgs e)
        {

        }

        private void Sevicios_Paint(object sender, PaintEventArgs e)
        {

        }

        private void radCheckBox2_ToggleStateChanged_2(object sender, StateChangedEventArgs args)
        {

        }

        private void radRadioButton2_ToggleStateChanged(object sender, StateChangedEventArgs args)
        {

        }

        private void radLabel6_Click(object sender, EventArgs e)
        {

        }

        private void groupBox2_Enter(object sender, EventArgs e)
        {

        }

        private void groupBox3_Enter(object sender, EventArgs e)
        {

        }

        private void img1_Click(object sender, EventArgs e)
        {
            imgosm = true;
            openFileDialog1.ShowDialog();
        }

        private void img2_Click(object sender, EventArgs e)
        {
            imggoogle = true;
            openFileDialog2.ShowDialog();
        }

        private void img3_Click(object sender, EventArgs e)
        {
             imginstalacion = true;
            openFileDialog3.ShowDialog();
        }

        private void radGridView1_Click(object sender, EventArgs e)
        {

        }

        private void radLabel11_Click(object sender, EventArgs e)
        {

        }

        private void provincias_SelectedValueChanged(object sender, EventArgs e)
        {
             if (provincias.SelectedIndex != -1)
            {municipiosBindingSource.Filter = "idprovincia = " + provincias.SelectedValue.ToString();}
        }

        private string get_value(String query)
        {
            string pathapp = Application.StartupPath;

            oleDbConnection.ConnectionString = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" + pathapp + @"\datos\Campismo.mdb";
            OleDbCommand commandOleDb = new OleDbCommand(query, oleDbConnection);
            commandOleDb.CommandTimeout = 20;
            oleDbConnection.Open();
            OleDbDataReader reader = null;
            try
            {
                reader = commandOleDb.ExecuteReader();
            }
            catch (Exception)
            {

            }
            while (reader.Read())
            {
                cad = reader[0].ToString();
            }
            oleDbConnection.Close();
            return cad;
 
        }

        private void municipios_SelectedValueChanged(object sender, EventArgs e)
        {
            if (municipios.SelectedIndex != -1)
            {
                if (instalacionesBindingSource != null)
                {
                    instalacionesBindingSource.Filter = "id_municipio = " + municipios.SelectedValue.ToString();
                    
                }
             
            }
        }

        public void muestra_datos(bool puntual, string idinstalacion, string idprov,string idmun)
        {

            bindingSourceEquipamiento.Clear();
            //Limpiar todos los campos llenos anteriormente----------------------------//

            infopuntual = puntual;

            foreach (Control c in groupBox10.Controls)
            {
                if (c is RadCheckBox)
                {
                    RadCheckBox check = (RadCheckBox)c;
                    if (check.Checked)
                        check.Checked = false;
                }
            }
          /*  foreach (Control c in groupBox2.Controls)
            {
                RadCheckBox check1 = (RadCheckBox)c;
                if (check1.Checked)
                    check1.Checked = false;
            }*/
            foreach (Control c in Sevicios.Controls)
            {
                RadCheckBox check2 = (RadCheckBox)c;
                if (check2.Checked)
                    check2.Checked = false;
            }

            cap2mn.Value = 0; cap2mnD.Value = 0;
            cap4mn.Value = 0; cap4mnD.Value = 0;
            cap6mn.Value = 0; cap6mnD.Value = 0;
            cap8mn.Value = 0; cap8mnD.Value = 0;

            cap2cuc.Value = 0; cap2cucD.Value = 0;
            cap4cuc.Value = 0; cap4cucD.Value = 0;
            cap6cuc.Value = 0; cap6cucD.Value = 0;
            cap8cuc.Value = 0; cap8cucD.Value = 0;
            //---------------------------------------------------------------------------------------------

            string pathapp = Application.StartupPath;
            int intitucions = 0;

            if (!puntual)
            {
                lblprovincia.Visible = false;
                lblmunicipios.Visible = false;
                lblinstalaciones.Visible = false;
                lbltipoinstalacion.Visible = false;
                municipios.Visible = true;
                provincias.Visible = true;
                combo_intitucions.Visible = true;
                gbimagenes.Visible = true;

                if (combo_intitucions.SelectedIndex != -1)
                    if (tipoinstalacionBindingSource != null)
                    { string a = combo_intitucions.SelectedItem.DataBoundItem.ToString(); }


                try
                {
                    intitucions = int.Parse(combo_intitucions.SelectedValue.ToString()); //id de la instalcion

                    if (intitucions != 0)
                    {

                        int count = radGridView1.Columns.Count;
                        for (int i = 0; i < count; i++)
                        {
                            radGridView1.Columns.RemoveAt(i);
                        }

                        radGridView1.Columns.Add(new GridViewTextBoxColumn()
                        {
                            HeaderText = "Equipos",
                            FieldName = "Equipo",
                            Width = 500,
                            ReadOnly = true
                        });
                        radGridView1.Columns.Add(new GridViewDecimalColumn()
                        {
                            HeaderText = "Total",
                            FieldName = "Total",
                            Width = 130,
                            DecimalPlaces = 0
                        });
                        radGridView1.Columns.Add(new GridViewDecimalColumn()
                        {
                            HeaderText = "En servicio",
                            FieldName = "Servicio",
                            Width = 130,
                            DecimalPlaces = 0
                        });
                        bindingSourceEquipamiento.Clear();
                    }
                }
                catch (Exception)
                {
                    int count = radGridView1.Columns.Count;
                    for (int i = 0; i < count; i++)
                    {
                        radGridView1.Columns.RemoveAt(i);
                    }

                    radGridView1.Columns.Add(new GridViewTextBoxColumn()
                    {
                        HeaderText = "Equipos",
                        FieldName = "Equipo",
                        Width = 500,
                        ReadOnly = true
                    });
                    radGridView1.Columns.Add(new GridViewDecimalColumn()
                    {
                        HeaderText = "Total",
                        FieldName = "Total",
                        Width = 130,
                        DecimalPlaces = 0
                    });
                    radGridView1.Columns.Add(new GridViewDecimalColumn()
                    {
                        HeaderText = "En servicio",
                        FieldName = "Servicio",
                        Width = 130,
                        DecimalPlaces = 0
                    });
                    bindingSourceEquipamiento.Clear();
                }

            }
            else {
                try
                {
                    intitucions = int.Parse(idinstalacion);
                    string provinciascad = get_value("select nombre_provincia from provincias where idprovincia = " + idprov);
                    string municipioscad = get_value("select Nombre_Municipio from municipios where idmunicipio = " + idmun);
                    string instalacioncad = get_value("select Nombre_Instalacion from instalaciones where id_instalacion = " + idinstalacion);

                    img_acceso_name.Text = "( " + get_value("select img_osm from instalaciones where id_instalacion = " + idinstalacion)+" )";
                    img_google_name.Text = "( " + get_value("select img_google from instalaciones where id_instalacion = " + idinstalacion) + " )";
                    img_instalacion_name.Text = "( " + get_value("select img_instalacion from instalaciones where id_instalacion = " + idinstalacion) + " )";


                    string tipoinstalacioncad = get_value("SELECT DISTINCT tipo_instalacion.nombre_instalacion, instalaciones.id_instalacion "+
                           " FROM instalaciones INNER JOIN tipo_instalacion ON instalaciones.id_tipo_instalacion = tipo_instalacion.Id_tipo_instalacion "+
                           " where id_instalacion = " + idinstalacion);


                   
                    lblprovincia.Visible = true;
                    lblmunicipios.Visible = true;
                    lblinstalaciones.Visible = true;
                    lbltipoinstalacion.Visible = true;

                    lblprovincia.Text = provinciascad;
                    lblmunicipios.Text = municipioscad;
                    lblinstalaciones.Text = instalacioncad;
                    lbltipoinstalacion.Text = tipoinstalacioncad;

                    municipios.Visible = false;
                    provincias.Visible = false;
                    combo_intitucions.Visible = false;
                    tipo_instalacion.Visible = false;
                    gbimagenes.Visible = false;

                    try
                    {
                        intitucions = int.Parse(combo_intitucions.SelectedValue.ToString()); //id de la instalcion

                        if (intitucions != 0)
                        {

                            int count = radGridView1.Columns.Count;
                            for (int i = 0; i < count; i++)
                            {
                                radGridView1.Columns.RemoveAt(i);
                            }

                            radGridView1.Columns.Add(new GridViewTextBoxColumn()
                            {
                                HeaderText = "Equipos",
                                FieldName = "Equipo",
                                Width = 500,
                                ReadOnly = true
                            });
                            radGridView1.Columns.Add(new GridViewDecimalColumn()
                            {
                                HeaderText = "Total",
                                FieldName = "Total",
                                Width = 130,
                                DecimalPlaces = 0
                            });
                            radGridView1.Columns.Add(new GridViewDecimalColumn()
                            {
                                HeaderText = "En servicio",
                                FieldName = "Servicio",
                                Width = 130,
                                DecimalPlaces = 0
                            });
                            bindingSourceEquipamiento.Clear();
                        }
                    }
                    catch (Exception)
                    {
                        int count = radGridView1.Columns.Count;
                        for (int i = 0; i < count; i++)
                        {
                            radGridView1.Columns.RemoveAt(i);
                        }

                        radGridView1.Columns.Add(new GridViewTextBoxColumn()
                        {
                            HeaderText = "Equipos",
                            FieldName = "Equipo",
                            Width = 500,
                            ReadOnly = true
                        });
                        radGridView1.Columns.Add(new GridViewDecimalColumn()
                        {
                            HeaderText = "Total",
                            FieldName = "Total",
                            Width = 130,
                            DecimalPlaces = 0
                        });
                        radGridView1.Columns.Add(new GridViewDecimalColumn()
                        {
                            HeaderText = "En servicio",
                            FieldName = "Servicio",
                            Width = 130,
                            DecimalPlaces = 0
                        });
                        bindingSourceEquipamiento.Clear();
                    }
               
                }
                catch (Exception)
                {}
                
            }

            //========================== Nombre de las imagenes =====================
            img_acceso_name.Text = "( " + get_value("select img_osm from instalaciones where id_instalacion = " + intitucions) + " )";
            img_google_name.Text = "( " + get_value("select img_google from instalaciones where id_instalacion = " + intitucions) + " )";
            img_instalacion_name.Text = "( " + get_value("select img_instalacion from instalaciones where id_instalacion = " + intitucions) + " )";




            //===========================================================================*/
            String query = @"SELECT * FROM instalaciones where id_instalacion = " + intitucions;
            //MessageBox.Show(query);
            //*********************Consulta a la BD*************************
            OleDbCommand comand = new OleDbCommand();
            comand.CommandType = CommandType.Text;
            OleDbConnection _connection = new OleDbConnection();
            _connection.ConnectionString = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" + pathapp + @"\Datos\Campismo.mdb";
            comand.CommandText = query;
            OleDbDataAdapter Adapter = new OleDbDataAdapter();
            Adapter.SelectCommand = comand;
            Adapter.SelectCommand.Connection = _connection;
            DataTable dataTable2 = new DataTable();
            Adapter.Fill(dataTable2);


            //===========================================================================//
            String query1 = @"SELECT * FROM resumen where id_instalacion = " + intitucions;
            //MessageBox.Show(query);
            //*********************Consulta a la BD*************************
            OleDbCommand comand1 = new OleDbCommand();
            comand1.CommandType = CommandType.Text;
            OleDbConnection _connection1 = new OleDbConnection();
            _connection.ConnectionString = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" + pathapp + @"\Datos\Campismo.mdb";
            comand1.CommandText = query1;
            OleDbDataAdapter Adapter1 = new OleDbDataAdapter();
            Adapter1.SelectCommand = comand1;
            Adapter1.SelectCommand.Connection = _connection;
            DataTable dataTable21 = new DataTable();
            Adapter1.Fill(dataTable21);


            //===========================================================================//
            String servi = @"SELECT servicio_instalacion.Id_instalacion, Servicio.nombre_servicio
                            FROM (Servicio INNER JOIN servicio_instalacion ON Servicio.Id_servicio = servicio_instalacion.Id_servicio) 
                            INNER JOIN instalaciones ON servicio_instalacion.Id_instalacion = instalaciones.id_instalacion where 
                             servicio_instalacion.Id_instalacion=" + intitucions;
            //MessageBox.Show(query);
            //*********************Consulta a la BD*************************
            OleDbCommand comand2 = new OleDbCommand();
            comand2.CommandType = CommandType.Text;
            OleDbConnection _connection2 = new OleDbConnection();
            _connection.ConnectionString = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" + pathapp + @"\Datos\Campismo.mdb";
            comand2.CommandText = servi;
            OleDbDataAdapter Adapter2 = new OleDbDataAdapter();
            Adapter2.SelectCommand = comand2;
            Adapter2.SelectCommand.Connection = _connection;
            DataTable dataTable22 = new DataTable();
            Adapter2.Fill(dataTable22);
            try
            {
       
                for (int i = 0; i < dataTable22.Rows.Count; i++)
                {
                    string name = dataTable22.Rows[i].ItemArray[1].ToString();
                    foreach (Control c in Sevicios.Controls)
                    {
                        RadCheckBox check2 = (RadCheckBox)c;
                        if (check2.Text == name)
                            check2.Checked = true;
                    }
                }
              
            }

            catch (Exception)
            { }

            //===========================================================================*/
            String query13 = @"SELECT cabanna_instalacion.cantidad, cabanna_instalacion.disponibles, tipo_cabanna.mn, tipo_cabanna.cantidad_personas
                            FROM (tipo_cabanna INNER JOIN cabanna_instalacion ON tipo_cabanna.Id_tipo_cabanna = cabanna_instalacion.Id_tipo_cabanna) 
                            INNER JOIN instalaciones ON cabanna_instalacion.Id_instalacion = instalaciones.id_instalacion 
                            where instalaciones.id_instalacion =" + intitucions;
            //*********************Consulta a la BD*************************
            OleDbCommand comand13 = new OleDbCommand();
            comand13.CommandType = CommandType.Text;
            OleDbConnection _connection13 = new OleDbConnection();
            _connection.ConnectionString = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" + pathapp + @"\Datos\Campismo.mdb";
            comand13.CommandText = query13;
            OleDbDataAdapter Adapter13 = new OleDbDataAdapter();
            Adapter13.SelectCommand = comand13;
            Adapter13.SelectCommand.Connection = _connection;
            DataTable dataTable13 = new DataTable();
            Adapter13.Fill(dataTable13);

            try
            {

                for (int i = 0; i < dataTable13.Rows.Count; i++)
                {
                    string cant = dataTable13.Rows[i].ItemArray[0].ToString();
                    string disp = dataTable13.Rows[i].ItemArray[1].ToString();
                    string mn = dataTable13.Rows[i].ItemArray[2].ToString();
                    string cant_pers = dataTable13.Rows[i].ItemArray[3].ToString();
                    if (mn == "1")
                    {
                        if (cant_pers == "2")
                        {
                            cap2mn.Value = decimal.Parse(cant);
                            cap2mnD.Value = decimal.Parse(disp);
                        }
                        else if (cant_pers == "4")
                        {
                            cap4mn.Value = decimal.Parse(cant);
                            cap4mnD.Value = decimal.Parse(disp);
                        }
                        else if (cant_pers == "6")
                        {
                            cap6mn.Value = decimal.Parse(cant);
                            cap6mnD.Value = decimal.Parse(disp);
                        }
                        else if (cant_pers == "8")
                        {
                            cap8mn.Value = decimal.Parse(cant);
                            cap8mnD.Value = decimal.Parse(disp);
                        }

                    }
                    else
                    {
                        if (cant_pers == "2")
                        {
                            cap2cuc.Value = decimal.Parse(cant);
                            cap2cucD.Value = decimal.Parse(disp);
                        }
                        else if (cant_pers == "4")
                        {
                            cap4cuc.Value = decimal.Parse(cant);
                            cap4cucD.Value = decimal.Parse(disp);
                        }
                        else if (cant_pers == "6")
                        {
                            cap6cuc.Value = decimal.Parse(cant);
                            cap6cucD.Value = decimal.Parse(disp);
                        }
                        else if (cant_pers == "8")
                        {
                            cap8cuc.Value = decimal.Parse(cant);
                            cap8cucD.Value = decimal.Parse(disp);
                        }
                    }
                }




            }
            catch (Exception)
            { }
            //----------------------------------------------------------------------------------------
            String query14 = @"SELECT equipo.nombre_equipo, instalacion_equipo.cantidad, instalacion_equipo.disponibles, instalacion_equipo.Id_instalacion
                              FROM (equipo INNER JOIN instalacion_equipo ON equipo.Id_equipo = instalacion_equipo.Id_equipo) 
                              INNER JOIN instalaciones ON instalacion_equipo.Id_instalacion = instalaciones.id_instalacion
                              where instalaciones.id_instalacion =" + intitucions;
   
            //*********************Consulta a la BD*************************
            OleDbCommand comand14 = new OleDbCommand();
            comand14.CommandType = CommandType.Text;
            OleDbConnection _connection14 = new OleDbConnection();
            _connection.ConnectionString = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" + pathapp + @"\Datos\Campismo.mdb";
            comand14.CommandText = query14;
            OleDbDataAdapter Adapter14 = new OleDbDataAdapter();
            Adapter14.SelectCommand = comand14;
            Adapter14.SelectCommand.Connection = _connection;
            DataTable dataTable14 = new DataTable();
            Adapter14.Fill(dataTable14);

       
            if (dataTable14.Rows.Count > 0)
            {
                bindingSourceEquipamiento.Clear();
                object[] mio = new object[100];

                for (int i = 0; i < dataTable14.Rows.Count; i++)
                {
                    string Equipo1 = dataTable14.Rows[i].ItemArray[0].ToString();
                    int Total1 = int.Parse(dataTable14.Rows[i].ItemArray[1].ToString());
                    int Servicio1 = int.Parse(dataTable14.Rows[i].ItemArray[2].ToString());
                    if (Equipo1 != "" && Total1 != null && Servicio1 != null)
                    {
                        Equipamiento equi = new Equipamiento() { Equipo = Equipo1, Total = Total1, Servicio = Servicio1 };
                        mio[i] = equi;
                    }
                    else
                        break;
                }

                for (int i = 0; i < dataTable14.Rows.Count; i++)
                {

                    bindingSourceEquipamiento.Add(mio[i]);

                }
            }
            else
            {
                bindingSourceEquipamiento.Clear();
                Equipamiento Aire = new Equipamiento() { Equipo = "Aires acondicionados", Total = 0, Servicio = 0 };
                Equipamiento Split = new Equipamiento() { Equipo = "Splits", Total = 0, Servicio = 0 };
                Equipamiento Minibares = new Equipamiento() { Equipo = "Minibares", Total = 0, Servicio = 0 };
                Equipamiento Televisores = new Equipamiento() { Equipo = "Televisores", Total = 0, Servicio = 0 };
                Equipamiento Literas = new Equipamiento() { Equipo = "Literas (Industrial Moderna)", Total = 0, Servicio = 0 };
                Equipamiento Ventiladores = new Equipamiento() { Equipo = "Ventiladores", Total = 0, Servicio = 0 };
                Equipamiento BasculaL = new Equipamiento() { Equipo = "Bascula L-EQ10/20 lb", Total = 0, Servicio = 0 };
                Equipamiento BasculaE = new Equipamiento() { Equipo = "Bascula EQB100/200 lb", Total = 0, Servicio = 0 };
                Equipamiento Cafetera = new Equipamiento() { Equipo = "Cafetera Industrial", Total = 0, Servicio = 0 };
                Equipamiento Freidora = new Equipamiento() { Equipo = "Freidora 2 cestos", Total = 0, Servicio = 0 };
                Equipamiento Revanadora = new Equipamiento() { Equipo = "Revanadora de Friambre", Total = 0, Servicio = 0 };
                Equipamiento Horno = new Equipamiento() { Equipo = "Horno", Total = 0, Servicio = 0 };
                Equipamiento Exhibidor = new Equipamiento() { Equipo = "Exhibidor Vertical", Total = 0, Servicio = 0 };
                Equipamiento Matenedor = new Equipamiento() { Equipo = "Matenedor refrigerado", Total = 0, Servicio = 0 };
                Equipamiento Frezzer = new Equipamiento() { Equipo = "Frezzer", Total = 0, Servicio = 0 };
                Equipamiento Cocina = new Equipamiento() { Equipo = "Cocina de 2H", Total = 0, Servicio = 0 };
                Equipamiento Fabricador = new Equipamiento() { Equipo = "Fabricador de hielo de 80kg", Total = 0, Servicio = 0 };
                Equipamiento Cajas = new Equipamiento() { Equipo = "Cajas rejistradoras", Total = 0, Servicio = 0 };
                Equipamiento Equipos = new Equipamiento() { Equipo = "Equipos de audio", Total = 0, Servicio = 0 };
                Equipamiento Bombas = new Equipamiento() { Equipo = "Bombas de Piscina Agua Salada", Total = 0, Servicio = 0 };
                Equipamiento BombasR = new Equipamiento() { Equipo = "Bombas de Residuales", Total = 0, Servicio = 0 };
                Equipamiento BombasP = new Equipamiento() { Equipo = "Bombas de Piscina Potable", Total = 0, Servicio = 0 };
                Equipamiento Banco = new Equipamiento() { Equipo = "Banco de Capacitores", Total = 0, Servicio = 0 };
                Equipamiento Refrigeradores = new Equipamiento() { Equipo = "Refrigeradores", Total = 0, Servicio = 0 };
                Equipamiento Camas = new Equipamiento() { Equipo = "Camas", Total = 0, Servicio = 0 };
                Equipamiento DVD = new Equipamiento() { Equipo = "DVD", Total = 0, Servicio = 0 };

                object[] mio = { Aire, Split, Minibares, Televisores, Literas, Ventiladores, BasculaL, BasculaE, Cafetera, Freidora, Revanadora, Horno, Exhibidor, Matenedor, Frezzer, Cocina, Fabricador, Cajas, Equipos, Bombas, BombasP, BombasR, Banco, Refrigeradores, Camas, DVD };
                for (int i = 0; i < mio.Length; i++) { bindingSourceEquipamiento.Add(mio[i]); }
            }
            try
            {
                //-----------------------//cat de campismos
                if (dataTable2.Rows[0].ItemArray[17].ToString() == "1ra")
                { prim_catg.Checked = true; }
                if (dataTable2.Rows[0].ItemArray[17].ToString() == "2da")
                { s_catg.Checked = true; }
                if (dataTable2.Rows[0].ItemArray[17].ToString() == "3ra")
                { terc_cat.Checked = true; }
                if (dataTable2.Rows[0].ItemArray[17].ToString() == "4ta")
                { cta_catg.Checked = true; }
                if (dataTable2.Rows[0].ItemArray[17].ToString() == "5ta")
                { quin_catg.Checked = true; }
                //-----------------------//cat villa  
                if (dataTable2.Rows[0].ItemArray[18].ToString() == "1")
                { una_estr.Checked = true; }
                if (dataTable2.Rows[0].ItemArray[18].ToString() == "2")
                { dos_estr.Checked = true; }
                if (dataTable2.Rows[0].ItemArray[18].ToString() == "3")
                { ter_cat.Checked = true; }
                //-----------------------//stado
                if (dataTable2.Rows[0].ItemArray[16].ToString() == "B")
                { radio_bueno.IsChecked = true; }
                if (dataTable2.Rows[0].ItemArray[16].ToString() == "R")
                { radio_regular.IsChecked = true; }
                if (dataTable2.Rows[0].ItemArray[16].ToString() == "M")
                { radio_malo.IsChecked = true; }
                //-----------------------//tipos de turismos 
                if (dataTable2.Rows[0].ItemArray[9].ToString() == "1") { national.Checked = true; }
                if (dataTable2.Rows[0].ItemArray[10].ToString() == "1") { international.Checked = true; }
     

                email.Text = dataTable2.Rows[0].ItemArray[7].ToString();
                dir.Text = dataTable2.Rows[0].ItemArray[4].ToString();

                tipo_instalacion.ResetText();
                tipo_instalacion.SelectedText = dataTable2.Rows[0].ItemArray[1].ToString();

            }
            catch (Exception)
            { }



            if (!(dataTable2.Rows[0].ItemArray[6] is DBNull))
            {
                fax.Value = decimal.Parse(dataTable2.Rows[0].ItemArray[6].ToString());
            }
            else
            {
                fax.Value = 0;
            }

            if (!(dataTable2.Rows[0].ItemArray[5] is DBNull))
            {
                telf.Value = decimal.Parse(dataTable2.Rows[0].ItemArray[5].ToString());
            }
            else
            {
                telf.Value = 0;
            }

   
            oleDbConnection.Close();
            //===========================================================================*/

            try
            {
                contactos.Text = "";
                Text_infoG.Text = "";
                Text_infoG.Text = dataTable21.Rows[0].ItemArray[1].ToString();
                contactos.Text = dataTable21.Rows[0].ItemArray[3].ToString();
            }
            catch (Exception)
            { }

        
            if (puntual) 
                save.Hide();
            else 
                save.Show();

        }

        private void combo_intitucions_SelectedValueChanged(object sender, EventArgs e)
        {

           muestra_datos(false, "","","");

        }       

        private void cap2mn_ValueChanged(object sender, EventArgs e)
       {
           labCT.Text = "0";
           capExis.Text = "0";
           int total = 0;
           int capacidad = 0;
           total += (int)cap2mn.Value;
           total += (int)cap4mn.Value;
           total += (int)cap6mn.Value;
           total += (int)cap8mn.Value;
           total += (int)cap2cuc.Value;
           total += (int)cap4cuc.Value;
           total += (int)cap6cuc.Value;
           total += (int)cap8cuc.Value;
           labCT.Text = total.ToString();
           capacidad += (int)cap2mn.Value * 2;
           capacidad += (int)cap4mn.Value * 4;
           capacidad += (int)cap6mn.Value * 6;
           capacidad += (int)cap8mn.Value * 8;
           capacidad += (int)cap2cuc.Value * 2;
           capacidad += (int)cap4cuc.Value * 4;
           capacidad += (int)cap6cuc.Value * 6;
           capacidad += (int)cap8cuc.Value * 8;
           labCT.Text = total.ToString();
           capExis.Text = capacidad.ToString();
       }

        private void cap4mn_ValueChanged(object sender, EventArgs e)
       {
           labCT.Text = "0";
           capExis.Text = "0";
           int total = 0;
           int capacidad = 0;
           total += (int)cap2mn.Value;
           total += (int)cap4mn.Value;
           total += (int)cap6mn.Value;
           total += (int)cap8mn.Value;
           total += (int)cap2cuc.Value;
           total += (int)cap4cuc.Value;
           total += (int)cap6cuc.Value;
           total += (int)cap8cuc.Value;
           labCT.Text = total.ToString();
           capacidad += (int)cap2mn.Value * 2;
           capacidad += (int)cap4mn.Value * 4;
           capacidad += (int)cap6mn.Value * 6;
           capacidad += (int)cap8mn.Value * 8;
           capacidad += (int)cap2cuc.Value * 2;
           capacidad += (int)cap4cuc.Value * 4;
           capacidad += (int)cap6cuc.Value * 6;
           capacidad += (int)cap8cuc.Value * 8;
           labCT.Text = total.ToString();
           capExis.Text = capacidad.ToString();
       }

        private void cap6mn_ValueChanged(object sender, EventArgs e)
       {
           labCT.Text = "0";
           capExis.Text = "0";
           int total = 0;
           int capacidad = 0;
           total += (int)cap2mn.Value;
           total += (int)cap4mn.Value;
           total += (int)cap6mn.Value;
           total += (int)cap8mn.Value;
           total += (int)cap2cuc.Value;
           total += (int)cap4cuc.Value;
           total += (int)cap6cuc.Value;
           total += (int)cap8cuc.Value;
           labCT.Text = total.ToString();
           capacidad += (int)cap2mn.Value * 2;
           capacidad += (int)cap4mn.Value * 4;
           capacidad += (int)cap6mn.Value * 6;
           capacidad += (int)cap8mn.Value * 8;
           capacidad += (int)cap2cuc.Value * 2;
           capacidad += (int)cap4cuc.Value * 4;
           capacidad += (int)cap6cuc.Value * 6;
           capacidad += (int)cap8cuc.Value * 8;
           labCT.Text = total.ToString();
           capExis.Text = capacidad.ToString();
       }

        private void cap8mn_ValueChanged(object sender, EventArgs e)
       {
           labCT.Text = "0";
           capExis.Text = "0";
           int total = 0;
           int capacidad = 0;
           total += (int)cap2mn.Value;
           total += (int)cap4mn.Value;
           total += (int)cap6mn.Value;
           total += (int)cap8mn.Value;
           total += (int)cap2cuc.Value;
           total += (int)cap4cuc.Value;
           total += (int)cap6cuc.Value;
           total += (int)cap8cuc.Value;
           labCT.Text = total.ToString();
           capacidad += (int)cap2mn.Value * 2;
           capacidad += (int)cap4mn.Value * 4;
           capacidad += (int)cap6mn.Value * 6;
           capacidad += (int)cap8mn.Value * 8;
           capacidad += (int)cap2cuc.Value * 2;
           capacidad += (int)cap4cuc.Value * 4;
           capacidad += (int)cap6cuc.Value * 6;
           capacidad += (int)cap8cuc.Value * 8;
           labCT.Text = total.ToString();
           capExis.Text = capacidad.ToString();
       }

        private void cap2cuc_ValueChanged(object sender, EventArgs e)
       {
           labCT.Text = "0";
           capExis.Text = "0";
           int total = 0;
           int capacidad = 0;
           total += (int)cap2mn.Value;
           total += (int)cap4mn.Value;
           total += (int)cap6mn.Value;
           total += (int)cap8mn.Value;
           total += (int)cap2cuc.Value;
           total += (int)cap4cuc.Value;
           total += (int)cap6cuc.Value;
           total += (int)cap8cuc.Value;
           labCT.Text = total.ToString();
           capacidad += (int)cap2mn.Value * 2;
           capacidad += (int)cap4mn.Value * 4;
           capacidad += (int)cap6mn.Value * 6;
           capacidad += (int)cap8mn.Value * 8;
           capacidad += (int)cap2cuc.Value * 2;
           capacidad += (int)cap4cuc.Value * 4;
           capacidad += (int)cap6cuc.Value * 6;
           capacidad += (int)cap8cuc.Value * 8;
           labCT.Text = total.ToString();
           capExis.Text = capacidad.ToString();
       }

        private void cap4cuc_ValueChanged(object sender, EventArgs e)
       {
           labCT.Text = "0";
           capExis.Text = "0";
           int total = 0;
           int capacidad = 0;
           total += (int)cap2mn.Value;
           total += (int)cap4mn.Value;
           total += (int)cap6mn.Value;
           total += (int)cap8mn.Value;
           total += (int)cap2cuc.Value;
           total += (int)cap4cuc.Value;
           total += (int)cap6cuc.Value;
           total += (int)cap8cuc.Value;
           labCT.Text = total.ToString();
           capacidad += (int)cap2mn.Value * 2;
           capacidad += (int)cap4mn.Value * 4;
           capacidad += (int)cap6mn.Value * 6;
           capacidad += (int)cap8mn.Value * 8;
           capacidad += (int)cap2cuc.Value * 2;
           capacidad += (int)cap4cuc.Value * 4;
           capacidad += (int)cap6cuc.Value * 6;
           capacidad += (int)cap8cuc.Value * 8;
           labCT.Text = total.ToString();
           capExis.Text = capacidad.ToString();
       }

        private void cap6cuc_ValueChanged(object sender, EventArgs e)
       {
           labCT.Text = "0";
           capExis.Text = "0";
           int total = 0;
           int capacidad = 0;
           total += (int)cap2mn.Value;
           total += (int)cap4mn.Value;
           total += (int)cap6mn.Value;
           total += (int)cap8mn.Value;
           total += (int)cap2cuc.Value;
           total += (int)cap4cuc.Value;
           total += (int)cap6cuc.Value;
           total += (int)cap8cuc.Value;
           labCT.Text = total.ToString();
           capacidad += (int)cap2mn.Value * 2;
           capacidad += (int)cap4mn.Value * 4;
           capacidad += (int)cap6mn.Value * 6;
           capacidad += (int)cap8mn.Value * 8;
           capacidad += (int)cap2cuc.Value * 2;
           capacidad += (int)cap4cuc.Value * 4;
           capacidad += (int)cap6cuc.Value * 6;
           capacidad += (int)cap8cuc.Value * 8;
           labCT.Text = total.ToString();
           capExis.Text = capacidad.ToString();
       }

        private void cap8cuc_ValueChanged(object sender, EventArgs e)
       {
           labCT.Text = "0";
           capExis.Text = "0";
           int total = 0;
           int capacidad = 0;
           total += (int)cap2mn.Value;
           total += (int)cap4mn.Value;
           total += (int)cap6mn.Value;
           total += (int)cap8mn.Value;
           total += (int)cap2cuc.Value;
           total += (int)cap4cuc.Value;
           total += (int)cap6cuc.Value;
           total += (int)cap8cuc.Value;
           labCT.Text = total.ToString();
           capacidad += (int)cap2mn.Value * 2;
           capacidad += (int)cap4mn.Value * 4;
           capacidad += (int)cap6mn.Value * 6;
           capacidad += (int)cap8mn.Value * 8;
           capacidad += (int)cap2cuc.Value * 2;
           capacidad += (int)cap4cuc.Value * 4;
           capacidad += (int)cap6cuc.Value * 6;
           capacidad += (int)cap8cuc.Value * 8;
           labCT.Text = total.ToString();
           capExis.Text = capacidad.ToString();
       }

        private void cap2mnD_ValueChanged(object sender, EventArgs e)
       {
           labCD.Text = "0";
           capDisp.Text = "0";
           int total = 0;
           int capacidad = 0;
           total += (int)cap2mnD.Value;
           total += (int)cap4mnD.Value;
           total += (int)cap6mnD.Value;
           total += (int)cap8mnD.Value;
           total += (int)cap2cucD.Value;
           total += (int)cap4cucD.Value;
           total += (int)cap6cucD.Value;
           total += (int)cap8cucD.Value;
           capacidad += (int)cap2mnD.Value * 2;
           capacidad += (int)cap4mnD.Value * 4;
           capacidad += (int)cap6mnD.Value * 6;
           capacidad += (int)cap8mnD.Value * 8;
           capacidad += (int)cap2cucD.Value * 2;
           capacidad += (int)cap4cucD.Value * 4;
           capacidad += (int)cap6cucD.Value * 6;
           capacidad += (int)cap8cucD.Value * 8;
           labCD.Text = total.ToString();
           capDisp.Text = capacidad.ToString();
       }

        private void cap4mnD_ValueChanged(object sender, EventArgs e)
       {
           labCD.Text = "0";
           capDisp.Text = "0";
           int total = 0;
           int capacidad = 0;
           total += (int)cap2mnD.Value;
           total += (int)cap4mnD.Value;
           total += (int)cap6mnD.Value;
           total += (int)cap8mnD.Value;
           total += (int)cap2cucD.Value;
           total += (int)cap4cucD.Value;
           total += (int)cap6cucD.Value;
           total += (int)cap8cucD.Value;
           capacidad += (int)cap2mnD.Value * 2;
           capacidad += (int)cap4mnD.Value * 4;
           capacidad += (int)cap6mnD.Value * 6;
           capacidad += (int)cap8mnD.Value * 8;
           capacidad += (int)cap2cucD.Value * 2;
           capacidad += (int)cap4cucD.Value * 4;
           capacidad += (int)cap6cucD.Value * 6;
           capacidad += (int)cap8cucD.Value * 8;
           labCD.Text = total.ToString();
           capDisp.Text = capacidad.ToString();
       }

        private void cap6mnD_ValueChanged(object sender, EventArgs e)
       {
           labCD.Text = "0";
           capDisp.Text = "0";
           int total = 0;
           int capacidad = 0;
           total += (int)cap2mnD.Value;
           total += (int)cap4mnD.Value;
           total += (int)cap6mnD.Value;
           total += (int)cap8mnD.Value;
           total += (int)cap2cucD.Value;
           total += (int)cap4cucD.Value;
           total += (int)cap6cucD.Value;
           total += (int)cap8cucD.Value;
           capacidad += (int)cap2mnD.Value * 2;
           capacidad += (int)cap4mnD.Value * 4;
           capacidad += (int)cap6mnD.Value * 6;
           capacidad += (int)cap8mnD.Value * 8;
           capacidad += (int)cap2cucD.Value * 2;
           capacidad += (int)cap4cucD.Value * 4;
           capacidad += (int)cap6cucD.Value * 6;
           capacidad += (int)cap8cucD.Value * 8;
           labCD.Text = total.ToString();
           capDisp.Text = capacidad.ToString();
       }

        private void cap8mnD_ValueChanged(object sender, EventArgs e)
       {
           labCD.Text = "0";
           capDisp.Text = "0";
           int total = 0;
           int capacidad = 0;
           total += (int)cap2mnD.Value;
           total += (int)cap4mnD.Value;
           total += (int)cap6mnD.Value;
           total += (int)cap8mnD.Value;
           total += (int)cap2cucD.Value;
           total += (int)cap4cucD.Value;
           total += (int)cap6cucD.Value;
           total += (int)cap8cucD.Value;
           capacidad += (int)cap2mnD.Value * 2;
           capacidad += (int)cap4mnD.Value * 4;
           capacidad += (int)cap6mnD.Value * 6;
           capacidad += (int)cap8mnD.Value * 8;
           capacidad += (int)cap2cucD.Value * 2;
           capacidad += (int)cap4cucD.Value * 4;
           capacidad += (int)cap6cucD.Value * 6;
           capacidad += (int)cap8cucD.Value * 8;
           labCD.Text = total.ToString();
           capDisp.Text = capacidad.ToString();
       }

        private void cap2cucD_ValueChanged(object sender, EventArgs e)
       {
           labCD.Text = "0";
           capDisp.Text = "0";
           int total = 0;
           int capacidad = 0;
           total += (int)cap2mnD.Value;
           total += (int)cap4mnD.Value;
           total += (int)cap6mnD.Value;
           total += (int)cap8mnD.Value;
           total += (int)cap2cucD.Value;
           total += (int)cap4cucD.Value;
           total += (int)cap6cucD.Value;
           total += (int)cap8cucD.Value;
           capacidad += (int)cap2mnD.Value * 2;
           capacidad += (int)cap4mnD.Value * 4;
           capacidad += (int)cap6mnD.Value * 6;
           capacidad += (int)cap8mnD.Value * 8;
           capacidad += (int)cap2cucD.Value * 2;
           capacidad += (int)cap4cucD.Value * 4;
           capacidad += (int)cap6cucD.Value * 6;
           capacidad += (int)cap8cucD.Value * 8;
           labCD.Text = total.ToString();
           capDisp.Text = capacidad.ToString();
       }

        private void cap4cucD_ValueChanged(object sender, EventArgs e)
       {
           labCD.Text = "0";
           capDisp.Text = "0";
           int total = 0;
           int capacidad = 0;
           total += (int)cap2mnD.Value;
           total += (int)cap4mnD.Value;
           total += (int)cap6mnD.Value;
           total += (int)cap8mnD.Value;
           total += (int)cap2cucD.Value;
           total += (int)cap4cucD.Value;
           total += (int)cap6cucD.Value;
           total += (int)cap8cucD.Value;
           capacidad += (int)cap2mnD.Value * 2;
           capacidad += (int)cap4mnD.Value * 4;
           capacidad += (int)cap6mnD.Value * 6;
           capacidad += (int)cap8mnD.Value * 8;
           capacidad += (int)cap2cucD.Value * 2;
           capacidad += (int)cap4cucD.Value * 4;
           capacidad += (int)cap6cucD.Value * 6;
           capacidad += (int)cap8cucD.Value * 8;
           labCD.Text = total.ToString();
           capDisp.Text = capacidad.ToString();
       }

        private void cap6cucD_ValueChanged(object sender, EventArgs e)
       {
           labCD.Text = "0";
           capDisp.Text = "0";
           int total = 0;
           int capacidad = 0;
           total += (int)cap2mnD.Value;
           total += (int)cap4mnD.Value;
           total += (int)cap6mnD.Value;
           total += (int)cap8mnD.Value;
           total += (int)cap2cucD.Value;
           total += (int)cap4cucD.Value;
           total += (int)cap6cucD.Value;
           total += (int)cap8cucD.Value;
           capacidad += (int)cap2mnD.Value * 2;
           capacidad += (int)cap4mnD.Value * 4;
           capacidad += (int)cap6mnD.Value * 6;
           capacidad += (int)cap8mnD.Value * 8;
           capacidad += (int)cap2cucD.Value * 2;
           capacidad += (int)cap4cucD.Value * 4;
           capacidad += (int)cap6cucD.Value * 6;
           capacidad += (int)cap8cucD.Value * 8;
           labCD.Text = total.ToString();
           capDisp.Text = capacidad.ToString();
       }

        private void cap8cucD_ValueChanged(object sender, EventArgs e)
       {
           labCD.Text = "0";
           capDisp.Text = "0";
           int total = 0;
           int capacidad = 0;
           total += (int)cap2mnD.Value;
           total += (int)cap4mnD.Value;
           total += (int)cap6mnD.Value;
           total += (int)cap8mnD.Value;
           total += (int)cap2cucD.Value;
           total += (int)cap4cucD.Value;
           total += (int)cap6cucD.Value;
           total += (int)cap8cucD.Value;
           capacidad += (int)cap2mnD.Value * 2;
           capacidad += (int)cap4mnD.Value * 4;
           capacidad += (int)cap6mnD.Value * 6;
           capacidad += (int)cap8mnD.Value * 8;
           capacidad += (int)cap2cucD.Value * 2;
           capacidad += (int)cap4cucD.Value * 4;
           capacidad += (int)cap6cucD.Value * 6;
           capacidad += (int)cap8cucD.Value * 8;
           labCD.Text = total.ToString();
           capDisp.Text = capacidad.ToString();
       }

        private void una_estr_Click(object sender, EventArgs e)
        {
            una_estr.Checked = ((RadCheckBox)sender).Checked;
            dos_estr.Checked = false;
            ter_cat.Checked = false;
        }

        private void dos_estr_Click(object sender, EventArgs e)
        {
            dos_estr.Checked = ((RadCheckBox)sender).Checked;
            una_estr.Checked = false;
            ter_cat.Checked = false;
        }

        private void ter_cat_Click(object sender, EventArgs e)
        {
            ter_cat.Checked = ((RadCheckBox)sender).Checked;
            dos_estr.Checked = false;
            una_estr.Checked = false;
        }

        private void prim_catg_Click(object sender, EventArgs e)
        {
            prim_catg.Checked = ((RadCheckBox)sender).Checked;
            terc_cat.Checked = false;
            s_catg.Checked = false;
            cta_catg.Checked = false;
            quin_catg.Checked = false;
        }

        private void s_catg_Click(object sender, EventArgs e)
        {
            s_catg.Checked = ((RadCheckBox)sender).Checked;
            terc_cat.Checked = false;
            prim_catg.Checked = false;
            cta_catg.Checked = false;
            quin_catg.Checked = false;
        }

        private void terc_cat_Click(object sender, EventArgs e)
        {
            terc_cat.Checked = ((RadCheckBox)sender).Checked;
            s_catg.Checked = false;
            prim_catg.Checked = false;
            cta_catg.Checked = false;
            quin_catg.Checked = false;
        }

        private void cta_catg_Click(object sender, EventArgs e)
        {
            cta_catg.Checked = ((RadCheckBox)sender).Checked;
            terc_cat.Checked = false;
            s_catg.Checked = false;
            prim_catg.Checked = false;
            quin_catg.Checked = false;
        }

        private void quin_catg_Click(object sender, EventArgs e)
        {
            quin_catg.Checked = ((RadCheckBox)sender).Checked;
            terc_cat.Checked = false;
            s_catg.Checked = false;
            prim_catg.Checked = false;
            cta_catg.Checked = false;
        }
                     
        }
    }

