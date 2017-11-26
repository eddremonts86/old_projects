using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Text;
using System.Windows.Forms;

namespace SIGCampismo
{
    public partial class frmMain : Telerik.WinControls.UI.RadRibbonForm
    {
        public string pathapp;

       
        public frmMain()
        {
            InitializeComponent();
        }

        private void frmMain_Load(object sender, EventArgs e)
        {
            // TODO: This line of code loads data into the 'dS_Pueblos.pueblos' table. You can move, or remove it, as needed.
      
            Mapa.Init(null);
            pathapp = Application.StartupPath;
            Mapa.OpenWorkSpace(pathapp + @"\Datos\Campismo.wor");
            pueblosTableAdapter.Connection.ConnectionString = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" + pathapp + @"\Datos\Campismo.mdb";
            timer.Start();
            
        }

        private void radButtonElement1_Click(object sender, EventArgs e)
        {
            Mapa.ZoomIn();
        }

        private void radButtonElement2_Click(object sender, EventArgs e)
        {
            Mapa.ZoomOut();
        }

        private void radButtonElement3_Click(object sender, EventArgs e)
        {
            Mapa.Pan();
        }

        private void radButtonElement5_Click(object sender, EventArgs e)
        {
            Mapa.Ruler();
        }

        private void radButtonElement4_Click(object sender, EventArgs e)
        {
           string valor = Mapa.Layers.EvaluaLayer("Selection","id_instalacion");
           PanelInfo panelentrada = new PanelInfo();
           panelentrada.muestra_datos(true, valor, Mapa.Layers.EvaluaLayer("Selection", "id_provincia"), Mapa.Layers.EvaluaLayer("Selection", "id_municipio"));
           panelentrada.Show();
         }

        private void radButtonElement6_Click(object sender, EventArgs e)
        {
            Mapa.zoom_to_layer("Provincias");
        }

       private void radCheckBoxElement7_ToggleStateChanged(object sender, Telerik.WinControls.UI.StateChangedEventArgs args)
        {
            if (chk_osm.Checked == true)
            {
                Mapa.Layers.ShowLayer("GoogleMap");
                if (chk_google.Checked == true) chk_google.Checked = false;
            }
            else
            {
                Mapa.Layers.HideLayer("GoogleMap");
            };
        }

        private void radCheckBoxElement8_ToggleStateChanged(object sender, Telerik.WinControls.UI.StateChangedEventArgs args)
        {
            if (chk_google.Checked == true)
            {
                Mapa.Layers.ShowLayer("GoogleRaster");
                if (chk_osm.Checked == true) chk_osm.Checked = false;
            }
            else
            {
                Mapa.Layers.HideLayer("GoogleRaster");
            };
        }

        private void radCheckBoxElement1_ToggleStateChanged_1(object sender, Telerik.WinControls.UI.StateChangedEventArgs args)
        {
            
        }

        private void radCheckBoxElement2_ToggleStateChanged_1(object sender, Telerik.WinControls.UI.StateChangedEventArgs args)
        {
           
        }

        private void radCheckBoxElement3_ToggleStateChanged_1(object sender, Telerik.WinControls.UI.StateChangedEventArgs args)
        {
            if (radCheckBoxElement3.Checked == true)
            {
                Mapa.Layers.ShowLayer("pueblos");
            }
            else
            {
                Mapa.Layers.HideLayer("pueblos");
            };
        }

        private void radCheckBoxElement4_ToggleStateChanged_1(object sender, Telerik.WinControls.UI.StateChangedEventArgs args)
        {
            if (radCheckBoxElement4.Checked == true)
            {
                Mapa.Layers.ShowLayer("delimitacion");
            }
            else
            {
                Mapa.Layers.HideLayer("delimitacion");
            };
        }

        private void radButtonElement8_Click(object sender, EventArgs e)
        {
            busqueda buscar = new busqueda(Mapa);
            buscar.Show();
        }

        private void radButtonElement7_Click(object sender, EventArgs e)
        {
            Mapa.Limpiar();
            
        }

