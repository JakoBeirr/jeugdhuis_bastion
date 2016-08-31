(function() {
    'use strict';

    angular.module('controllers').controller('eventFotoController', ['$http', '$routeParams', 'menuFactory',
        function($http, $routeParams, menuFactory) {
            var eventFotoModel = this;

            menuFactory.setActivePage('fotos');

            initialize();

            /**
             * Model functions
             */

            /**
             * Helper functions
             */

            function initialize() {
                hideModalBackdrop();

                eventFotoModel.eventId = $routeParams.eventId;
                eventFotoModel.fotoId = $routeParams.fotoId;

                if (!!eventFotoModel.fotoId) {
                    eventFotoModel.fotoName = atob(eventFotoModel.fotoId);
                }

                getEvent();
            }

            function getEvent() {
                $http.get("data/fotos/" + eventFotoModel.eventId + "/" + eventFotoModel.eventId + ".json", {
                    cache: true
                }).success(function(result) {
                    eventFotoModel.eventTitle = result.title;
                });
            }

            function hideModalBackdrop() {
                $('.modal-backdrop').remove();
            }
        }
    ]);
})();
