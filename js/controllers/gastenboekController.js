(function (){
    'use strict';

    angular.module('controllers').controller('gastenboekController', ['menuFactory',
        function (menuFactory) {
            var gastenboekModel = this;

            menuFactory.setActivePage('gastenboek');

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