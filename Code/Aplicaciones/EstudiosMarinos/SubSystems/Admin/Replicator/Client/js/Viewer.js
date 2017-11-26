//-----------------------------------------------------------------------------
// Prototype of a module class
function ViewerManager()
{
    this.__views  = new Array();
    this.__current_view = null;

    // --------------------------------------------------------------------
    // Function for init the module
    this.Init = function()
    {
            for(item in this.__views)
                this.__views[item].Init();
    }

    // --------------------------------------------------------------------
    // Function for Register of Report the module
    this.RegisterView = function(name,view)
    {
            this.__views[name] = view;
            view._owner = this;
    }

    // --------------------------------------------------------------------
    // Function for Active of Report the module
    this.ActiveReport = function(view)
    {
            this.__current_view = this.__views[view];
    }

    //---------------------------------------------------------------------
    //Function Build Main Panel
    this.BuildMainPanel = function(objOptions)
    {
            return this.__current_view.BuildMainPanel(objOptions);
    }

    //---------------------------------------------------------------------
    //Function Free Memory using
    this.Free = function()
    {
            if (this.__current_view) {
                    this.__current_view.Free();
            }
    }
}
App.RegisterModule('Viewer', new ViewerManager());