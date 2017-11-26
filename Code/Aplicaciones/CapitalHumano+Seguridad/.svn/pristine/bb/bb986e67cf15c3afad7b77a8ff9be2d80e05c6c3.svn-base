<?PHP
     class DirReader
     {
          private $_initial_path;
          
          public function __construct($Path) {
               $this->_initial_path = $Path;
          }
          
          public function AddDir($_hzip, $_dir)
          {
               $_current_dir = $this->_initial_path . '/' .$_dir;
               $_hdir = opendir($_current_dir);
               if(!$_hdir)
                    die("Fail to read dir $_dir");
               $_hzip->addEmptyDir($_dir);
               while (false !== ($file = readdir($_hdir)))
               {
                    if($file == '.' || $file == '..') continue;
                    $_entry = "$_dir/$file";
                    $_current_entry = $_current_dir . '/' . $file;
                    echo $_current_entry . '<br>';
                    if(is_dir($_current_entry))
                         $this->AddDir($_hzip,$_entry);
                    elseif(is_file($_current_entry))
                         $_hzip->addFile($_current_entry, $_entry);
               }
               closedir($_hdir);
          }
          
          public function ReadDir($_initial_dir)
          {
               echo "$_initial_dir<br>";
               $_hdir = opendir($_initial_dir);
               if(!$_hdir)
                    die("Fail to read dir $_initial_dir");
               while (false !== ($file = readdir($_hdir)))
               {
                    if($file == '.' || $file == '..') continue;
                    $_entry = "$_initial_dir/$file";
                    if(is_dir($_entry))
                         $this->ReadDir ($_entry);
                    elseif(is_file($_entry))
                         echo $_entry. '<br>';
               }
               closedir($_hdir);
          }
          
          public function DelDir($_dir)
          {
               $_current_dir = $this->_initial_path . '/' .$_dir;
               $_hdir = opendir($_current_dir);
               if(!$_hdir)
                    die("Fail to read dir $_dir");
               while (false !== ($file = readdir($_hdir)))
               {
                    if($file == '.' || $file == '..') continue;
                    $_entry = "$_dir/$file";
                    $_current_entry = $_current_dir . '/' . $file;
                    if(is_dir($_current_entry))
                         $this->DelDir($_entry);
                    elseif(is_file($_current_entry))
                         unlink($_current_entry);
               }
               rmdir($_current_dir);
               closedir($_hdir);
          }
     }
     /*
     $_system = 'Catalogo';
     $_reader = new DirReader('Subsystems');
     
     $_hzip = new ZipArchive();
     
     $_result = $_hzip->open("Subsystems/Admin/Subsystems/Backup/$_system.zip", ZipArchive::CHECKCONS);
     if($_result !== TRUE)
          die('Fail to create archive');
     //$_reader->AddDir($_hzip, $_system);
     $_name = $_hzip->getNameIndex(0);
     $_hzip->close();
     echo $_name;
     //echo 'Companctation OK<br>';
     //$_reader->DelDir($_system);
     */
     
     $_a = array('a'=>1, 'b'=>2, 'c'=>3, 'd'=>4);
     $_b = array('A'=>1, 'B'=>2, 'C'=>3);
     print_r($_a);
     unset($_a['b']);
     print_r($_a);
     $_a['e'] = $_b;
     print_r($_a);
     unset($_a['e']);
     print_r($_a);
     print_r($_b);
     
?>