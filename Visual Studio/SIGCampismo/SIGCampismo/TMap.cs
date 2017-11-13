using System;
using System.IO;
using System.Runtime.InteropServices;
using System.Windows.Forms;
using MapInfo;

namespace MapInfoLibrary
{
    public class TMap: Panel
    {
        public bool Firts { get; set; }
        public TmbLayer Layers { get; set; }
        public int ConnectionNumber { get; set; }
        public MapInfoApplication Mapinfo;
        public int _Width { get; set; }
        public int _Height { get; set; }
        public int CantseleM { get; set; }
        public int Legendid { get; set; }
        public string IdWindows { get; set; }
        private string _cubanorte;
        private string _cubasur;
        public TMap()
            : base()
         {
             Firts = true;
            _cubanorte ="Earth Projection 3, 9999, 7, 2.478, 149.752, 197.726, -0.526356, -0.49797, 0.500831, 0.685238, 0, \"m\", -81.000000, 22.350000, 21.700000, 23.000000, 500000.000, 280296.016 Bounds (-500000.000, -500000.000) (1500000.000, 1500000.000)";
            _cubasur = "Earth Projection 3, 9999, 7, 2.478, 149.752, 197.726, -0.526356, -0.49797, 0.500831, 0.685238, 0, \"m\", -76.833333, 20.716667, 20.133333, 21.3, 500000, 229126.93900000001 Bounds (-500000, -500000) (1500000, 1500000)";             
         }

