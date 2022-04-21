$(document).ready(function(){

    // show html form when 'book a product' button was clicked
    $(document).on('click', '.book-product-button', function(){
        // load list of categories
        $.getJSON("http://localhost/RestFullAPI2/api/category/read-booking.php", function(data){
            // build categories option html
            // loop through returned list of data
            var products_options_html=`<select name='product_id' class='form-control'>`;
            $.each(data.records, function(key, val){
                products_options_html+=`<option value='` + val.id + `'>` + val.name + `</option>`;
            });
            products_options_html+=`</select>`;

            // we have our html form here where product information will be entered
            // we used the 'required' html5 property to prevent empty fields
            var book_product_html=`
                 <!-- 'read products' button to show list of products -->
                <div id='read-products' class='btn btn-primary pull-right m-b-15px read-products-button'>
                    <span class='glyphicon glyphicon-list'></span> Unbooked Products
                </div>
                
            <!-- 'create product' html form -->
            <form id='book-product-form' action='#' method='post' border='0'>
                <table class='table table-hover table-responsive table-bordered'>
             
                    <!-- first name field -->
                    <tr>
                        <td>First Name</td>
                        <td><input type='text' name='firstName' class='form-control' required /></td>
                    </tr>
                    
                    <!-- last name field -->
                    <tr>
                        <td>Last Name</td>
                        <td><input type='text' name='lastName' class='form-control' required /></td>
                    </tr>
             
                    <!-- email field -->
                    <tr>
                        <td>Email</td>
                        <td><input type='email' name='email' class='form-control' required /></td>
                    </tr>
             
                    <!-- address field -->
                    <tr>
                        <td>Address</td>
                        <td><textarea name='address' class='form-control' required></textarea></td>
                    </tr>
                    
                    <!-- zip code field -->
                    <tr>
                        <td>Zip Code</td>
                        <td><input type='number' name='zipCode' class='form-control' required /></td>
                    </tr>
             
                    <!-- categories 'select' field -->
                    <tr>
                        <td>Products</td>
                        <td>` + products_options_html + `</td>
                    </tr>
             
                    <!-- button to submit form -->
                    <tr>
                        <td></td>
                        <td>
                            <button type='submit' class='btn btn-primary'>
                                <span class='glyphicon glyphicon-plus'></span> Book Product
                            </button>
                        </td>
                    </tr>
             
                </table>
            </form>`;

            // inject html to 'page-content' of our app
            $("#page-content").html(book_product_html);

            // chage page title
            changePageTitle("Book Product");
        });
    });

    // will run if create product form was submitted
    $(document).on('submit', '#book-product-form', function(){
        // get form data
        var form_data = JSON.stringify($(this).serializeObject());

        // submit form data to api
        $.ajax({
            url: "http://localhost/RestFullAPI2/api/product/create_booking.php",
            type : "POST",
            contentType : 'application/json',
            data : form_data,
            success : function(result) {
                // product was created, go back to products list
                showProducts();
            },
            error: function(xhr, resp, text) {
                // show error to console
                console.log(xhr, resp, text);
            }
        });

        return false;
    });
});