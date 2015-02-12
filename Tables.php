<?php
include('SqlHelper.php');
$helper = new SqlHelper($_POST['database']);
$result = $helper->GetTables();
echo json_encode($result);