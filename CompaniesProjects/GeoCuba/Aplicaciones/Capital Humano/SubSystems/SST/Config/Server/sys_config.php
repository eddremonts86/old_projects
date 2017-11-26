<?PHP
$xml = '<?xml version="1.0" encoding="utf-8"?>
<subsystem name="SST">
    <module name="Equipos" desc="Modulo para gestionar los equipos de proteccion">
        <js>Equipos</js>
        <functions>
            <GestionarOficial source="EquiposGestionar" desc="Funcion para gestionar los equipos de proteccion"/>
        </functions>
    </module>
     <module name="HClinica" desc="Modulo para gestionar las historias clinicas">
        <js>HClinica</js>
        <functions>
            <HClinicaGestionar source="HClinicaGestionar" desc="Funcion para gestionar las historias clinicas"></HClinicaGestionar>
        </functions>
    </module>
    <module name="TipoExamen" desc="Modulo para gestionar las historias clinicas">
        <js>TipoExamen</js>
        <functions>
            <TipoExamenGestionar source="TipoExamenGestionar" desc="Funcion para gestionar las historias clinicas"></TipoExamenGestionar>
        </functions>
    </module>
</subsystem>';
?>