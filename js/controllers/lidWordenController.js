angular.module('controllers').controller('lidWordenController', ['menuFactory',
    function(menuFactory) {
        var lidWordenModel = this;

        menuFactory.setActivePage('lidWorden');

        initialize();

        /**
         * Helper functions
         */

        function initialize() {
            hideModalBackdrop();
        }

        function hideModalBackdrop() {
            $('.modal-backdrop').remove();
        }
    }
]);
