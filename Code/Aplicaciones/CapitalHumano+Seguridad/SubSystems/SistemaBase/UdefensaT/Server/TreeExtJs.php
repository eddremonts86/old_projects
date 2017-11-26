<?php

class TreeExtJS {
    private $tree = array();
    private $index = array();
    private $cont = 0;
//=====================================================================================================================
 public function addChild($child, $parentKey = null) {
     $key = isset($child["id"])?$child["id"]:'item_'.$this->cont;
     $child["leaf"] = true;
     if($this->containsKey($parentKey)){
         $this->index[$key] =& $child;
         $parent =& $this->index[$parentKey];
         if(isset($parent["children"])){
             $parent["children"][] =& $child;
         }else{
             $parent["leaf"] = false;
             $parent["children"] = array();
             $parent["children"][] =& $child;
         }
     }else{
         $this->index[$key] =& $child;
         $this->tree[] =& $child;
     }
     $this->cont++;
     }
//=====================================================================================================================
    /**
     * 	Return a node by the given key
     * 	@key
     */
    public function getNode($key) {
        return $this->index[key];
    }
    /**
     * 	@TODO Remove the node from the Tree
     * 	@key
     */
    public function removeNode($key) {
//unset($this->index[key]);
    }
    /**
     * 	Check if exist a node with the given key
     */
    public function containsKey($key) {
        return isset($this->index[$key]);
    }
    /**
     * 	Return a representation of the Tree structure in JSON format
     */
    public function toJson() {
        return $this->tree;
    }
}

?>