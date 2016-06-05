(function (){
    'use strict';

    angular.module('controllers').controller('homeController', ['$http', 'menuFactory',
        function ($http, menuFactory) {
            var homeModel = this;

            menuFactory.setActivePage('home');

            initialize ();

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