<?php
 
$leftquery = $_POST['rightquery'];

require_once('dbog.php');

$result = mysql_query($leftquery);    
$data = array();
$i = 0;
while ($row = mysql_fetch_assoc($result)) {
	$i ++;
    $data = array(
        'col1'  => $row['col1'],
        'col2'  => $row['col2'],
        'col3'  => $row['col3'],
        'col4'  => $row['col4']
    );
}

 
echo '{"righties":'.json_encode($data) . '}'  ;


?>