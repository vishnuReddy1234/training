angular.module('supernova.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

//login controller
.controller('LoginCtrl', ['$scope', '$state', '$ionicSideMenuDelegate', 'LoginAPI', '$http', 'UserAPI', function($scope, $state, $ionicSideMenuDelegate, LoginAPI, $http, UserAPI) {
  $ionicSideMenuDelegate.canDragContent(false);
  $scope.user = {};
  $scope.login = function(){
    console.log($scope.user.username);
    console.log($scope.user.password);
      LoginAPI.create({username:$scope.user.username, password:$scope.user.password}, function(response){
        //console.log("response---->"+JSON.stringify(response));
        if(response.status==='ok'){
          window.localStorage.setItem("jwt", response.response);
          $http.defaults.headers.common.Authorization = 'JWT ' + response.response;
          UserAPI.getUser({}, function(response){
            window.localStorage.setItem("user", JSON.stringify(response));
            $state.go('app.myrequests');
          });
        }else{
          $scope.showError = true;
        }
      });

     // $state.go('app.search');
  };
}])

.controller('MyRequestsCtrl', function($scope) {
  $scope.statusCodes = {
    'N': {
      'name': 'New request',
      'value': 'newRequest',
      'message': 'New request',
    },
    'P': {
      'name': 'Pilot',
      'value': 'pilot',
      'message': 'Pilot',
    },
    'Q': {
      'name': 'Quotation Sent',
      'value': 'quotationSent',
      'message': 'Quotation Sent',
    },
    'B': {
      'name': 'Request Converted to booking',
      'value': 'requestConvertedToBooking',
      'message': 'Booked',
    },
    'C': {
      'name': 'Travel Cancelled',
      'value': 'travelCancelled',
      'message': 'Cancelled',
    },
    'X': {
      'name': 'Duplicate Request',
      'value': 'duplicateRequest',
      'message': 'Duplicate Request',
    },
    'F': {
      'name': 'Travel Deferred',
      'value': 'travelDeferred',
      'message': 'Travel Deferred',
    },
    'Y': {
      'name': 'Request Converted to booking',
      'value': 'requestConvertedToBooking',
      'message': 'Booked',
    },
    'G': {
      'name': 'Requested for Cancellation',
      'value': 'requestConvertedToBooking',
      'message': 'Requested for cancellation',
    },
    'Paid': {
      'name': 'Paid',
      'value': 'paid',
      'message': 'Paid',
    },
  };
  $scope.response = {"count":23,"next":"http://pa.wwstay.com/neusuche/requests/?page=2","previous":null,"results":[{"req_id":"26syr0muid","check_in":"2016-06-08","check_out":"2016-06-30","destination_city":"new york","country":"United States","status":"B","quotations":[{"status":"B","quote_id":"pfpp3w9km8","payment_url":["https://pa.wwstay.com/booking/payment/uz1ra4iqhz/"],"cancellation_policy":"ss","image":"","additional_markup":0.0,"benchmarkRate":434.0,"tripId":"","currency":"GBP","rate":233.0,"inclusions":["Swimming Pool"],"invoice_url":["https://pa.wwstay.com/booking/invoice/uz1ra4iqhz/download/"],"address":"7500 Beach Road, Singapore 199591","screenshot_url":["https://d2j37cxwrfkee9.cloudfront.net/a6cdu1ie0k.jpeg","https://d2j37cxwrfkee9.cloudfront.net/mbnic1f6aa.jpeg"],"timezone":"Asia/Singapore","room_type":"r","hotel_name":"Park Royal On Beach Road"},{"status":"","quote_id":"e18wxewv7z","payment_url":[],"cancellation_policy":"kjkkjkjj","image":"https://media.expedia.com/hotels/2000000/1750000/1748200/1748191/1748191_23_b.jpg","additional_markup":0.0,"benchmarkRate":878.0,"tripId":"","currency":"SEK","rate":8989.0,"inclusions":["Weekly Housekeeping","Swimming Pool"],"invoice_url":[],"address":"Mongur St","screenshot_url":["https://d2j37cxwrfkee9.cloudfront.net/jvhcu8gmf9.jpeg","https://d2j37cxwrfkee9.cloudfront.net/r1lwtnrmis.jpeg"],"timezone":"Europe/Malta","room_type":"hggg","hotel_name":"Villagg Tas-Sbejha"}],"guest":"Demo User","client":"8s4bnx1gv1","no_of_adults":1,"no_of_children":null,"received":"2016-06-29T10:58:19.796849Z","client_name":"Demo Company","room1":"1","block":true,"requested_by":"","nights":22},{"req_id":"fj6w1x79g6","check_in":"2016-06-30","check_out":"2016-07-01","destination_city":"New York City","country":"United States","status":"Q","quotations":[{"status":"","quote_id":"tlfv1blgqm","payment_url":[],"cancellation_policy":"1 night(s) on total amount will be charged upon cancellation.1 night(s) on total amount will be charged upon cancellation.","image":"https://media.expedia.com/hotels/2000000/1310000/1301500/1301443/1301443_157_b.jpg","additional_markup":0.0,"benchmarkRate":201.82,"tripId":"46303b97-58d3-4ce6-4015-c34aa7016543","currency":"USD","rate":201.82,"inclusions":["Room(s) and Taxes"],"invoice_url":[],"address":"1033 Avenue of the Americas . New York, New York 10018 USA","screenshot_url":[],"timezone":"America/New_York","room_type":"STUDIO, 1 KING, SOFABED","hotel_name":"Residence Inn By Marriott New York Manhattan/Times Square"},{"status":"","quote_id":"h4chhogwti","payment_url":[],"cancellation_policy":"Non Refundable room.","image":"https://media.expedia.com/hotels/2000000/1310000/1301500/1301443/1301443_157_b.jpg","additional_markup":0.0,"benchmarkRate":190.25,"tripId":"b22392e0-9a5c-45a5-74ed-7f281f93392b","currency":"USD","rate":190.25,"inclusions":["Room(s) and Taxes"],"invoice_url":[],"address":"1033 Avenue of the Americas . New York, New York 10018 USA","screenshot_url":[],"timezone":"America/New_York","room_type":"MARRIOTT SENIOR DISCOUNT, 62 YEARS AND OLDER.VALID ID REQUIRED, STUDIO, 1 KING,","hotel_name":"Residence Inn By Marriott New York Manhattan/Times Square"}],"guest":"Demo Divya","client":"8s4bnx1gv1","no_of_adults":1,"no_of_children":0,"received":"2016-06-29T10:47:21.088383Z","client_name":"Demo Company","room1":"1","block":true,"requested_by":"Divya","nights":1},{"req_id":"sh6xa1pfde","check_in":"2016-06-11","check_out":"2016-06-23","destination_city":"new york","country":"United States","status":"N","quotations":[],"guest":"Demo User","client":"8s4bnx1gv1","no_of_adults":1,"no_of_children":null,"received":"2016-06-28T10:29:17.234152Z","client_name":"Demo Company","room1":"1","block":true,"requested_by":"","nights":12},{"req_id":"f6go7xbek0","check_in":"2016-08-01","check_out":"2016-08-10","destination_city":"Oslo","country":"Norway","status":"N","quotations":[],"guest":"Demo Request","client":"8s4bnx1gv1","no_of_adults":1,"no_of_children":0,"received":"2016-06-25T07:54:47.782694Z","client_name":"Demo Company","room1":"1","block":true,"requested_by":"Demo Ops","nights":9},{"req_id":"lp3sfu5y4z","check_in":"2016-07-31","check_out":"2016-08-31","destination_city":"london","country":"United Kingdom","status":"N","quotations":[],"guest":"Demo Joseph-4","client":"8s4bnx1gv1","no_of_adults":1,"no_of_children":0,"received":"2016-06-23T09:45:02.299024Z","client_name":"Demo Company","room1":"1","block":true,"requested_by":"Demo Ops","nights":31},{"req_id":"4cy33itx3h","check_in":"2016-07-03","check_out":"2016-07-04","destination_city":"london","country":"United Kingdom","status":"N","quotations":[],"guest":"Demo Joseph-3","client":"8s4bnx1gv1","no_of_adults":1,"no_of_children":0,"received":"2016-06-23T07:44:03.064486Z","client_name":"Demo Company","room1":"1","block":true,"requested_by":"Demo Ops","nights":1},{"req_id":"ax77y7nz1m","check_in":"2016-06-30","check_out":"2016-07-01","destination_city":"London","country":"United Kingdom","status":"C","quotations":[{"status":"","quote_id":"uh3zivd3fm","payment_url":[],"cancellation_policy":"Free cancellation till 2016-06-29T00:00:00+01:00.2016-06-29T00:00:00+01:00(Europe/London) onwards an amount of 202.84GBP will be charged as penalty upon cancellation .","image":"https://media.expedia.com/hotels/1000000/30000/26700/26612/26612_88_b.jpg","additional_markup":0.0,"benchmarkRate":202.84,"tripId":"f40480a4-f5d7-4b69-6156-9c6f0c600efe","currency":"GBP","rate":202.84,"inclusions":["Room(s) and Taxes"],"invoice_url":[],"address":"179-199 Holland Park Avenue","screenshot_url":[],"timezone":"Europe/London","room_type":"Standard Room","hotel_name":"Hilton London Kensington"},{"status":"","quote_id":"7j66py7aob","payment_url":[],"cancellation_policy":"Free cancellation till 2016-06-29T00:00:00+01:00.2016-06-29T00:00:00+01:00(Europe/London) onwards an amount of 208.52GBP will be charged as penalty upon cancellation .","image":"https://media.expedia.com/hotels/1000000/10000/2700/2605/2605_113_b.jpg","additional_markup":0.0,"benchmarkRate":208.52,"tripId":"5b7f2132-0564-488b-49b1-46a2b98fe7c4","currency":"GBP","rate":208.52,"inclusions":["Room(s) and Taxes"],"invoice_url":[],"address":"104 Bayswater Road","screenshot_url":[],"timezone":"Europe/London","room_type":"Standard Room","hotel_name":"Thistle Kensington Gardens"}],"guest":"Demo Joseph","client":"8s4bnx1gv1","no_of_adults":1,"no_of_children":0,"received":"2016-06-23T06:55:42.597755Z","client_name":"Demo Company","room1":"1","block":true,"requested_by":"Demo Ops","nights":1},{"req_id":"eeupxxd1uz","check_in":"2016-06-30","check_out":"2016-07-01","destination_city":"london","country":"United Kingdom","status":"B","quotations":[{"status":"B","quote_id":"dbr2c3rwkc","payment_url":["https://pa.wwstay.com/booking/payment/dcqwh2uqi8/"],"cancellation_policy":"Refundable","image":"","additional_markup":0.0,"benchmarkRate":260.0,"tripId":"","currency":"GBP","rate":218.0,"inclusions":["Breakfast","Room charges & Tax ","Internet Access"],"invoice_url":["https://pa.wwstay.com/booking/invoice/dcqwh2uqi8/download/"],"address":"10a Chestnut Plaza, Westfield Stratford City, London E20 1GL, United Kingdom","screenshot_url":[],"timezone":"Europe/London","room_type":"Standard","hotel_name":"Holiday Inn London Stratford City"}],"guest":"Demo Joseph","client":"8s4bnx1gv1","no_of_adults":1,"no_of_children":0,"received":"2016-06-23T06:37:51.059967Z","client_name":"Demo Company","room1":"1","block":true,"requested_by":"Demo Ops","nights":1},{"req_id":"xq3kl45goc","check_in":"2016-07-21","check_out":"2016-07-22","destination_city":"London","country":"United Kingdom","status":"Q","quotations":[{"status":"","quote_id":"g2xer9qqn2","payment_url":[],"cancellation_policy":"Free cancellation till 2016-06-19T23:59:00+01:00.2016-06-19T23:59:00+01:00(Europe/London) onwards an amount of 136.54GBP will be charged as penalty upon cancellation .","image":"https://media.expedia.com/hotels/1000000/10000/2700/2605/2605_113_b.jpg","additional_markup":0.0,"benchmarkRate":136.54,"tripId":"97423b46-0083-445f-5dc7-b9bcec8f6b43","currency":"GBP","rate":136.54,"inclusions":["Room(s) and Taxes"],"invoice_url":[],"address":"104 Bayswater Road","screenshot_url":[],"timezone":"Europe/London","room_type":"DOUBLE STANDARD","hotel_name":"Thistle Kensington Gardens"},{"status":"","quote_id":"l03ncwfzc4","payment_url":[],"cancellation_policy":"Free cancellation till 2016-07-20T00:00:00+01:00.2016-07-20T00:00:00+01:00(Europe/London) onwards an amount of 131.38GBP will be charged as penalty upon cancellation .","image":"https://media.expedia.com/hotels/1000000/10000/4500/4481/4481_221_b.jpg","additional_markup":0.0,"benchmarkRate":131.38,"tripId":"317a97db-0c01-4de6-5764-593768a1fad8","currency":"GBP","rate":131.38,"inclusions":["Room and breakfast-Full","Room(s) and Taxes"],"invoice_url":[],"address":"128 King Henry's Road, London NW3 3ST, England","screenshot_url":[],"timezone":"Europe/London","room_type":"Standard Single","hotel_name":"London Marriott Hotel Regents Park"},{"status":"","quote_id":"q7rpnywk3f","payment_url":[],"cancellation_policy":"","image":"https://media.expedia.com/hotels/1000000/10000/7700/7681/7681_184_b.jpg","additional_markup":0.0,"benchmarkRate":146.67,"tripId":"7a64c0ac-7049-4b92-4b74-83e8131bae4e","currency":"GBP","rate":146.67,"inclusions":["Room(s) and Taxes"],"invoice_url":[],"address":"97 Cromwell Rd, London SW7 4DN, United Kingdom","screenshot_url":[],"timezone":"Europe/London","room_type":"Standard Double Non Smoking","hotel_name":"Holiday Inn London-Kensington Forum"}],"guest":"Demo Wns","client":"8s4bnx1gv1","no_of_adults":1,"no_of_children":0,"received":"2016-06-20T05:20:23.790993Z","client_name":"Demo Company","room1":"1","block":true,"requested_by":"Abhilash","nights":1},{"req_id":"s770ksamhb","check_in":"2016-06-25","check_out":"2016-06-30","destination_city":"New York","country":"United States","status":"N","quotations":[],"guest":"test1-rajeev goswami","client":"8s4bnx1gv1","no_of_adults":1,"no_of_children":0,"received":"2016-06-16T10:49:34.824562Z","client_name":"Demo Company","room1":"1","block":true,"requested_by":"Demo Ops","nights":5},{"req_id":"ncpyfqy81z","check_in":"2016-06-16","check_out":"2016-06-17","destination_city":"NYC","country":"United States","status":"Q","quotations":[{"status":"","quote_id":"b6creucaos","payment_url":[],"cancellation_policy":"na","image":"","additional_markup":0.0,"benchmarkRate":8000.0,"tripId":null,"currency":"INR","rate":7000.0,"inclusions":[],"invoice_url":[],"address":"127 W 28th St, New York, NY 10001, United States","screenshot_url":[],"timezone":null,"room_type":"1BR","hotel_name":"Hotel Indigo New York City - Chelsea"},{"status":"","quote_id":"8729yd2yld","payment_url":[],"cancellation_policy":"na","image":"https://media.expedia.com/hotels/7000000/6610000/6609800/6609710/6609710_15_b.jpg","additional_markup":0.0,"benchmarkRate":8000.0,"tripId":"","currency":"INR","rate":7000.0,"inclusions":[],"invoice_url":[],"address":"41 Moon Muang Road, Amphur Muang","screenshot_url":["https://d2j37cxwrfkee9.cloudfront.net/jt1zn2lvcp.png","https://d2j37cxwrfkee9.cloudfront.net/e7fsah3zy7.png"],"timezone":"Asia/Bangkok","room_type":"1BR","hotel_name":"Top North Hotel"}],"guest":"Demo User","client":"8s4bnx1gv1","no_of_adults":1,"no_of_children":0,"received":"2016-06-16T07:53:53.406370Z","client_name":"Demo Company","room1":"1","block":true,"requested_by":"Demo User","nights":1},{"req_id":"8m881rj2k0","check_in":"2016-06-29","check_out":"2016-06-30","destination_city":"New york","country":"United States","status":"N","quotations":[],"guest":"PA","client":"8s4bnx1gv1","no_of_adults":1,"no_of_children":0,"received":"2016-06-15T12:49:38.440225Z","client_name":"Demo Company","room1":"1","block":true,"requested_by":"Demo User","nights":1},{"req_id":"y18ez3zd4o","check_in":"2016-06-30","check_out":"2016-07-01","destination_city":"bengaluru","country":"India","status":"N","quotations":[],"guest":"Demo Ops","client":"8s4bnx1gv1","no_of_adults":1,"no_of_children":0,"received":"2016-06-15T12:44:20.909202Z","client_name":"Demo Company","room1":"1","block":true,"requested_by":"Demo User","nights":1},{"req_id":"hlzppih6a2","check_in":"2016-06-23","check_out":"2016-06-24","destination_city":"New york","country":"United States","status":"N","quotations":[],"guest":"Demo travel","client":"8s4bnx1gv1","no_of_adults":1,"no_of_children":0,"received":"2016-06-15T12:41:04.307364Z","client_name":"Demo Company","room1":"1","block":true,"requested_by":"Demo User","nights":1},{"req_id":"422cy2or93","check_in":"2016-06-30","check_out":"2016-08-02","destination_city":"New York","country":"United States","status":"N","quotations":[],"guest":"Test-Rajeev Goswami","client":"8s4bnx1gv1","no_of_adults":1,"no_of_children":0,"received":"2016-06-15T10:58:48.564397Z","client_name":"Demo Company","room1":"1","block":true,"requested_by":"Demo Ops","nights":33},{"req_id":"xdeurdket4","check_in":"2016-06-22","check_out":"2016-06-23","destination_city":"New york","country":"United States","status":"N","quotations":[],"guest":"Demo wwstay","client":"8s4bnx1gv1","no_of_adults":1,"no_of_children":0,"received":"2016-06-15T08:12:16.383602Z","client_name":"Demo Company","room1":"1","block":true,"requested_by":"Demo User","nights":1},{"req_id":"k71u2m1n0z","check_in":"2016-08-17","check_out":"2016-08-20","destination_city":"Istanbul","country":"Turkey","status":"Q","quotations":[{"status":"","quote_id":"immh0l7nkg","payment_url":[],"cancellation_policy":"Non Refundable room.","image":"https://media.expedia.com/hotels/4000000/3560000/3554800/3554797/3554797_69_b.jpg","additional_markup":0.0,"benchmarkRate":26.84,"tripId":"25597576-daf1-4b4c-7ecf-7430c57fe4db","currency":"EUR","rate":26.84,"inclusions":["Free Wireless Internet","Full Breakfast","Room(s) and Taxes"],"invoice_url":[],"address":"Alemdar Mah. Incili Cavus Sok. No 35Sultanahmet","screenshot_url":[],"timezone":"None","room_type":"Standard Double Room","hotel_name":"Ares Hotel Sultanahmet"},{"status":"","quote_id":"hslkzjy0xn","payment_url":[],"cancellation_policy":"Non Refundable room.","image":"https://media.expedia.com/hotels/4000000/3560000/3554800/3554797/3554797_69_b.jpg","additional_markup":0.0,"benchmarkRate":26.84,"tripId":"b258d6f8-7681-44cf-41a8-ad87b695526f","currency":"EUR","rate":26.84,"inclusions":["Free Wireless Internet","Full Breakfast","Room(s) and Taxes"],"invoice_url":[],"address":"Alemdar Mah. Incili Cavus Sok. No 35Sultanahmet","screenshot_url":[],"timezone":"None","room_type":"Standard Twin Room","hotel_name":"Ares Hotel Sultanahmet"}],"guest":"Demo Dev, Demo Op","client":"8s4bnx1gv1","no_of_adults":2,"no_of_children":0,"received":"2016-06-15T06:54:54.219948Z","client_name":"Demo Company","room1":"2","block":true,"requested_by":"Demo Ops","nights":3},{"req_id":"j5zztjgmjc","check_in":"2016-08-11","check_out":"2016-08-12","destination_city":"Vienna","country":"Austria","status":"Q","quotations":[{"status":"","quote_id":"t4dwps8pif","payment_url":[],"cancellation_policy":"Free cancellation till 2016-08-07T23:59:00+02:00.2016-08-07T23:59:00+02:00(Europe/Vienna) onwards an amount of 155.91EUR will be charged as penalty upon cancellation .","image":"https://media.expedia.com/hotels/1000000/10000/4100/4075/4075_223_b.jpg","additional_markup":3.0,"benchmarkRate":155.91,"tripId":"a24186d5-acaa-493a-4440-6acf4b9aa84a","currency":"EUR","rate":155.91,"inclusions":["Room(s) and Taxes"],"invoice_url":[],"address":"Parkring 12 A","screenshot_url":[],"timezone":"Europe/Vienna","room_type":"DOUBLE OR TWIN STANDARD","hotel_name":"Vienna Marriott Hotel"},{"status":"","quote_id":"zpfqintt0m","payment_url":[],"cancellation_policy":"Free cancellation till 2016-08-07T23:59:00+02:00.2016-08-07T23:59:00+02:00(Europe/Vienna) onwards an amount of 211.1EUR will be charged as penalty upon cancellation .","image":"https://media.expedia.com/hotels/1000000/10000/4100/4075/4075_223_b.jpg","additional_markup":4.0,"benchmarkRate":211.1,"tripId":"9cb2b755-6e35-4f13-48e9-ba6ecae0e8bc","currency":"EUR","rate":211.1,"inclusions":["Breakfast","Room(s) and Taxes"],"invoice_url":[],"address":"Parkring 12 A","screenshot_url":[],"timezone":"Europe/Vienna","room_type":"DOUBLE WITH BALCONY","hotel_name":"Vienna Marriott Hotel"},{"status":"","quote_id":"oyvxiay05e","payment_url":[],"cancellation_policy":"Free cancellation till 2016-08-10T16:00:00+02:00.2016-08-10T16:00:00+02:00(Europe/Vienna) onwards an amount of 227.7EUR will be charged as penalty upon cancellation .","image":"https://media.expedia.com/hotels/1000000/20000/19600/19589/19589_134_b.jpg","additional_markup":5.0,"benchmarkRate":227.7,"tripId":"589ecbca-d0e3-4617-65f0-87065de5c905","currency":"EUR","rate":227.7,"inclusions":["Free High-Speed Internet","Breakfast Buffet","Room(s) and Taxes"],"invoice_url":[],"address":"Rudolfsplatz 11","screenshot_url":[],"timezone":"Europe/Vienna","room_type":"Family Room, 1 Double or 2 Single Beds","hotel_name":"K&K Palais Hotel"}],"guest":"Demo Test, Demo Search","client":"8s4bnx1gv1","no_of_adults":2,"no_of_children":1,"received":"2016-06-15T06:45:55.719259Z","client_name":"Demo Company","room1":"2,1","block":true,"requested_by":"Divya","nights":1},{"req_id":"11yu2wumkk","check_in":"2016-06-24","check_out":"2016-06-27","destination_city":"Seattle","country":"United States","status":"N","quotations":[],"guest":"Jude Williams","client":"8s4bnx1gv1","no_of_adults":1,"no_of_children":0,"received":"2016-06-08T17:22:14.798199Z","client_name":"Demo Company","room1":"1","block":true,"requested_by":"Demo Customer","nights":3},{"req_id":"z60uf7icil","check_in":"2016-08-01","check_out":"2016-08-31","destination_city":"Singapore","country":"Singapore","status":"B","quotations":[{"status":"B","quote_id":"8x0yxdm41q","payment_url":["https://pa.wwstay.com/booking/payment/jfe23bhcli/"],"cancellation_policy":"Free cancellation till july 28, 2016","image":"","additional_markup":0.0,"benchmarkRate":180.0,"tripId":"","currency":"SGD","rate":180.0,"inclusions":[],"invoice_url":["https://pa.wwstay.com/booking/invoice/jfe23bhcli/download/"],"address":"177a River Valley Road Singapore 179031\r\n","screenshot_url":[],"timezone":"Asia/Singapore","room_type":"Twin or Deluxe room","hotel_name":"Novotel Singapore Clarke Quay "}],"guest":"Kevin Thomas","client":"8s4bnx1gv1","no_of_adults":1,"no_of_children":0,"received":"2016-06-08T17:07:11.592559Z","client_name":"Demo Company","room1":"1","block":true,"requested_by":"Demo Customer","nights":30}]}
  $scope.requests =$scope.response.results;
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
