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
     public function SetParent(TreeNode $Parent){
          $this->_parent = $Parent;
          $this->SetDeep($Parent->GetDeep() + 1);
     }
     
     public function AppendChild(TreeNode $Node){
          $_node_name = $Node->GetName();
          $this->_children[$_node_name] = $Node;
          $Node->SetParent($this);
          $this->_is_leaf = false;
     }
     
     public function RemoveChild(string $NodeName){
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
     
     public function SetDeep(integer $Deep){
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
     
     public function GetChild(integer $NodeName){
          return $this->_children[$NodeName];
     }
     
     public function GetChildAt(integer $Index){
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
     
     public function BuildNodes(array $TableNames){
          for($i = 0; $i < count($TableNames); $i++)
               array_push($TableNames[$i]['table_name'], new TreeNode($TableNames[$i]['table_name']));
     }
     
     public function SetReferences(array $References)
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
                    $_target_table->GetParent()->RemoveChild($_target);
                    $_source_table->AppendChild($_target_table);
                    $_target_table->SetParent($_source_table);
               }
          }
     }
     
     private function _get_order(TreeNode $Node, array &$_visited){
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
          
          for($i = 0; $i < count($_node_names); $i++)
               if(in_array( $_node_names[$i] , $_visited)) continue;
               elseif($this->_nodes[$_node_names[$i]]->GetDeep() == 1) continue;
               else {
                    array_push($_visited, $_node_names[$i]);
                    $this->_get_order($this->_nodes[$_node_names[$i]], $_visited);
               }

          return $_visited;
     }
}



?>