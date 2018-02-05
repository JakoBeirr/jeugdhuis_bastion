angular.module('controllers').controller('contactController', ['$http', 'menuFactory',
    function($http, menuFactory) {
        var contactModel = this;

        menuFactory.setActivePage('contact');

        initialize();

        /**
         * Model functions
         */

        contactModel.sendMail = function() {
            var from = contactModel.mailForm.from;
            var subject = contactModel.mailForm.subject;
            var body = contactModel.mailForm.message;
            if (!!body) {
                body = body.replace('\n', '%0D%0A');
            }

            var a = document.createElement('a');
            a.href = "mailto:jeugdhuisbrecht@gmail.com?subject=" + subject + "&body=" + body;
            var clickEvent = document.createEvent("MouseEvents");
            clickEvent.initEvent("click", true, true);
            a.dispatchEvent(clickEvent);

            /*$http.post('php/sendMail.php', JSON.stringify(contactModel.mailForm))
                .success(function(data) {
                  contactModel.mailForm.from = '';
                  contactModel.mailForm.subject = '';
                  contactModel.mailForm.message = '';
                  //tonen op scherm
                }).error(function(data) {
                  //tonen op scherm
                });*/
        };

        /**
         * Helper functions
         */

        function initialize() {
            hideModalBackdrop();

            createMailModel();
        }

        function createMailModel() {
            contactModel.mailForm = {};
            contactModel.mailForm.from = '';
            contactModel.mailForm.subject = '';
            contactModel.mailForm.message = '';

            contactModel.mailForm.showAlert = false;
            contactModel.mailForm.alert = {};
        }

        function hideModalBackdrop() {
            $('.modal-backdrop').remove();
        }
    }
]);
