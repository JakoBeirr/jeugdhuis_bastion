(function (){
    'use strict';

    angular.module('controllers').controller('contactController', ['menuFactory',
        function (menuFactory) {
            var contactModel = this;

            menuFactory.setActivePage('contact');

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