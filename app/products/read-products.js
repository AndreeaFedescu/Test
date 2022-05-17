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
/*function showProducts(json_url){
    // get list of products from the API
    $.getJSON(json_url, function(data){
        // html for listing products
        readProductsTemplate(data, "");

        // chage page title
        changePageTitle("Unbooked Products");
    });
}
*/

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
}