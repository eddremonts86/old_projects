<?php
 $_table = $this->_dbase->GetTable('utiles.update_time');
 $_data = $_table->GetAll();
 $consult=$data[0][update_mes];
	if(date("j")==1 && $consult==false)
		{
			$function = $this->_dbase->ExecuteFunction('vistas_resumen.update_time');
            if ($function=1){
			$_table = $this->_dbase->GetTable('utiles.update_time');
			$data = $_table->Update(array('update_mes' => "'true'"),"id='DE_capital_humano_1219'");
	    	}
       }
	else if(date("j")==2 && $consult==true){
		$_table = $this->_dbase->GetTable('utiles.update_time');
		$data = $_table->Update(array('update_mes' => "'false'"),"id='DE_capital_humano_1219'");
	}	
?>