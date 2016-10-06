// // console.log("Hello World!");
  var $ = require('jquery');
  var _ = require('underscore');
  var Handlebars = require ('handlebars');
  var url = "https://api.etsy.com/v2/listings/active.js?api_key=cdwxq4soa7q4zuavbtynj8wx&keywords=yarn&includes=Images,Shop";

// console.log(handlebars.VERSION);


//This is the initial point of entry
// function init(data){
//   var products = data.results;
//   // console.log(data);
//   listOfProducts(products);
// }
//
// fetchJSONP(url, init);


fetchJSONP(url, function(data){
  var products = data.results;
  listOfProducts(products);

})


//loops over all the products
function listOfProducts(loopProducts){
  var source = $('#individualProduct').html();          //grabs all the html within my "stamp"
  var template = Handlebars.compile(source);      //converts HTML to template function that we can call however many times!

  loopProducts.forEach(function(product){
  // console.log(product);
  var productHTML = $(template(product));
  $('#product-container').append(productHTML);
  // $('.product-container').append(template(product));  -->> class way..
  // console.log(product);
  });
};

// CAN ALSO DO IT THIS WAY:  MAKE SURE THE CONTEXT ITEM NAME MATCHES IN HTML
// function listOfProducts(loopProducts){
// products.forEach(function(product)){
//   var productHTML = $(template(product));
// context = {
//   'itemImageUrl' : product.Images[0].url_75x75,
//   'itemTitle' : product.title,
//   'productSeller' : product.Shop.shop_name,
//   'productCost' : product.price
// };
// $('#products-container').append(template(context));
// });
// }







/*
  (url: String, callback: Function) -> undefined

  Execute a callback function with the JSON results from the url specified.

  Examples
var url = "https://api.etsy.com/v2/listings/active.js?api_key=cdwxq4soa7q4zuavbtynj8wx&keywords=yarn&includes=Images,Shop";

      fetchJSONP(url, function(data) {
        // do something with data
      });

      // OR

      function logData(data) {
        console.log(data);
      }

      fetchJSONP(url, logData);
*/





function fetchJSONP(url, callback) {
    var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
    var script = document.createElement('script');

    window[callbackName] = function(data) {
        delete window[callbackName];
        document.body.removeChild(script);
        callback(data);
    };

    script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
    document.body.appendChild(script);
}
