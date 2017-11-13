using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Text;
using System.Windows.Forms;
using Telerik.WinControls;
using System.Data.OleDb;

namespace SIGCampismo
{
    struct Servicio
    {
        public int Id { get; set; }
        public string Desc { get; set; }        
    }

     struct instalacion
    {
        public int Id { get; set; }
        public string Desc { get; set; }        
    }


    public partial class frmSpatialFilter : Telerik.WinControls.UI.RadForm
    {
        private List<Servicio> servicios;
        private List<Servicio> servicios_selected;
        private List<instalacion> instalacion_selected;
        
        MapInfoLibrary.TMap _Mapa;
        string _idventana;
        string query;
        int tipoinst = 1;

        public frmSpatialFilter(MapInfoLibrary.TMap Mapa, string idventana)
        {
            InitializeComponent();
            this._Mapa = Mapa;
            this._idventana = idventana;
            servicios = new List<Servicio>();
            servicios_selected = new List<Servicio>();
            instalacion_selected = new List<instalacion>();
        }

        private void frmSpatialFilter_Load(object sender, EventArgs e)
        {
            // TODO: This line of code loads data into the 'servicioDataSet.Servicio' table. You can move, or remove it, as needed.


            string pathapp = Application.StartupPath;

            oleDbConnection.ConnectionString = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" + pathapp + @"\Datos\Campismo.mdb";

            servicioTableAdapter.Connection.ConnectionString = oleDbConnection.ConnectionString;
            municipiosTableAdapter.Connection.ConnectionString = oleDbConnection.ConnectionString;
            provinciasTableAdapter.Connection.ConnectionString = oleDbConnection.ConnectionString;
            
            
            this.servicioTableAdapter.Fill(this.servicioDataSet.Servicio);
            // TODO: This line of code loads data into the 'municipiosDataSet.municipios' table. You can move, or remove it, as needed.
            this.municipiosTableAdapter.Fill(this.municipiosDataSet.municipios);
            // TODO: This line of code loads data into the 'provinciaDataSet.Provincias' table. You can move, or remove it, as needed.
            this.provinciasTableAdapter.Fill(this.provinciaDataSet.Provincias);
            provinciasBindingSource.Sort = "Idprovincia";
            municipiosBindingSource.Sort = "Idprovincia";
            cbprovincia.SelectedIndex = -1;
            cbmunicipios.SelectedIndex = -1;
            cbprovincia.Text = "Todas";
               
            int cant = this.servicioTableAdapter.GetData().Count;

            for (int i = 0; i < cant; i++)
            {
                Servicio serv = new Servicio()
                {
                    Id = int.Parse(this.servicioTableAdapter.GetData()[i].ItemArray[0].ToString()),
                    Desc = this.servicioTableAdapter.GetData()[i].ItemArray[1].ToString()
                };
                servicios.Add(serv);
                listaservicios.Items.Add(serv.Desc);
            }
        }

        private void cbprovincia_SelectedIndexChanged(object sender, Telerik.WinControls.UI.Data.PositionChangedEventArgs e)
        {
            if (cbprovincia.SelectedIndex != -1)
            {
                municipiosBindingSource.Filter = "idprovincia = " + cbprovincia.SelectedValue.ToString();
                cbmunicipios.SelectedIndex = -1;
            }
        }

        private void radButton1_Click(object sender, EventArgs e)
        {
            if (listaservicios.SelectedIndex != -1)
            {
                var desc = listaservicios.Items[listaservicios.SelectedIndex].ToString();
                listaserviciosele.Items.Add(desc);                
                listaservicios.Items.RemoveAt(listaservicios.SelectedIndex);

                Servicio serv = servicios.Find(
                    delegate(Servicio s) {
                        return s.Desc == desc;
                    }
                );
                servicios_selected.Add(serv);
                servicios.Remove(serv);
            }
        }

        private void radButton2_Click(object sender, EventArgs e)
        {
            if (listaserviciosele.SelectedIndex != -1)
            {
                var desc = listaserviciosele.Items[listaserviciosele.SelectedIndex].ToString();
                listaservicios.Items.Add(desc);
                listaserviciosele.Items.RemoveAt(listaserviciosele.SelectedIndex);
                Servicio serv = servicios_selected.Find(
                    delegate(Servicio s)
                    {
                        return s.Desc == desc;
                    }
                );
                servicios.Add(serv);
                servicios_selected.Remove(serv);
            }
        }

