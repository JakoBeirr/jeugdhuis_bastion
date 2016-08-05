(function() {
    'use strict';

    angular.module('controllers').controller('fotosController', ['$http', 'menuFactory', 'urlFactory', 'dateFactory',
        function($http, menuFactory, urlFactory, dateFactory) {
            var fotosModel = this;

            menuFactory.setActivePage('fotos');

            initialize();

            /**
             * Model functions
             */

            fotosModel.goToEvent = function(eventId) {
                return urlFactory.getEventFotosUrl(eventId);
            };

            fotosModel.getDate = function(date) {
                return dateFactory.parseDateToLongFormat(date);
            };

            /**
             * Helper functions
             */

            function initialize() {
                hideModalBackdrop();

                getEvents();
            }

            function getEvents() {
                $http.get("data/fotos/events.json", {
                    cache: true
                }).success(function(result) {
                    sortEventsByDate(result.events);
                    fotosModel.events = result.events;
                });
            }

            function sortEventsByDate(events) {
                events.sort(function(event1, event2) {
                    return new Date(event2.date) - new Date(event1.date);
                });
            }

            function hideModalBackdrop() {
                $('.modal-backdrop').remove();
            }
        }
    ]);
})();
