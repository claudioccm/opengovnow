<? 
 
  $og_host = "localhost";
  $og_user = "opengovcm";
  $og_pass = "mar7aba";
  $og_databaseName = "opengovnow";
  $og_tableName = "results";

  $og_con = mysql_connect($og_host,$og_user,$og_pass);
  $og_dbs = mysql_select_db($og_databaseName, $og_con);
  
?>
