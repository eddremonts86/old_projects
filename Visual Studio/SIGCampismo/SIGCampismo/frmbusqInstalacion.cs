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
    public partial class frmbusqInstalacion : Telerik.WinControls.UI.RadForm
    {
        MapInfoLibrary.TMap _Mapa;

        public frmbusqInstalacion(MapInfoLibrary.TMap Mapa)
        {
            InitializeComponent();
             this._Mapa = Mapa;
        }

        private void frmbusqInstalacion_Load(object sender, EventArgs e)
        {
            string pathapp = Application.StartupPath;
            municipiosTableAdapter.Connection.ConnectionString = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" + pathapp + @"\Datos\Campismo.mdb";
            provinciasTableAdapter.Connection.ConnectionString = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" + pathapp + @"\Datos\Campismo.mdb";
            instalacionesTableAdapter.Connection.ConnectionString = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" + pathapp + @"\Datos\Campismo.mdb";
            provinciasBindingSource.Sort = "Idprovincia";
            municipiosBindingSource.Sort = "Idprovincia,idmunicipio";
            
            // TODO: This line of code loads data into the 'instalacionesDataSet.instalaciones' table. You can move, or remove it, as needed.
            this.instalacionesTableAdapter.Fill(this.instalacionesDataSet.instalaciones);
            // TODO: This line of code loads data into the 'instalacionesDataSet.instalaciones' table. You can move, or remove it, as needed.
            this.instalacionesTableAdapter.Fill(this.instalacionesDataSet.instalaciones);
            // TODO: This line of code loads data into the 'municipiosDataSet.municipios' table. You can move, or remove it, as needed.
            this.municipiosTableAdapter.Fill(this.municipiosDataSet.municipios);
            // TODO: This line of code loads data into the 'instalacionesDataSet.instalaciones' table. You can move, or remove it, as needed.
            this.instalacionesTableAdapter.Fill(this.instalacionesDataSet.instalaciones);
            // TODO: This line of code loads data into the 'municipiosDataSet.municipios' table. You can move, or remove it, as needed.
            this.municipiosTableAdapter.Fill(this.municipiosDataSet.municipios);
            // TODO: This line of code loads data into the 'provinciaDataSet.Provincias' table. You can move, or remove it, as needed.
            this.provinciasTableAdapter.Fill(this.provinciaDataSet.Provincias);
            cbprovincia.SelectedIndex = -1;
            cbprovincia.NullText = "--Seleccione--";
            cbinstalacion.SelectedIndex = -1;
            cbinstalacion.NullText = "--Seleccione--";
         
        }

        private void cbprovincia_SelectedIndexChanged(object sender, Telerik.WinControls.UI.Data.PositionChangedEventArgs e)
        {
            if (cbprovincia.SelectedIndex != -1)
            {
                municipiosBindingSource.Filter = "idprovincia = " + cbprovincia.SelectedValue.ToString();
            }
        }

        private void cbmunicipios_SelectedIndexChanged(object sender, Telerik.WinControls.UI.Data.PositionChangedEventArgs e)
        {
           
            
            
        }

        private void btnlocalizar_Click(object sender, EventArgs e)
        {
            try
            {
                _Mapa.Buscar("instalaciones", "id_instalacion = " + cbinstalacion.SelectedValue.ToString(), "1000");
            }
            catch (Exception ex)
            {

            }
        }

        private void radRadioButton7_Click(object sender, EventArgs e)
        {
            cbinstalacion.SelectedIndex = -1;
             try
            {
                if (cbmunicipios.Text == "Todos")
                {
                    instalacionesBindingSource.Filter = "id_provincia = " + cbprovincia.SelectedValue.ToString() + " and id_tipo_instalacion = " + radRadioButton7.Tag;
                    cbinstalacion.SelectedIndex = -1;
                }
                else
                {
                    instalacionesBindingSource.Filter = "id_municipio = " + cbmunicipios.SelectedValue.ToString() + " and id_tipo_instalacion = " + radRadioButton7.Tag;
                    cbinstalacion.SelectedIndex = -1;
                }

                 }
            catch (Exception ex)
            {

            }
        }

        private void radRadioButton8_Click(object sender, EventArgs e)
        {
            cbinstalacion.SelectedIndex = -1;
            try
            {
                if (cbmunicipios.Text == "Todos")
                {
                    instalacionesBindingSource.Filter = "id_provincia = " + cbprovincia.SelectedValue.ToString() + " and id_tipo_instalacion = " + radRadioButton8.Tag;
                    cbinstalacion.SelectedIndex = -1;
                }
                else
                {
                    instalacionesBindingSource.Filter = "id_municipio = " + cbmunicipios.SelectedValue.ToString() + " and id_tipo_instalacion = " + radRadioButton8.Tag;
                    cbinstalacion.SelectedIndex = -1;
                }

            }
            catch (Exception ex)
            {

            }
        }

        private void radRadioButton9_Click(object sender, EventArgs e)
        {
            cbinstalacion.SelectedIndex = -1;
            try
            {
                if (cbmunicipios.Text == "Todos")
                {
                    instalacionesBindingSource.Filter = "id_provincia = " + cbprovincia.SelectedValue.ToString() + " and id_tipo_instalacion = " + radRadioButton9.Tag;
                    cbinstalacion.SelectedIndex = -1;
                }
                else
                {
                    instalacionesBindingSource.Filter = "id_municipio = " + cbmunicipios.SelectedValue.ToString() + " and id_tipo_instalacion = " + radRadioButton9.Tag;
                    cbinstalacion.SelectedIndex = -1;
                }

            }
            catch (Exception ex)
            {

            }
        }

        private void radRadioButton10_Click(object sender, EventArgs e)
        {
            cbinstalacion.SelectedIndex = -1;
            try
            {
                if (cbmunicipios.Text == "Todos")
                {
                    instalacionesBindingSource.Filter = "id_provincia = " + cbprovincia.SelectedValue.ToString() + " and id_tipo_instalacion = " + radRadioButton10.Tag;
                    cbinstalacion.SelectedIndex = -1;
                }
                else
                {
                    instalacionesBindingSource.Filter = "id_municipio = " + cbmunicipios.SelectedValue.ToString() + " and id_tipo_instalacion = " + radRadioButton10.Tag;
                    cbinstalacion.SelectedIndex = -1;
                }

            }
            catch (Exception ex)
            {

            }
        }

        private void radRadioButton2_Click(object sender, EventArgs e)
        {
            cbinstalacion.SelectedIndex = -1;
            try
            {
                if (cbmunicipios.Text == "Todos")
                {
                    instalacionesBindingSource.Filter = "id_provincia = " + cbprovincia.SelectedValue.ToString() + " and id_tipo_instalacion = " + radRadioButton2.Tag;
                    cbinstalacion.SelectedIndex = -1;
                }
                else
                {
                    instalacionesBindingSource.Filter = "id_municipio = " + cbmunicipios.SelectedValue.ToString() + " and id_tipo_instalacion = " + radRadioButton2.Tag;
                    cbinstalacion.SelectedIndex = -1;
                }

            }
            catch (Exception ex)
            {

            }
        }

        private void radRadioButton11_Click(object sender, EventArgs e)
        {
            cbinstalacion.SelectedIndex = -1;
            try
            {
                if (cbmunicipios.Text == "Todos")
                {
                    instalacionesBindingSource.Filter = "id_provincia = " + cbprovincia.SelectedValue.ToString() + " and id_tipo_instalacion = " + radRadioButton11.Tag;
                    cbinstalacion.SelectedIndex = -1;
                }
                else
                {
                    instalacionesBindingSource.Filter = "id_municipio = " + cbmunicipios.SelectedValue.ToString() + " and id_tipo_instalacion = " + radRadioButton11.Tag;
                    cbinstalacion.SelectedIndex = -1;
                }

            }
            catch (Exception ex)
            {

            }
        }

        private void radRadioButton1_Click(object sender, EventArgs e)

        {
            cbinstalacion.SelectedIndex = -1;
            try
            {
                if (cbmunicipios.Text == "Todos")
                {
                    instalacionesBindingSource.Filter = "id_provincia = " + cbprovincia.SelectedValue.ToString() + " and id_tipo_instalacion = " + radRadioButton1.Tag;
                    cbinstalacion.SelectedIndex = -1;
                }
                else
                {
                    instalacionesBindingSource.Filter = "id_municipio = " + cbmunicipios.SelectedValue.ToString() + " and id_tipo_instalacion = " + radRadioButton1.Tag;
                    cbinstalacion.SelectedIndex = -1;
                }

            }
            catch (Exception ex)
            {

            }
        }

        private void radRadioButton3_Click(object sender, EventArgs e)
        {
            cbinstalacion.SelectedIndex = -1;
            try
            {
                if (cbmunicipios.Text == "Todos")
                {
                    instalacionesBindingSource.Filter = "id_provincia = " + cbprovincia.SelectedValue.ToString() + " and id_tipo_instalacion = " + radRadioButton3.Tag;
                    cbinstalacion.SelectedIndex = -1;
                }
                else
                {
                    instalacionesBindingSource.Filter = "id_municipio = " + cbmunicipios.SelectedValue.ToString() + " and id_tipo_instalacion = " + radRadioButton3.Tag;
                    cbinstalacion.SelectedIndex = -1;
                }

            }
            catch (Exception ex)
            {

            }
        }

        private void radRadioButton4_Click(object sender, EventArgs e)
        {
            cbinstalacion.SelectedIndex = -1;
            try
            {
                if (cbmunicipios.Text == "Todos")
                {
                    instalacionesBindingSource.Filter = "id_provincia = " + cbprovincia.SelectedValue.ToString() + " and id_tipo_instalacion = " + radRadioButton4.Tag;
                    cbinstalacion.SelectedIndex = -1;
                }
                else
                {
                    instalacionesBindingSource.Filter = "id_municipio = " + cbmunicipios.SelectedValue.ToString() + " and id_tipo_instalacion = " + radRadioButton4.Tag;
                    cbinstalacion.SelectedIndex = -1;
                }

            }
            catch (Exception ex)
            {

            }
        }

     }
}
