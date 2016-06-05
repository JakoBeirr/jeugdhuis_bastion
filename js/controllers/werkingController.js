(function (){
    'use strict';

    angular.module('controllers').controller('werkingController', ['menuFactory',
        function (menuFactory) {
            var werkingModel = this;

            menuFactory.setActivePage('werking');

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