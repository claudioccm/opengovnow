 <?php
 
$fullname = $_POST['fullname'];
$email = $_POST['email'];
$answer = $_POST['answer'];

require_once('dbog.php');

if(mysql_query("INSERT INTO ogquestion (FullName, Email, Answer) VALUES('$fullname', '$email', '$answer')"))
		  echo "ok";
		else
		  echo "fail" ;
 
 
?>