<?php 


	require_once ("dbog.php");

	$i=0; $q=mysql_query('select chart4b, chart4c from results order by countryname');
	 
	if ( ! $q ) {
	echo mysql_error();
	die;
	}
 
 $data =  ""; 
  while($row=mysql_fetch_array($q)){
 
  $data= $data .  intval($row['chart4b']) . "," .  intval($row['chart4c'])  . "," ;

      $i++;

 }
 
	 $data = substr($data, 0, -1);
     echo($data);

?>