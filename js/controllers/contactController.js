angular.module('controllers').controller('contactController', ['$http', 'menuFactory',
    function($http, menuFactory) {
        var contactModel = this;

        menuFactory.setActivePage('contact');

        initialize();

        /**
         * Model functions
         */

        contactModel.sendMail = function() {
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

            /*$http.post('php/sendMail.php', JSON.stringify(contactModel.mailModel))
                .success(
                    function(data) {
                        alert('Mail sent!');
                    })
                .error(
                    function(data) {
                        alert('Unable to sent mail!');
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
            contactModel.mailForm.subject = '';
            contactModel.mailForm.message = '';
        }

        function hideModalBackdrop() {
            $('.modal-backdrop').remove();
        }
    }
]);
