<?php 


	require_once ("dbog.php");

	$i=0; $q=mysql_query('select countryname from results order by countryname');
	 
	if ( ! $q ) {
	echo mysql_error();
	die;
	}
 
 $data =  ""; 
  while($row=mysql_fetch_array($q)){
 
  $data= $data .  $row['countryname'] . "," ;

      $i++;

 }
 
 	$data = substr($data, 0, -1);
    echo($data);

?>