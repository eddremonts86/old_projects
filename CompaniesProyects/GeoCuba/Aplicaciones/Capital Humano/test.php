<?PHP

class TreeNode
{
     private $_name;
     
     private $_deep;
     
     private $_is_leaf;
     
     private $_parent;
     
     private $_children;

     // Constructor
     public function __construct($NodeName) {
          $this->_name = $NodeName;
          $this->_deep = 1;
          $this->_is_leaf = true;
          $this->_parent = null;
          $this->_children = array();
     }
     
     // Public methods
     public function SetParent($Parent){
          $this->_parent = $Parent;
          $this->SetDeep($Parent->GetDeep() + 1);
     }
     
     public function AppendChild($Node){
          $_node_name = $Node->GetName();
          $this->_children[$_node_name] = $Node;
          $Node->SetParent($this);
          $this->_is_leaf = false;
     }
     
     public function RemoveChild($NodeName){
          unset($this->_children['$NodeName']);
          $this->_is_leaf = (count($this->_children) == 0);
     }
     
     // Properties
     public function GetName(){
          return $this->_name;
     }
     
     public function GetDeep(){
          return $this->_deep;
     }
     
     public function HaveParent(){
          return (!is_null($this->_parent));
     }
     
     public function GetParent(){
          return $this->_parent;
     }
     
     public function SetDeep($Deep){
          $this->_deep = $Deep;
          if(!$this->_is_leaf)
               foreach ($this->_children as $node_name => $node)
                    $node->SetDeep($Deep + 1);
     }
     
     public function IsLeaf(){
          return $this->_is_leaf;
     }
     
     public function GetChildrenCount(){
          return count($this->_children);
     }
     
     public function GetChild($NodeName){
          return $this->_children[$NodeName];
     }
     
     public function GetChildAt($Index){
          $_keys = array_keys($this->_children);
          $_key = $_keys[$Index];
          return $this->_children[$_key];
     }
     
}

class ReferenceTreeBuilder
{
     private $_nodes;
     
     public function __construct() {
          $this->_nodes = array();
     }
     
     public function BuildNodes($TableNames){
          for($i = 0; $i < count($TableNames); $i++)
               $this->_nodes[$TableNames[$i]['table_name']] = new TreeNode($TableNames[$i]['table_name']);
     }
     
     public function SetReferences($References)
     {
          for($i = 0; $i < count($References); $i++)
          {
               $_target = $References[$i]['target_table'];
               $_source = $References[$i]['source_table'];
               
               $_target_table = $this->_nodes[$_target];
               $_source_table = $this->_nodes[$_source];
               
               $_parent_deep = 0;
               if($_target_table->HaveParent())
                    $_parent_deep = $_target_table->GetParent()->GetDeep();
               
               if($_source_table->GetDeep() > $_parent_deep)
               {
                    if($_target_table->HaveParent()) $_target_table->GetParent()->RemoveChild($_target);
                    $_source_table->AppendChild($_target_table);
                    $_target_table->SetParent($_source_table);
               }
          }
     }
     
     private function _get_order($Node, &$_visited){
          $_current_node = null;
          $_to_visit = array();
          
          // Iterate for each child node
          for($i = 0; $i < $Node->GetChildrenCount(); $i++)
          {
               $_current_node = $Node->GetChildAt($i);
               if(in_array( $_current_node->GetName() , $_visited)) continue;
               else
               {
                    array_push($_visited, $_current_node->GetName());
                    array_push($_to_visit, $_current_node->GetName());
               }
          }
          
          // Iterate inside each node
          for($i = 0; $i < count($_to_visit); $i++)
          {
               $_current_node = $Node->GetChild($_to_visit[$i]);
               $this->_get_order($_current_node, $_visited);
          }
     }
     
     public function GetOrder()
     {
          $_node_names = array_keys($this->_nodes);
          
          $_visited = array();
          $_current_deep = 0;

          while(count($_visited) != count($_node_names))
          {
               $_current_deep++;
               for($i = 0; $i < count($_node_names); $i++)
               {
                    if(in_array( $_node_names[$i] , $_visited)) continue;
                    elseif($this->_nodes[$_node_names[$i]]->GetDeep() == $_current_deep)
                         array_push($_visited, $_node_names[$i]);
               }
          }

          return $_visited;
     }
}

class DBaseReplicator
{
     private $_conn;
     private $_hFile;
     
     public function __construct($File) {
          $_str_conn = "host=localhost port=5432 dbname=security user=postgres password=postgres";
          $this->_conn = pg_connect($_str_conn);
          $this->_hFile = fopen($File, "w+b");
     }
     
     public function Free(){
          pg_close($this->_conn);
          fclose($this->_hFile);
     }
     
     public function SaveTable($TableName){
          
          // Get the name and the types of the fields of the table
          $_str_query = "SELECT ordinal_position, table_schema || '.' || table_name as table_name, column_name, data_type
                         FROM information_schema.columns 
                         WHERE table_schema || '.' || table_schema = '$TableName')
                         ORDER BY table_schema, table_name, ordinal_position;";
          
          $_res = pg_query($this->_conn, $_str_query);
          if($_res == FALSE)
               return false;
          
          $_data_table = pg_fetch_all($_res);
          pg_free_result($_res);
          
          $_metadata = array();
          $_columns = array();
          
          for($i = 0; $i<count($_data_table); $i++)
          {
               $_metadata[$_data_table[$i]['column_name']] = $_data_table[$i]['data_type'];
               array_push($_columns, $_data_table[$i]['column_name']);
          }
          
          $_str_columns = implode(', ', $_columns);
          
          // Get each row of the table and write into the file
          $_str_query = "SELECT * FROM $TableName";
          $_res = pg_query($this->_conn, $_str_query);
          if($_res == FALSE)
               return false;
          
     }
}

// Connection
$_str_conn = "host=localhost port=5432 dbname=capital_humano user=postgres password=postgres";
$_conn = pg_connect($_str_conn);
if($_conn === FALSE)
     die("Connection Error !!!");

// Get all tables
$_str_query = "SELECT table_schema || '.' || table_name as table_name
               FROM information_schema.tables
               WHERE table_type = 'BASE TABLE' AND (table_schema != 'information_schema' AND table_schema != 'pg_catalog')";
$_res = pg_query($_conn, $_str_query);

if(!$_res)
{
     pg_close($_conn);
     die("Error on query for tables!!!");
}

$_tables = pg_fetch_all($_res);
pg_free_result($_res);

// Get relation of foreign key
$_str_query = "SELECT constraint_column_usage.constraint_name, 
                    table_constraints.table_schema || '.' || table_constraints.table_name as target_table , constraint_column_usage.table_schema || '.' || constraint_column_usage.table_name  as source_table
               FROM information_schema.constraint_column_usage
               LEFT JOIN information_schema.table_constraints ON(constraint_column_usage.constraint_name = table_constraints.constraint_name)
               WHERE constraint_type = 'FOREIGN KEY'";

$_res = pg_query($_conn, $_str_query);

if(!$_res)
{
     pg_close($_conn);
     die("Error on query for constraints!!!");
}

$_constraints = pg_fetch_all($_res);
pg_free_result($_res);

$_RTBuilder = new ReferenceTreeBuilder();
$_RTBuilder->BuildNodes($_tables);
$_RTBuilder->SetReferences($_constraints);
$_order = $_RTBuilder->GetOrder();
print_r($_order);

pg_close($_conn);

?>