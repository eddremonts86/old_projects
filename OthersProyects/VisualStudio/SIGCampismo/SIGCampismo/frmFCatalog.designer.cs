namespace SIGCampismo
{
    partial class frmFCatalog
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
            this.radPanel1 = new Telerik.WinControls.UI.RadPanel();
            this.rdresumen = new Telerik.WinControls.UI.RadCheckBox();
            this.radDropDownList1 = new Telerik.WinControls.UI.RadDropDownList();
            this.provinciasBindingSource = new System.Windows.Forms.BindingSource(this.components);
            this.provinciaDataSet = new SIGCampismo.ProvinciaDataSet();
            this.radButton1 = new Telerik.WinControls.UI.RadButton();
            this.allInst = new Telerik.WinControls.UI.RadCheckBox();
            this.InstCamp = new Telerik.WinControls.UI.RadDropDownList();
            this.instalacionesBindingSource = new System.Windows.Forms.BindingSource(this.components);
            this.instalacionesDataSet = new SIGCampismo.InstalacionesDataSet();
            this.provinciasTableAdapter = new SIGCampismo.ProvinciaDataSetTableAdapters.ProvinciasTableAdapter();
            this.instalacionesTableAdapter = new SIGCampismo.InstalacionesDataSetTableAdapters.instalacionesTableAdapter();
            this.radcuba = new Telerik.WinControls.UI.RadCheckBox();
            ((System.ComponentModel.ISupportInitialize)(this.radPanel1)).BeginInit();
            this.radPanel1.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.rdresumen)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.radDropDownList1)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.provinciasBindingSource)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.provinciaDataSet)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.radButton1)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.allInst)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.InstCamp)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.instalacionesBindingSource)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.instalacionesDataSet)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.radcuba)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this)).BeginInit();
            this.SuspendLayout();
            // 
            // radPanel1
            // 
            this.radPanel1.Controls.Add(this.radcuba);
            this.radPanel1.Controls.Add(this.rdresumen);
            this.radPanel1.Controls.Add(this.radDropDownList1);
            this.radPanel1.Controls.Add(this.radButton1);
            this.radPanel1.Controls.Add(this.allInst);
            this.radPanel1.Controls.Add(this.InstCamp);
            this.radPanel1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.radPanel1.Location = new System.Drawing.Point(0, 0);
            this.radPanel1.Name = "radPanel1";
            this.radPanel1.Size = new System.Drawing.Size(319, 105);
            this.radPanel1.TabIndex = 0;
            // 
            // rdresumen
            // 
            this.rdresumen.Location = new System.Drawing.Point(241, 20);
            this.rdresumen.Name = "rdresumen";
            this.rdresumen.Size = new System.Drawing.Size(66, 18);
            this.rdresumen.TabIndex = 10;
            this.rdresumen.Text = "Resumen";
            // 
            // radDropDownList1
            // 
            this.radDropDownList1.AutoCompleteDisplayMember = "Nombre_Provincia";
            this.radDropDownList1.AutoCompleteValueMember = "idprovincia";
            this.radDropDownList1.DataSource = this.provinciasBindingSource;
            this.radDropDownList1.DisplayMember = "Nombre_Provincia";
            this.radDropDownList1.Location = new System.Drawing.Point(13, 43);
            this.radDropDownList1.Name = "radDropDownList1";
            this.radDropDownList1.ShowImageInEditorArea = true;
            this.radDropDownList1.Size = new System.Drawing.Size(144, 20);
            this.radDropDownList1.TabIndex = 9;
            this.radDropDownList1.ValueMember = "idprovincia";
            this.radDropDownList1.SelectedValueChanged += new System.EventHandler(this.radDropDownList1_SelectedValueChanged);
            // 
            // provinciasBindingSource
            // 
            this.provinciasBindingSource.DataMember = "Provincias";
            this.provinciasBindingSource.DataSource = this.provinciaDataSet;
            // 
            // provinciaDataSet
            // 
            this.provinciaDataSet.DataSetName = "ProvinciaDataSet";
            this.provinciaDataSet.SchemaSerializationMode = System.Data.SchemaSerializationMode.IncludeSchema;
            // 
            // radButton1
            // 
            this.radButton1.Location = new System.Drawing.Point(163, 71);
            this.radButton1.Name = "radButton1";
            this.radButton1.Size = new System.Drawing.Size(144, 24);
            this.radButton1.TabIndex = 8;
            this.radButton1.Text = "Mostrar";
            this.radButton1.Click += new System.EventHandler(this.radButton1_Click);
            // 
            // allInst
            // 
            this.allInst.Location = new System.Drawing.Point(112, 20);
            this.allInst.Name = "allInst";
            this.allInst.Size = new System.Drawing.Size(102, 18);
            this.allInst.TabIndex = 7;
            this.allInst.Text = "Toda la Empresa";
            this.allInst.ToggleState = Telerik.WinControls.Enumerations.ToggleState.On;
            this.allInst.Click += new System.EventHandler(this.allInst_Click);
            // 
            // InstCamp
            // 
            this.InstCamp.AutoCompleteDisplayMember = "Nombre_Instalacion";
            this.InstCamp.AutoCompleteValueMember = "id_instalacion";
            this.InstCamp.DataSource = this.instalacionesBindingSource;
            this.InstCamp.DisplayMember = "Nombre_Instalacion";
            this.InstCamp.Location = new System.Drawing.Point(163, 44);
            this.InstCamp.Name = "InstCamp";
            this.InstCamp.ShowImageInEditorArea = true;
            this.InstCamp.Size = new System.Drawing.Size(144, 20);
            this.InstCamp.TabIndex = 6;
            this.InstCamp.ValueMember = "id_instalacion";
            this.InstCamp.Visible = false;
            // 
            // instalacionesBindingSource
            // 
            this.instalacionesBindingSource.DataMember = "instalaciones";
            this.instalacionesBindingSource.DataSource = this.instalacionesDataSet;
            // 
            // instalacionesDataSet
            // 
            this.instalacionesDataSet.DataSetName = "InstalacionesDataSet";
            this.instalacionesDataSet.SchemaSerializationMode = System.Data.SchemaSerializationMode.IncludeSchema;
            // 
            // provinciasTableAdapter
            // 
            this.provinciasTableAdapter.ClearBeforeFill = true;
            // 
            // instalacionesTableAdapter
            // 
            this.instalacionesTableAdapter.ClearBeforeFill = true;
            // 
            // radcuba
            // 
            this.radcuba.Location = new System.Drawing.Point(13, 20);
            this.radcuba.Name = "radcuba";
            this.radcuba.Size = new System.Drawing.Size(81, 18);
            this.radcuba.TabIndex = 11;
            this.radcuba.Text = "Todo el pais";
            this.radcuba.ToggleState = Telerik.WinControls.Enumerations.ToggleState.On;
            // 
            // frmFCatalog
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(319, 105);
            this.Controls.Add(this.radPanel1);
            this.Name = "frmFCatalog";
            // 
            // 
            // 
            this.RootElement.ApplyShapeToControl = true;
            this.Text = "Reporte por Instalaciones";
            this.ThemeName = "ControlDefault";
            this.Load += new System.EventHandler(this.frmFCatalog_Load);
            ((System.ComponentModel.ISupportInitialize)(this.radPanel1)).EndInit();
            this.radPanel1.ResumeLayout(false);
            this.radPanel1.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)(this.rdresumen)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.radDropDownList1)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.provinciasBindingSource)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.provinciaDataSet)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.radButton1)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.allInst)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.InstCamp)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.instalacionesBindingSource)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.instalacionesDataSet)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.radcuba)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this)).EndInit();
            this.ResumeLayout(false);

        }

        #endregion

        private Telerik.WinControls.UI.RadPanel radPanel1;
        private Telerik.WinControls.UI.RadDropDownList InstCamp;
        private Telerik.WinControls.UI.RadButton radButton1;
        private Telerik.WinControls.UI.RadCheckBox allInst;
        private ProvinciaDataSet provinciaDataSet;
        private System.Windows.Forms.BindingSource provinciasBindingSource;
        private ProvinciaDataSetTableAdapters.ProvinciasTableAdapter provinciasTableAdapter;
        private InstalacionesDataSet instalacionesDataSet;
        private System.Windows.Forms.BindingSource instalacionesBindingSource;
        private InstalacionesDataSetTableAdapters.instalacionesTableAdapter instalacionesTableAdapter;
        private Telerik.WinControls.UI.RadDropDownList radDropDownList1;
        private Telerik.WinControls.UI.RadCheckBox rdresumen;
        private Telerik.WinControls.UI.RadCheckBox radcuba;
    }
}
