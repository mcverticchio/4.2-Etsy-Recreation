// // console.log("Hello World!");
  var $ = require('jquery');
  var _ = require('underscore');
  var handlebars = require ('handlebars');

// console.log(handlebars.VERSION);








//
//   var source = $('#photo-album').html();          //grabs all the html within my "stamp"
//   var template = handlebars.compile(source);      //converted HTML to template function that we can call however many times!
//
//
//
// // STEP 2: call the function with a context object
// //Note: the object properties should match the template placeholders
//
//   var context = {
//     'title': 'Cat Album',     //Property name matches placeholder name
//     'albumNumber': '11',
//     'image': 'http://unsplash.it/200/200',
//     'photos': [{'photoTitle': 'Fluffy'}, {'photoTitle': 'Brown'}, {'photoTitle': 'Black'}]
//   }
//
//   $('#album-container').html(template(context));
//   // $('#album-container').append(template());   //prepend puts stuff in the beginning
//
//
//
// //Got an array?
//   var albums = [
//     {
//       'title': 'Cat Album',     //Property name matches placeholder name
//       'albumNumber': '11',
//       'image': 'http://unsplash.it/200/200',
//       ifFav: true,
//       'photos' : [{'photoTitle': 'Fluffy'}, {'photoTitle': 'Brown'}, {'photoTitle': 'Black'}]
//     },{
//       'title': 'Dog Album',     //Property name matches placeholder name
//       'albumNumber': '234',
//       'image': 'http://unsplash.it/201/201',
//       'photos' : [{'photoTitle': 'Fluffy'}, {'photoTitle': 'Brown'}, {'photoTitle': 'Black'}]
//     }
//   ];
//
//   _.each(albums, function(album){
//     $('#album-container').append(template(album));   //individual album that you grabbed out
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



var url = "https://api.etsy.com/v2/listings/active.js?api_key=cdwxq4soa7q4zuavbtynj8wx&keywords=yarn&includes=Images,Shop";

function init(data){
  console.log(data);
  displayproducts();
}

fetchJSONP(url, init);



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
