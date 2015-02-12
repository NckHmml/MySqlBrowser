<?php
include('SqlHelper.php');
$helper = new SqlHelper();
$result = $helper->GetDatabases();
echo json_encode($result);