        private void btnbuscar_instalacion_Click(object sender, EventArgs e)
        {
            frmbusqInstalacion buscarinst = new frmbusqInstalacion(Mapa);
            buscarinst.Show();
        }

        private void radButtonElement10_Click(object sender, EventArgs e)
        { 
            // Instalaciones de campismo 1
            try
            {
              string mapid = Mapa.Mapinfo.Eval("FrontWindow()");
              Mapa.Mapinfo.Do("set shade window " + mapid + " 1  values  1  Symbol (\"Inst de Campismo.bmp\",16711680,36,0) ,2 Symbol (31,65280,12),3 Symbol (31,65280,12) ,4 Symbol (31,255,12) ,5 Symbol (31,65280,12),6 Symbol (31,16711935,12),7 Symbol (31,65280,12),8 Symbol (31,65280,12),9 Symbol (31,65280,12) default Symbol (40,0,12)");
            }
            catch (Exception ex)
            {
                
            }
        }

        private void radButtonElement9_Click(object sender, EventArgs e)
        { 
            // Todas las instalaciones 
           try
            {
              string mapid =  Mapa.Mapinfo.Eval("FrontWindow()");
              Mapa.Mapinfo.Do("set shade window " + mapid + " 1  values  1 Symbol (\"Inst de Campismo.bmp\",16711680,36,0) ,2 Symbol (\"punto venta.bmp\",65280,36,0) ,3 Symbol (\"casa matriz.bmp\",255,36,0) ,4 Symbol (\"oficina reservacion.bmp\",16711935,36,0) ,5 Symbol (\"empresa.bmp\",16776960,36,0),6 Symbol (\"agencia viajescm.bmp\",65535,36,0),7 Symbol (\"villa turistica.bmp\",8388608,36,0),8 Symbol (\"abastecimiento.bmp\",32768,36,0), 9 Symbol (\"parq turistico.bmp\",32768,36,0), 9 Symbol (\"parq turistico.bmp\",32768,36,0)  default Symbol (40,0,12)");
            }
           catch (Exception ex)
           {
               
           }
        }


        private void radButtonElement11_Click(object sender, EventArgs e)
        {
            
           // Puntos de Ventas 2 
           try
            {
              string mapid =  Mapa.Mapinfo.Eval("FrontWindow()");
              Mapa.Mapinfo.Do("set shade window " + mapid + " 1  values  1 Symbol (31,16711680,12) ,2 Symbol (\"punto venta.bmp\",65280,36,0),3 Symbol (31,65280,12) ,4 Symbol (31,255,12) ,5 Symbol (31,65280,12),6 Symbol (31,16711935,12),7 Symbol (31,65280,12),8 Symbol (31,65280,12),9 Symbol (31,65280,12) default Symbol (40,0,12)");
            }
           catch (Exception ex)
           {
               
           }
        }

        private void radButtonElement12_Click(object sender, EventArgs e)
        {
            // Casa Matriz 3
            try
            {
                string mapid = Mapa.Mapinfo.Eval("FrontWindow()");
                Mapa.Mapinfo.Do("set shade window " + mapid + " 1  values  1 Symbol (31,16711680,12) ,2 Symbol (31,65280,12),3 Symbol (\"casa matriz.bmp\",255,36,0) ,4 Symbol (31,255,12) ,5 Symbol (31,65280,12),6 Symbol (31,16711935,12),7 Symbol (31,65280,12) , 8 Symbol (31,65280,12),9 Symbol (31,65280,12) default Symbol (40,0,12)");
            }
            catch (Exception ex)
            {

            }
        }

        private void radButtonElement13_Click(object sender, EventArgs e)
        {
            // Oficinas de reservacion 4
            try
            {
                string mapid = Mapa.Mapinfo.Eval("FrontWindow()");
                Mapa.Mapinfo.Do("set shade window " + mapid + " 1  values  1 Symbol (31,16711680,12) ,2 Symbol (31,65280,12),3 Symbol (31,65280,12) ,4 Symbol (\"oficina reservacion.bmp\",16711935,36,0) ,5 Symbol (31,65280,12),6 Symbol (31,16711935,12),7 Symbol (31,65280,12) ,8 Symbol (31,65280,12),9 Symbol (31,65280,12) default Symbol (40,0,12)");
            }
            catch (Exception ex)
            {

            }
        }

