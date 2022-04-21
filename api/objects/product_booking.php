    <?php
    class ProductBooking
    {
        // database connection and table name
        private $conn;
        private $table_name = "products_bookings";
        private $table_name_p = "products";

        // object properties
        public $id;
        public $firstName;
        public $lastName;
        public $email;
        public $address;
        public $zipCode;
        public $product_id;
        public $isBooked = 1;

        // constructor with $db as database connection
        public function __construct($db){
            $this->conn = $db;
        }

    // create product
    function createBooking(){

        // query to insert record
        $query = "INSERT INTO
                    " . $this->table_name . "
                SET
                    firstName=:firstName, lastName=:lastName, email=:email, address=:address, zipCode=:zipCode, product_id=:product_id, created=:created;
                    
                UPDATE " . $this->table_name_p . "
                    SET isBooked = 1, modified=:modified
                WHERE
                    id=:product_id";

        // prepare query
        $stmt = $this->conn->prepare($query);
       // $stmt_p = $this->conn->prepare($query_p);

        // sanitize
        $this->firstName = htmlspecialchars(strip_tags($this->firstName));
        $this->lastName = htmlspecialchars(strip_tags($this->lastName));
        $this->email = htmlspecialchars(strip_tags($this->email));
        $this->address = htmlspecialchars(strip_tags($this->address));
        $this->zipCode = htmlspecialchars(strip_tags($this->zipCode));
        $this->product_id = htmlspecialchars(strip_tags($this->product_id));
        $this->isBooked = htmlspecialchars(strip_tags($this->isBooked));

        // bind values
        $stmt->bindParam(":firstName", $this->firstName);
        $stmt->bindParam(":lastName", $this->lastName);
        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":address", $this->address);
        $stmt->bindParam(":zipCode", $this->zipCode);
        $stmt->bindParam(":product_id", $this->product_id);
        $stmt->bindParam(":created", $this->created);
        $stmt->bindParam(":modified", $this->modified);
        $stmt->bindParam(":isBooked", $this->isBooked);

        // execute query
        if($stmt->execute()){
            return true;
        }

        return false;
    }
    }
    ?>