        /// <summary>
        /// Lanza la ventana con el mensaje de error.
        /// </summary>
        /// <param name="ex">Error capturado</param>
        public void ShowMessage(Exception ex)
        {
            MessageBox.Show(ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
        }

        /// <summary>
        /// Inicializa el panel asociando el área de trabajo de Mapinfo al mismo
        /// </summary>
        /// <param name="map">Mapa</param>
        public void Init(MapInfoApplication map)
        {
            string sWinHand = Handle.ToString();
            try
            {
                if (map == null)
                {
                    Mapinfo = (MapInfoApplication)Activator.CreateInstance(Type.GetTypeFromProgID("Mapinfo.Application"));
                    Mapinfo.Do("Dim sym_marker As Symbol");
                }
                else
                {
                    Mapinfo = map;
                }
                Layers = new TmbLayer(Mapinfo);

                string s="";
                Layers.Hmap.Do("Set Window Ruler Parent " + sWinHand);
                s = "Set Application Window " + sWinHand;
                Layers.Hmap.Do(s);
                s = "Set Next Document Parent " + sWinHand + " Style 1";
                Layers.Hmap.Do(s);

                IdWindows = sWinHand;

                Resize += ResizeMap;
            }
            catch (Exception ex)
            {
                ShowMessage(ex);
            }

        }
        
        public void ZoomIn()
        {
            Mapinfo.RunMenuCommand(1705);
        }       
        public void ZoomOut()
        {
            Mapinfo.RunMenuCommand(1706);
        }
        public void ZoomEntire()
        {
            Mapinfo.Do("Set Map Zoom Entire");
        }
        public void Pan()
        {
            Mapinfo.RunMenuCommand(1702);
        }
        public void ToolSelect()
        {
            Mapinfo.RunMenuCommand(1701);
        }
        public void ToolSelectRect()
        {
            Mapinfo.RunMenuCommand(1722);
        }
        public void CleanSelection()
        {
            Mapinfo.RunMenuCommand(304);
        }
        public void Ruler()
        {
            Mapinfo.RunMenuCommand(1710);
            Mapinfo.Do("Open Window Ruler");
            Mapinfo.RunMenuCommand(1710);
        }

        public void InfoTool()
        {
            Mapinfo.RunMenuCommand(1707);
            Mapinfo.Do("Open Window Info");
            Mapinfo.Do("Set Window Info");
            //Mapinfo.RunMenuCommand(1707);

        }
        /// <summary>
        /// Adiciona una nueva capa al proyecto.
        /// </summary>
        /// <param name="fileName">Ruta hasta el fichero</param>
        /// <param name="layerName">Nombre de la capa</param>
        public void AddLayer(string fileName, string layerName)
        {
            try
            {
                if (layerName == "")
                {
                    FileInfo fileInfo = new FileInfo(fileName);
                    layerName = fileInfo.Name;
                }
                string s = "Open Table \"" + fileName + "\" As " + layerName + " Interactive";
                Mapinfo.Do(s);
                if (Firts)
                {
                    s = "Map From " + layerName;
                    Mapinfo.Do(s);
                    Mapinfo.Do("Set Map Distance Units \"m\"");
                    Mapinfo.Do("Set Map Distance Type Cartesian");
                    Mapinfo.Do("Set Map Display Position");
                    Firts = false;
                }
                else //Si ya existe el mapa
                {
                    TmbLayer tmbLayer = new TmbLayer(Mapinfo);
                    if (!tmbLayer.ExistLayer(layerName))
                        s = "Add Map Auto Layer " + layerName;
                    else
                        s = "Add Map Auto Layer _" + layerName;
                    Mapinfo.Do(s);
                }
            }
            catch (Exception ex)
            {
                ShowMessage(ex);
            }
        }
        /// <summary>
        /// Adiciona una capa a partir de una consulta
        /// </summary>
        /// <param name="table">Nombre de la tabla sobre la cual se realizará la consulta</param>
        /// <param name="layerName">Nombre de la capa</param>
        /// <param name="conditionQuery">Condiciones para la consulta</param>
        public void AddQuerylayer(string table, string layerName, string conditionQuery = null)
        {
            try
            {
                if (layerName == "")
                    layerName = table;
                string s = string.Format("select * from {0}", table);
                if (conditionQuery != null)
                    s += " where " + conditionQuery;
                s += " into " + layerName;
                Mapinfo.Do(s);
                if (Firts)
                {
                    s = "Map From " + layerName;
                    Mapinfo.Do(s);
                    Mapinfo.Do("Set Map Distance Units \"m\"");
                    Mapinfo.Do("Set Map Distance Type Cartesian");
                    Firts = true;
                }
                else
                {
                    TmbLayer tmbLayer = new TmbLayer(Mapinfo);
                    if (!tmbLayer.ExistLayer(layerName))
                        s = "Add Map Auto Layer " + layerName;
                    else
                        s = "Add Map Auto Layer _" + layerName;
                    Mapinfo.Do(s);
                }
            }
            catch (Exception ex)
            {
                ShowMessage(ex);
            }
        }
        /// <summary>
        /// Abrir una tabla
        /// </summary>
        /// <param name="table">Nombre tabla</param>
        public void OpenTable(string table)
        {
            try
            {
                string s = "Open Table " + table;
                Mapinfo.Do(s);
            }
            catch (Exception ex)
            {
               ShowMessage(ex);
            }
        }
        
        public void ResizeMap(object obj, EventArgs args)
        {
            try
            {
                string s = "Set Next Document Parent " + IdWindows + " Style 1";
                Mapinfo.Do(s);
                string mapid = Mapinfo.Eval("FrontWindow()");
                string mapHWnd = Mapinfo.Eval("WindowInfo(" + mapid + ",12 )");
                MoveWindow(new IntPtr(int.Parse(mapHWnd)), 0, 0, (obj as TMap).Width, (obj as TMap).Height, true);
            }
            catch (Exception ex)
            {
                ShowMessage(ex);
            }
        }


        // Set Map Window 197549536 Zoom Entire Layer 6

         /// <summary>
        /// ampliar a la capa 
        /// </summary>
        /// <param name="layerName">Nombre de la capa</param>
        public void zoom_to_layer(string layerName)
        {
            try
            {
                string mapid = Mapinfo.Eval("FrontWindow()");
                string s = "Set Map Window " + mapid + " Zoom Entire Layer " + layerName;
                Mapinfo.Do(s);
            }
            catch (Exception ex)
            {

            }


        }


        [DllImport("user32.dll")]
        private static extern bool MoveWindow(IntPtr hwnd, int x, int y, int width, int height, bool repaint);

        /// <summary>
        /// Elimina el mapa
        /// </summary>
        public void DeleteMap()
        {
            try
            {
                string msgstring = "Delete from Cosmetic1";
                Mapinfo.Do(msgstring);
            }
            catch (Exception ex)
            {
                ShowMessage(ex);
            }
        }

        public void ThematicMap()
        {
            try
            {
                Mapinfo.RunMenuCommand(307);
                Legendid = int.Parse(Mapinfo.Eval("FrontWindow()"));
            }
            catch (Exception ex)
            {
                ShowMessage(ex);
            }

        }

        /// <summary>
        /// Devuleve la capa seleccionada
        /// </summary>
        /// <returns></returns>
        public string GetLayerSelect()
        {
            try
            {
                return Mapinfo.Eval("SelectionInfo(1)");
            }
            catch (Exception ex)
            {
                ShowMessage(ex);
            }

            return "";
        }
        /// <summary>
        /// Devuelve si la capa está seleccionada
        /// </summary>
        /// <param name="layer">Nombre de la capa</param>
        /// <returns>Verdadero o Falso</returns>
        public bool IsLayerSelect(string layer)
        {
            try
            {
                if (layer.ToUpper() == GetLayerSelect().ToUpper())
                    return true;
            }
            catch (Exception ex)
            {
                ShowMessage(ex);
            }
            return false;
        }
        /// <summary>
        /// Registra una imagen raster en formato .tif
        /// </summary>
        /// <param name="img">Ruta hacia la imagen sin incluir la extensión</param>
        /// <param name="cubaNorte">Establece si la proyección está en CubaNorte o en CubaSur</param>
        public void RegisterImage(string img, bool cubaNorte)
        {
            if (cubaNorte)
                Mapinfo.Do("Register Table \"" + img + ".tif\" type \"raster\" CoordSys " + _cubanorte + " into \"" +
                           img + ".tab\"");
            else
                Mapinfo.Do("Register Table \"" + img + ".tif\" type \"raster\" CoordSys " + _cubasur + " into \"" +
                           img + ".tab\"");
        }

        public void AddImgLayer(string fileName, string layerName)
        {
            try
            {
                if (layerName == "")
                {
                    FileInfo fileInfo = new FileInfo(fileName);
                    layerName = fileInfo.Name;
                }
                string s = "Open Table \"" + fileName + "\" Interactive";
                Mapinfo.Do(s);
                if (Firts)
                {
                    s = "Map From " + layerName;
                    Mapinfo.Do(s);
                    Firts = false;
                }
                else
                {
                    TmbLayer tmbLayer = new TmbLayer(Mapinfo);
                    if (!tmbLayer.ExistLayer(layerName))
                        s = "Add Map Auto Layer " + layerName;
                    else
                        s = "Add Map Auto Layer _" + layerName;
                    Mapinfo.Do(s);
                }
            }
            catch (Exception ex)
            {
                ShowMessage(ex);
            }
            
        }
        /// <summary>
        /// Corre la aplicación dado un workspace determinado.
        /// </summary>
        /// <param name="path">Ruta completa hasta el workspace.</param>
        public void OpenWorkSpace(string path)
        {
            try
            {
            string s = "Run Application \"" + path + "\"";
            Mapinfo.Do(s);
            Mapinfo.Do("Set Map Display Position");
            }
            catch (Exception ex)
            {
                ShowMessage(ex);
            }
        }
        /// <summary>
        /// Evalua una expresión de MapInfo
        /// </summary>
        /// <param name="layer">Nombre de la capa</param>
        /// <param name="expression">Expresión a evaluar</param>
        /// <returns>Resultado de la evaluación</returns>
        public object Eval(string layer, string expression)
        {
            try
            {
                return layer.ToUpper() == GetLayerSelect() ? Mapinfo.Eval(expression) : new object();
            }
            catch (Exception ex)
            {
                ShowMessage(ex);
            }
            return new object();
        }

        /// <summary>
        /// Ampliar a la ubicacion 
        /// </summary>
        /// <param name="px">coordenada x</param>
        /// <param name="py">coordenada y</param>
        /// <param name="zoom">ampliar en el area de localizacion</param>
        /// <returns>Si encontró el objeto </returns>
        public object Zoom_to_Position(string px, string py, string zoom)
        {
            try
            {
                  Mapinfo.Do("Set Map XY Units \"m\"");
                  Mapinfo.Do("Set Map Center ("+ px +","+ py + ") Zoom " + py +" Units \"m\"");
                  Mapinfo.Do("Set Map  Zoom " + zoom + " Units \"m\"");
                 return true;
            }
            catch (Exception ex)
            {
                ShowMessage(ex);
            }
            return new object();
        }

        /// <summary>
        /// Busca un elemento en el mapa a partir de una condicion 
        /// </summary>
        /// <param name="layer">Nombre de la capa</param>
        /// <param name="expression">Expresión a evaluar</param>
        /// <param name="zoom">ampliar en el area de localizacion</param>
        /// <returns>Localizar un objeto </returns>
        public object Buscar(string layer, string expression, string zoom)
        {
            try
            {
                Mapinfo.Do("select * from "+layer+" where "+expression+" into tmp");
                Mapinfo.RunMenuCommand(306);
                string Cx  = Mapinfo.Eval("CentroidX(Selection.obj)");
                string Cy  = Mapinfo.Eval("CentroidY(Selection.obj)");
                string Per  = Mapinfo.Eval("Perimeter(Selection.obj,\"m\")");
                if (Per == "0")
                {
                    Zoom_to_Position(Cx, Cy, zoom);
                }
                else { Zoom_to_Position(Cx, Cy, Per); };
                Mapinfo.RunMenuCommand(304);

                return true;
            }
            catch (Exception ex)
            {
                ShowMessage(ex);
            }
            return new object();
        }

         /// <summary>
        /// Limpiar seleccion en el mapa 
        /// </summary>

        /// <returns>Mapa sin seleccion </returns>
        public object Limpiar()
        {
            try
            {
                Mapinfo.RunMenuCommand(304);
                return true;
            }
            catch (Exception ex)
            {
                ShowMessage(ex);
            }
            return new object();
        }

        /// <summary>
        /// Devuleve la cantidad de capas en el mapa
        /// </summary>
        /// <returns></returns>
        public int GetLayerCount()
        {
            try
            {
                string mapid = Mapinfo.Eval("FrontWindow()");
                return int.Parse(Mapinfo.Eval("MapperInfo("+ mapid + " , 9)"));
            }
            catch (Exception ex)
            {
                ShowMessage(ex);
            }

            return 0;
        }


          /// <summary>
      /// Oculta la capa tematica
      /// </summary>
      /// <param name="layer">Número o nombre de la capa.</param>
      public void HideThematicLayer(bool ocultar)
        {
            string lyrName;
            try
            {
                 string mapid = Mapinfo.Eval("FrontWindow()");
                for (int i = 0; i <  GetLayerCount(); i++)
                {
                    lyrName = Mapinfo.Eval("LayerInfo( " + mapid + " , " + i + " ,  1 )");
                    if (lyrName.Contains("(")   ) {
                        if (ocultar == true) 
                        { 
                          Layers.HideLayer(i); 
                        } else 
                         {
                          Layers.ShowLayer(i);
                        };
                    }
                 
                }
            }
            catch (Exception ex)
            {
                ShowMessage(ex);
            }
        }
  
    }
}
