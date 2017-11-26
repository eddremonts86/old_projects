namespace SIGCampismo
{
    partial class busqueda
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
            this.listprovincias = new Telerik.WinControls.UI.RadDropDownList();
            this.provinciasBindingSource = new System.Windows.Forms.BindingSource(this.components);
            this.provinciaDataSetBindingSource = new System.Windows.Forms.BindingSource(this.components);
            this.provinciaDataSet = new SIGCampismo.ProvinciaDataSet();
            this.listpueblos = new Telerik.WinControls.UI.RadDropDownList();
            this.pueblosBindingSource = new System.Windows.Forms.BindingSource(this.components);
            this.dSPueblosBindingSource = new System.Windows.Forms.BindingSource(this.components);
            this.dS_Pueblos = new SIGCampismo.DS_Pueblos();
            this.btnbuscar = new Telerik.WinControls.UI.RadButton();
            this.radLabel2 = new Telerik.WinControls.UI.RadLabel();
            this.radLabel1 = new Telerik.WinControls.UI.RadLabel();
            this.pueblosTableAdapter = new SIGCampismo.DS_PueblosTableAdapters.pueblosTableAdapter();
            this.provinciasTableAdapter = new SIGCampismo.ProvinciaDataSetTableAdapters.ProvinciasTableAdapter();
            ((System.ComponentModel.ISupportInitialize)(this.radPanel1)).BeginInit();
            this.radPanel1.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.listprovincias)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.provinciasBindingSource)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.provinciaDataSetBindingSource)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.provinciaDataSet)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.listpueblos)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.pueblosBindingSource)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.dSPueblosBindingSource)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.dS_Pueblos)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.btnbuscar)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.radLabel2)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.radLabel1)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this)).BeginInit();
            this.SuspendLayout();
            // 
            // radPanel1
            // 
            this.radPanel1.Controls.Add(this.listprovincias);
            this.radPanel1.Controls.Add(this.listpueblos);
            this.radPanel1.Controls.Add(this.btnbuscar);
            this.radPanel1.Controls.Add(this.radLabel2);
            this.radPanel1.Controls.Add(this.radLabel1);
            this.radPanel1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.radPanel1.Location = new System.Drawing.Point(0, 0);
            this.radPanel1.Name = "radPanel1";
            this.radPanel1.Size = new System.Drawing.Size(346, 138);
            this.radPanel1.TabIndex = 0;
            // 
            // listprovincias
            // 
            this.listprovincias.AutoCompleteDisplayMember = "Nombre_Provincia";
            this.listprovincias.AutoCompleteValueMember = "idprovincia";
            this.listprovincias.DataSource = this.provinciasBindingSource;
            this.listprovincias.DisplayMember = "Nombre_Provincia";
            this.listprovincias.Location = new System.Drawing.Point(19, 19);
            this.listprovincias.Name = "listprovincias";
            this.listprovincias.ShowImageInEditorArea = true;
            this.listprovincias.Size = new System.Drawing.Size(280, 20);
            this.listprovincias.TabIndex = 0;
            this.listprovincias.ValueMember = "idprovincia";
            this.listprovincias.SelectedIndexChanged += new Telerik.WinControls.UI.Data.PositionChangedEventHandler(this.listprovincias_SelectedIndexChanged);
            // 
            // provinciasBindingSource
            // 
            this.provinciasBindingSource.DataMember = "Provincias";
            this.provinciasBindingSource.DataSource = this.provinciaDataSetBindingSource;
            // 
            // provinciaDataSetBindingSource
            // 
            this.provinciaDataSetBindingSource.DataSource = this.provinciaDataSet;
            this.provinciaDataSetBindingSource.Position = 0;
            // 
            // provinciaDataSet
            // 
            this.provinciaDataSet.DataSetName = "ProvinciaDataSet";
            this.provinciaDataSet.SchemaSerializationMode = System.Data.SchemaSerializationMode.IncludeSchema;
            // 
            // listpueblos
            // 
            this.listpueblos.AutoCompleteDisplayMember = "Nombre";
            this.listpueblos.AutoCompleteMode = System.Windows.Forms.AutoCompleteMode.Suggest;
            this.listpueblos.AutoCompleteValueMember = "id_pueblo";
            this.listpueblos.DataSource = this.pueblosBindingSource;
            this.listpueblos.DisplayMember = "Nombre";
            this.listpueblos.Location = new System.Drawing.Point(19, 68);
            this.listpueblos.Name = "listpueblos";
            this.listpueblos.ShowImageInEditorArea = true;
            this.listpueblos.Size = new System.Drawing.Size(280, 20);
            this.listpueblos.TabIndex = 1;
            this.listpueblos.ValueMember = "id_pueblo";
            // 
            // pueblosBindingSource
            // 
            this.pueblosBindingSource.DataMember = "pueblos";
            this.pueblosBindingSource.DataSource = this.dSPueblosBindingSource;
            // 
            // dSPueblosBindingSource
            // 
            this.dSPueblosBindingSource.DataSource = this.dS_Pueblos;
            this.dSPueblosBindingSource.Position = 0;
            // 
            // dS_Pueblos
            // 
            this.dS_Pueblos.DataSetName = "DS_Pueblos";
            this.dS_Pueblos.SchemaSerializationMode = System.Data.SchemaSerializationMode.IncludeSchema;
            // 
            // btnbuscar
            // 
            this.btnbuscar.Location = new System.Drawing.Point(122, 97);
            this.btnbuscar.Name = "btnbuscar";
            this.btnbuscar.Size = new System.Drawing.Size(67, 29);
            this.btnbuscar.TabIndex = 2;
            this.btnbuscar.Text = "Localizar";
            this.btnbuscar.Click += new System.EventHandler(this.btnbuscar_Click);
            // 
            // radLabel2
            // 
            this.radLabel2.Location = new System.Drawing.Point(16, 45);
            this.radLabel2.Name = "radLabel2";
            this.radLabel2.Size = new System.Drawing.Size(104, 18);
            this.radLabel2.TabIndex = 2;
            this.radLabel2.Text = "Nombre del Pueblo";
            // 
            // radLabel1
            // 
            this.radLabel1.Location = new System.Drawing.Point(16, 3);
            this.radLabel1.Name = "radLabel1";
            this.radLabel1.Size = new System.Drawing.Size(51, 18);
            this.radLabel1.TabIndex = 1;
            this.radLabel1.Text = "Provincia";
            // 
            // pueblosTableAdapter
            // 
            this.pueblosTableAdapter.ClearBeforeFill = true;
            // 
            // provinciasTableAdapter
            // 
            this.provinciasTableAdapter.ClearBeforeFill = true;
            // 
            // busqueda
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(346, 138);
            this.Controls.Add(this.radPanel1);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedSingle;
            this.Name = "busqueda";
            // 
            // 
            // 
            this.RootElement.ApplyShapeToControl = true;
            this.Text = "Localizar un Pueblo";
            this.ThemeName = "ControlDefault";
            this.Load += new System.EventHandler(this.busqueda_Load);
            ((System.ComponentModel.ISupportInitialize)(this.radPanel1)).EndInit();
            this.radPanel1.ResumeLayout(false);
            this.radPanel1.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)(this.listprovincias)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.provinciasBindingSource)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.provinciaDataSetBindingSource)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.provinciaDataSet)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.listpueblos)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.pueblosBindingSource)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.dSPueblosBindingSource)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.dS_Pueblos)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.btnbuscar)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.radLabel2)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.radLabel1)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this)).EndInit();
            this.ResumeLayout(false);

        }

        #endregion

        private Telerik.WinControls.UI.RadPanel radPanel1;
        private Telerik.WinControls.UI.RadDropDownList listpueblos;
        private System.Windows.Forms.BindingSource dSPueblosBindingSource;
        private DS_Pueblos dS_Pueblos;
        private System.Windows.Forms.BindingSource pueblosBindingSource;
        private DS_PueblosTableAdapters.pueblosTableAdapter pueblosTableAdapter;
        private Telerik.WinControls.UI.RadLabel radLabel2;
        private Telerik.WinControls.UI.RadLabel radLabel1;
        private Telerik.WinControls.UI.RadButton btnbuscar;
        private System.Windows.Forms.BindingSource provinciaDataSetBindingSource;
        private ProvinciaDataSet provinciaDataSet;
        private Telerik.WinControls.UI.RadDropDownList listprovincias;
        private System.Windows.Forms.BindingSource provinciasBindingSource;
        private ProvinciaDataSetTableAdapters.ProvinciasTableAdapter provinciasTableAdapter;
    }
}
