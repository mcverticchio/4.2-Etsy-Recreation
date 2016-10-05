// // console.log("Hello World!");
  var $ = require('jquery');
  var _ = require('underscore');
  var handlebars = require ('handlebars');
  var url = "https://api.etsy.com/v2/listings/active.js?api_key=cdwxq4soa7q4zuavbtynj8wx&keywords=yarn&includes=Images,Shop";
  var source = $('#individualProduct').html();          //grabs all the html within my "stamp"
  var template = handlebars.compile(source);      //converted HTML to template function that we can call however many times!

// console.log(handlebars.VERSION);

function init(data){                              //This is the initial point of entry
  var products = data.results;
  // console.log(data);
  listOfProducts(products);
}

fetchJSONP(url, init);


function listOfProducts(listOfProducts){           //loops over all the products
  listOfProducts.forEach(function(product){
  displayProduct(product)
  // console.log(product);
})
}

function displayProduct(product){                  //this builds template for each product
  console.log(product);
//     var title = product.title;
//     var img = product.img[0];
//     console.log(title);
//     console.log(img);
  // displayProduct.forEach(function(product){

  }
  // _.each(products, function(product){
    //   $('#product-container').append(template(product));   //individual album that you grabbed out
    //  })







// var products = [
//     {
//
//   ];
//
//   _.each(products, function(product){
//     $('#product-container').append(template(product));   //individual album that you grabbed out
//   })




























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
