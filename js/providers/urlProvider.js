(function() {
    'use strict';

    angular.module('providers', []).provider('urlFactory', function() {
        var baseUrl = "jeugdhuis_bastion";

        var homeUrl = '/home';
        var werkingUrl = '/werking';
        var lidWordenUrl = '/lidWorden';
        var activiteitenUrl = '/activiteiten';
        var fotosUrl = '/fotos';
        var eventFotosUrl = '/fotos/:eventId';
        var eventFotoUrl = '/fotos/:eventId/:fotoId';
        var gastenboekUrl = '/gastenboek';
        var contactUrl = '/contact';

        this.getHomeUrl = function() {
            return homeUrl;
        };

        this.getWerkingUrl = function() {
            return werkingUrl;
        };

        this.getLidWordenUrl = function() {
            return lidWordenUrl;
        };

        this.getActiviteitenUrl = function() {
            return activiteitenUrl;
        };

        this.getFotosUrl = function() {
            return fotosUrl;
        };

        this.getEventFotosUrl = function() {
            return eventFotosUrl;
        };

        this.getEventFotoUrl = function() {
            return eventFotoUrl;
        };

        this.getGastenboekUrl = function() {
            return gastenboekUrl;
        };

        this.getContactUrl = function() {
            return contactUrl;
        };

        this.$get = function($window) {
            baseUrl = $window.location.origin + "/";

            return {
                getHomeUrl: function() {
                    return "#" + homeUrl;
                },
                getWerkingUrl: function() {
                    return "#" + werkingUrl;
                },
                getLidWordenUrl: function() {
                    return "#" + lidWordenUrl;
                },
                getActiviteitenUrl: function() {
                    return "#" + activiteitenUrl;
                },
                getFotosUrl: function() {
                    return "#" + fotosUrl;
                },
                getEventFotosUrl: function(eventId) {
                    var url = "#" + eventFotosUrl;
                    url = url.replace(":eventId", eventId);
                    return url;
                },
                getEventFotoUrl: function(eventId, fotoId) {
                    var url = "#" + eventFotoUrl;
                    url = url.replace(":eventId", eventId).replace(":fotoId", fotoId);
                    return url;
                },
                getGastenboekUrl: function() {
                    return "#" + gastenboekUrl;
                },
                getContactUrl: function() {
                    return "#" + contactUrl;
                }
            };
        };
    });
})();
