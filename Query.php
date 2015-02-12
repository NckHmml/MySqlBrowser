<?php
include('SqlHelper.php');
$helper = new SqlHelper($_POST['database']);
$result = $helper->ExecuteQuery($_POST['query']);
echo json_encode($result);