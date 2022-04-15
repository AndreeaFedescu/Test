<?php

// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
  
// get database connection
include_once '../config/database.php';
  
// instantiate product object
include_once '../objects/product_booking.php';
  
$database = new Database();
$db = $database->getConnection();
  
$product = new ProductBooking($db);
  
// get posted data
$data = json_decode(file_get_contents("php://input"));
  
// make sure data is not empty
if(
    !empty($data->firstName) &&
    !empty($data->lastName) &&
    !empty($data->email) &&
    !empty($data->address) &&
    !empty($data->zipCode) &&
    !empty($data->product_id)
){
  
    // set product property values
    $product->firstName = $data->firstName;
    $product->lastName = $data->lastName;
    $product->email = $data->email;
    $product->address = $data->address;
    $product->zipCode = $data->zipCode;
    $product->product_id = $data->product_id;
    $product->isBooked = 1;
    $product->created = date('Y-m-d H:i:s');
    $product->modified = date('Y-m-d H:i:s');

    // create the product
    if($product->createBooking()){
  
        // set response code - 201 created
        http_response_code(201);
  
        // tell the user
        echo json_encode(array("message" => "Product was created."));
    }
  
    // if unable to create the product, tell the user
    else{
  
        // set response code - 503 service unavailable
        http_response_code(503);
  
        // tell the user
        echo json_encode(array("message" => "Unable to create product."));
    }
}
  
// tell the user data is incomplete
else{
  
    // set response code - 400 bad request
    http_response_code(400);
  
    // tell the user
    echo json_encode(array("message" => "Unable to create product. Data is incomplete."));
}
?>