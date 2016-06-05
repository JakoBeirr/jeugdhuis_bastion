(function (){
    'use strict';

    angular.module('services', []).factory('menuFactory', function () {
        var activePage = 'home';

        return {
            isActivePage: function (page) {
                return activePage === page;
            },
            setActivePage: function (page) {
                activePage = page;
            }
        }
    }).factory('dateFactory', function () {
        var monthNames = [
            "Januari", "Februari", "Maart",
            "April", "Mei", "Juni", "Juli",
            "Augustus", "September", "Oktober",
            "November", "December"
        ];

        return {
            parseDateToLongFormat: function (dateString) {
                var date = new Date(dateString);

                var day = date.getDate();
                var monthIndex = date.getMonth();
                var year = date.getFullYear();

                return day + ' ' + monthNames[monthIndex] + ' ' + year;
            }
        }
    });
})();