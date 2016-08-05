(function() {
    'use strict';

    angular.module('controllers').controller('activiteitenController', ['$http', 'menuFactory', 'dateFactory',
        function($http, menuFactory, dateFactory) {
            var activiteitenModel = this;

            menuFactory.setActivePage('activiteiten');

            initialize();

            /**
             * Model functions
             */

            activiteitenModel.getDate = function(date) {
                return dateFactory.parseDateToLongFormat(date);
            };

            /**
             * Helper functions
             */

            function initialize() {
                hideModalBackdrop();

                getUpcomingEvents();
            }

            function getUpcomingEvents() {
                $http.get("data/activiteiten/upcomingevents.json", {
                    cache: true
                }).success(function(result) {
                    activiteitenModel.upcomingEvents = [];

                    for (var i = 0; i < result.upcomingevents.length; i++) {
                        var eventDate = new Date(result.upcomingevents[i].date).setHours(0, 0, 0, 0);
                        var today = new Date().setHours(0, 0, 0, 0);

                        if (eventDate >= today) {
                            activiteitenModel.upcomingEvents.push(result.upcomingevents[i]);
                        }
                    }

                    sortUpcomingEventsByDate(activiteitenModel.upcomingEvents);
                });
            }

            function sortUpcomingEventsByDate(upcomingEvents) {
                upcomingEvents.sort(function(upcomingEvent1, upcomingEvent2) {
                    return new Date(upcomingEvent1.date) - new Date(upcomingEvent2.date);
                });
            }

            function hideModalBackdrop() {
                $('.modal-backdrop').remove();
            }
        }
    ]);
})();
