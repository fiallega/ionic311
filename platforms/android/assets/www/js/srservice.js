'use strict';

/**
 * @ngdoc service
 * @name 
 * @description 
 */




angular.module('starter.services')
    .factory('srService', ['$resource', '$q', '$log', function ($resource, $q, $log) {

        var urlBase = "http://miamidade.gov/mdc-open311/service_list.json";
        var srResource = $resource(urlBase, 
                                      {api_key:"73f91ae4db90c7f4548f3652c7ef79c58dc0cb9b"});

        function getAllSRTypes(){
            $log.debug("srService:getAllSRTypes: About to get all SR types");
            
            var srPromise = srResource.get().$promise;

            return srPromise.then(function(srTypes){
                $log.debug("srService:getAllSRTypes: Success getting all srTypes", srTypes);
                return srTypes;
            }, function(response){
                $log.error("srService:getAllSRTypes: Error while getting all srTypes", response);
                return $q.reject({error:response, message:response.message});
            });

        }


        // Public API
        return {
            getAllSRTypes:getAllSRTypes
        };
    }]);