        private void radButtonElement14_Click(object sender, EventArgs e)
        {
            // Empresas 5
            try
            {
                string mapid = Mapa.Mapinfo.Eval("FrontWindow()");
                Mapa.Mapinfo.Do("set shade window " + mapid + " 1  values  1 Symbol (31,16711680,12) ,2 Symbol (31,65280,12),3 Symbol (31,65280,12) ,4 Symbol (31,255,12) ,5 Symbol (\"empresa.bmp\",16776960,36,0),6 Symbol (31,16711935,12),7 Symbol (31,65280,12),8 Symbol (31,65280,12),9 Symbol (31,65280,12) default Symbol (40,0,12)");
            }
            catch (Exception ex)
            {

            }
        }

        private void radButtonElement15_Click(object sender, EventArgs e)
        {
            // CUBAMAR 6
            try
            {
                string mapid = Mapa.Mapinfo.Eval("FrontWindow()");
                Mapa.Mapinfo.Do("set shade window " + mapid + " 1  values  1 Symbol (31,16711680,12) ,2 Symbol (31,65280,12),3 Symbol (31,65280,12) ,4 Symbol (31,255,12) ,5 Symbol (31,65280,12),6 Symbol (\"agencia viajescm.bmp\",65535,36,0),7 Symbol (31,65280,12),8 Symbol (31,65280,12),9 Symbol (31,65280,12) default Symbol (40,0,12)");
            }
            catch (Exception ex)
            {

            }
        }

        private void radButtonElement16_Click(object sender, EventArgs e)
        {
            // Abastecimiento 8
            try
            {
                string mapid = Mapa.Mapinfo.Eval("FrontWindow()");
                Mapa.Mapinfo.Do("set shade window " + mapid + " 1  values  1 Symbol (31,16711680,12) ,2 Symbol (31,65280,12),3 Symbol (31,65280,12) ,4 Symbol (31,255,12) ,5 Symbol (31,65280,12),6 Symbol (31,16711935,12),7 Symbol (31,16711935,12),8 Symbol (\"abastecimiento.bmp\",32768,36,0),9 Symbol (31,65280,12), 9 Symbol (\"parq turistico.bmp\",32768,36,0) default Symbol (40,0,12)");
            }
            catch (Exception ex)
            {

            }
        }


        private void radButtonElement17_Click(object sender, EventArgs e)
        {
            string mapid = Mapa.Mapinfo.Eval("FrontWindow()");
            frmSpatialFilter spatialfilter = new frmSpatialFilter(Mapa, mapid);
            spatialfilter.Show();
         }

        private void radButtonElement18_Click(object sender, EventArgs e)
        {
            Mapa.Mapinfo.RunMenuCommand(112);
        }

        private void timer_Tick(object sender, EventArgs e)
        {
           btninfoinstalacion.Enabled = Mapa.IsLayerSelect("Instalaciones");
        }

        private void radButtonElement19_Click(object sender, EventArgs e)
        {
            Mapa.ToolSelect();
        }

        private void btn_list_instXServ_Click(object sender, EventArgs e)
        {
            frmServices frmserv = new frmServices();
            frmserv.Show();
        }

        private void btn_list_instalaciones_Click(object sender, EventArgs e)
        {
            frmInst frminst = new frmInst();
            frminst.Show();
        }

        private void radRibbonBar1_Click(object sender, EventArgs e)
        {
        
        }

        private void btnactualizar_Click(object sender, EventArgs e)
        {
            PanelInfo panelentrada = new PanelInfo();
            panelentrada.Show();
        }

        private void radButtonElement4_Click_1(object sender, EventArgs e)
        {
            frmFCatalog frcat = new frmFCatalog();
            frcat.Show();
        }

