<?php
//----------------------------------------------------------------------------
//Module of class
class LogsViewer extends Module
{
     public function  __construct() {
         parent::__construct('common.ark');
     }
     
     public function ValidateViewLogs(&$params)
     {
          return true;
     }
     
     private function ToExtTree($obj)
     {
          $_parameters = array();
          
          // Iterate for each parameter
          foreach ($obj as $key => $value) {
               $_p = array('field' => $key);

               if(is_array($value))
               {
                    $_p['leaf'] = false;
                    $_p['value'] = '[Object]';
                    $_p['children'] = $this->ToExtTree($value);
               }
               else
               {
                    $_p['leaf'] = true;
                    //$_params = str_replace('"', '', $value);
                    //if(strlen($_params) > 50)
                    //$_params = substr($_params, 0, 50) . '...';
                    $_p['value'] = $value;
               }

               array_push($_parameters, $_p);
          }
          
          return $_parameters;
     }
     
     public function ViewLogs(&$params)
     {
          $_data = array();
          $_count = 0;

          $_start = ($params['start']) ? $params['start'] : 0;
          $_limit = $params['limit'];

          // Get data
          $_table = $this->_dbase->GetTable('logs.v_logs');
          $_data = $_table->GetRange($_limit, $_start);
          if(is_null($_data))
               return false;
          
          $_count = $_table->GetRowsCount();
          if($_count == -1)
               return false;
          
          // Iterate for each row
          for($i = 0; $i < $_count; $i++)
          {
               $_parameters = array();
               $_params = $_data[$i]['params'];
               
               //$_params = str_replace(array('{','}'), array('[',']'), $_params);
               Validator::ToJSON($_params, true);
               if(is_array($_params))
               {
                    // Iterate for each parameter
                    foreach ($_params as $key => $value) {
                         $_p = array('field' => $key);

                         if(is_array($value))
                         {
                              if(count($value) > 0)
                              {
                                   $_p['leaf'] = false;
                                   $_p['value'] = '[Object]';
                                   $_p['expanded'] = true;
                                   $_p['children'] = $this->ToExtTree($value);
                              }
                              else
                              {
                                   $_p['leaf'] = true;
                                   $_p['value'] = '[]';
                              }
                         }
                         else
                         {
                              $_p['leaf'] = true;
                              $_p['value'] = $value;
                         }

                         array_push($_parameters, $_p);
                    }

                    $_data[$i]['params'] = $_parameters;
               }
               else
               {
                    //$_params = str_replace('"', '', $_params);
                    //if(strlen($_params) > 50)
                    //$_params = substr($_params, 0, 50) . '...';
                    $_data[$i]['params'] = array(
                        'leaf' => true,
                        'value' => $_params,
                        'field' => 'params'
                    );
               }
          }

          $result = array( 'success' => true, 'results' => $_count, 'rows' => $_data);

          return $result;
     }
     
     public function ValidateBuild_AnswerStatistics(&$params)
     {
          return true;
     }
     
     public function Build_AnswerStatistics(&$params)
     {
          $_data = array();
          $_count = 0;

          $_start = ($params['start']) ? $params['start'] : 0;
          $_limit = $params['limit'];
          $_inquest = $params['inquest'];

          /// Get data
          // Get the count of enquested persons to calculate percent
          $_inquests = $this->_dbase->GetTable('inquests');
          $_total = $_inquests->GetFirstValue('inquested_count', "inquest_id = $_inquest");
          // Get each question
          $_selection = $this->_dbase->Select("SELECT question_id, no_order, question, indicator
                                             FROM definitions.questions
                                             INNER JOIN definitions.inquests USING (questionnaire_id)
                                             INNER JOIN definitions.indicators USING (questionnaire_id, indicator_id)
                                             WHERE inquest_id = $_inquest ORDER BY no_order ", $_limit, $_start);
          if(is_null($_selection))
               return false;
          
          // Iterate for each question to get the posible values of the question
          $_iterator = $_selection->GetIterator();
          $_iterator->Reset();
          while($_iterator->Next())
          {
               // Get the current question
               $_row = $_iterator->GetCurrent();
               $_question_id = $_row['question_id'];
               // Get the values of the question
               $_sub_selection = $this->_dbase->Select(
                       "SELECT nickname as answer, 
                              CASE WHEN results.count IS NULL THEN 0 
                                   ELSE results.count 
                              END AS count,
                              CASE WHEN results.count IS NULL THEN 0 
                                   ELSE round ( results.count::numeric / $_total::numeric * 100 , 2)
                              END AS percent
                         FROM (SELECT value_id, nickname FROM definitions.question_values WHERE question_id = $_question_id) as answers
                         LEFT JOIN ( SELECT value_id, count(inquested) FROM store.inquests_results
                              LEFT JOIN definitions.question_values USING(value_id)
                              WHERE inquest_id = $_inquest AND inquests_results.question_id = $_question_id
                              GROUP BY value_id ) as results USING (value_id) ORDER BY value_id"
                    );
               if(is_null($_sub_selection))
                    return false;
               // Put the values according to Ext
               $_values = $_sub_selection->GetAll();
               // Push the result into the array
               array_push($_data, array('no_order' => $_row['no_order'], 'question' => $_row['question'],'indicator' => $_row['indicator'], 'values' => $_values));
               
               $_count++;
          }

          $result = array( 'success' => true, 'results' => $_count, 'rows' => $_data);

          return $result;
     }
}

?>