        public void selecciona_instalaciones()
        {
           
            // Obtener todas las instalaciones que cuentan con los servicios seleccionados

          if ((cbprovincia.SelectedIndex == -1) || (cbprovincia.Text == "Todas"))
            {
                query = "SELECT distinct servicio_instalacion.id_instalacion from servicio_instalacion WHERE servicio_instalacion.id_servicio IN (";
            }
          else if ((cbprovincia.SelectedIndex != -1 || (cbprovincia.Text != "Todas")) && (cbmunicipios.Text == "Todos") || cbmunicipios.SelectedIndex == -1)
            {
                query = "SELECT distinct servicio_instalacion.id_instalacion from servicio_instalacion,instalaciones WHERE servicio_instalacion.id_instalacion = instalaciones.id_instalacion and "
                    + " instalaciones.id_provincia = "+ cbprovincia.SelectedValue.ToString() + " and servicio_instalacion.id_servicio IN (";


            } if ((cbprovincia.SelectedIndex != -1 || (cbprovincia.Text != "Todas")) && ((cbmunicipios.Text != "Todos") && (cbmunicipios.Text != "")) || cbmunicipios.SelectedIndex != -1)
            {
                query = "SELECT distinct servicio_instalacion.id_instalacion from servicio_instalacion,instalaciones WHERE servicio_instalacion.id_instalacion = instalaciones.id_instalacion and "
                  + " instalaciones.id_provincia = " + cbprovincia.SelectedValue.ToString() + " and instalaciones.id_municipio = " + cbmunicipios.SelectedValue.ToString() + " and servicio_instalacion.id_servicio IN (";
            }


            foreach (var item in servicios_selected)
                query += item.Id + ",";

            query = query.Remove(query.Length - 1);
            query += ")";

            try
            {
            string queryString = query;
            OleDbCommand commandOleDb = new OleDbCommand(queryString, oleDbConnection);
            commandOleDb.CommandTimeout = 20;
            oleDbConnection.Open();
            OleDbDataReader reader = null;
         
                reader = commandOleDb.ExecuteReader();
                while (reader.Read())
                {
                    instalacion serv = new instalacion()
                    {
                        Id = int.Parse(reader[0].ToString()),
                    };
                    instalacion_selected.Add(serv);
                }
                reader.Close();
            }
            catch (Exception)
            {
                MessageBox.Show("No existe instalación con esos servicios....");
                return;
            }

            query = "SELECT * from Instalaciones WHERE id_instalacion = ";

            foreach (var item in instalacion_selected)
                query += item.Id + " or id_instalacion =";

            query = query.Substring(0, query.Length-20);

            string consulta = query + " into instalasele";
            try
            {
                _Mapa.Mapinfo.Do(consulta);
                _Mapa.Layers.HideLayer("instalaciones");
                _Mapa.Mapinfo.Do("Add Map Window " + _idventana + " Auto Layer instalasele");

                if (tipoinst == 1) _Mapa.Mapinfo.Do("Set Map Window " + _idventana + " Layer instalasele Display Global  Global Symbol (\"Inst de Campismo.bmp\",16711680,36,0)");
                if (tipoinst == 2) _Mapa.Mapinfo.Do("Set Map Window " + _idventana + " Layer instalasele Display Global  Global Symbol (\"punto venta.bmp\",65280,36,0)");
                if (tipoinst == 4) _Mapa.Mapinfo.Do("Set Map Window " + _idventana + " Layer instalasele Display Global  Global Symbol (\"oficina reservacion.bmp\",16711935,36,0)");
                if (tipoinst == 5) _Mapa.Mapinfo.Do("Set Map Window " + _idventana + " Layer instalasele Display Global  Global Symbol (\"empresa.bmp\",16776960,18,0)");
                if (tipoinst == 6) _Mapa.Mapinfo.Do("Set Map Window " + _idventana + " Layer instalasele Display Global  Global Symbol (\"agencia viajescm.bmp\",65535,36,0)");
                if (tipoinst == 7) _Mapa.Mapinfo.Do("Set Map Window " + _idventana + " Layer instalasele Display Global  Global Symbol (\"villa turistica.bmp\",8388608,36,0)");
                if (tipoinst == 8) _Mapa.Mapinfo.Do("Set Map Window " + _idventana + " Layer instalasele Display Global  Global Symbol (\"abastecimiento.bmp\",8388608,36,0)");
                if (tipoinst == 9) _Mapa.Mapinfo.Do("Set Map Window " + _idventana + " Layer instalasele Display Global  Global Symbol (\"parq turistico.bmp\",8388608,36,0)");

                _Mapa.HideThematicLayer(true);
            }
            catch (Exception)
            {

            }

        }
       
        private void btnlocalizar_Click(object sender, EventArgs e)
        {
            selecciona_instalaciones(); 
       }

        private void frmSpatialFilter_FormClosed(object sender, FormClosedEventArgs e)
        {
            try
            {
                if (_Mapa.Layers.ExistLayer("instalasele") == true)
                {
                    _Mapa.Layers.DeleteLayer("instalasele");
                    _Mapa.Layers.ShowLayer("instalaciones");
                    _Mapa.HideThematicLayer(false);
                    _Mapa.Limpiar();
                }
            }
            catch (Exception)
            {

            }
        }

        private void radRadioButton7_Click(object sender, EventArgs e)
        {
            tipoinst = 1;
        }

        private void radRadioButton8_Click(object sender, EventArgs e)
        {
            tipoinst = 2;
        }

        private void radRadioButton10_Click(object sender, EventArgs e)
        {
            tipoinst = 4;
        }

        private void radRadioButton2_Click(object sender, EventArgs e)
        {
            tipoinst = 5;
        }

        private void radRadioButton11_Click(object sender, EventArgs e)
        {
            tipoinst = 6;
        }

        private void radRadioButton1_Click(object sender, EventArgs e)
        {
            tipoinst = 7;
        }

        private void radRadioButton3_Click(object sender, EventArgs e)
        {
            tipoinst = 8;
        }

        private void radRadioButton4_Click(object sender, EventArgs e)
        {
            tipoinst = 9;
        }

        private void radLabel4_Click(object sender, EventArgs e)
        {

        }
    }
}
