<?php 

 
  require_once ("dbconnect.php");
  $rows = array();
  $sth = mysql_query("SELECT tweet_id, name, tweet_text, profile_image_url FROM $tableName ORDER BY RAND() LIMIT 4");

    while($r = mysql_fetch_assoc($sth)) {
        $rows[] = $r;
    }
    echo json_encode($rows);
 
?>