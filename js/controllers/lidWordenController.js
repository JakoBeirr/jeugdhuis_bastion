angular.module('controllers').controller('lidWordenController', ['$http', 'menuFactory',
    function($http, menuFactory) {
        var lidWordenModel = this;

        menuFactory.setActivePage('lidWorden');

        initialize();

        /**
         * Model functions
         */

        lidWordenModel.sendMail = function() {
            var from = lidWordenModel.lidData.mail;
            var subject = '[LID WORDEN] ' + lidWordenModel.lidData.name;
            var body = 'Beste Jeugdhuis \'t Bastion,%0D%0A%0D%0A'
             + 'Graag zou ik lid willen worden als: ' + lidWordenModel.lidData.form + '.%0D%0A%0D%0A'
             + 'Hier alvast enkele persoonlijke gegevens:%0D%0A'
             + 'Naam: ' + lidWordenModel.lidData.name + '%0D%0A'
             + 'Geboortedatum: ' + lidWordenModel.lidData.dateOfBirth.getDate() + '/' + (lidWordenModel.lidData.dateOfBirth.getMonth()+1) + '/' + lidWordenModel.lidData.dateOfBirth.getFullYear() + '%0D%0A'
             + 'GSM-nummer: ' + lidWordenModel.lidData.gsm + '%0D%0A'
             + 'E-mail adres: ' + lidWordenModel.lidData.mail + '%0D%0A';
            if (!!lidWordenModel.lidData.comment) {
                body += 'Motivatie: ' + lidWordenModel.lidData.comment.replace('\n', '%0D%0A') + '%0D%0A';
            }
            body += '%0D%0AMet vriendelijke groeten,%0D%0A' + lidWordenModel.lidData.name + '%0D%0A%0D%0A';

            var a = document.createElement('a');
            a.href = "mailto:jeugdhuisbrecht@gmail.com?subject=" + subject + "&body=" + body;
            var clickEvent = document.createEvent("MouseEvents");
            clickEvent.initEvent("click", true, true);
            a.dispatchEvent(clickEvent);
        }

        /**
         * Helper functions
         */

        function initialize() {
            hideModalBackdrop();

            createLidDataModel();
        }

        function createLidDataModel() {
            lidWordenModel.lidData = {};
            lidWordenModel.lidData.name = '';
            lidWordenModel.lidData.dateOfBirth = '';
            lidWordenModel.lidData.gsm = '';
            lidWordenModel.lidData.mail = '';
            lidWordenModel.lidData.form = 'Actief lid';
            lidWordenModel.lidData.comment = '';
        }

        function hideModalBackdrop() {
            $('.modal-backdrop').remove();
        }
    }
]);
