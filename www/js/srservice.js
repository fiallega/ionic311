'use strict';

/**
 * @ngdoc service
 * @name 
 * @description 
 */




angular.module('starter.services')
    .factory('srService', ['$resource', '$q', '$log', function ($resource, $q, $log) {

        var urlBase = "http://mdcopen311v1.apiary-mock.com/:endPoint";
        var srResource = $resource(urlBase, 
                                      {api_key:"",
                                       ednPont: ""});

        function getAllSRTypes(){
            $log.debug("srService:getAllSRTypes: About to get all SR types");
            var params = {endPoint:"service_list.json"};
            var srPromise = srResource.query(params).$promise;

            return srPromise.then(function(srTypes){
                $log.debug("srService:getAllSRTypes: Success getting all srTypes", srTypes);
                return srTypes;
            }, function(response){
                $log.error("srService:getAllSRTypes: Error while getting all srTypes", response);
                return $q.reject({error:response, message:response.message});
            });

        }

        function getSRType(srType){
            $log.debug("srService:getSRType: About to get an srType", srType);

            var params = {endPoint:"service_definition.json",
                          code:srType};
            var srPromise = srResource.get(params).$promise;

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
