<?php
/**
 * Class to define an html item
 *
 * @author Yuriesky
 */
class HtmlItem 
{
    /*
     * Name of the tag
     */
    private $_tag_name = null;
    
    /*
     * Features of the tag
     */
    private $_features = null;
    
    /*
     * Value of the tag
     */
    private $_value = null;
    
    /*
     * Constructor of the class. It build an html item with the name of the tag
     */
    public function __construct($Tag, $Features = null, $InnerItems = null) {
        
        $this->_tag_name = $Tag;
        $_n =  func_num_args();
        
        if($_n >= 2)
            $this->_features = (is_null ($Features)) ? array() : $Features;
        else
            $this->_features = array();
        
        if($_n == 3)
            $this->_value = $InnerItems;
        elseif($_n < 3)
            $this->_value = null;
        elseif($_n > 3)
        {
            $this->_value = array();
            for($i = 2; $i < $_n; $i++)
                array_push ($this->_value, func_get_arg($i));
        }
    }
    
    /*
     * Set a feature to the item
     * $Feature : Name of the feature
     * $Value: The value of the feature
     */
    public function SetFeature($Feature, $Value)
    {
        $this->_features[$Feature] = $Value;
    }
    
    /*
     * Set a list of features to the item
     */
    public function SetFeatures($Features)
    {
        foreach ($Features as $key => $value) {
            $this->_features[$key] = $value;
        }
    }
    
    /*
     * Set the inner value of the item
     */
    public function SetValue($Value)
    {
        $this->_value = $Value;
    }
    
    /*
     * Append a value to the item
     */
    public function AppendValue()
    {
        if(is_null($this->_value))
            $this->_value = array();
            elseif (!is_array($this->_value)) {
                $this->_value = array($this->_value);
        }
        
        for($i = 0; $i<func_num_args(); $i++)
            array_push($this->_value, func_get_arg($i));
    }
    
    public function __toString() {
        // Build tag
        $_header = '<' . $this->_tag_name;
        
        // Build features
        $_features = " ";
        foreach ($this->_features as $key => $value) {
            $_features .= "$key='$value' ";
        }
        if(!is_null($this->_value))
            $_features .= ">\n";
        
        // Build the value of the item
        $_value = "";
        
        if( is_array($this->_value))
            foreach ($this->_value as $val)
                $_value .= strval($val) . "\n";
        elseif(!is_null($this->_value))
            $_value = strval($this->_value). "\n";
        
        $_end = (is_null($this->_value)) ? "/>\n" : '</' .$this->_tag_name . ">\n";
        
        return "$_header $_features $_value $_end";
    }
}

?>
