<?php 


	require_once ("dbog.php");

	$i=0; $q=mysql_query('select chart4a from results order by countryname');
	 
	if ( ! $q ) {
	echo mysql_error();
	die;
	}
 
 $data =  ""; 
  while($row=mysql_fetch_array($q)){
 
  $data= $data .  intval($row['chart4a']) . "," ;

      $i++;

 }
 

     echo($data);

?>