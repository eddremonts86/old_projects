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
    public partial class busqueda : Telerik.WinControls.UI.RadForm
    {
        MapInfoLibrary.TMap _Mapa;

        public busqueda(MapInfoLibrary.TMap Mapa)
        {
            InitializeComponent();
            this._Mapa = Mapa;
        }

        private void busqueda_Load(object sender, EventArgs e)
        {
            // TODO: This line of code loads data into the 'provinciaDataSet.Provincias' table. You can move, or remove it, as needed.
            string pathapp = Application.StartupPath;
            this.provinciasTableAdapter.Connection.ConnectionString = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" + pathapp + @"\Datos\Campismo.mdb";
            this.pueblosTableAdapter.Connection.ConnectionString = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" + pathapp + @"\Datos\Campismo.mdb";
            this.provinciasTableAdapter.Fill(this.provinciaDataSet.Provincias);
            // TODO: This line of code loads data into the 'dS_Pueblos.pueblos' table. You can move, or remove it, as needed.
            this.pueblosTableAdapter.Fill(this.dS_Pueblos.pueblos);
            listprovincias.SelectedIndex = -1;
            listprovincias.NullText = "--Seleccione--";
            listpueblos.SelectedIndex = -1;
            listpueblos.NullText = "--Seleccione--";
            provinciasBindingSource.Sort = "Idprovincia";
        }

 
        private void listprovincias_SelectedIndexChanged(object sender, Telerik.WinControls.UI.Data.PositionChangedEventArgs e)
        {
            if (listprovincias.SelectedIndex != -1)
            {
                pueblosBindingSource.Filter = "Codprov = " + listprovincias.SelectedValue.ToString();                      
            }
        }

        private void btnbuscar_Click(object sender, EventArgs e)
        {
            try
            {
                _Mapa.Buscar("Pueblos", "Nombre = " + "\"" + listpueblos.Text + "\"", "100000");
            }
            catch (Exception ex)
            {
                
            }
        }
    }
}
