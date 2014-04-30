<? 
 
  $host = "localhost";
  $user = "mir";
  $pass = "mirmir";

  $databaseName = "twstream";
  $tableName = "tweets";

  $con = mysql_connect($host,$user,$pass);
  $dbs = mysql_select_db($databaseName, $con);
  
?>
