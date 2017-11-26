<?php
$new=chdir('../../App/Config');
$dirNew=getcwd()."/";
$subsistem = file_get_contents($dirNew."config.xml");
$sub=explode('<subsystem name="',$subsistem);
$separado_por_comas = implode(" ", $sub);
$sub1=explode('"/>',$separado_por_comas);

echo "<div>Este apartado recoge los datos de configuracion globales del sistema.<br>Pero si decea configurar el sistema detalladamente puede hacerlo.<br>
        En este momento exiten Subsistemas que de  usar  una configuracion expecificas no funcionaran adecuadamente ?<br>
<div class='Sbsist222'>";
for($i=0;$i<count($sub1)-1;$i++){
    $z=$i+1;
    $div =$z%2;
    if($div==0){
        echo "<div class='label label-success1'>".$z."-".$sub1[$i]."</div>";
        echo "<br>" ;
         }
    else{
        echo "<div class='label label-info'>".$z."-".$sub1[$i]."</div>";
        echo "<br>" ;
        }

    }
echo"</div>De ser asi es mejor configurarlos por separados<br>
      <div class='btn btn-inverse' onclick='confWind2()'>Desde aqui<br>
      </div><p><p></div>";

