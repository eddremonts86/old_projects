using System;
using System.Windows.Forms;
using MapInfo;

namespace MapInfoLibrary
{
    public class TmbLayer : Object
    {
        public MapInfoApplication Hmap { get; set; }
        string cad;

        public TmbLayer(MapInfoApplication hmap)
            : base()
        {
            Hmap = hmap;
        }

        /// <summary>
        /// Devuelve el número de la capa.
        /// </summary>
        /// <param name="layer">Número o nombre capa</param>
        /// <returns></returns>
        public int GetNumberLayer(object layer)
        {
            try
            {
                int lyrNum;
                if (!(layer is int))
                    lyrNum = WichLayer((string)layer);
                else
                    lyrNum = (int)layer;

                return lyrNum;
            }
            catch (Exception ex)
            {
                ShowMessage(ex);
            }

            return 1;
        }

        /// <summary>
        /// Lanza la ventana con el mensaje de error.
        /// </summary>
        /// <param name="ex">Error capturado</param>
        private void ShowMessage(Exception ex)
        {
            MessageBox.Show(ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
        }

        /// <summary>
        /// Conocer el número de la capa dado su nombre
        /// </summary>
        /// <param name="val">Nombre de la capa</param>
        /// <returns>numero de la capa o 1 que es la capa base si no lo encuentra</returns>
        private int WichLayer(string val)
        {
            int lyrCant;
            string lyrName;
            string mapid;
            try
            {
                mapid = Hmap.Eval("FrontWindow()");
                lyrCant = int.Parse(Hmap.Eval("MapperInfo("+ mapid + " , 9)"));
                for (int i = 1; i <= lyrCant; i++)
                {
                    lyrName = Hmap.Eval("LayerInfo( "+ mapid + ", " + i + " ,  1 )");
                    if (lyrName.ToUpper() == val.ToUpper())
                        return i;
                }
                return 1;
            }
            catch (Exception ex)
            {
                ShowMessage(ex);
            }
            return 1;
        }
        /// <summary>
        /// Mostrar la capa
        /// </summary>
        /// <param name="layer">Número o nombre de la capa</param>
        /// 


       public void ShowLayer(object layer, bool grafica=false)
        {
         
            try
            {
               
                int lyrNum = GetNumberLayer(layer);
                if (!grafica) cad = "Set Map Layer " + lyrNum + " Display Global"; // se cambio por Global para que respete el simbolo usado
                if (grafica) cad = "Set Map Layer " + lyrNum + " Display Graphic"; // se cambio por Global para que respete el simbolo usado  Display Graphic
                Hmap.Do(cad);
                cad = "set map redraw on";
                Hmap.Do(cad);

            }
            catch (Exception ex)
            {
                ShowMessage(ex);
            }
        }

        /// <summary>
        /// Oculta la capa por número o por nombre
        /// </summary>
        /// <param name="layer">Número o nombre de la capa.</param>
        public void HideLayer(object layer)
        {
            try
            {
                int lyrNum = GetNumberLayer(layer);
                string s = "Set Map Layer " + lyrNum + " Display Off";
                Hmap.Do(s);
            }
            catch (Exception ex)
            {
                ShowMessage(ex);
            }
        }

        /// <summary>
        /// Devuelve el nombre de la capa
        /// </summary>
        /// <param name="lyrNumber">Número de la capa</param>
        /// <returns></returns>
        public string GetName(int lyrNumber)
        {
            try
            {
                string mapid = Hmap.Eval("FrontWindow()");
                string s = "LayerInfo(" + mapid + "," + lyrNumber + ",1)";
                return Hmap.Eval(s);
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
            return "";
        }
        /// <summary>
        /// Cierra la capa.
        /// </summary>
        /// <param name="layer">Número o nombre de la capa</param>
        public void CloseLayer(object layer)
        {
            try
            {
                string s;
                if (!(layer is int))
                    s = "Close Table " + (string)layer;
                else
                    s = "Close Table " + GetName((int)layer);
                Hmap.Do(s);
            }
            catch (Exception ex)
            {
                ShowMessage(ex);
            }
        }

        /// <summary>
        /// Devulve si la capa esta visible o no
        /// </summary>
        /// <param name="layer">Número o el nombre de la capa</param>
        /// <returns></returns>
        public bool IsVisible(object layer)
        {
            try
            {
                string mapid = Hmap.Eval("FrontWindow()");
                int lyrNum = GetNumberLayer(layer);
                string s = "LayerInfo(" + mapid + ", " + lyrNum + ",1)";
                Hmap.Eval(s);
                return true;
            }
            catch (Exception ex)
            {
                ShowMessage(ex);                   
            }
            return true;
        }

        /// <summary>
        /// Adiciona una nueva capa
        /// </summary>
        /// <param name="layer">Número o el nombre de la capa</param>
        public void AddLayer(object layer)
        {
            try
            {
                string s = "Add Map Layer " + GetNumberLayer(layer);
                Hmap.Do(s);
            }
            catch (Exception ex)
            {
                ShowMessage(ex);
            }
        }

        /// <summary>
        /// Elimina una capa
        /// </summary>
        /// <param name="layer">Número o el nombre de la capa</param>
        public void DeleteLayer(object layer)
        {
            try
            {
                string s = "Remove Map Layer " + GetNumberLayer(layer);
                Hmap.Do(s);
            }
            catch (Exception ex)
            {
                ShowMessage(ex);
            }
        }

        /// <summary>
        /// Devuleve si la capa existe o no.
        /// </summary>
        /// <param name="layer">Número o nombre capa</param>
        /// <returns></returns>
        public bool ExistLayer(object layer)
        {
             string lyrn ;
            try
            {
                string lyrName;
                string mapid = Hmap.Eval("FrontWindow()");
                int lyrCant = int.Parse(Hmap.Eval("MapperInfo("+ mapid + " , 9)"));
                for (int i = 1; i <= lyrCant; i++)
                {
                    lyrn = layer.ToString();
                    lyrName = Hmap.Eval("LayerInfo( "+ mapid + ", " + i + " ,  1 )");
                    if (lyrName.ToUpper() == lyrn.ToUpper())  //GetName(GetNumberLayer(layer)).ToUpper())
                        return true;
                }

            }
            catch (Exception ex)
            {
                ShowMessage(ex);
            }

            return false;
        }

        /// <summary>
        /// Obtenrr el valor de un campo.
        /// </summary>
        /// <param name="layer">Número o nombre capa</param>
        /// <returns></returns>
        public string EvaluaLayer(object layer, string field)
        {
            try
            {
              return Hmap.Eval(layer+"."+field);
            }
            catch (Exception ex)
            {
     
            }

            return "";
        }

    }
}
