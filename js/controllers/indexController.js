(function (){
    'use strict';

    angular.module('controllers', []).controller('indexController', ['urlFactory', 'menuFactory',
        function (urlFactory, menuFactory) {
            var indexModel = this;

            initialize ();

            /**
             * Model functions
             */

            indexModel.goToHome = function () {
                return urlFactory.getHomeUrl();
            };

            indexModel.goToWerking = function () {
                return urlFactory.getWerkingUrl();
            };

            indexModel.goToLidWorden = function () {
                return urlFactory.getLidWordenUrl();
            };

            indexModel.goToActiviteiten = function () {
                return urlFactory.getActiviteitenUrl();
            };

            indexModel.goToFotos = function () {
                return urlFactory.getFotosUrl();
            };

            indexModel.goToGastenboek = function () {
                return urlFactory.getGastenboekUrl();
            };

            indexModel.goToContact = function () {
                return urlFactory.getContactUrl();
            };

            indexModel.isActivePage = function (page) {
                return menuFactory.isActivePage(page);
            };

            /**
             * Helper functions
             */

            function initialize () {
                hideModalBackdrop();
            }

            function hideModalBackdrop () {
                $('.modal-backdrop').remove();
            }
        }
    ]);
})();