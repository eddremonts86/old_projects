<?php
$new=chdir('../App/Config');
$dirNew=getcwd()."/";
$subsistem = file_get_contents($dirNew."config.xml");
$sub=explode('<subsystem name="',$subsistem);
$separado_por_comas = implode(" ", $sub);
$sub1=explode('"/>',$separado_por_comas);

echo "<div>Este apartado recoge los datos de configuracion globales del sistema.<br>
Pero si decea configurar el sistema detalladamente puede hacerlo.<br>
En este momento exiten Subsistemas que de  usar  una configuracion expecificas no funcionaran adecuadamente ?<br>
<div class='btn-primary'>";
for($i=0;$i<count($sub1)-1;$i++)
    {$z=$i+1;
    echo $z."-".$sub1[$i];
    echo "<br>" ;
}
echo"</div><br> De ser asi es mejor configurarlos por separados<br>
      <div class='btn btn-inverse' onclick='confWind2()'>Puede hacerlo desde aqui.<br>
      </div>
      <p><p>
      </div>";
