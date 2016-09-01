angular.module('services').factory('menuFactory', function() {
    var activePage = 'home';

    return {
        isActivePage: function(page) {
            return activePage === page;
        },
        setActivePage: function(page) {
            activePage = page;
        }
    };
}).factory('dateFactory', function() {
    var monthNames = [
        "Januari", "Februari", "Maart",
        "April", "Mei", "Juni", "Juli",
        "Augustus", "September", "Oktober",
        "November", "December"
    ];

    return {
        parseDateToLongFormat: function(dateString) {
            if (!!dateString) {
                var dateParts = dateString.split("/");

                if (dateParts.length == 1) {
                    return dateParts[0];
                } else if (dateParts.length == 2) {
                    return monthNames[dateParts[0] - 1] + ' ' + dateParts[1];
                } else if (dateParts.length == 3) {
                    return dateParts[1] + ' ' + monthNames[dateParts[0] - 1] + ' ' + dateParts[2];
                } else {
                    return undefined;
                }
            } else {
                return undefined;
            }
        }
    };
});
