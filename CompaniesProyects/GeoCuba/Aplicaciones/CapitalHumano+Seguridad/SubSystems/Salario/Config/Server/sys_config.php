<?PHP
$xml = '<?xml version="1.0" encoding="utf-8"?>
<subsystem name="Plantilla">
    <module name="Oficial" desc="Module para gestionar los tipos de condecoraciones de los trabajadores">
        <js>Oficial</js>
        <functions>
            <GestionarOficial source="OficialGestionar" desc="Funcion para gestionar los oficiales"/>
        </functions>
    </module>
    <module name="Resolucion" desc="Module para gestionar las resoluciones referentes a los trabajadores">
        <js>Resolucion</js>
        <functions>
            <GestionarCtipo source="ResolucionGestionar" desc="Function for add "/>
        </functions>
    </module>
    <module name="Cargo" desc="Module to manage the systems of the application">
        <js>Cargo</js>
        <functions>
            <Import source="CargoGestionar" desc="Function for import a subsystem"/>
        </functions>
    </module>
    <module name="Trabajador" desc="Module to manage the systems of the application">
        <js>Trabajador</js>
        <functions>
            <Import source="TrabajadorGestionar" desc="Function for import a subsystem"/>
        </functions>
    </module>
    <module name="Lcargos" desc="Module to manage the systems of the application">
        <js>Lcargos</js>
        <functions>
            <Import source="LcargosGestionar" desc="Function for import a subsystem"/>
        </functions>
    </module>
    <module name="Plantilla" desc="Module to manage the systems of the application">
        <js>Plantilla</js>
        <functions>
            <Import source="PlantillaGestionar" desc="Function for import a subsystem"/>
        </functions>
    </module>
    <module name="Contrato" desc="Module to manage the systems of the application">
        <js>Contrato</js>
        <functions>
            <Import source="ContratoGestionar" desc="Function for import a subsystem"/>
        </functions>
    </module>
	<module name="Traondecoracion" desc="Module to manage the systems of the application">
        <js>Traondecoracion</js>
        <functions>
            <Import source="TraondecoracionGestionar" desc="Function for import a subsystem"/>
        </functions>
    </module>
    <module name="Cargo_X_Unidad" desc="Module to manage the systems of the application">
        <js>Cargo_X_Unidad</js>
        <functions>
            <Import source="Cargo_X_UnidadGestionar" desc="Function for import a subsystem"/>
        </functions>
    </module>
    <module name="Resumenes" desc="Module to manage the systems of the application">
        <js>Resumenes</js>
        <functions>
            <Gestionar_Resumenes source="ResumenesGestionar" desc="Function for import a subsystem"/>
        </functions>
    </module>
    <module name="Udefensa" desc="Module para gestionar los tipos de condecoraciones de los trabajadores">
        <js>Udefensa</js>
        <functions>
            <GestionarUdefensa source="UdefensaGestionar" desc="Function for add an condecorations"/>
        </functions>
    </module>
    <module name="Condecoracion" desc="Module to manage the systems of the application">
        <js>Condecoracion</js>
        <functions>
            <Import source="CondecoracionGestionar" desc="Function for import a subsystem"/>
        </functions>
    </module>
    <module name="Organigrama" desc="Module to manage the systems of the application">
        <js>Organigrama</js>
        <functions>
            <Import source="OrganigramaGestionar" desc="Function for import a subsystem"/>
        </functions>
    </module>
    <module name="Sbajas" desc="Module to manage the systems of the application">
        <js>Sbajas</js>
        <functions>
            <Import source="SbajasGestionar" desc="Function for import a subsystem"/>
        </functions>
    </module>
    <module name="Abajas" desc="Module to manage the systems of the application">
        <js>Abajas</js>
        <functions>
            <Import source="AbajasGestionar" desc="Function for import a subsystem"/>
        </functions>
    </module>
    <module name="Profesiogramas" desc="Module to manage the systems of the application">
        <js>Profesiogramas</js>
        <functions>
            <Import source="ProfesiogramasGestionar" desc="Function for import a subsystem"/>
        </functions>
    </module>
    <module name="Targeta" desc="Module to manage the systems of the application">
        <js>Targeta</js>
        <functions>
            <Import source="TargetaGestionar" desc="Function for import a subsystem"/>
        </functions>
    </module>
	<module name="Conf_module" desc="Module to manage the systems of the application">
        <js>Conf_module</js>
        <functions>
            <Import source="Conf_moduleGestionar" desc="Function for import a subsystem"/>
        </functions>
    </module>
</subsystem>';
?>