namespace SIGCampismo
{
    partial class frmMain
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.components = new System.ComponentModel.Container();
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(frmMain));
            this.radRibbonBar1 = new Telerik.WinControls.UI.RadRibbonBar();
            this.tabMapa = new Telerik.WinControls.UI.RibbonTab();
            this.radRibbonBarGroup1 = new Telerik.WinControls.UI.RadRibbonBarGroup();
            this.radRibbonBarButtonGroup1 = new Telerik.WinControls.UI.RadRibbonBarButtonGroup();
            this.chk_osm = new Telerik.WinControls.UI.RadCheckBoxElement();
            this.chk_google = new Telerik.WinControls.UI.RadCheckBoxElement();
            this.radCheckBoxElement5 = new Telerik.WinControls.UI.RadCheckBoxElement();
            this.radCheckBoxElement1 = new Telerik.WinControls.UI.RadCheckBoxElement();
            this.radRibbonBarButtonGroup3 = new Telerik.WinControls.UI.RadRibbonBarButtonGroup();
            this.radCheckBoxElement3 = new Telerik.WinControls.UI.RadCheckBoxElement();
            this.radCheckBoxElement4 = new Telerik.WinControls.UI.RadCheckBoxElement();
            this.radCheckBoxElement6 = new Telerik.WinControls.UI.RadCheckBoxElement();
            this.radCheckBoxElement2 = new Telerik.WinControls.UI.RadCheckBoxElement();
            this.radCheckBoxElement7 = new Telerik.WinControls.UI.RadCheckBoxElement();
            this.radRibbonBarGroup2 = new Telerik.WinControls.UI.RadRibbonBarGroup();
            this.radButtonElement1 = new Telerik.WinControls.UI.RadButtonElement();
            this.radButtonElement2 = new Telerik.WinControls.UI.RadButtonElement();
            this.radButtonElement19 = new Telerik.WinControls.UI.RadButtonElement();
            this.radButtonElement3 = new Telerik.WinControls.UI.RadButtonElement();
            this.radButtonElement6 = new Telerik.WinControls.UI.RadButtonElement();
            this.btninfoinstalacion = new Telerik.WinControls.UI.RadButtonElement();
            this.radButtonElement5 = new Telerik.WinControls.UI.RadButtonElement();
            this.radButtonElement7 = new Telerik.WinControls.UI.RadButtonElement();
            this.radButtonElement17 = new Telerik.WinControls.UI.RadButtonElement();
            this.radButtonElement18 = new Telerik.WinControls.UI.RadButtonElement();
            this.btnactualizar = new Telerik.WinControls.UI.RadButtonElement();
            this.radRibbonBarGroup3 = new Telerik.WinControls.UI.RadRibbonBarGroup();
            this.btnbuscar_instalacion = new Telerik.WinControls.UI.RadButtonElement();
            this.radButtonElement8 = new Telerik.WinControls.UI.RadButtonElement();
            this.radRibbonBarGroup4 = new Telerik.WinControls.UI.RadRibbonBarGroup();
            this.radButtonElement9 = new Telerik.WinControls.UI.RadButtonElement();
            this.radButtonElement10 = new Telerik.WinControls.UI.RadButtonElement();
            this.radButtonElement11 = new Telerik.WinControls.UI.RadButtonElement();
            this.radButtonElement12 = new Telerik.WinControls.UI.RadButtonElement();
            this.radButtonElement13 = new Telerik.WinControls.UI.RadButtonElement();
            this.radButtonElement14 = new Telerik.WinControls.UI.RadButtonElement();
            this.radButtonElement15 = new Telerik.WinControls.UI.RadButtonElement();
            this.radButtonElement20 = new Telerik.WinControls.UI.RadButtonElement();
            this.radButtonElement16 = new Telerik.WinControls.UI.RadButtonElement();
            this.radButtonElement21 = new Telerik.WinControls.UI.RadButtonElement();
            this.radRibbonBarGroup7 = new Telerik.WinControls.UI.RadRibbonBarGroup();
            this.btnsalir = new Telerik.WinControls.UI.RadButtonElement();
            this.ribbonTab2 = new Telerik.WinControls.UI.RibbonTab();
            this.radRibbonBarGroup5 = new Telerik.WinControls.UI.RadRibbonBarGroup();
            this.radButtonElement4 = new Telerik.WinControls.UI.RadButtonElement();
            this.radRibbonBarGroup6 = new Telerik.WinControls.UI.RadRibbonBarGroup();
            this.btn_list_instalaciones = new Telerik.WinControls.UI.RadButtonElement();
            this.btn_list_instXServ = new Telerik.WinControls.UI.RadButtonElement();
            this.radButtonElement22 = new Telerik.WinControls.UI.RadButtonElement();
            this.pueblosBindingSource = new System.Windows.Forms.BindingSource(this.components);
            this.dS_Pueblos = new SIGCampismo.DS_Pueblos();
            this.radStatusStrip1 = new Telerik.WinControls.UI.RadStatusStrip();
            this.panel1 = new System.Windows.Forms.Panel();
            this.Mapa = new MapInfoLibrary.TMap();
            this.pueblosTableAdapter = new SIGCampismo.DS_PueblosTableAdapters.pueblosTableAdapter();
            this.timer = new System.Windows.Forms.Timer(this.components);
            ((System.ComponentModel.ISupportInitialize)(this.radRibbonBar1)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.pueblosBindingSource)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.dS_Pueblos)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.radStatusStrip1)).BeginInit();
            this.panel1.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this)).BeginInit();
            this.SuspendLayout();
            // 
            // radRibbonBar1
            // 
            this.radRibbonBar1.AutoSize = true;
            this.radRibbonBar1.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Stretch;
            this.radRibbonBar1.CommandTabs.AddRange(new Telerik.WinControls.RadItem[] {
            this.tabMapa,
            this.ribbonTab2});
            this.radRibbonBar1.Dock = System.Windows.Forms.DockStyle.Top;
            this.radRibbonBar1.EnableKeyMap = true;
            // 
            // 
            // 
            this.radRibbonBar1.ExitButton.AccessibleDescription = "Exit";
            this.radRibbonBar1.ExitButton.AccessibleName = "Exit";
            // 
            // 
            // 
            this.radRibbonBar1.ExitButton.ButtonElement.AccessibleDescription = "Exit";
            this.radRibbonBar1.ExitButton.ButtonElement.AccessibleName = "Exit";
            this.radRibbonBar1.ExitButton.ButtonElement.Class = "RadMenuButtonElement";
            this.radRibbonBar1.ExitButton.ButtonElement.TextImageRelation = System.Windows.Forms.TextImageRelation.ImageBeforeText;
            this.radRibbonBar1.ExitButton.Text = "Exit";
            this.radRibbonBar1.Location = new System.Drawing.Point(0, 0);
            this.radRibbonBar1.Name = "radRibbonBar1";
            // 
            // 
            // 
            this.radRibbonBar1.OptionsButton.AccessibleDescription = "Options";
            this.radRibbonBar1.OptionsButton.AccessibleName = "Options";
            // 
            // 
            // 
            this.radRibbonBar1.OptionsButton.ButtonElement.AccessibleDescription = "Options";
            this.radRibbonBar1.OptionsButton.ButtonElement.AccessibleName = "Options";
            this.radRibbonBar1.OptionsButton.ButtonElement.Class = "RadMenuButtonElement";
            this.radRibbonBar1.OptionsButton.ButtonElement.TextImageRelation = System.Windows.Forms.TextImageRelation.ImageBeforeText;
            this.radRibbonBar1.OptionsButton.Text = "Options";
            // 
            // 
            // 
            this.radRibbonBar1.RootElement.AutoSizeMode = Telerik.WinControls.RadAutoSizeMode.WrapAroundChildren;
            this.radRibbonBar1.Size = new System.Drawing.Size(1378, 164);
            this.radRibbonBar1.StartButtonImage = ((System.Drawing.Image)(resources.GetObject("radRibbonBar1.StartButtonImage")));
            this.radRibbonBar1.TabIndex = 0;
            this.radRibbonBar1.Text = "Sistema de Información Geográfico para las Instalaciones del Campismo  v1.0 2014";
            this.radRibbonBar1.Click += new System.EventHandler(this.radRibbonBar1_Click);
            // 
            // tabMapa
            // 
            this.tabMapa.AccessibleDescription = "Mapa";
            this.tabMapa.AccessibleName = "Mapa";
            this.tabMapa.Alignment = System.Drawing.ContentAlignment.BottomLeft;
            // 
            // tabMapa.ContentPanel
            // 
            this.tabMapa.ContentPanel.BackColor = System.Drawing.SystemColors.ControlLightLight;
            this.tabMapa.ContentPanel.CausesValidation = true;
            this.tabMapa.ContentPanel.Font = new System.Drawing.Font("Microsoft Sans Serif", 8.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.tabMapa.ContentPanel.ForeColor = System.Drawing.SystemColors.ControlText;
            this.tabMapa.ContentPanel.Location = new System.Drawing.Point(0, 0);
            this.tabMapa.ContentPanel.Size = new System.Drawing.Size(200, 100);
            this.tabMapa.IsSelected = true;
            this.tabMapa.Items.AddRange(new Telerik.WinControls.RadItem[] {
            this.radRibbonBarGroup1,
            this.radRibbonBarGroup2,
            this.radRibbonBarGroup3,
            this.radRibbonBarGroup4,
            this.radRibbonBarGroup7});
            this.tabMapa.Name = "tabMapa";
            this.tabMapa.StretchHorizontally = false;
            this.tabMapa.Text = "Mapa";
            this.tabMapa.Visibility = Telerik.WinControls.ElementVisibility.Visible;
            // 
            // radRibbonBarGroup1
            // 
            this.radRibbonBarGroup1.AccessibleDescription = "Capas";
            this.radRibbonBarGroup1.AccessibleName = "Capas";
            this.radRibbonBarGroup1.AutoSize = true;
            this.radRibbonBarGroup1.FitToSizeMode = Telerik.WinControls.RadFitToSizeMode.FitToParentContent;
            this.radRibbonBarGroup1.Items.AddRange(new Telerik.WinControls.RadItem[] {
            this.radRibbonBarButtonGroup1,
            this.radRibbonBarButtonGroup3});
            this.radRibbonBarGroup1.Name = "radRibbonBarGroup1";
            this.radRibbonBarGroup1.Text = "Capas";
            this.radRibbonBarGroup1.Visibility = Telerik.WinControls.ElementVisibility.Visible;
            // 
            // radRibbonBarButtonGroup1
            // 
            this.radRibbonBarButtonGroup1.AccessibleDescription = "radRibbonBarButtonGroup1";
            this.radRibbonBarButtonGroup1.AccessibleName = "radRibbonBarButtonGroup1";
            this.radRibbonBarButtonGroup1.AutoSize = false;
            this.radRibbonBarButtonGroup1.Bounds = new System.Drawing.Rectangle(0, 0, 93, 90);
            this.radRibbonBarButtonGroup1.Items.AddRange(new Telerik.WinControls.RadItem[] {
            this.chk_osm,
            this.chk_google,
            this.radCheckBoxElement5,
            this.radCheckBoxElement1});
            this.radRibbonBarButtonGroup1.Name = "radRibbonBarButtonGroup1";
            this.radRibbonBarButtonGroup1.Orientation = System.Windows.Forms.Orientation.Vertical;
            this.radRibbonBarButtonGroup1.PositionOffset = new System.Drawing.SizeF(0F, 0F);
            this.radRibbonBarButtonGroup1.Text = "radRibbonBarButtonGroup1";
            this.radRibbonBarButtonGroup1.Visibility = Telerik.WinControls.ElementVisibility.Visible;
            // 
            // chk_osm
            // 
            this.chk_osm.AccessibleDescription = "OSM";
            this.chk_osm.AccessibleName = "OSM";
            this.chk_osm.AutoSize = false;
            this.chk_osm.Bounds = new System.Drawing.Rectangle(0, -4, 91, 30);
            this.chk_osm.Checked = false;
            this.chk_osm.Name = "chk_osm";
            this.chk_osm.Text = "OSM";
            this.chk_osm.ToggleState = Telerik.WinControls.Enumerations.ToggleState.Off;
            this.chk_osm.Visibility = Telerik.WinControls.ElementVisibility.Visible;
            this.chk_osm.ToggleStateChanged += new Telerik.WinControls.UI.StateChangedEventHandler(this.radCheckBoxElement7_ToggleStateChanged);
            // 
            // chk_google
            // 
            this.chk_google.AccessibleDescription = "Google";
            this.chk_google.AccessibleName = "Google";
            this.chk_google.AutoSize = false;
            this.chk_google.Bounds = new System.Drawing.Rectangle(0, -7, 91, 18);
            this.chk_google.Checked = true;
            this.chk_google.Name = "chk_google";
            this.chk_google.Text = "Google";
            this.chk_google.ToggleState = Telerik.WinControls.Enumerations.ToggleState.On;
            this.chk_google.Visibility = Telerik.WinControls.ElementVisibility.Visible;
            this.chk_google.ToggleStateChanged += new Telerik.WinControls.UI.StateChangedEventHandler(this.radCheckBoxElement8_ToggleStateChanged);
            // 
            // radCheckBoxElement5
            // 
            this.radCheckBoxElement5.AccessibleDescription = "Ríos";
            this.radCheckBoxElement5.AccessibleName = "Ríos";
            this.radCheckBoxElement5.AutoSize = false;
            this.radCheckBoxElement5.Bounds = new System.Drawing.Rectangle(0, -5, 91, 18);
            this.radCheckBoxElement5.Checked = false;
            this.radCheckBoxElement5.Name = "radCheckBoxElement5";
            this.radCheckBoxElement5.Text = "Ríos";
            this.radCheckBoxElement5.ToggleState = Telerik.WinControls.Enumerations.ToggleState.Off;
            this.radCheckBoxElement5.Visibility = Telerik.WinControls.ElementVisibility.Visible;
            this.radCheckBoxElement5.ToggleStateChanged += new Telerik.WinControls.UI.StateChangedEventHandler(this.radCheckBoxElement5_ToggleStateChanged);
            // 
            // radCheckBoxElement1
            // 
            this.radCheckBoxElement1.AccessibleDescription = "Carreteras";
            this.radCheckBoxElement1.AccessibleName = "Carreteras";
            this.radCheckBoxElement1.AutoSize = false;
            this.radCheckBoxElement1.Bounds = new System.Drawing.Rectangle(0, -3, 91, 18);
            this.radCheckBoxElement1.Checked = false;
            this.radCheckBoxElement1.Name = "radCheckBoxElement1";
            this.radCheckBoxElement1.Text = "Carreteras";
            this.radCheckBoxElement1.ToggleState = Telerik.WinControls.Enumerations.ToggleState.Off;
            this.radCheckBoxElement1.Visibility = Telerik.WinControls.ElementVisibility.Visible;
            this.radCheckBoxElement1.ToggleStateChanged += new Telerik.WinControls.UI.StateChangedEventHandler(this.radCheckBoxElement1_ToggleStateChanged_2);
            // 
            // radRibbonBarButtonGroup3
            // 
            this.radRibbonBarButtonGroup3.AccessibleDescription = "radRibbonBarButtonGroup3";
            this.radRibbonBarButtonGroup3.AccessibleName = "radRibbonBarButtonGroup3";
            this.radRibbonBarButtonGroup3.AutoSize = false;
            this.radRibbonBarButtonGroup3.Bounds = new System.Drawing.Rectangle(0, 0, 100, 90);
            this.radRibbonBarButtonGroup3.Items.AddRange(new Telerik.WinControls.RadItem[] {
            this.radCheckBoxElement3,
            this.radCheckBoxElement4,
            this.radCheckBoxElement6,
            this.radCheckBoxElement2,
            this.radCheckBoxElement7});
            this.radRibbonBarButtonGroup3.Name = "radRibbonBarButtonGroup3";
            this.radRibbonBarButtonGroup3.Orientation = System.Windows.Forms.Orientation.Vertical;
            this.radRibbonBarButtonGroup3.PositionOffset = new System.Drawing.SizeF(0F, 0F);
            this.radRibbonBarButtonGroup3.Text = "ºº";
            this.radRibbonBarButtonGroup3.Visibility = Telerik.WinControls.ElementVisibility.Visible;
            // 
            // radCheckBoxElement3
            // 
            this.radCheckBoxElement3.AccessibleDescription = "Pueblos";
            this.radCheckBoxElement3.AccessibleName = "Pueblos";
            this.radCheckBoxElement3.AutoSize = false;
            this.radCheckBoxElement3.Bounds = new System.Drawing.Rectangle(0, 0, 98, 18);
            this.radCheckBoxElement3.Checked = false;
            this.radCheckBoxElement3.Name = "radCheckBoxElement3";
            this.radCheckBoxElement3.Text = "Pueblos";
            this.radCheckBoxElement3.ToggleState = Telerik.WinControls.Enumerations.ToggleState.Off;
            this.radCheckBoxElement3.Visibility = Telerik.WinControls.ElementVisibility.Visible;
            this.radCheckBoxElement3.ToggleStateChanged += new Telerik.WinControls.UI.StateChangedEventHandler(this.radCheckBoxElement3_ToggleStateChanged_1);
            // 
            // radCheckBoxElement4
            // 
            this.radCheckBoxElement4.AccessibleDescription = "Catastro";
            this.radCheckBoxElement4.AccessibleName = "Catastro";
            this.radCheckBoxElement4.AutoSize = false;
            this.radCheckBoxElement4.Bounds = new System.Drawing.Rectangle(0, -1, 82, 18);
            this.radCheckBoxElement4.Checked = false;
            this.radCheckBoxElement4.Name = "radCheckBoxElement4";
            this.radCheckBoxElement4.Text = "Delimitación";
            this.radCheckBoxElement4.ToggleState = Telerik.WinControls.Enumerations.ToggleState.Off;
            this.radCheckBoxElement4.Visibility = Telerik.WinControls.ElementVisibility.Visible;
            this.radCheckBoxElement4.ToggleStateChanged += new Telerik.WinControls.UI.StateChangedEventHandler(this.radCheckBoxElement4_ToggleStateChanged_1);
            // 
            // radCheckBoxElement6
            // 
            this.radCheckBoxElement6.AccessibleDescription = "Embalses";
            this.radCheckBoxElement6.AccessibleName = "Embalses";
            this.radCheckBoxElement6.AutoSize = false;
            this.radCheckBoxElement6.Bounds = new System.Drawing.Rectangle(0, -2, 100, 18);
            this.radCheckBoxElement6.Checked = false;
            this.radCheckBoxElement6.Name = "radCheckBoxElement6";
            this.radCheckBoxElement6.Text = "Embalses";
            this.radCheckBoxElement6.ToggleState = Telerik.WinControls.Enumerations.ToggleState.Off;
            this.radCheckBoxElement6.Visibility = Telerik.WinControls.ElementVisibility.Visible;
            this.radCheckBoxElement6.ToggleStateChanged += new Telerik.WinControls.UI.StateChangedEventHandler(this.radCheckBoxElement6_ToggleStateChanged);
            // 
            // radCheckBoxElement2
            // 
            this.radCheckBoxElement2.AccessibleDescription = "Provincias";
            this.radCheckBoxElement2.AccessibleName = "Provincias";
            this.radCheckBoxElement2.AutoSize = false;
            this.radCheckBoxElement2.Bounds = new System.Drawing.Rectangle(0, -3, 100, 18);
            this.radCheckBoxElement2.Checked = true;
            this.radCheckBoxElement2.Name = "radCheckBoxElement2";
            this.radCheckBoxElement2.Text = "Provincias";
            this.radCheckBoxElement2.ToggleState = Telerik.WinControls.Enumerations.ToggleState.On;
            this.radCheckBoxElement2.Visibility = Telerik.WinControls.ElementVisibility.Visible;
            this.radCheckBoxElement2.ToggleStateChanged += new Telerik.WinControls.UI.StateChangedEventHandler(this.radCheckBoxElement2_ToggleStateChanged_2);
            // 
            // radCheckBoxElement7
            // 
            this.radCheckBoxElement7.AccessibleDescription = "Municipios";
            this.radCheckBoxElement7.AccessibleName = "Municipios";
            this.radCheckBoxElement7.AutoSize = false;
            this.radCheckBoxElement7.Bounds = new System.Drawing.Rectangle(0, -5, 102, 18);
            this.radCheckBoxElement7.Checked = false;
            this.radCheckBoxElement7.Name = "radCheckBoxElement7";
            this.radCheckBoxElement7.Text = "Municipios";
            this.radCheckBoxElement7.Visibility = Telerik.WinControls.ElementVisibility.Visible;
            this.radCheckBoxElement7.ToggleStateChanged += new Telerik.WinControls.UI.StateChangedEventHandler(this.radCheckBoxElement7_ToggleStateChanged_1);
            // 
            // radRibbonBarGroup2
            // 
            this.radRibbonBarGroup2.AccessibleDescription = "Operaciones";
            this.radRibbonBarGroup2.AccessibleName = "Operaciones";
            this.radRibbonBarGroup2.Items.AddRange(new Telerik.WinControls.RadItem[] {
            this.radButtonElement1,
            this.radButtonElement2,
            this.radButtonElement19,
            this.radButtonElement3,
            this.radButtonElement6,
            this.btninfoinstalacion,
            this.radButtonElement5,
            this.radButtonElement7,
            this.radButtonElement17,
            this.radButtonElement18,
            this.btnactualizar});
            this.radRibbonBarGroup2.Name = "radRibbonBarGroup2";
            this.radRibbonBarGroup2.Text = "Operaciones";
            this.radRibbonBarGroup2.Visibility = Telerik.WinControls.ElementVisibility.Visible;
            // 
            // radButtonElement1
            // 
            this.radButtonElement1.AccessibleDescription = "Ampliar";
            this.radButtonElement1.AccessibleName = "Ampliar";
            this.radButtonElement1.Class = "RibbonBarButtonElement";
            this.radButtonElement1.Image = ((System.Drawing.Image)(resources.GetObject("radButtonElement1.Image")));
            this.radButtonElement1.Name = "radButtonElement1";
            this.radButtonElement1.TextImageRelation = System.Windows.Forms.TextImageRelation.ImageAboveText;
            this.radButtonElement1.ToolTipText = "Ampliar el Mapa";
            this.radButtonElement1.Visibility = Telerik.WinControls.ElementVisibility.Visible;
            this.radButtonElement1.Click += new System.EventHandler(this.radButtonElement1_Click);
            // 
            // radButtonElement2
            // 
            this.radButtonElement2.AccessibleDescription = "Reducir";
            this.radButtonElement2.AccessibleName = "Reducir";
            this.radButtonElement2.Class = "RibbonBarButtonElement";
            this.radButtonElement2.Image = ((System.Drawing.Image)(resources.GetObject("radButtonElement2.Image")));
            this.radButtonElement2.Name = "radButtonElement2";
            this.radButtonElement2.TextImageRelation = System.Windows.Forms.TextImageRelation.ImageAboveText;
            this.radButtonElement2.ToolTipText = "Reducir";
            this.radButtonElement2.Visibility = Telerik.WinControls.ElementVisibility.Visible;
            this.radButtonElement2.Click += new System.EventHandler(this.radButtonElement2_Click);
            // 
            // radButtonElement19
            // 
            this.radButtonElement19.Class = "RibbonBarButtonElement";
            this.radButtonElement19.Image = ((System.Drawing.Image)(resources.GetObject("radButtonElement19.Image")));
            this.radButtonElement19.Name = "radButtonElement19";
            this.radButtonElement19.ToolTipText = "Seleccionar";
            this.radButtonElement19.Visibility = Telerik.WinControls.ElementVisibility.Visible;
            this.radButtonElement19.Click += new System.EventHandler(this.radButtonElement19_Click);
            // 
            // radButtonElement3
            // 
            this.radButtonElement3.AccessibleDescription = "Mover";
            this.radButtonElement3.AccessibleName = "Mover";
            this.radButtonElement3.Class = "RibbonBarButtonElement";
            this.radButtonElement3.Image = ((System.Drawing.Image)(resources.GetObject("radButtonElement3.Image")));
            this.radButtonElement3.ImageAlignment = System.Drawing.ContentAlignment.MiddleCenter;
            this.radButtonElement3.Name = "radButtonElement3";
            this.radButtonElement3.TextAlignment = System.Drawing.ContentAlignment.MiddleCenter;
            this.radButtonElement3.TextImageRelation = System.Windows.Forms.TextImageRelation.ImageAboveText;
            this.radButtonElement3.ToolTipText = "Mover el Mapa";
            this.radButtonElement3.Visibility = Telerik.WinControls.ElementVisibility.Visible;
            this.radButtonElement3.Click += new System.EventHandler(this.radButtonElement3_Click);
            // 
            // radButtonElement6
            // 
            this.radButtonElement6.AccessibleDescription = "Ver Todo";
            this.radButtonElement6.AccessibleName = "Ver Todo";
            this.radButtonElement6.Class = "RibbonBarButtonElement";
            this.radButtonElement6.Image = ((System.Drawing.Image)(resources.GetObject("radButtonElement6.Image")));
            this.radButtonElement6.ImageAlignment = System.Drawing.ContentAlignment.MiddleCenter;
            this.radButtonElement6.Name = "radButtonElement6";
            this.radButtonElement6.TextImageRelation = System.Windows.Forms.TextImageRelation.ImageAboveText;
            this.radButtonElement6.ToolTipText = "Ver Todo el Mapa";
            this.radButtonElement6.Visibility = Telerik.WinControls.ElementVisibility.Visible;
            this.radButtonElement6.Click += new System.EventHandler(this.radButtonElement6_Click);
            // 
            // btninfoinstalacion
            // 
            this.btninfoinstalacion.AccessibleDescription = "Informacion";
            this.btninfoinstalacion.AccessibleName = "Informacion";
            this.btninfoinstalacion.Class = "RibbonBarButtonElement";
            this.btninfoinstalacion.Enabled = false;
            this.btninfoinstalacion.Image = ((System.Drawing.Image)(resources.GetObject("btninfoinstalacion.Image")));
            this.btninfoinstalacion.ImageAlignment = System.Drawing.ContentAlignment.MiddleCenter;
            this.btninfoinstalacion.Name = "btninfoinstalacion";
            this.btninfoinstalacion.TextImageRelation = System.Windows.Forms.TextImageRelation.ImageAboveText;
            this.btninfoinstalacion.ToolTipText = "Información de la Instalación seleccionada";
            this.btninfoinstalacion.Visibility = Telerik.WinControls.ElementVisibility.Visible;
            this.btninfoinstalacion.Click += new System.EventHandler(this.radButtonElement4_Click);
            // 
            // radButtonElement5
            // 
            this.radButtonElement5.AccessibleDescription = "Distancia";
            this.radButtonElement5.AccessibleName = "Distancia";
            this.radButtonElement5.Class = "RibbonBarButtonElement";
            this.radButtonElement5.Image = ((System.Drawing.Image)(resources.GetObject("radButtonElement5.Image")));
            this.radButtonElement5.ImageAlignment = System.Drawing.ContentAlignment.MiddleCenter;
            this.radButtonElement5.Name = "radButtonElement5";
            this.radButtonElement5.TextImageRelation = System.Windows.Forms.TextImageRelation.ImageAboveText;
            this.radButtonElement5.ToolTipText = "Medir Distancia";
            this.radButtonElement5.Visibility = Telerik.WinControls.ElementVisibility.Visible;
            this.radButtonElement5.Click += new System.EventHandler(this.radButtonElement5_Click);
            // 
            // radButtonElement7
            // 
            this.radButtonElement7.AccessibleDescription = "Limpiar Selección";
            this.radButtonElement7.AccessibleName = "Limpiar Selección";
            this.radButtonElement7.Class = "RibbonBarButtonElement";
            this.radButtonElement7.Image = ((System.Drawing.Image)(resources.GetObject("radButtonElement7.Image")));
            this.radButtonElement7.ImageAlignment = System.Drawing.ContentAlignment.MiddleCenter;
            this.radButtonElement7.Name = "radButtonElement7";
            this.radButtonElement7.TextAlignment = System.Drawing.ContentAlignment.BottomCenter;
            this.radButtonElement7.ToolTipText = "Limpiar Selección";
            this.radButtonElement7.Visibility = Telerik.WinControls.ElementVisibility.Visible;
            this.radButtonElement7.Click += new System.EventHandler(this.radButtonElement7_Click);
            // 
            // radButtonElement17
            // 
            this.radButtonElement17.AccessibleDescription = "Filtro temático";
            this.radButtonElement17.AccessibleName = "Filtro temático";
            this.radButtonElement17.Class = "RibbonBarButtonElement";
            this.radButtonElement17.Image = ((System.Drawing.Image)(resources.GetObject("radButtonElement17.Image")));
            this.radButtonElement17.ImageAlignment = System.Drawing.ContentAlignment.MiddleCenter;
            this.radButtonElement17.Name = "radButtonElement17";
            this.radButtonElement17.TextAlignment = System.Drawing.ContentAlignment.BottomCenter;
            this.radButtonElement17.ToolTipText = "Filtro temático";
            this.radButtonElement17.Visibility = Telerik.WinControls.ElementVisibility.Visible;
            this.radButtonElement17.Click += new System.EventHandler(this.radButtonElement17_Click);
            // 
            // radButtonElement18
            // 
            this.radButtonElement18.Class = "RibbonBarButtonElement";
            this.radButtonElement18.Image = ((System.Drawing.Image)(resources.GetObject("radButtonElement18.Image")));
            this.radButtonElement18.Name = "radButtonElement18";
            this.radButtonElement18.ToolTipText = "Imprimir el Mapa";
            this.radButtonElement18.Visibility = Telerik.WinControls.ElementVisibility.Visible;
            this.radButtonElement18.Click += new System.EventHandler(this.radButtonElement18_Click);
            // 
            // btnactualizar
            // 
            this.btnactualizar.AccessibleDescription = "Actualizar";
            this.btnactualizar.AccessibleName = "Actualizar";
            this.btnactualizar.Class = "RibbonBarButtonElement";
            this.btnactualizar.Image = ((System.Drawing.Image)(resources.GetObject("btnactualizar.Image")));
            this.btnactualizar.Name = "btnactualizar";
            this.btnactualizar.Text = "";
            this.btnactualizar.ToolTipText = "Actualizar Instalación";
            this.btnactualizar.Visibility = Telerik.WinControls.ElementVisibility.Visible;
            this.btnactualizar.Click += new System.EventHandler(this.btnactualizar_Click);
            // 
            // radRibbonBarGroup3
            // 
            this.radRibbonBarGroup3.AccessibleDescription = "Búsquedas";
            this.radRibbonBarGroup3.AccessibleName = "Búsquedas";
            this.radRibbonBarGroup3.Items.AddRange(new Telerik.WinControls.RadItem[] {
            this.btnbuscar_instalacion,
            this.radButtonElement8});
            this.radRibbonBarGroup3.Name = "radRibbonBarGroup3";
            this.radRibbonBarGroup3.Text = "Localizar";
            this.radRibbonBarGroup3.Visibility = Telerik.WinControls.ElementVisibility.Visible;
            // 
            // btnbuscar_instalacion
            // 
            this.btnbuscar_instalacion.AccessibleDescription = "Instalación";
            this.btnbuscar_instalacion.AccessibleName = "Instalación";
            this.btnbuscar_instalacion.Class = "RibbonBarButtonElement";
            this.btnbuscar_instalacion.Image = ((System.Drawing.Image)(resources.GetObject("btnbuscar_instalacion.Image")));
            this.btnbuscar_instalacion.ImageAlignment = System.Drawing.ContentAlignment.MiddleCenter;
            this.btnbuscar_instalacion.Name = "btnbuscar_instalacion";
            this.btnbuscar_instalacion.TextAlignment = System.Drawing.ContentAlignment.BottomCenter;
            this.btnbuscar_instalacion.ToolTipText = "Localizar una Instalación";
            this.btnbuscar_instalacion.Visibility = Telerik.WinControls.ElementVisibility.Visible;
            this.btnbuscar_instalacion.Click += new System.EventHandler(this.btnbuscar_instalacion_Click);
            // 
            // radButtonElement8
            // 
            this.radButtonElement8.AccessibleDescription = "Pueblo";
            this.radButtonElement8.AccessibleName = "Pueblo";
            this.radButtonElement8.Class = "RibbonBarButtonElement";
            this.radButtonElement8.Image = ((System.Drawing.Image)(resources.GetObject("radButtonElement8.Image")));
            this.radButtonElement8.ImageAlignment = System.Drawing.ContentAlignment.MiddleCenter;
            this.radButtonElement8.Name = "radButtonElement8";
            this.radButtonElement8.TextAlignment = System.Drawing.ContentAlignment.BottomCenter;
            this.radButtonElement8.ToolTipText = "Localizar un Pueblo";
            this.radButtonElement8.Visibility = Telerik.WinControls.ElementVisibility.Visible;
            this.radButtonElement8.Click += new System.EventHandler(this.radButtonElement8_Click);
            // 
            // radRibbonBarGroup4
            // 
            this.radRibbonBarGroup4.AccessibleDescription = "Ver Instalaciones";
            this.radRibbonBarGroup4.AccessibleName = "Ver Instalaciones";
            this.radRibbonBarGroup4.Items.AddRange(new Telerik.WinControls.RadItem[] {
            this.radButtonElement9,
            this.radButtonElement10,
            this.radButtonElement11,
            this.radButtonElement12,
            this.radButtonElement13,
            this.radButtonElement14,
            this.radButtonElement15,
            this.radButtonElement20,
            this.radButtonElement16,
            this.radButtonElement21});
            this.radRibbonBarGroup4.Name = "radRibbonBarGroup4";
            this.radRibbonBarGroup4.Text = "Instalaciones por Categorías";
            this.radRibbonBarGroup4.Visibility = Telerik.WinControls.ElementVisibility.Visible;
            // 
            // radButtonElement9
            // 
            this.radButtonElement9.AccessibleDescription = "Todas";
            this.radButtonElement9.AccessibleName = "Todas";
            this.radButtonElement9.Class = "RibbonBarButtonElement";
            this.radButtonElement9.Image = ((System.Drawing.Image)(resources.GetObject("radButtonElement9.Image")));
            this.radButtonElement9.Name = "radButtonElement9";
            this.radButtonElement9.ToolTipText = "Todas las Instalaciones";
            this.radButtonElement9.Visibility = Telerik.WinControls.ElementVisibility.Visible;
            this.radButtonElement9.Click += new System.EventHandler(this.radButtonElement9_Click);
            // 
            // radButtonElement10
            // 
            this.radButtonElement10.AccessibleDescription = "Campismos";
            this.radButtonElement10.AccessibleName = "Campismos";
            this.radButtonElement10.Class = "RibbonBarButtonElement";
            this.radButtonElement10.Image = ((System.Drawing.Image)(resources.GetObject("radButtonElement10.Image")));
            this.radButtonElement10.Name = "radButtonElement10";
            this.radButtonElement10.ToolTipText = "Instalaciones de Campismo";
            this.radButtonElement10.Visibility = Telerik.WinControls.ElementVisibility.Visible;
            this.radButtonElement10.Click += new System.EventHandler(this.radButtonElement10_Click);
            // 
            // radButtonElement11
            // 
            this.radButtonElement11.AccessibleDescription = "Puntos de Ventas";
            this.radButtonElement11.AccessibleName = "Puntos de Ventas";
            this.radButtonElement11.Class = "RibbonBarButtonElement";
            this.radButtonElement11.Image = ((System.Drawing.Image)(resources.GetObject("radButtonElement11.Image")));
            this.radButtonElement11.Name = "radButtonElement11";
            this.radButtonElement11.ToolTipText = "Extrahotelera";
            this.radButtonElement11.Visibility = Telerik.WinControls.ElementVisibility.Visible;
            this.radButtonElement11.Click += new System.EventHandler(this.radButtonElement11_Click);
            // 
            // radButtonElement12
            // 
            this.radButtonElement12.AccessibleDescription = "Casa Matriz";
            this.radButtonElement12.AccessibleName = "Casa Matriz";
            this.radButtonElement12.Class = "RibbonBarButtonElement";
            this.radButtonElement12.Image = ((System.Drawing.Image)(resources.GetObject("radButtonElement12.Image")));
            this.radButtonElement12.Name = "radButtonElement12";
            this.radButtonElement12.ToolTipText = "Casa Matriz";
            this.radButtonElement12.Visibility = Telerik.WinControls.ElementVisibility.Visible;
            this.radButtonElement12.Click += new System.EventHandler(this.radButtonElement12_Click);
            // 
            // radButtonElement13
            // 
            this.radButtonElement13.AccessibleDescription = "Oficinas";
            this.radButtonElement13.AccessibleName = "Oficinas";
            this.radButtonElement13.Class = "RibbonBarButtonElement";
            this.radButtonElement13.Image = ((System.Drawing.Image)(resources.GetObject("radButtonElement13.Image")));
            this.radButtonElement13.Name = "radButtonElement13";
            this.radButtonElement13.ToolTipText = "Oficinas de Reservación";
            this.radButtonElement13.Visibility = Telerik.WinControls.ElementVisibility.Visible;
            this.radButtonElement13.Click += new System.EventHandler(this.radButtonElement13_Click);
            // 
            // radButtonElement14
            // 
            this.radButtonElement14.AccessibleDescription = "Empresas";
            this.radButtonElement14.AccessibleName = "Empresas";
            this.radButtonElement14.Class = "RibbonBarButtonElement";
            this.radButtonElement14.Image = ((System.Drawing.Image)(resources.GetObject("radButtonElement14.Image")));
            this.radButtonElement14.Name = "radButtonElement14";
            this.radButtonElement14.ToolTipText = "Empresas";
            this.radButtonElement14.Visibility = Telerik.WinControls.ElementVisibility.Visible;
            this.radButtonElement14.Click += new System.EventHandler(this.radButtonElement14_Click);
            // 
            // radButtonElement15
            // 
            this.radButtonElement15.AccessibleDescription = "CubaMar";
            this.radButtonElement15.AccessibleName = "CubaMar";
            this.radButtonElement15.Class = "RibbonBarButtonElement";
            this.radButtonElement15.Image = ((System.Drawing.Image)(resources.GetObject("radButtonElement15.Image")));
            this.radButtonElement15.Name = "radButtonElement15";
            this.radButtonElement15.ToolTipText = "Agencia Cubamar";
            this.radButtonElement15.Visibility = Telerik.WinControls.ElementVisibility.Visible;
            this.radButtonElement15.Click += new System.EventHandler(this.radButtonElement15_Click);
            // 
            // radButtonElement20
            // 
            this.radButtonElement20.Class = "RibbonBarButtonElement";
            this.radButtonElement20.Image = ((System.Drawing.Image)(resources.GetObject("radButtonElement20.Image")));
            this.radButtonElement20.Name = "radButtonElement20";
            this.radButtonElement20.Text = "";
            this.radButtonElement20.ToolTipText = "Villa Turística";
            this.radButtonElement20.Visibility = Telerik.WinControls.ElementVisibility.Visible;
            this.radButtonElement20.Click += new System.EventHandler(this.radButtonElement20_Click);
            // 
            // radButtonElement16
            // 
            this.radButtonElement16.AccessibleDescription = "Abast";
            this.radButtonElement16.AccessibleName = "Abast";
            this.radButtonElement16.Class = "RibbonBarButtonElement";
            this.radButtonElement16.Image = ((System.Drawing.Image)(resources.GetObject("radButtonElement16.Image")));
            this.radButtonElement16.Name = "radButtonElement16";
            this.radButtonElement16.ToolTipText = "Abastecimiento";
            this.radButtonElement16.Visibility = Telerik.WinControls.ElementVisibility.Visible;
            this.radButtonElement16.Click += new System.EventHandler(this.radButtonElement16_Click);
            // 
            // radButtonElement21
            // 
            this.radButtonElement21.Class = "RibbonBarButtonElement";
            this.radButtonElement21.Image = ((System.Drawing.Image)(resources.GetObject("radButtonElement21.Image")));
            this.radButtonElement21.Name = "radButtonElement21";
            this.radButtonElement21.Text = "";
            this.radButtonElement21.ToolTipText = "Parque Turístico";
            this.radButtonElement21.Visibility = Telerik.WinControls.ElementVisibility.Visible;
            this.radButtonElement21.Click += new System.EventHandler(this.radButtonElement21_Click);
            // 
            // radRibbonBarGroup7
            // 
            this.radRibbonBarGroup7.AccessibleDescription = "Terminar";
            this.radRibbonBarGroup7.AccessibleName = "Terminar";
            this.radRibbonBarGroup7.Items.AddRange(new Telerik.WinControls.RadItem[] {
            this.btnsalir});
            this.radRibbonBarGroup7.Name = "radRibbonBarGroup7";
            this.radRibbonBarGroup7.Text = "Terminar";
            this.radRibbonBarGroup7.Visibility = Telerik.WinControls.ElementVisibility.Visible;
            // 
            // btnsalir
            // 
            this.btnsalir.Class = "RibbonBarButtonElement";
            this.btnsalir.Image = ((System.Drawing.Image)(resources.GetObject("btnsalir.Image")));
            this.btnsalir.Name = "btnsalir";
            this.btnsalir.Text = "";
            this.btnsalir.ToolTipText = "Salir de la aplicación";
            this.btnsalir.Visibility = Telerik.WinControls.ElementVisibility.Visible;
            this.btnsalir.Click += new System.EventHandler(this.btnsalir_Click);
            // 
            // ribbonTab2
            // 
            this.ribbonTab2.AccessibleDescription = "Reportes";
            this.ribbonTab2.AccessibleName = "Reportes";
            this.ribbonTab2.Alignment = System.Drawing.ContentAlignment.BottomLeft;
            // 
            // ribbonTab2.ContentPanel
            // 
            this.ribbonTab2.ContentPanel.BackColor = System.Drawing.SystemColors.ControlLightLight;
            this.ribbonTab2.ContentPanel.CausesValidation = true;
            this.ribbonTab2.ContentPanel.Font = new System.Drawing.Font("Microsoft Sans Serif", 8.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.ribbonTab2.ContentPanel.ForeColor = System.Drawing.SystemColors.ControlText;
            this.ribbonTab2.ContentPanel.Location = new System.Drawing.Point(0, 0);
            this.ribbonTab2.ContentPanel.Size = new System.Drawing.Size(200, 100);
            this.ribbonTab2.Items.AddRange(new Telerik.WinControls.RadItem[] {
            this.radRibbonBarGroup5,
            this.radRibbonBarGroup6});
            this.ribbonTab2.Name = "ribbonTab2";
            this.ribbonTab2.StretchHorizontally = false;
            this.ribbonTab2.Text = "Reportes";
            this.ribbonTab2.Visibility = Telerik.WinControls.ElementVisibility.Visible;
            // 
            // radRibbonBarGroup5
            // 
            this.radRibbonBarGroup5.AccessibleDescription = "Catalogo";
            this.radRibbonBarGroup5.AccessibleName = "Catalogo";
            this.radRibbonBarGroup5.Items.AddRange(new Telerik.WinControls.RadItem[] {
            this.radButtonElement4});
            this.radRibbonBarGroup5.Name = "radRibbonBarGroup5";
            this.radRibbonBarGroup5.Text = "Catálogo";
            this.radRibbonBarGroup5.Visibility = Telerik.WinControls.ElementVisibility.Visible;
            // 
            // radButtonElement4
            // 
            this.radButtonElement4.AccessibleDescription = "catalogo";
            this.radButtonElement4.AccessibleName = "catalogo";
            this.radButtonElement4.Class = "RibbonBarButtonElement";
            this.radButtonElement4.Image = ((System.Drawing.Image)(resources.GetObject("radButtonElement4.Image")));
            this.radButtonElement4.Name = "radButtonElement4";
            this.radButtonElement4.Text = "";
            this.radButtonElement4.ToolTipText = "Catálogo";
            this.radButtonElement4.Visibility = Telerik.WinControls.ElementVisibility.Visible;
            this.radButtonElement4.Click += new System.EventHandler(this.radButtonElement4_Click_1);
            // 
            // radRibbonBarGroup6
            // 
            this.radRibbonBarGroup6.AccessibleDescription = "Listados";
            this.radRibbonBarGroup6.AccessibleName = "Listados";
            this.radRibbonBarGroup6.Items.AddRange(new Telerik.WinControls.RadItem[] {
            this.btn_list_instalaciones,
            this.btn_list_instXServ,
            this.radButtonElement22});
            this.radRibbonBarGroup6.Name = "radRibbonBarGroup6";
            this.radRibbonBarGroup6.Text = "Listados";
            this.radRibbonBarGroup6.Visibility = Telerik.WinControls.ElementVisibility.Visible;
            // 
            // btn_list_instalaciones
            // 
            this.btn_list_instalaciones.AccessibleDescription = "Instalaciones";
            this.btn_list_instalaciones.AccessibleName = "Instalaciones";
            this.btn_list_instalaciones.Class = "RibbonBarButtonElement";
            this.btn_list_instalaciones.Image = ((System.Drawing.Image)(resources.GetObject("btn_list_instalaciones.Image")));
            this.btn_list_instalaciones.Name = "btn_list_instalaciones";
            this.btn_list_instalaciones.Text = "";
            this.btn_list_instalaciones.ToolTipText = "Listado de Instalaciones";
            this.btn_list_instalaciones.Visibility = Telerik.WinControls.ElementVisibility.Visible;
            this.btn_list_instalaciones.Click += new System.EventHandler(this.btn_list_instalaciones_Click);
            // 
            // btn_list_instXServ
            // 
            this.btn_list_instXServ.AccessibleDescription = "Instalaciones x Servicios";
            this.btn_list_instXServ.AccessibleName = "Instalaciones x Servicios";
            this.btn_list_instXServ.Class = "RibbonBarButtonElement";
            this.btn_list_instXServ.Image = ((System.Drawing.Image)(resources.GetObject("btn_list_instXServ.Image")));
            this.btn_list_instXServ.Name = "btn_list_instXServ";
            this.btn_list_instXServ.Text = "";
            this.btn_list_instXServ.ToolTipText = "Listado de Instalaciones por Servicios";
            this.btn_list_instXServ.Visibility = Telerik.WinControls.ElementVisibility.Visible;
            this.btn_list_instXServ.Click += new System.EventHandler(this.btn_list_instXServ_Click);
            // 
            // radButtonElement22
            // 
            this.radButtonElement22.AccessibleDescription = "Equipos";
            this.radButtonElement22.AccessibleName = "Equipos";
            this.radButtonElement22.Class = "RibbonBarButtonElement";
            this.radButtonElement22.Image = ((System.Drawing.Image)(resources.GetObject("radButtonElement22.Image")));
            this.radButtonElement22.Name = "radButtonElement22";
            this.radButtonElement22.Text = "";
            this.radButtonElement22.ToolTipText = "Listado de Equipos";
            this.radButtonElement22.Visibility = Telerik.WinControls.ElementVisibility.Visible;
            this.radButtonElement22.Click += new System.EventHandler(this.radButtonElement22_Click);
            // 
            // pueblosBindingSource
            // 
            this.pueblosBindingSource.DataMember = "pueblos";
            this.pueblosBindingSource.DataSource = this.dS_Pueblos;
            // 
            // dS_Pueblos
            // 
            this.dS_Pueblos.DataSetName = "DS_Pueblos";
            this.dS_Pueblos.SchemaSerializationMode = System.Data.SchemaSerializationMode.IncludeSchema;
            // 
            // radStatusStrip1
            // 
            this.radStatusStrip1.AutoSize = true;
            this.radStatusStrip1.LayoutStyle = Telerik.WinControls.UI.RadStatusBarLayoutStyle.Stack;
            this.radStatusStrip1.Location = new System.Drawing.Point(0, 653);
            this.radStatusStrip1.Name = "radStatusStrip1";
            this.radStatusStrip1.Size = new System.Drawing.Size(1378, 26);
            this.radStatusStrip1.SizingGrip = false;
            this.radStatusStrip1.TabIndex = 1;
            this.radStatusStrip1.Text = "radStatusStrip1";
            // 
            // panel1
            // 
            this.panel1.Controls.Add(this.Mapa);
            this.panel1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.panel1.Location = new System.Drawing.Point(0, 164);
            this.panel1.Name = "panel1";
            this.panel1.Size = new System.Drawing.Size(1378, 489);
            this.panel1.TabIndex = 2;
            // 
            // Mapa
            // 
            this.Mapa._Height = 0;
            this.Mapa._Width = 0;
            this.Mapa.CantseleM = 0;
            this.Mapa.ConnectionNumber = 0;
            this.Mapa.Dock = System.Windows.Forms.DockStyle.Fill;
            this.Mapa.Firts = true;
            this.Mapa.IdWindows = null;
            this.Mapa.Layers = null;
            this.Mapa.Legendid = 0;
            this.Mapa.Location = new System.Drawing.Point(0, 0);
            this.Mapa.Name = "Mapa";
            this.Mapa.Size = new System.Drawing.Size(1378, 489);
            this.Mapa.TabIndex = 1;
            this.Mapa.Paint += new System.Windows.Forms.PaintEventHandler(this.Mapa_Paint);
            // 
            // pueblosTableAdapter
            // 
            this.pueblosTableAdapter.ClearBeforeFill = true;
            // 
            // timer
            // 
            this.timer.Enabled = true;
            this.timer.Tick += new System.EventHandler(this.timer_Tick);
            // 
            // frmMain
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(1378, 679);
            this.Controls.Add(this.panel1);
            this.Controls.Add(this.radStatusStrip1);
            this.Controls.Add(this.radRibbonBar1);
            this.Name = "frmMain";
            // 
            // 
            // 
            this.RootElement.ApplyShapeToControl = true;
            this.Text = "Sistema de Información Geográfico para las Instalaciones del Campismo  v1.0 2014";
            this.WindowState = System.Windows.Forms.FormWindowState.Maximized;
            this.Load += new System.EventHandler(this.frmMain_Load);
            ((System.ComponentModel.ISupportInitialize)(this.radRibbonBar1)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.pueblosBindingSource)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.dS_Pueblos)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.radStatusStrip1)).EndInit();
            this.panel1.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)(this)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private Telerik.WinControls.UI.RadRibbonBar radRibbonBar1;
        private Telerik.WinControls.UI.RadStatusStrip radStatusStrip1;
        private System.Windows.Forms.Panel panel1;
        public MapInfoLibrary.TMap Mapa;
        private Telerik.WinControls.UI.RibbonTab tabMapa;
        private Telerik.WinControls.UI.RadRibbonBarGroup radRibbonBarGroup1;
        private Telerik.WinControls.UI.RadRibbonBarGroup radRibbonBarGroup2;
        private Telerik.WinControls.UI.RadButtonElement radButtonElement1;
        private Telerik.WinControls.UI.RadButtonElement radButtonElement2;
        private Telerik.WinControls.UI.RadButtonElement radButtonElement3;
        private Telerik.WinControls.UI.RadButtonElement btninfoinstalacion;
        private Telerik.WinControls.UI.RadButtonElement radButtonElement5;
        private Telerik.WinControls.UI.RadButtonElement radButtonElement6;
        private Telerik.WinControls.UI.RadRibbonBarGroup radRibbonBarGroup3;
        private Telerik.WinControls.UI.RadButtonElement btnbuscar_instalacion;
        private Telerik.WinControls.UI.RadButtonElement radButtonElement8;
        private Telerik.WinControls.UI.RadRibbonBarButtonGroup radRibbonBarButtonGroup1;
        private Telerik.WinControls.UI.RadCheckBoxElement chk_osm;
        private Telerik.WinControls.UI.RadCheckBoxElement chk_google;
        private Telerik.WinControls.UI.RadRibbonBarButtonGroup radRibbonBarButtonGroup3;
        private Telerik.WinControls.UI.RadCheckBoxElement radCheckBoxElement3;
        private Telerik.WinControls.UI.RadCheckBoxElement radCheckBoxElement4;
        private Telerik.WinControls.UI.RadButtonElement radButtonElement7;
        private DS_Pueblos dS_Pueblos;
        private System.Windows.Forms.BindingSource pueblosBindingSource;
        private DS_PueblosTableAdapters.pueblosTableAdapter pueblosTableAdapter;
        private Telerik.WinControls.UI.RadRibbonBarGroup radRibbonBarGroup4;
        private Telerik.WinControls.UI.RadButtonElement radButtonElement9;
        private Telerik.WinControls.UI.RadButtonElement radButtonElement10;
        private Telerik.WinControls.UI.RadButtonElement radButtonElement11;
        private Telerik.WinControls.UI.RadButtonElement radButtonElement12;
        private Telerik.WinControls.UI.RadButtonElement radButtonElement13;
        private Telerik.WinControls.UI.RadButtonElement radButtonElement14;
        private Telerik.WinControls.UI.RadButtonElement radButtonElement15;
        private Telerik.WinControls.UI.RadButtonElement radButtonElement16;
        private Telerik.WinControls.UI.RadButtonElement radButtonElement17;
        private Telerik.WinControls.UI.RadButtonElement radButtonElement18;
        private System.Windows.Forms.Timer timer;
        private Telerik.WinControls.UI.RadButtonElement radButtonElement19;
        private Telerik.WinControls.UI.RibbonTab ribbonTab2;
        private Telerik.WinControls.UI.RadRibbonBarGroup radRibbonBarGroup5;
        private Telerik.WinControls.UI.RadRibbonBarGroup radRibbonBarGroup6;
        private Telerik.WinControls.UI.RadButtonElement btn_list_instalaciones;
        private Telerik.WinControls.UI.RadButtonElement btn_list_instXServ;
        private Telerik.WinControls.UI.RadButtonElement radButtonElement4;
        private Telerik.WinControls.UI.RadButtonElement btnactualizar;
        private Telerik.WinControls.UI.RadRibbonBarGroup radRibbonBarGroup7;
        private Telerik.WinControls.UI.RadButtonElement btnsalir;
        private Telerik.WinControls.UI.RadButtonElement radButtonElement20;
        private Telerik.WinControls.UI.RadButtonElement radButtonElement21;
        private Telerik.WinControls.UI.RadCheckBoxElement radCheckBoxElement5;
        private Telerik.WinControls.UI.RadCheckBoxElement radCheckBoxElement6;
        private Telerik.WinControls.UI.RadCheckBoxElement radCheckBoxElement1;
        private Telerik.WinControls.UI.RadCheckBoxElement radCheckBoxElement2;
        private Telerik.WinControls.UI.RadCheckBoxElement radCheckBoxElement7;
        private Telerik.WinControls.UI.RadButtonElement radButtonElement22;
    }
}
