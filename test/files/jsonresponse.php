<?php header('Content-Type: application/json');
  $jsonObj = array(
    'elementOne' => 'Its a string',
    'numberElement' => -1,
    'booleanElement' => True,
    'elementTwo' => 'another string!'
  );
  echo json_encode($jsonObj);
?>
