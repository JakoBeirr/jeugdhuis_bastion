(function() {
    'use strict';

    angular.module('controllers').controller('eventFotosController', ['$http', '$routeParams', 'menuFactory', 'urlFactory',
        function($http, $routeParams, menuFactory, urlFactory) {
            var eventFotosModel = this;

            menuFactory.setActivePage('fotos');

            initialize();

            var activeImageIndex = 0;

            /**
             * Model functions
             */

            eventFotosModel.showImageDetails = function(imageIndex) {
                showImage(imageIndex);
                showModal();
            };

            eventFotosModel.hideModal = function() {
                hideModal();
            };

            eventFotosModel.lowerIndex = function() {
                if (activeImageIndex === 0) {
                    activeImageIndex = eventFotosModel.eventImages.length - 1;
                } else {
                    activeImageIndex--;
                }
                showImage(activeImageIndex);
            };

            eventFotosModel.higherIndex = function() {
                if (activeImageIndex == eventFotosModel.eventImages.length - 1) {
                    activeImageIndex = 0;
                } else {
                    activeImageIndex++;
                }
                showImage(activeImageIndex);
            };

            /**
             * Helper functions
             */

            function initialize() {
                hideModalBackdrop();

                eventFotosModel.eventId = $routeParams.eventId;
                getEvent();
            }

            function getEvent() {
                $http.get("data/fotos/" + eventFotosModel.eventId + "/" + eventFotosModel.eventId + ".json", {
                    cache: true
                }).success(function(result) {
                    eventFotosModel.eventTitle = result.title;
                    eventFotosModel.eventImages = result.images;
                });
            }

            function showImage(imageIndex) {
                eventFotosModel.selectedImage = {};
                eventFotosModel.selectedImage.imageDetailName = eventFotosModel.eventImages[imageIndex].name;
                eventFotosModel.selectedImage.imageUrlFull = window.location.origin + "/" + urlFactory.getEventFotoUrl(eventFotosModel.eventId, btoa(eventFotosModel.eventImages[imageIndex].name));
                eventFotosModel.selectedImage.imageUrl = urlFactory.getEventFotoUrl(eventFotosModel.eventId, btoa(eventFotosModel.eventImages[imageIndex].name));
            }

            function showModal() {
                $('#imageDetailModal').modal('show');
                hideModalBackdrop();
            }

            function hideModal() {
                $('#imageDetailModal').modal('hide');
            }

            function hideModalBackdrop() {
                $('.modal-backdrop').remove();
            }
        }
    ]);
})();
