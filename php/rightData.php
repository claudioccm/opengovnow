<?php 


	require_once ("dbog.php");

	$i=0; $q=mysql_query('select chart3c, chart3d from results order by countryname');
	 
	if ( ! $q ) {
	echo mysql_error();
	die;
	}
 
 $data =  ""; 
  while($row=mysql_fetch_array($q)){
 
  
   $data= $data .  intval($row['chart3d']) . "," .  intval($row['chart3c'])  . "," ;

      $i++;

 }
 
	 $data = substr($data, 0, -1);
     echo($data);

?>