        private void btnsalir_Click(object sender, EventArgs e)
        {
            this.Close();
        }

        private void radCheckBoxElement1_ToggleStateChanged(object sender, Telerik.WinControls.UI.StateChangedEventArgs args)
        {
           
        }

        private void radCheckBoxElement2_ToggleStateChanged(object sender, Telerik.WinControls.UI.StateChangedEventArgs args)
        {
           
        }

        private void radButtonElement20_Click(object sender, EventArgs e)
        {
            // Villa Turistica 7
            try
            {
                string mapid = Mapa.Mapinfo.Eval("FrontWindow()");
                Mapa.Mapinfo.Do("set shade window " + mapid + " 1  values  1 Symbol (31,16711680,12) ,2 Symbol (31,65280,12),3 Symbol (31,65280,12) ,4 Symbol (31,255,12) ,5 Symbol (31,65280,12),6 Symbol (31,16711935,12),7 Symbol (\"villa turistica.bmp\",8388608,36,0),8 Symbol (31,16711935,12),9 Symbol (31,16711935,12) default Symbol (40,0,12)");
            }
            catch (Exception ex)
            {

            }
        }

        private void radButtonElement21_Click(object sender, EventArgs e)
        {
            // Parque Turistico 9
            try
            {
                string mapid = Mapa.Mapinfo.Eval("FrontWindow()");
                Mapa.Mapinfo.Do("set shade window " + mapid + " 1  values  1 Symbol (31,16711680,12) ,2 Symbol (31,65280,12),3 Symbol (31,65280,12) ,4 Symbol (31,255,12) ,5 Symbol (31,65280,12),6 Symbol (31,16711935,12),7 Symbol (31,16711935,12),8 Symbol (31,16711935,12), 9 Symbol (\"parq turistico.bmp\",32768,36,0) default Symbol (40,0,12)");
            }
            catch (Exception ex)
            {

            }
        }

        private void radCheckBoxElement5_ToggleStateChanged(object sender, Telerik.WinControls.UI.StateChangedEventArgs args)
        {
            if (radCheckBoxElement5.Checked == true)
            {
                Mapa.Layers.ShowLayer("Rios",true);
            }
            else
            {
                Mapa.Layers.HideLayer("Rios");
            };
        }

        private void radCheckBoxElement6_ToggleStateChanged(object sender, Telerik.WinControls.UI.StateChangedEventArgs args)
        {

            if (radCheckBoxElement6.Checked == true)
            {
                Mapa.Layers.ShowLayer("Presas",true);
            }
            else
            {
                Mapa.Layers.HideLayer("Presas");
            }; 
        }

        private void radCheckBoxElement1_ToggleStateChanged_2(object sender, Telerik.WinControls.UI.StateChangedEventArgs args)
        {
            if (radCheckBoxElement1.Checked == true)
            {
                Mapa.Layers.ShowLayer("Carreteras",true);
            }
            else
            {
                Mapa.Layers.HideLayer("Carreteras");
            }; 
        }

        private void radCheckBoxElement2_ToggleStateChanged_2(object sender, Telerik.WinControls.UI.StateChangedEventArgs args)
        {
            if (radCheckBoxElement2.Checked == true)
            {
                Mapa.Layers.ShowLayer("provincias",true);
            }
            else
            {
                Mapa.Layers.HideLayer("provincias");
            }; 
        }

        private void radCheckBoxElement7_ToggleStateChanged_1(object sender, Telerik.WinControls.UI.StateChangedEventArgs args)
        {
            if (radCheckBoxElement7.Checked == true)
            {
                Mapa.Layers.ShowLayer("municipios",true);
            }
            else
            {
                Mapa.Layers.HideLayer("municipios");
            }; 
        }

        private void radButtonElement22_Click(object sender, EventArgs e)
        {
            frmEEmp fre = new frmEEmp();
            fre.Show();
        }

        private void Mapa_Paint(object sender, PaintEventArgs e)
        {

        }

    }
}
