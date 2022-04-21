
$(document).ready(function(){

    // show list of product on first load
    showProductsFirstPage();

    // when a 'unbooked products' button was clicked
    $(document).on('click', '.read-products-button', function(){
        showProductsFirstPage();
    });

    // when a 'page' button was clicked
    $(document).on('click', '.pagination li', function(){
        // get json url
        var json_url=$(this).find('a').attr('data-page');

        // show list of products
        showProducts(json_url);
    });

});

function showProductsFirstPage(){
    var json_url="http://localhost/RestFullAPI2/api/product/read_paging.php";
    showProducts(json_url);
}

// function to show list of products
function showProducts(json_url){

    // get list of products from the API
    $.getJSON(json_url, function(data){

        // html for listing products
        readProductsTemplate(data, "");

        // chage page title
        changePageTitle("Unbooked Products");

    });
}

$(document).ready(function(){

    // show list of product on first load
    showProducts();

    // when a 'unbooked products' button was clicked
    $(document).on('click', '.read-products-button', function(){
        showProducts();
    });
});

// function to show list of products
function showProducts(){

    // get list of products from the API
    $.getJSON("http://localhost/RestFullAPI2/api/product/read.php", function(data){

        // html for listing products
        readProductsTemplate(data, "");

        // chage page title
        changePageTitle("Unbooked Products");

    });

 /*   // get list of products from the API
    $.getJSON("http://localhost/RestFullAPI2/api/product/read.php", function(data){
        // html for listing products
        var read_products_html=`
         <!-- when clicked, it will load the create product form -->
         <div id='create-product' class='btn btn-primary pull-right m-b-15px create-product-button'>
                <span class='glyphicon glyphicon-plus'></span> Create Product
         </div>

         <div id='book-product' class='btn btn-primary pull-right m-b-15px book-product-button'>
                <span class='glyphicon glyphicon-plus'></span> Book Product
         </div>
         
         <!-- start table -->
        <table class='table table-bordered table-hover'>
         
            <!-- creating our table heading -->
            <tr>
                <th class='w-5-pct'>ID</th>
                <th class='w-20-pct'>Name</th>
                <th class='w-10-pct'>Price</th>
                <th class='w-15-pct'>Category</th>
                <th class='w-25-pct text-align-center'>Action</th>
            </tr>`;
         
            // loop through returned list of data
            $.each(data.records, function(key, val) {
             
                // creating new table row per record
                read_products_html+=`
                    <tr>
                        <td>` + val.id + `</td>
                        <td>` + val.name + `</td>
                        <td>$` + val.price + `</td>
                        <td>` + val.category_name + `</td>
             
                        <!-- 'action' buttons -->
                        <td>
                            <!-- read product button -->
                            <button class='btn btn-primary m-r-10px read-one-product-button' data-id='` + val.id + `'>
                                <span class='glyphicon glyphicon-eye-open'></span> Read
                            </button>
             
                            <!-- edit button -->
                            <button class='btn btn-info m-r-10px update-product-button' data-id='` + val.id + `'>
                                <span class='glyphicon glyphicon-edit'></span> Edit
                            </button>
             
                            <!-- delete button -->
                            <button class='btn btn-danger delete-product-button' data-id='` + val.id + `'>
                                <span class='glyphicon glyphicon-remove'></span> Delete
                            </button>
                        </td>
             
                    </tr>`;
            });
         
        // end table
        read_products_html+=`</table>`;
        
        // inject to 'page-content' of our app
        $("#page-content").html(read_products_html);
        
        // change page title
        changePageTitle("Unbooked Products");
    });
*/
}





