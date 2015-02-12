<?php
class SqlHelper
{
    private $con;
    private $server = "127.0.0.1";
    private $username = "root";
    private $password = "root";
    
    public function SqlHelper($database = "") 
    {
        $this->con = new mysqli($this->server, $this->username, $this->password, $database);
        if ($this->con->connect_errno)
            die("Failed to connect to MySQL: (" . $this->con->connect_errno . ") " . $this->con->connect_error);
    }
    
    public function __destruct() 
    {
        $this->con->close();
    }

    public function GetDatabases() 
    {
        $res = $this->con->query("SHOW DATABASES;");
        if (!$res) 
            die("Error while getting databases: (" . $this->con->errno . ") " . $this->con->error);
            
        $ret = array();        
        while($row = $res->fetch_assoc()) 
            $ret[] = $row["Database"];
        return $ret;
    }
    
    public function GetTables() 
    {
        $res = $this->con->query("SHOW TABLES;");
        if (!$res) 
            die("Error while getting tables: (" . $this->con->errno . ") " . $this->con->error);
            
        $ret = array();        
        while($row = $res->fetch_assoc()) 
            $ret[] = $row;
        return $ret;
    }
    
    public function ExecuteQuery($query) 
    {
        $res = $this->con->query($query);
        if (!$res) 
            die("Error while executing query: (" . $this->con->errno . ") " . $this->con->error);
            
        $ret = array();        
        while($row = $res->fetch_assoc()) 
            $ret[] = $row;
        return $ret;
    }
}
