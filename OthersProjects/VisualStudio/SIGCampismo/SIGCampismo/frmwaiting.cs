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
    
    public partial class frmwaiting : Telerik.WinControls.UI.RadForm
    {
        public frmwaiting()
        {
            InitializeComponent();
        }

 
        private void frmwaiting_Load(object sender, EventArgs e)
        {
            this.radWaitingBar1.StartWaiting();
        }

       
    }
}
