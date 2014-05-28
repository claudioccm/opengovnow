<?php 


	require_once ("dbog.php");

	$i=0; $q=mysql_query('select chart3a, chart3b from results order by countryname');
	 
	if ( ! $q ) {
	echo mysql_error();
	die;
	}
 
 $data =  ""; 
  while($row=mysql_fetch_array($q)){
 
  $data= $data .  intval($row['chart3a']) . "," .  intval($row['chart3b'])  . "," ;

      $i++;

 }
 

     echo($data);

?>