<? 
 
  $host = "localhost";
  $user = "twtr";
  $pass = "Mar7aba!";
  $databaseName = "twstream";
  $tableName = "tweets";

  $con = mysql_connect($host,$user,$pass);
  $dbs = mysql_select_db($databaseName, $con);
  
?>
