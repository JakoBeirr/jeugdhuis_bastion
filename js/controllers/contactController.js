(function() {
    'use strict';

    angular.module('controllers').controller('contactController', ['$http', 'menuFactory',
        function($http, menuFactory) {
            var contactModel = this;

            menuFactory.setActivePage('contact');

            initialize();

            /**
             * Model functions
             */

            contactModel.sendMail = function() {
                $http.post('php/sendMail.php', JSON.stringify(contactModel.mailModel))
                    .success(
                        function(data) {
                            alert('Mail sent!');
                        })
                    .error(
                        function(data) {
                            alert('Unable to sent mail!');
                        });
            };

            /**
             * Helper functions
             */

            function initialize() {
                hideModalBackdrop();

                createMailModel();
            }

            function createMailModel() {
                contactModel.mailModel = {};
                contactModel.mailModel.email = '';
                contactModel.mailModel.subject = '';
                contactModel.mailModel.message = '';
            }

            function hideModalBackdrop() {
                $('.modal-backdrop').remove();
            }
        }
    ]);
})();
