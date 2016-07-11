
var PA_URL = 'https://pa.wwstay.com/admin';

angular.module('supernova.services', [])
  .factory('UserAPI', function($resource) {
    return $resource(PA_URL + '/sso/user/ ', {}, {
      getUser: {
        method: 'GET',
      }
    });
  })

.factory('LoginAPI', function($resource) {
    return $resource(PA_URL + '/sso/login/ ', {}, {
      create: {
        method: 'POST',
        headers:{'Content-Type': 'application/x-www-form-urlencoded'}
      }
    });
  })

  ;

  /*
.service('LoginService', function($q) {
    return {
        loginUser: function(name, pw) {
            var deferred = $q.defer();
            var promise = deferred.promise;

            if (name == 'user' && pw == 'vishnu') {
                deferred.resolve('Welcome ' + name + '!');
            } else {
                deferred.reject('Wrong credentials.');
            }
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }
    }
})*/